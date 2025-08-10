import React from "react";

const AboutUs: React.FC = () => {
  return (
    <div className="w-full min-h-screen px-4 py-12 sm:px-6 lg:px-8 bg-white dark:bg-gray-900 transition-colors duration-300">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
          About Shopify
        </h1>

        <p className="text-gray-700 dark:text-gray-300 mb-4">
          Shopify was founded with a simple mission: to make quality products
          accessible and affordable for everyone. From electronics and clothing
          to books and home goods, we offer a carefully curated selection to
          meet the diverse needs of our customers.
        </p>

        <p className="text-gray-700 dark:text-gray-300 mb-4">
          Our team is passionate about e-commerce, design, and customer
          satisfaction. We are constantly working to improve our platform, add
          new products, and provide the best possible online shopping
          experience.
        </p>

        <p className="text-gray-700 dark:text-gray-300 mb-4">
          We believe in transparency, security, and excellent customer service.
          Whether you are a first-time visitor or a loyal customer, we are here
          to support you every step of the way.
        </p>

        <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mt-10 mb-4">
          Why Choose Us?
        </h2>
        <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300">
          <li>Fast and reliable shipping</li>
          <li>Secure checkout and payment options</li>
          <li>Friendly and responsive customer support</li>
          <li>Wide range of products at competitive prices</li>
          <li>Commitment to sustainability and ethical sourcing</li>
        </ul>
      </div>
    </div>
  );
};

export default AboutUs;
