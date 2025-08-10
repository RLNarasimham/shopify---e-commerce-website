import axios, { AxiosError, AxiosInstance, AxiosResponse } from "axios";
import { Product, Order } from "../types";

// Use this env var for global backend access!
const FAKE_STORE_API_URL = "https://fakestoreapi.com";
const BACKEND_API_URL =
  import.meta.env.VITE_BACKEND_URL || "http://localhost:5000";

// Razorpay configuration
const RAZORPAY_KEY_ID = import.meta.env.VITE_RAZORPAY_KEY_ID || "";

export class ApiError extends Error {
  status?: number;
  data?: unknown;

  constructor(message: string, status?: number, data?: unknown) {
    super(message);
    this.name = "ApiError";
    this.status = status;
    this.data = data;
  }
}

// API instance for Fake Store API (products)
const fakeStoreApi: AxiosInstance = axios.create({
  baseURL: FAKE_STORE_API_URL,
  timeout: 15000,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

const backendApi: AxiosInstance = axios.create({
  baseURL: BACKEND_API_URL,
  timeout: 15000, // 10 seconds
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

// Attach JWT if present
// api.interceptors.request.use((config) => {
//   const token = localStorage.getItem("authToken");
//   if (token && config.headers) {
//     config.headers.Authorization = `Bearer ${token}`;
//   }
//   return config;
// });

// Error interceptor for Fake Store API (no auth needed)
fakeStoreApi.interceptors.response.use(
  (response: AxiosResponse) => {
    console.log("✅ Fake Store API Success:", response.config.url);
    return response;
  },
  (error: AxiosError<unknown>) => {
    console.error("❌ Fake Store API Error:", {
      url: error.config?.url,
      status: error.response?.status,
      message: error.message,
    });

    if (error.response) {
      const data = error.response.data;
      const message = `Failed to fetch from Fake Store API: ${error.response.status}`;
      throw new ApiError(message, error.response.status, data);
    }

    if (error.request) {
      throw new ApiError(
        "Network error - Unable to connect to Fake Store API. Please check your internet connection."
      );
    }

    throw new ApiError(
      error.message || "An unknown error occurred with Fake Store API"
    );
  }
);

// Normalize errors
// api.interceptors.response.use(
//   (response: AxiosResponse) => response,
//   (error: AxiosError<unknown>) => {
//     if (error.response) {
//       const data = error.response.data;
//       const message =
//         typeof data === "object" && data !== null && "message" in data
//           ? (data as { message: string }).message
//           : error.message;
//       throw new ApiError(message, error.response.status, data);
//     }
//     throw new ApiError(error.message);
//   }
// );

// Auth interceptor for your backend API
// backendApi.interceptors.request.use((config) => {
//   const token = localStorage.getItem("authToken");
//   if (token && config.headers) {
//     config.headers.Authorization = `Bearer ${token}`;
//   }
//   return config;
// });

// ✅ CORRECT
backendApi.interceptors.request.use((config) => {
  const token = localStorage.getItem("authToken");
  if (token && config.headers) {
    // ✅ Use 'token'
    config.headers.Authorization = `Bearer ${token}`; // ✅ Use 'token'
  }
});

// Error interceptor for your backend API
backendApi.interceptors.response.use(
  (response: AxiosResponse) => {
    console.log("✅ Backend API Success:", response.config.url);
    return response;
  },
  (error: AxiosError<unknown>) => {
    console.error("❌ Backend API Error:", {
      url: error.config?.url,
      status: error.response?.status,
      message: error.message,
    });

    if (error.response) {
      const data = error.response.data;
      const message =
        typeof data === "object" && data !== null && "message" in data
          ? (data as { message: string }).message
          : `Backend error: ${error.response.status}`;
      throw new ApiError(message, error.response.status, data);
    }

    if (error.request) {
      throw new ApiError(
        "Network error - Unable to connect to backend server. Please try again."
      );
    }

    throw new ApiError(
      error.message || "An unknown error occurred with backend"
    );
  }
);

// export const productApi = {
//   getAllProducts: async (): Promise<Product[]> => {
//     const { data } = await api.get<Product[]>("/products");
//     return data;
//   },

//   getProductById: async (id: number): Promise<Product> => {
//     const { data } = await api.get<Product>(`/products/${id}`);
//     return data;
//   },

//   getCategories: async (): Promise<string[]> => {
//     const { data } = await api.get<string[]>("/products/categories");
//     return data;
//   },

//   getProductsByCategory: async (category: string): Promise<Product[]> => {
//     const { data } = await api.get<Product[]>(`/products/category/${category}`);
//     return data;
//   },
// };

// // Order creation (adapt payload for your backend!)
// export const createOrder = (order: Order) => {
//   const payload = {
//     userId: 1, // You can use actual user id from auth here if needed
//     date: new Date().toISOString(),
//     products: order.items.map((i) => ({
//       productId: i.id,
//       quantity: i.quantity,
//     })),
//   };
//   return api.post("/carts", payload);
// };

// export default api;

export const productApi = {
  getAllProducts: async (): Promise<Product[]> => {
    try {
      console.log("🛍️ Fetching all products...");
      const { data } = await fakeStoreApi.get<Product[]>("/products");
      console.log(`📦 Received ${data.length} products`);
      return data;
    } catch (error) {
      console.error("Error fetching all products:", error);
      throw error;
    }
  },

  getProductById: async (id: number): Promise<Product> => {
    try {
      console.log(`🔍 Fetching product with ID: ${id}`);
      const { data } = await fakeStoreApi.get<Product>(`/products/${id}`);
      console.log(`📦 Product found: ${data.title}`);
      return data;
    } catch (error) {
      console.error(`Error fetching product ${id}:`, error);
      throw error;
    }
  },

  getCategories: async (): Promise<string[]> => {
    try {
      console.log("📂 Fetching categories...");
      const { data } = await fakeStoreApi.get<string[]>("/products/categories");
      console.log(`📂 Categories received: ${data.join(", ")}`);
      return data;
    } catch (error) {
      console.error("Error fetching categories:", error);
      throw error;
    }
  },

  getProductsByCategory: async (category: string): Promise<Product[]> => {
    try {
      console.log(`🏷️ Fetching products in category: ${category}`);
      const { data } = await fakeStoreApi.get<Product[]>(
        `/products/category/${category}`
      );
      console.log(`📦 Found ${data.length} products in ${category} category`);
      return data;
    } catch (error) {
      console.error(`Error fetching products for category ${category}:`, error);
      throw error;
    }
  },

  // Utility method to test connection
  testConnection: async (): Promise<boolean> => {
    try {
      await fakeStoreApi.get("/products?limit=1");
      console.log("✅ Fake Store API connection successful");
      return true;
    } catch (error) {
      console.error("❌ Fake Store API connection failed:", error);
      return false;
    }
  },
};

// Payment and Order API using your backend
// export const paymentApi = {
//   createOrder: async (order: Order): Promise<any> => {
//     try {
//       console.log("💳 Creating order for payment...");
//       const payload = {
//         userId: 1, // Replace with actual user ID from authentication
//         date: new Date().toISOString(),
//         items: order.items.map((item) => ({
//           productId: item.id,
//           title: item.title,
//           price: item.price,
//           quantity: item.quantity,
//         })),
//         totalAmount: order.total,
//         currency: "INR", // Add currency for Razorpay
//       };

//       const { data } = await backendApi.post("/api/orders", payload);
//       console.log("✅ Order created successfully:", data);
//       return data;
//     } catch (error) {
//       console.error("Error creating order:", error);
//       throw error;
//     }
//   },

//   initiatePayment: async (orderData: any): Promise<any> => {
//     try {
//       console.log("💰 Initiating Razorpay payment...");
//       const { data } = await backendApi.post("/api/payment/create", orderData);
//       console.log("✅ Payment initiated:", data);
//       return data;
//     } catch (error) {
//       console.error("Error initiating payment:", error);
//       throw error;
//     }
//   },

//   verifyPayment: async (paymentData: any): Promise<any> => {
//     try {
//       console.log("🔐 Verifying payment...");
//       const { data } = await backendApi.post(
//         "/api/payment/verify",
//         paymentData
//       );
//       console.log("✅ Payment verified:", data);
//       return data;
//     } catch (error) {
//       console.error("Error verifying payment:", error);
//       throw error;
//     }
//   },

//   // Test backend connection
//   testConnection: async (): Promise<boolean> => {
//     try {
//       await backendApi.get("/api/health");
//       console.log("✅ Backend API connection successful");
//       return true;
//     } catch (error) {
//       console.error("❌ Backend API connection failed:", error);
//       return false;
//     }
//   },
// };

// // Combined health check for both APIs
// export const testAllConnections = async () => {
//   console.log("🔄 Testing all API connections...");

//   const fakeStoreStatus = await productApi.testConnection();
//   const backendStatus = await paymentApi.testConnection();

//   console.log("📊 Connection Status:");
//   console.log(
//     `  • Fake Store API: ${fakeStoreStatus ? "✅ Online" : "❌ Offline"}`
//   );
//   console.log(`  • Backend API: ${backendStatus ? "✅ Online" : "❌ Offline"}`);

//   return {
//     fakeStore: fakeStoreStatus,
//     backend: backendStatus,
//     overall: fakeStoreStatus && backendStatus,
//   };
// };

// // Legacy support - keeping the old createOrder function for backward compatibility
// export const createOrder = paymentApi.createOrder;

// // Export the APIs
// export { fakeStoreApi, backendApi };
// export default fakeStoreApi;

// Payment API (using your backend)
export const paymentApi = {
  // Test backend connection
  testConnection: async (): Promise<boolean> => {
    try {
      await backendApi.get("/api/payment/health");
      return true;
    } catch (error) {
      console.error("Backend connection test failed:", error);
      return false;
    }
  },

  // Create Razorpay order
  createOrder: async (orderData: {
    amount: number;
    currency?: string;
    userId?: string;
    items?: any[];
  }): Promise<any> => {
    try {
      console.log("🛒 Creating payment order:", orderData);

      const { data } = await backendApi.post("/api/payment/create-order", {
        amount: orderData.amount,
        currency: orderData.currency || "INR",
        userId: orderData.userId || "guest",
        items: orderData.items || [],
      });

      if (!data.success) {
        throw new Error(data.error || "Order creation failed");
      }

      console.log("✅ Order created successfully:", data);
      return data;
    } catch (error) {
      console.error("❌ Error creating order:", error);
      throw error;
    }
  },

  // Verify payment
  verifyPayment: async (paymentData: {
    razorpay_order_id: string;
    razorpay_payment_id: string;
    razorpay_signature: string;
  }): Promise<any> => {
    try {
      console.log("🔐 Verifying payment:", paymentData);

      const { data } = await backendApi.post(
        "/api/payment/verify",
        paymentData
      );

      if (!data.success) {
        throw new Error(data.error || "Payment verification failed");
      }

      console.log("✅ Payment verified successfully:", data);
      return data;
    } catch (error) {
      console.error("❌ Error verifying payment:", error);
      throw error;
    }
  },

  // Get payment status
  getPaymentStatus: async (paymentId: string): Promise<any> => {
    try {
      const { data } = await backendApi.get(
        `/api/payment/payment/${paymentId}`
      );
      return data;
    } catch (error) {
      console.error("Error fetching payment status:", error);
      throw error;
    }
  },

  // Get order status
  getOrderStatus: async (orderId: string): Promise<any> => {
    try {
      const { data } = await backendApi.get(`/api/payment/order/${orderId}`);
      return data;
    } catch (error) {
      console.error("Error fetching order status:", error);
      throw error;
    }
  },
};

// Razorpay integration helper
export const initiateRazorpayPayment = (
  orderData: any,
  onSuccess: (response: any) => void,
  onError: (error: any) => void
) => {
  // Check if Razorpay is loaded
  if (typeof (window as any).Razorpay === "undefined") {
    onError(new Error("Razorpay SDK not loaded. Please refresh the page."));
    return;
  }

  const options = {
    key: RAZORPAY_KEY_ID || orderData.razorpayKeyId,
    amount: orderData.amount,
    currency: orderData.currency || "INR",
    order_id: orderData.orderId,
    name: "Your Store Name",
    description: "Purchase from Your Store",
    image: "/logo.png", // Your logo URL
    handler: async (response: any) => {
      try {
        // Verify payment on backend
        const verificationResult = await paymentApi.verifyPayment({
          razorpay_order_id: response.razorpay_order_id,
          razorpay_payment_id: response.razorpay_payment_id,
          razorpay_signature: response.razorpay_signature,
        });

        onSuccess({
          ...response,
          verification: verificationResult,
        });
      } catch (error) {
        onError(error);
      }
    },
    prefill: {
      name: "Customer Name",
      email: "customer@example.com",
      contact: "9999999999",
    },
    notes: {
      address: "Customer Address",
    },
    theme: {
      color: "#3399cc",
    },
    modal: {
      ondismiss: () => {
        onError(new Error("Payment cancelled by user"));
      },
    },
  };

  const razorpayInstance = new (window as any).Razorpay(options);
  razorpayInstance.open();
};

// Complete payment flow
export const processPayment = async (
  cartItems: any[],
  totalAmount: number,
  onSuccess: (response: any) => void,
  onError: (error: any) => void
) => {
  try {
    console.log("💳 Starting payment process...");

    // Step 1: Create order on backend
    const orderResponse = await paymentApi.createOrder({
      amount: totalAmount,
      currency: "INR",
      userId: "user123", // Replace with actual user ID
      items: cartItems,
    });

    // Step 2: Initialize Razorpay payment
    initiateRazorpayPayment(orderResponse, onSuccess, onError);
  } catch (error) {
    console.error("❌ Payment process failed:", error);
    onError(error);
  }
};

// Legacy support
export const createOrder = paymentApi.createOrder;

export default fakeStoreApi;
