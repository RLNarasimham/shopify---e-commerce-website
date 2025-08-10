import React, { useEffect } from "react";
import {
  Star,
  ShoppingBag,
  Truck,
  Shield,
  Headphones,
  ArrowRight,
  User,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useProducts } from "../hooks/useProducts";
import { useAppDispatch, useAppSelector } from "../store";
import { addToCart } from "../store/slices/cartSlice";
import { setCurrentPage } from "../store/slices/uiSlice";
import { Product } from "../types";
import ProductSearchResults from "./ProductSearchResults";

const HomePage: React.FC = () => {
  const dispatch = useAppDispatch();
  const { data: products } = useProducts();
  const navigate = useNavigate();
  const { searchQuery } = useAppSelector((state) => state.ui);

  useEffect(() => {
    if (products && Array.isArray(products)) {
      console.log(products.map((p) => p.category));
    }
  }, [products]);

  const handleAddToCart = (product: Product) => dispatch(addToCart(product));
  const handleShopNow = () => {
    dispatch(setCurrentPage("products"));
    navigate("/products");
  };
  const handleShopElectronics = () => {
    dispatch(setCurrentPage("/category/electronics"));
    navigate("/category/electronics");
  };
  const handleLoginClick = () => navigate("/login");
  const handleSignupClick = () => navigate("/signup");

  const featuredProducts =
    products
      ?.slice()
      .sort((a, b) => b.rating.rate - a.rating.rate)
      .slice(0, 4) || [];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">

      <section className="bg-gradient-to-r from-blue-600 to-blue-800 dark:from-blue-700 dark:to-blue-900 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold mb-6">
            Welcome to Shopify
          </h1>
          <p className="text-base sm:text-xl md:text-2xl text-blue-100 mb-8">
            Your one-stop destination for quality products at unbeatable prices
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4 mb-6">
            <button
              onClick={handleShopNow}
              className="bg-white text-blue-600 px-8 py-3 rounded-3xl font-semibold hover:bg-gray-100 transition inline-flex items-center space-x-2"
            >
              <span>Shop Now</span>
              <ArrowRight className="h-5 w-5" />
            </button>
          </div>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <button
              onClick={handleLoginClick}
              className="bg-transparent border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition inline-flex items-center space-x-2"
            >
              <User className="h-5 w-5" />
              <span>Sign In</span>
            </button>
            <Link
              to="/signup"
              className="px-4 py-3 border-2 border-white rounded-lg font-medium text-white hover:bg-white hover:text-blue-600 transition"
            >
              Create Account
            </Link>
          </div>
        </div>
      </section>

      {searchQuery && (
        <div className="mt-8 px-4 sm:px-6 lg:px-8">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-4">
            Search Results
          </h2>
          <ProductSearchResults />
        </div>
      )}

      <section className="py-16 bg-white dark:bg-gray-800 px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-12">
          Why Choose Shopify?
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {[
            {
              icon: (
                <Truck className="h-8 w-8 text-blue-600 dark:text-blue-400" />
              ),
              title: "Free Shipping",
              desc: "Free shipping on all orders over $50. Fast and reliable delivery.",
              bg: "bg-blue-100 dark:bg-blue-900",
            },
            {
              icon: (
                <Shield className="h-8 w-8 text-green-600 dark:text-green-400" />
              ),
              title: "Secure Payment",
              desc: "Your payment is always secure with encrypted checkout.",
              bg: "bg-green-100 dark:bg-green-900",
            },
            {
              icon: (
                <Headphones className="h-8 w-8 text-purple-600 dark:text-purple-400" />
              ),
              title: "24/7 Support",
              desc: "Our support team is here to help you anytime, anywhere.",
              bg: "bg-purple-100 dark:bg-purple-900",
            },
          ].map((item, i) => (
            <div key={i} className="text-center">
              <div
                className={`w-16 h-16 mx-auto rounded-full flex items-center justify-center mb-4 ${item.bg}`}
              >
                {item.icon}
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                {item.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-300">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="py-16 bg-gray-50 dark:bg-gray-900 px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            Featured Products
          </h2>
          <p className="text-gray-600 dark:text-gray-300">
            Discover our top-rated products loved by customers
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {featuredProducts.map((product) => (
            <div
              key={product.id}
              className="bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-lg transition overflow-hidden"
            >
              <div className="w-full h-48 flex justify-center items-center bg-gray-200 dark:bg-gray-700">
                <img
                  src={product.image}
                  alt={product.title}
                  className="object-contain h-full p-4"
                  loading="lazy"
                />
              </div>
              <div className="p-4">
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2 line-clamp-2">
                  {product.title}
                </h3>
                <div className="flex items-center mb-2">
                  <div className="flex">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        className={`h-4 w-4 ${
                          i < Math.floor(product.rating.rate)
                            ? "text-yellow-400"
                            : "text-gray-300"
                        }`}
                      />
                    ))}
                  </div>
                  <span className="ml-2 text-sm text-gray-500 dark:text-gray-400">
                    ({product.rating.count})
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-xl font-bold text-gray-900 dark:text-white">
                    ${product.price.toFixed(2)}
                  </span>
                  <button
                    onClick={() => handleAddToCart(product)}
                    className="bg-blue-600 dark:bg-blue-700 text-white px-3 py-2 rounded-md hover:bg-blue-700 dark:hover:bg-blue-800"
                  >
                    <ShoppingBag className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="text-center mt-8">
          <button
            onClick={handleShopNow}
            className="bg-blue-600 dark:bg-blue-700 text-white px-6 py-3 rounded-lg hover:bg-blue-700 dark:hover:bg-blue-800 inline-flex items-center space-x-2"
          >
            <span>View All Products</span>
            <ArrowRight className="h-5 w-5" />
          </button>
        </div>
      </section>

      <section className="py-16 bg-white dark:bg-gray-800 px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-12">
          Special Offers
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

          <div className="bg-gradient-to-r from-red-500 to-red-600 dark:from-red-600 dark:to-red-700 text-white p-8 rounded-lg">
            <h3 className="text-2xl font-bold mb-4">Flash Sale!</h3>
            <p className="text-red-100 mb-4">
              Up to 50% off on selected electronics. Limited time offer!
            </p>
            <button
              onClick={handleShopElectronics}
              className="bg-white text-red-600 px-6 py-2 rounded-md font-semibold hover:bg-gray-100"
            >
              Shop Electronics
            </button>
          </div>

          <div className="bg-gradient-to-r from-green-500 to-green-600 dark:from-green-600 dark:to-green-700 text-white p-8 rounded-lg">
            <h3 className="text-2xl font-bold mb-4">New Customer Special</h3>
            <p className="text-green-100 mb-4">
              Get 20% off your first order with code WELCOME20
            </p>
            <button
              onClick={handleShopNow}
              className="bg-white text-green-600 px-6 py-2 rounded-md font-semibold hover:bg-gray-100"
            >
              Start Shopping
            </button>
          </div>
        </div>
      </section>

      <section className="py-16 bg-gradient-to-r from-blue-600 to-blue-800 dark:from-blue-700 dark:to-blue-900 text-white px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Start Shopping?</h2>
          <p className="text-xl text-blue-100 mb-8">
            Join thousands of satisfied customers and discover amazing deals
            today!
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <button
              onClick={handleSignupClick}
              className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 inline-flex items-center space-x-2"
            >
              <User className="h-5 w-5" />
              <span>Create Account</span>
            </button>
            <button
              onClick={handleShopNow}
              className="bg-transparent border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-600 inline-flex items-center space-x-2"
            >
              <ShoppingBag className="h-5 w-5" />
              <span>Browse Products</span>
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
