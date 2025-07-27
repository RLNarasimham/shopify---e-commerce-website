import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../store";
import { useNavigate } from "react-router-dom";

const TopPicksPage: React.FC = () => {
  const favorites = useSelector((state: RootState) => state.favorites.items); // adjust this based on your favorites slice
  const navigate = useNavigate();

  if (favorites.length === 0) {
    return (
      <div className="text-center text-gray-500 dark:text-gray-300 mt-10">
        No favorites added yet.
      </div>
    );
  }

  return (
    <div className="p-4 sm:p-6">
      <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-gray-100">
        Your Favorites
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {favorites.map((product) => (
          <div
            key={product.id}
            className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 cursor-pointer"
            onClick={() => navigate(`/product/${product.id}`)}
          >
            <img
              src={product.image}
              alt={product.title}
              className="w-full h-40 object-contain mb-4"
            />
            <h3 className="text-md font-medium text-gray-900 dark:text-gray-100">
              {product.title}
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-300">
              ${product.price}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TopPicksPage;
