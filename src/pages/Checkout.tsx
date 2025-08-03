// // src/pages/Checkout.tsx
// import React, { useState, FormEvent } from "react";
// import { useAppSelector } from "../store";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";
// import { RootState } from "../store";
// import { ShippingInfo } from "../types";

// const DELIVERY_CHARGE = 50;
// const DISCOUNT_PERCENTAGE = 10;
// const CGST_PERCENT = 5;
// const SGST_PERCENT = 5;
// const UTGST_PERCENT = 0;

// // Define a proper shape for Razorpay’s options
// interface RazorpayPrefill {
//   name?: string;
//   email?: string;
// }

// interface RazorpayTheme {
//   color?: string;
// }

// interface RazorpayOptions {
//   key: string;
//   amount: number;
//   currency: string;
//   name: string;
//   description: string;
//   order_id: string;
//   handler: (response: unknown) => void;
//   prefill?: RazorpayPrefill;
//   theme?: RazorpayTheme;
// }

// interface RazorpayInstance {
//   open(): void;
// }

// // Replace the `any` with our RazorpayOptions type
// declare global {
//   interface Window {
//     Razorpay: new (options: RazorpayOptions) => RazorpayInstance;
//   }
// }

// function getMainTitle(title: string, maxWords = 5): string {
//   const main = title.split(/[-:–—]/)[0];
//   const words = main.trim().split(/\s+/);
//   return words.length > maxWords
//     ? words.slice(0, maxWords).join(" ") + "..."
//     : main;
// }

// const Checkout: React.FC = () => {
//   // ← selector must match slice field “items”
//   const cartItems = useAppSelector((state: RootState) => state.cart.items);
//   const navigate = useNavigate();

//   const [shipping, setShipping] = useState<
//     ShippingInfo & { deliveryMode: string }
//   >({
//     name: "",
//     address: "",
//     city: "",
//     postalCode: "",
//     country: "",
//     deliveryMode: "free",
//   });
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");

//   // calculate all charges
//   const subtotal = cartItems.reduce(
//     (sum, i) => sum + i.product.price * i.quantity,
//     0
//   );
//   const discount = (subtotal * DISCOUNT_PERCENTAGE) / 100;
//   const cgst = (subtotal * CGST_PERCENT) / 100;
//   const sgst = (subtotal * SGST_PERCENT) / 100;
//   const utgst = (subtotal * UTGST_PERCENT) / 100;
//   const deliveryCharge = shipping.deliveryMode === "paid" ? DELIVERY_CHARGE : 0;
//   const total = subtotal - discount + cgst + sgst + utgst + deliveryCharge;

//   const handleChange = (
//     e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
//   ) => {
//     setShipping({ ...shipping, [e.target.name]: e.target.value });
//   };

//   const onSubmit = async (e: FormEvent) => {
//     e.preventDefault();
//     setLoading(true);
//     setError("");

//     if (cartItems.length === 0) {
//       setError("Your cart is empty.");
//       setLoading(false);
//       return;
//     }
//     if (total <= 0 || isNaN(total)) {
//       setError("Invalid total amount.");
//       setLoading(false);
//       return;
//     }

//     try {
//       const { data: orderData } = await axios.post(
//         `${import.meta.env.VITE_API_BASE_URL}/payment/create-order`,
//         { amount: Math.round(total) }
//       );

//       const options = {
//         key: import.meta.env.VITE_RAZORPAY_KEY_ID,
//         amount: orderData.amount,
//         currency: orderData.currency,
//         name: "My Store",
//         description: "Order Payment",
//         order_id: orderData.id,
//         handler: () => {
//           navigate("/success");
//         },
//         prefill: { name: shipping.name || "User", email: "user@example.com" },
//         theme: { color: "#3399cc" },
//       };

//       new window.Razorpay(options).open();
//     } catch {
//       setError("Payment failed. Please try again.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8 px-4 sm:px-6 lg:px-8 transition-colors">
//       <div className="max-w-xl mx-auto bg-white dark:bg-gray-800 shadow rounded-lg p-6 sm:p-8">
//         <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-6 text-center">
//           Checkout
//         </h2>
//         <form onSubmit={onSubmit} className="space-y-6">
//           {(["name", "address", "city", "postalCode", "country"] as const).map(
//             (field) => (
//               <div key={field}>
//                 <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
//                   {field.replace(/([A-Z])/g, " $1")}
//                 </label>
//                 <input
//                   id={field}
//                   name={field}
//                   value={shipping[field]}
//                   onChange={handleChange}
//                   required
//                   className="block w-full border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 rounded-md px-3 py-2"
//                 />
//               </div>
//             )
//           )}

//           {/* Delivery Method */}
//           <div>
//             <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
//               Delivery Method
//             </label>
//             <select
//               name="deliveryMode"
//               value={shipping.deliveryMode}
//               onChange={handleChange}
//               className="block w-full border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 rounded-md px-3 py-2"
//             >
//               <option value="free">Free Delivery</option>
//               <option value="paid">Paid Delivery</option>
//             </select>
//           </div>

//           {/* Order Items */}
//           <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mt-8">
//             Order Summary
//           </h3>
//           <ul className="divide-y divide-gray-200 dark:divide-gray-700">
//             {cartItems.map((i) => (
//               <li key={i.product.id} className="py-3 flex justify-between">
//                 <span>
//                   {getMainTitle(i.product.title)} × {i.quantity}
//                 </span>
//                 <span>₹{(i.product.price * i.quantity).toFixed(2)}</span>
//               </li>
//             ))}
//           </ul>

//           {/* Charges Breakdown */}
//           <div className="space-y-1 text-sm text-gray-800 dark:text-gray-200 mt-4">
//             <div className="flex justify-between">
//               <span>Subtotal:</span>
//               <span>₹{subtotal.toFixed(2)}</span>
//             </div>
//             <div className="flex justify-between">
//               <span>Discount ({DISCOUNT_PERCENTAGE}%):</span>
//               <span className="text-green-600 dark:text-green-400">
//                 − ₹{discount.toFixed(2)}
//               </span>
//             </div>
//             <div className="flex justify-between">
//               <span>CGST ({CGST_PERCENT}%):</span>
//               <span>₹{cgst.toFixed(2)}</span>
//             </div>
//             <div className="flex justify-between">
//               <span>SGST ({SGST_PERCENT}%):</span>
//               <span>₹{sgst.toFixed(2)}</span>
//             </div>
//             {UTGST_PERCENT > 0 && (
//               <div className="flex justify-between">
//                 <span>UTGST ({UTGST_PERCENT}%):</span>
//                 <span>₹{utgst.toFixed(2)}</span>
//               </div>
//             )}
//             <div className="flex justify-between">
//               <span>Delivery:</span>
//               <span>{deliveryCharge > 0 ? `₹${deliveryCharge}` : "Free"}</span>
//             </div>
//             <div className="flex justify-between font-bold pt-2 border-t dark:border-gray-700">
//               <span>Total:</span>
//               <span>₹{total.toFixed(2)}</span>
//             </div>
//           </div>

//           {error && (
//             <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
//           )}
//           <button
//             type="submit"
//             disabled={loading}
//             className="w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white font-semibold rounded-md"
//           >
//             {loading ? "Processing..." : "Place Order"}
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default Checkout;

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
  const total = subtotal - discount + cgst + sgst + utgst + deliveryCharge;

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

    try {
      const { data: orderData } = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/payment/create-order`,
        { amount: Math.round(total) }
      );

      const options: RazorpayOptions = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID,
        amount: orderData.amount,
        currency: orderData.currency,
        name: "My Store",
        description: "Order Payment",
        order_id: orderData.id,
        handler: () => {
          navigate("/success");
        },
        prefill: { name: shipping.name || "User", email: "user@example.com" },
        theme: { color: "#3399cc" },
      };

      new window.Razorpay(options).open();
    } catch {
      setError("Payment failed. Please try again.");
    } finally {
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
          <ul className="divide-y divide-gray-200 dark:divide-gray-700">
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
              <span>₹{total.toFixed(2)}</span>
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
