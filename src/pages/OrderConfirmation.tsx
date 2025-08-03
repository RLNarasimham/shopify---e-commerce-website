// import React from "react";
// import { Link } from "react-router-dom";

// const OrderConfirmation: React.FC = () => (
//   <div className="text-center py-20">
//     <h1 className="text-3xl font-bold mb-4">Thank you for your order!</h1>
//     <p>Your order has been placed successfully.</p>
//     <Link to="/" className="mt-6 inline-block text-blue-600 hover:underline">
//       Continue Shopping
//     </Link>
//   </div>
// );

// export default OrderConfirmation;

import React from "react";
import { Link } from "react-router-dom";

const OrderConfirmation: React.FC = () => (
  <main className="min-h-[70vh] flex flex-col justify-center items-center px-4 py-20 bg-gray-50 dark:bg-gray-900 transition-colors">
    <div className="bg-white dark:bg-gray-800 shadow rounded-lg max-w-md w-full p-8 text-center">
      <h1 className="text-3xl sm:text-4xl font-bold mb-4 text-green-600 dark:text-green-400">
        Thank you for your order!
      </h1>
      <p className="text-gray-700 dark:text-gray-200 mb-6">
        Your order has been placed successfully.
      </p>
      <Link
        to="/"
        className="inline-block px-6 py-2 rounded bg-blue-600 text-white font-semibold hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 transition"
      >
        Continue Shopping
      </Link>
    </div>
  </main>
);

export default OrderConfirmation;
