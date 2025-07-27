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

  // ✏️ Pull your products array from the `all` field
  const allProducts = useAppSelector((state: RootState) => state.products.all);
  const loading = useAppSelector((state: RootState) => state.products.loading);

  // Fetch once on mount if we haven’t loaded yet
  useEffect(() => {
    if (allProducts.length === 0) {
      dispatch(fetchProducts());
    }
  }, [allProducts.length, dispatch]);

  // 3) While we’re fetching, show a loader
  if (loading) {
    return <div className="p-8 text-center">Loading product…</div>;
  }

  // 4) Find the one product by ID
  const product = allProducts.find((p) => p.id === pid);

  // 5) If fetch is done but still not found
  if (!product) {
    return (
      <div className="p-8 text-center text-xl font-medium">
        Product not found.
      </div>
    );
  }

  // 6) Handlers
  const handleAddToCart = () => {
    dispatch(addToCart(product));
  };
  const handleBuyNow = () => {
    dispatch(addToCart(product));
    navigate("/checkout");
  };

  // 7) Render
  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-6 lg:p-8 text-gray-800 dark:text-gray-200">
      <div className="flex flex-col md:flex-row gap-8">
        <img
          src={product.image}
          alt={product.title}
          className="w-full md:w-1/2 object-cover rounded-lg shadow-md"
        />
        <div className="flex-1">
          <h1 className="text-3xl font-bold mb-4">{product.title}</h1>
          <p className="text-lg mb-4">{product.description}</p>
          <p className="text-xl font-semibold mb-6">
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
