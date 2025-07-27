import axios, { AxiosError, AxiosInstance, AxiosResponse } from "axios";
import { Product, Order } from "../types";

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

const API_BASE_URL = import.meta.env.VITE_API_URL || "https://fakestoreapi.com";

const api: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10_000,
});

// ——— Request interceptor (attach token) ———
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("authToken");
  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// ——— Response interceptor (normalize errors) ———
api.interceptors.response.use(
  (response: AxiosResponse) => response,
  (error: AxiosError<unknown>) => {
    // If server responded with something
    if (error.response) {
      // Try to pull a message field if it exists
      const data = error.response.data;
      const message =
        typeof data === "object" && data !== null && "message" in data
          ? (data as { message: string }).message
          : error.message;

      throw new ApiError(message, error.response.status, data);
    }
    // Network error or no response
    throw new ApiError(error.message);
  }
);

export const productApi = {
  getAllProducts: async (): Promise<Product[]> => {
    const { data } = await api.get<Product[]>("/products");
    return data;
  },

  getProductById: async (id: number): Promise<Product> => {
    const { data } = await api.get<Product>(`/products/${id}`);
    return data;
  },

  getCategories: async (): Promise<string[]> => {
    const { data } = await api.get<string[]>("/products/categories");
    return data;
  },

  getProductsByCategory: async (category: string): Promise<Product[]> => {
    const { data } = await api.get<Product[]>(`/products/category/${category}`);
    return data;
  },
};

export const createOrder = (order: Order) => {
  const payload = {
    userId: 1, // you can generate or pull from your auth user
    date: new Date().toISOString(),
    products: order.items.map((i) => ({
      productId: i.id,
      quantity: i.quantity,
    })),
  };
  return api.post("/carts", payload);
};

export default api;
