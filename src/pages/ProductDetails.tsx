import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAppSelector, useAppDispatch } from "../store";
import { addToCart } from "../store/slices/cartSlice";
import { fetchProducts } from "../store/slices/productsSlice";
import { RootState } from "../store";

const ProductDetails: React.FC = () => {
  const { productId } = useParams<{ productId: string }>();
  const pid = Number(productId);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const allProducts = useAppSelector((state: RootState) => state.products.all);
  const loading = useAppSelector((state: RootState) => state.products.loading);

  useEffect(() => {
    if (allProducts.length === 0) {
      dispatch(fetchProducts());
    }
  }, [allProducts.length, dispatch]);

  if (loading) {
    return (
      <div className="min-h-[60vh] flex justify-center items-center text-lg font-semibold text-gray-700 dark:text-gray-300">
        Loading product…
      </div>
    );
  }

  const product = allProducts.find((p) => p.id === pid);

  if (!product) {
    return (
      <div className="min-h-[60vh] flex justify-center items-center text-xl font-medium text-gray-700 dark:text-gray-300">
        Product not found.
      </div>
    );
  }

  const handleAddToCart = () => {
    dispatch(addToCart(product));
  };
  const handleBuyNow = () => {
    dispatch(addToCart(product));
    navigate("/checkout");
  };

  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-6 lg:p-8 text-gray-800 dark:text-gray-200">
      <div className="flex flex-col md:flex-row gap-8">
        <div className="w-full md:w-1/2 flex-shrink-0 flex justify-center">
          <img
            src={product.image}
            alt={product.title}
            className="w-full max-w-xs md:max-w-none md:w-full h-72 md:h-96 object-contain rounded-lg shadow-md bg-white dark:bg-gray-800"
          />
        </div>
        <div className="flex-1 flex flex-col justify-center">
          <h1 className="text-2xl sm:text-3xl font-bold mb-4">
            {product.title}
          </h1>
          <p className="text-base sm:text-lg mb-4">{product.description}</p>
          <p className="text-lg sm:text-xl font-semibold mb-6">
            ₹{product.price.toFixed(2)}
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <button
              onClick={handleAddToCart}
              className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
            >
              Add to Cart
            </button>
            <button
              onClick={handleBuyNow}
              className="px-6 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition"
            >
              Buy Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
