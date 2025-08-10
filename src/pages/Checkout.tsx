
import React, { useState, FormEvent } from "react";
import { useAppSelector } from "../store";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { RootState } from "../store";
import { ShippingInfo } from "../types";

const DELIVERY_CHARGE = 50;
const DISCOUNT_PERCENTAGE = 10;
const CGST_PERCENT = 5;
const SGST_PERCENT = 5;
const UTGST_PERCENT = 0;

// Razorpay types
interface RazorpayPrefill {
  name?: string;
  email?: string;
}
interface RazorpayTheme {
  color?: string;
}
interface RazorpayOptions {
  key: string;
  amount: number;
  currency: string;
  name: string;
  description: string;
  order_id: string;
  handler: (response: unknown) => void;
  prefill?: RazorpayPrefill;
  theme?: RazorpayTheme;
}
interface RazorpayInstance {
  open(): void;
}
declare global {
  interface Window {
    Razorpay: new (options: RazorpayOptions) => RazorpayInstance;
  }
}

function getMainTitle(title: string, maxWords = 5): string {
  const main = title.split(/[-:–—]/)[0];
  const words = main.trim().split(/\s+/);
  return words.length > maxWords
    ? words.slice(0, maxWords).join(" ") + "..."
    : main;
}

const Checkout: React.FC = () => {
  const cartItems = useAppSelector((state: RootState) => state.cart.items);
  const navigate = useNavigate();

  const [shipping, setShipping] = useState<
    ShippingInfo & { deliveryMode: string }
  >({
    name: "",
    address: "",
    city: "",
    postalCode: "",
    country: "",
    deliveryMode: "free",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Calculate charges
  const subtotal = cartItems.reduce(
    (sum, i) => sum + i.product.price * i.quantity,
    0
  );
  const discount = (subtotal * DISCOUNT_PERCENTAGE) / 100;
  const cgst = (subtotal * CGST_PERCENT) / 100;
  const sgst = (subtotal * SGST_PERCENT) / 100;
  const utgst = (subtotal * UTGST_PERCENT) / 100;
  const deliveryCharge = shipping.deliveryMode === "paid" ? DELIVERY_CHARGE : 0;
  const total =
    (subtotal - discount + cgst + sgst + utgst + deliveryCharge) * 100;

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setShipping({ ...shipping, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    if (cartItems.length === 0) {
      setError("Your cart is empty.");
      setLoading(false);
      return;
    }

    if (total <= 0 || isNaN(total)) {
      setError("Invalid total amount.");
      setLoading(false);
      return;
    }

    // Check if Razorpay is loaded
    if (!window.Razorpay) {
      setError("Payment system not loaded. Please refresh and try again.");
      setLoading(false);
      return;
    }

    // Use state-based token instead of localStorage
    const headers: Record<string, string> = {
      "Content-Type": "application/json",
    };

    if (authToken) {
      headers.Authorization = `Bearer ${authToken}`;
    }

    const requestConfig = {
      method: "POST",
      headers,
      credentials: "include" as RequestCredentials, // For cookies
    };

    try {
      // Prepare order items for ecommerce checkout
      const orderItems = cartItems.map((item) => ({
        productId: item.id,
        productName: item.name || item.title,
        quantity: item.quantity,
        price: item.price,
      }));

      // ✅ Debug: Log all the data being sent
      const requestPayload = {
        amount: Math.round(total),
        currency: "INR",
        items: orderItems,
        shipping: shipping,
        receipt: `order_${Date.now()}`,
      };

      console.log("🔍 Frontend Debug Info:");
      console.log("Total amount:", total);
      console.log("Rounded amount:", Math.round(total));
      console.log("Cart items:", cartItems);
      console.log("Order items:", orderItems);
      console.log("Shipping info:", shipping);
      console.log(
        "Complete request payload:",
        JSON.stringify(requestPayload, null, 2)
      );

      // 1) Create order with cart items
      const orderResponse = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/payment/create-order`,
        {
          ...requestConfig,
          body: JSON.stringify(requestPayload),
        }
      );

      console.log("📡 Response status:", orderResponse.status);
      console.log(
        "📡 Response headers:",
        Object.fromEntries(orderResponse.headers.entries())
      );

      // ✅ Get response text first to debug what's being returned
      const responseText = await orderResponse.text();
      console.log("📡 Raw response:", responseText);

      if (!orderResponse.ok) {
        // ✅ Try to parse error response
        let errorData;
        try {
          errorData = JSON.parse(responseText);
          console.error("❌ Server error response:", errorData);
          setError(
            errorData.error ||
              errorData.message ||
              `HTTP ${orderResponse.status}`
          );
        } catch (parseError) {
          console.error("❌ Could not parse error response:", responseText);
          setError(`HTTP ${orderResponse.status}: ${responseText}`);
        }

        if (orderResponse.status === 401) {
          setError("Please log in to continue.");
        }
        setLoading(false);
        return;
      }

      // ✅ Parse the successful response
      const orderData = JSON.parse(responseText);
      console.log("✅ Order created successfully:", orderData);

      // ✅ Debug: Check the structure of orderData
      console.log("🔍 Order data structure:");
      console.log("- orderData.id:", orderData.id);
      console.log("- orderData.orderId:", orderData.orderId);
      console.log("- orderData.order?.id:", orderData.order?.id);
      console.log("- orderData.amount:", orderData.amount);
      console.log("- orderData.order?.amount:", orderData.order?.amount);

      const options: RazorpayOptions = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID,
        amount: orderData.order?.amount || orderData.amount,
        currency: orderData.order?.currency || orderData.currency || "INR",
        name: "Your Store",
        description: "Product Purchase",
        order_id: orderData.order?.id || orderData.orderId || orderData.id,
        notes: {
          orderId: orderData.order?.id || orderData.orderId || orderData.id,
          itemCount: String(cartItems.length),
        },
        prefill: {
          name: shipping.name || "Customer",
          email: shipping.email || "customer@example.com",
          contact: shipping.phone || "",
        },
        theme: { color: "#3399cc" },

        // 2) Payment success handler
        handler: async (response: {
          razorpay_payment_id: string;
          razorpay_order_id: string;
          razorpay_signature: string;
        }) => {
          try {
            console.log("💰 Payment successful, verifying...", response);

            // Verify payment
            const verifyResponse = await fetch(
              `${import.meta.env.VITE_BACKEND_URL}/api/payment/verify`, // ✅ Fixed URL
              {
                ...requestConfig,
                body: JSON.stringify({
                  razorpay_payment_id: response.razorpay_payment_id,
                  razorpay_order_id: response.razorpay_order_id,
                  razorpay_signature: response.razorpay_signature,
                }),
              }
            );

            if (!verifyResponse.ok) {
              throw new Error(`Verification failed: ${verifyResponse.status}`);
            }

            const verifyResult = await verifyResponse.json();
            console.log("🔐 Verification result:", verifyResult);

            if (verifyResult?.success) {
              // Record payment with order details (if you have this endpoint)
              if (import.meta.env.VITE_API_BASE_URL) {
                const recordResponse = await fetch(
                  `${import.meta.env.VITE_API_BASE_URL}/payment`,
                  {
                    ...requestConfig,
                    body: JSON.stringify({
                      orderId:
                        orderData.order?.id ||
                        orderData.orderId ||
                        orderData.id,
                      paymentId: response.razorpay_payment_id,
                      amount: Math.round(total),
                      items: orderItems,
                      shipping: shipping,
                      status: "completed",
                    }),
                  }
                );

                if (!recordResponse.ok) {
                  console.warn(
                    "⚠️ Payment recorded but order processing failed"
                  );
                }
              }

              // Clear cart and navigate to success page
              console.log("✅ Payment complete, navigating to success page");
              navigate("/success");
            } else {
              setError("Payment verification failed.");
            }
          } catch (err: unknown) {
            console.error("Payment verification error:", err);
            if (err instanceof Error && err.message.includes("401")) {
              setError("Session expired. Please log in again.");
            } else {
              setError(
                "Payment verification failed. Please contact support if amount was deducted."
              );
            }
          } finally {
            setLoading(false);
          }
        },

        modal: {
          ondismiss: () => {
            setLoading(false);
            setError("Payment cancelled.");
          },
        },
      };

      console.log("🚀 Opening Razorpay with options:", options);

      // Open Razorpay payment modal
      const razorpayInstance = new window.Razorpay(options);
      razorpayInstance.open();
    } catch (err: unknown) {
      console.error("Payment initiation error:", err);

      if (err instanceof Error && err.message.includes("401")) {
        setError("Please log in to continue.");
      } else {
        setError("Payment failed. Please try again.");
      }
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8 px-4 sm:px-6 lg:px-8 transition-colors">
      <div className="max-w-xl mx-auto bg-white dark:bg-gray-800 shadow rounded-lg p-6 sm:p-8">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-6 text-center">
          Checkout
        </h2>
        <form onSubmit={onSubmit} className="space-y-6">
          {(["name", "address", "city", "postalCode", "country"] as const).map(
            (field) => (
              <div key={field}>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  {field.replace(/([A-Z])/g, " $1")}
                </label>
                <input
                  id={field}
                  name={field}
                  value={shipping[field]}
                  onChange={handleChange}
                  required
                  className="block w-full border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 rounded-md px-3 py-2"
                  autoComplete={field}
                />
              </div>
            )
          )}

          {/* Delivery Method */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Delivery Method
            </label>
            <select
              name="deliveryMode"
              value={shipping.deliveryMode}
              onChange={handleChange}
              className="block w-full border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 rounded-md px-3 py-2"
            >
              <option value="free">Free Delivery</option>
              <option value="paid">Paid Delivery</option>
            </select>
          </div>

          {/* Order Items */}
          <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mt-8">
            Order Summary
          </h3>
          <ul className="divide-y text-black dark:text-white">
            {cartItems.map((i) => (
              <li key={i.product.id} className="py-3 flex justify-between">
                <span>
                  {getMainTitle(i.product.title)} × {i.quantity}
                </span>
                <span>₹{(i.product.price * i.quantity).toFixed(2)}</span>
              </li>
            ))}
          </ul>

          {/* Charges Breakdown */}
          <div className="space-y-1 text-sm text-gray-800 dark:text-gray-200 mt-4">
            <div className="flex justify-between">
              <span>Subtotal:</span>
              <span>₹{subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span>Discount ({DISCOUNT_PERCENTAGE}%):</span>
              <span className="text-green-600 dark:text-green-400">
                − ₹{discount.toFixed(2)}
              </span>
            </div>
            <div className="flex justify-between">
              <span>CGST ({CGST_PERCENT}%):</span>
              <span>₹{cgst.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span>SGST ({SGST_PERCENT}%):</span>
              <span>₹{sgst.toFixed(2)}</span>
            </div>
            {UTGST_PERCENT > 0 && (
              <div className="flex justify-between">
                <span>UTGST ({UTGST_PERCENT}%):</span>
                <span>₹{utgst.toFixed(2)}</span>
              </div>
            )}
            <div className="flex justify-between">
              <span>Delivery:</span>
              <span>{deliveryCharge > 0 ? `₹${deliveryCharge}` : "Free"}</span>
            </div>
            <div className="flex justify-between font-bold pt-2 border-t dark:border-gray-700">
              <span>Total:</span>
              <span>₹{total.toFixed(2) / 100}</span>
            </div>
          </div>

          {error && (
            <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
          )}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white font-semibold rounded-md"
          >
            {loading ? "Processing..." : "Place Order"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Checkout;
