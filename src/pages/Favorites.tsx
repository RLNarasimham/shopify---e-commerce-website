import React from "react";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../store";
import { Product } from "../types";
import ProductCard from "../components/ProductCard";

const Favorites: React.FC = () => {
  const favorites = useAppSelector((state) => state.favorites.items);
  const navigate = useNavigate();

  const handleProductClick = (product: Product) => {
    navigate(`/product/${product.id}`);
  };

  if (!favorites.length) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] p-6 text-center">
        <h2 className="text-xl sm:text-2xl font-semibold text-gray-800 dark:text-gray-200">
          No favorites yet
        </h2>
        <p className="mt-2 text-sm sm:text-base text-gray-500 dark:text-gray-400">
          Tap the Save icon on any product to add it to your favorites.
        </p>
      </div>
    );
  }

  return (
    <div className="p-4 sm:p-6 max-w-7xl mx-auto">
      <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-gray-900 dark:text-gray-100">
        Your Favorite Products
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {favorites.map((product) => (
          <div
            key={product.id}
            onClick={() => handleProductClick(product)}
            className="cursor-pointer hover:scale-[1.02] transition-transform"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ")
                handleProductClick(product);
            }}
            role="button"
            aria-label={`View ${product.title} details`}
          >
            <ProductCard product={product} viewMode="grid" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Favorites;
