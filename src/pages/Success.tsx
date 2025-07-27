import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Success = () => {
  const [countdown, setCountdown] = useState(10);
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => prev - 1);
    }, 1000);

    if (countdown === 0) {
      clearInterval(timer);
      navigate("/products");
    }

    return () => clearInterval(timer);
  }, [countdown, navigate]);

  const handleContinueShopping = () => {
    navigate("/products");
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-gray-100 dark:bg-gray-900 transition-colors duration-300">
      <div className="bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100 shadow-xl rounded-lg p-8 sm:p-10 max-w-md w-full text-center transition-colors duration-300">
        <svg
          className="w-16 h-16 text-green-500 mx-auto mb-4"
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M5 13l4 4L19 7"
          />
        </svg>
        <h1 className="text-3xl sm:text-4xl font-bold mb-4">
          Payment Successful!
        </h1>
        <p className="mb-6 text-lg">
          Thank you for your purchase. Redirecting to products page in{" "}
          <span className="font-semibold">{countdown}</span> seconds...
        </p>
        <button
          onClick={handleContinueShopping}
          className="mt-2 px-6 py-3 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-md shadow-md transition duration-200"
        >
          Continue Shopping Now
        </button>
      </div>
    </div>
  );
};

export default Success;
