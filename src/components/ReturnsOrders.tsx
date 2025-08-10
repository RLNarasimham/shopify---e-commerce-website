import React from "react";

const ReturnsOrders: React.FC = () => {
  const orders = [
    {
      id: "ORD-00123",
      product: "Wireless Headphones",
      date: "2025-07-10",
      status: "Delivered",
    },
    {
      id: "ORD-00124",
      product: "Smart Watch",
      date: "2025-07-12",
      status: "Shipped",
    },
  ];

  const returns = [
    {
      id: "RET-00045",
      product: "Bluetooth Speaker",
      date: "2025-07-05",
      status: "Processing",
    },
  ];

  return (
    <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-gray-900 dark:text-gray-100">
      <h1 className="text-4xl font-extrabold mb-12 text-blue-600 dark:text-blue-400 text-center">
        Returns & Orders
      </h1>

      <section className="mb-16">
        <h2 className="text-3xl font-bold mb-6 border-b pb-2 border-gray-300 dark:border-gray-700">
          Your Orders
        </h2>
        {orders.length > 0 ? (
          <div className="space-y-8">
            {orders.map((order) => (
              <div
                key={order.id}
                className="p-6 rounded-lg bg-white dark:bg-gray-800 shadow"
              >
                <p className="text-2xl font-semibold mb-2">{order.product}</p>
                <p className="text-lg text-gray-600 dark:text-gray-400">
                  Order ID: <span className="font-medium">{order.id}</span>
                </p>
                <p className="text-lg text-gray-600 dark:text-gray-400">
                  Ordered on: <span className="font-medium">{order.date}</span>
                </p>
                <p
                  className={`text-lg font-semibold mt-1 ${
                    order.status === "Delivered"
                      ? "text-green-600 dark:text-green-400"
                      : "text-yellow-600 dark:text-yellow-400"
                  }`}
                >
                  Status: {order.status}
                </p>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-lg text-gray-500 dark:text-gray-400">
            No orders found.
          </p>
        )}
      </section>

      <section>
        <h2 className="text-3xl font-bold mb-6 border-b pb-2 border-gray-300 dark:border-gray-700">
          Return Requests
        </h2>
        {returns.length > 0 ? (
          <div className="space-y-8">
            {returns.map((ret) => (
              <div
                key={ret.id}
                className="p-6 rounded-lg bg-white dark:bg-gray-800 shadow"
              >
                <p className="text-2xl font-semibold mb-2">{ret.product}</p>
                <p className="text-lg text-gray-600 dark:text-gray-400">
                  Return ID: <span className="font-medium">{ret.id}</span>
                </p>
                <p className="text-lg text-gray-600 dark:text-gray-400">
                  Requested on: <span className="font-medium">{ret.date}</span>
                </p>
                <p className="text-lg font-semibold text-yellow-600 dark:text-yellow-400 mt-1">
                  Status: {ret.status}
                </p>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-lg text-gray-500 dark:text-gray-400">
            No return requests found.
          </p>
        )}
      </section>
    </main>
  );
};

export default ReturnsOrders;
