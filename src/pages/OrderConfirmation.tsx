import React from "react";
import { Link } from "react-router-dom";

const OrderConfirmation: React.FC = () => (
  <div className="text-center py-20">
    <h1 className="text-3xl font-bold mb-4">Thank you for your order!</h1>
    <p>Your order has been placed successfully.</p>
    <Link to="/" className="mt-6 inline-block text-blue-600 hover:underline">
      Continue Shopping
    </Link>
  </div>
);

export default OrderConfirmation;
