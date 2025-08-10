
import React, { useMemo } from "react";
import { useProducts } from "../hooks/useProducts";
import { useAppSelector } from "../store";
import ProductCard from "./ProductCard";
import { Product } from "../types";
import { useParams, Link } from "react-router-dom";

const ProductList: React.FC = () => {
  const { data: products, isLoading, error } = useProducts();
  const { viewMode, searchQuery } = useAppSelector((state) => state.ui);
  const { categoryName } = useParams();

  const filteredProducts = useMemo(() => {
    if (!products) return [];
    const effectiveCategory =
      categoryName === "all"
        ? ""
        : categoryName?.replace(/-/g, " ").toLowerCase();

    const normalize = (str: string) =>
      str.toLowerCase().replace(/[\s&]+/g, "-");

    return products.filter((product: Product) => {
      const matchesSearch =
        product.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesCategory =
        !effectiveCategory ||
        normalize(product.category) === categoryName?.toLowerCase();

      return matchesSearch && matchesCategory;
    });
  }, [products, searchQuery, categoryName]);

  if (isLoading) {
    return (
      <div
        className={`grid gap-6 ${
          viewMode === "grid"
            ? "grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4"
            : "grid-cols-1"
        }`}
        aria-busy="true"
      >
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden animate-pulse"
          >
            <div className="h-40 sm:h-48 bg-gray-200 dark:bg-gray-700"></div>
            <div className="p-3 sm:p-4">
              <div className="h-4 sm:h-6 bg-gray-200 dark:bg-gray-700 rounded mb-2"></div>
              <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded mb-2"></div>
              <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded mb-4"></div>
              <div className="flex justify-between items-center">
                <div className="h-5 sm:h-6 bg-gray-200 dark:bg-gray-700 rounded w-12 sm:w-16"></div>
                <div className="h-6 sm:h-8 bg-gray-200 dark:bg-gray-700 rounded w-16 sm:w-20"></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-8 sm:py-12 px-4">
        <p className="text-red-600 dark:text-red-400 text-sm sm:text-base">
          Error loading products. Please try again.
        </p>
      </div>
    );
  }

  if (filteredProducts.length === 0) {
    return (
      <div className="text-center py-8 sm:py-12 px-4">
        <p className="text-gray-500 dark:text-gray-400 text-sm sm:text-base">
          No such products found..!!
        </p>
      </div>
    );
  }

  return (
    <div
      className={`grid gap-4 sm:gap-6 ${
        viewMode === "grid"
          ? "grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4"
          : "grid-cols-1"
      }`}
      aria-label="Product List"
    >
      {filteredProducts.map((product: Product) => (
        <Link
          key={product.id}
          to={`/product/${product.id}`}
          className="block focus:outline-none focus:ring-2 focus:ring-blue-500 rounded"
        >
          <ProductCard product={product} viewMode={viewMode} />
        </Link>
      ))}
    </div>
  );
};

export default ProductList;
