// src/components/Cart.tsx
import React from "react";
import { X, Plus, Minus, ShoppingBag } from "lucide-react";
import { useAppSelector, useAppDispatch } from "../store";
import {
  toggleCart,
  removeFromCart,
  updateQuantity,
  clearCart,
} from "../store/slices/cartSlice";
import { useNavigate } from "react-router-dom";

const Cart: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { items, isOpen, total } = useAppSelector((state) => state.cart);

  const handleClose = () => {
    dispatch(toggleCart());
  };

  const handleRemoveItem = (id: number) => {
    dispatch(removeFromCart(id));
  };

  const handleUpdateQuantity = (id: number, quantity: number) => {
    dispatch(updateQuantity({ id, quantity }));
  };

  const handleClearCart = () => {
    dispatch(clearCart());
  };

  const handleCheckout = () => {
    // close the cart drawer
    dispatch(toggleCart());
    // navigate to the checkout page
    navigate("/checkout");
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      <div
        className="absolute inset-0 bg-black bg-opacity-50 dark:bg-opacity-70"
        onClick={handleClose}
      />

      <div className="absolute right-0 top-0 h-full w-full max-w-sm sm:max-w-md bg-white dark:bg-gray-900 shadow-xl">
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
              Shopping Cart
            </h2>
            <button
              onClick={handleClose}
              className="p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-800"
            >
              <X className="h-5 w-5 text-gray-500 dark:text-gray-400" />
            </button>
          </div>

          {/* Cart Items */}
          <div className="flex-1 overflow-y-auto p-4">
            {items.length === 0 ? (
              <div className="text-center py-8">
                <ShoppingBag className="mx-auto mb-4 h-12 w-12 text-gray-400" />
                <p className="text-gray-500 dark:text-gray-400">
                  Your cart is empty
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {items.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center space-x-4 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg"
                  >
                    <img
                      src={item.product.image}
                      alt={item.product.title}
                      className="h-16 w-16 object-contain rounded"
                    />
                    <div className="flex-1">
                      <h3 className="text-sm font-medium text-gray-900 dark:text-gray-100 line-clamp-2">
                        {item.product.title}
                      </h3>
                      <p className="text-xs text-gray-600 dark:text-gray-300">
                        ${item.product.price.toFixed(2)}
                      </p>
                      <div className="flex items-center mt-2">
                        <button
                          onClick={() =>
                            handleUpdateQuantity(item.id, item.quantity - 1)
                          }
                          className="p-1 rounded hover:bg-gray-200 dark:hover:bg-gray-700"
                        >
                          <Minus className="h-4 w-4 text-gray-600 dark:text-gray-300" />
                        </button>
                        <span className="mx-2 text-sm text-gray-900 dark:text-gray-100">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() =>
                            handleUpdateQuantity(item.id, item.quantity + 1)
                          }
                          className="p-1 rounded hover:bg-gray-200 dark:hover:bg-gray-700"
                        >
                          <Plus className="h-4 w-4 text-gray-600 dark:text-gray-300" />
                        </button>
                      </div>
                    </div>
                    <button
                      onClick={() => handleRemoveItem(item.id)}
                      className="p-1 text-red-500 hover:text-red-700"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Footer */}
          {items.length > 0 && (
            <div className="border-t border-gray-200 dark:border-gray-700 p-4 space-y-4">
              <div className="flex justify-between text-lg font-semibold text-gray-900 dark:text-gray-100">
                <span>Total:</span>
                <span>${total.toFixed(2)}</span>
              </div>
              <button
                onClick={handleClearCart}
                className="w-full py-2 text-sm bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
              >
                Clear Cart
              </button>
              <button
                onClick={handleCheckout}
                className="w-full py-2.5 text-sm bg-blue-600 dark:bg-blue-700 text-white rounded hover:bg-blue-700 dark:hover:bg-blue-800 transition-colors"
              >
                Checkout
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Cart;
