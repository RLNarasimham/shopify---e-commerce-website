import { useQuery } from "@tanstack/react-query";
import { productApi } from "../services/api";
import { Product } from "../types";

export const useProducts = () =>
  useQuery<Product[], Error>({
    queryKey: ["products"],
    queryFn: productApi.getAllProducts,
    staleTime: 5 * 60 * 1000,
    cacheTime: 10 * 60 * 1000,
  });

export const useProduct = (id: number | string | undefined) =>
  useQuery<Product, Error>({
    queryKey: ["product", id],
    queryFn: () => productApi.getProductById(id),
    enabled: !!id,
  });

export const useCategories = () =>
  useQuery<string[], Error>({
    queryKey: ["categories"],
    queryFn: productApi.getCategories,
    staleTime: 30 * 60 * 1000,
  });
