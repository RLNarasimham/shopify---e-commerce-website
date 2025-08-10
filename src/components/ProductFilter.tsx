import React from "react";
import { useCategories } from "../hooks/useProducts";
import { slugify } from "../utils/slugify";
import { Link, useParams, useLocation } from "react-router-dom";

const ProductFilter: React.FC = () => {
  const { categoryName } = useParams();
  const { data: categories, isLoading } = useCategories();
  const currentCategory = categoryName || "";
  const location = useLocation();
  const isTopPicks = location.pathname === "/top-picks";

  if (isLoading) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 sm:p-6">
        <div
          className="animate-pulse"
          aria-busy="true"
          aria-label="Loading categories"
        >
          <div className="h-5 sm:h-6 bg-gray-200 dark:bg-gray-700 rounded mb-4"></div>
          <div className="space-y-2">
            {[...Array(4)].map((_, i) => (
              <div
                key={i}
                className="h-4 bg-gray-200 dark:bg-gray-700 rounded"
              ></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <aside
      className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 sm:p-6"
      aria-label="Product categories filter"
    >
      <h3 className="text-base sm:text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
        Categories
      </h3>
      <div className="space-y-2">

        <Link
          to="/products"
          className={`w-full block text-left px-3 py-2 rounded-md transition-colors text-sm sm:text-base ${
            !currentCategory && !isTopPicks
              ? "bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400"
              : "text-gray-900 dark:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-700"
          }`}
          aria-current={!currentCategory && !isTopPicks ? "page" : undefined}
        >
          All Products
        </Link>

        <Link
          to="/top-picks"
          className={`w-full block text-left px-3 py-2 rounded-md transition-colors text-sm sm:text-base ${
            isTopPicks
              ? "bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400"
              : "text-gray-900 dark:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-700"
          }`}
          aria-current={isTopPicks ? "page" : undefined}
          data-discover="true"
        >
          🌟 Top Picks
        </Link>

        {categories?.map((category) => {
          const slug = slugify(category);
          const isActive = slug === currentCategory;
          return (
            <Link
              key={category}
              to={`/category/${slug}`}
              className={`w-full block text-left px-3 py-2 rounded-md transition-colors capitalize text-sm sm:text-base ${
                isActive
                  ? "bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400"
                  : "text-gray-900 dark:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-700"
              }`}
              aria-current={isActive ? "page" : undefined}
            >
              {category}
            </Link>
          );
        })}
      </div>
    </aside>
  );
};

export default ProductFilter;
