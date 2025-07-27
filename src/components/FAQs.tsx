// import React from "react";

// const FAQs: React.FC = () => {
//   const faqList = [
//     {
//       question: "What is Shopify?",
//       answer:
//         "Shopify is your one-stop destination for quality products at unbeatable prices.",
//     },
//     {
//       question: "How can I track my order?",
//       answer:
//         "Once your order is shipped, we will provide you with a tracking number via email.",
//     },
//     {
//       question: "What is your return policy?",
//       answer: "We offer a 30-day return policy for all eligible products.",
//     },
//     {
//       question: "How can I contact support?",
//       answer: "You can reach us anytime at support@shopify.com.",
//     },
//   ];

//   return (
//     <div className="max-w-4xl mx-auto px-4 py-12">
//       <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center">
//         Frequently Asked Questions
//       </h1>
//       <div className="space-y-6">
//         {faqList.map((faq, idx) => (
//           <div key={idx} className="border-b pb-4">
//             <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
//               {faq.question}
//             </h2>
//             <p className="text-gray-600 dark:text-gray-300 mt-2">
//               {faq.answer}
//             </p>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default FAQs;

import React, { useState } from "react";
import { Plus, X } from "lucide-react";

const FAQs: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqList = [
    {
      question: "What is Shopify?",
      answer:
        "Shopify is your one-stop destination for quality products at unbeatable prices.",
    },
    {
      question: "How can I track my order?",
      answer:
        "Once your order is shipped, we will provide you with a tracking number via email.",
    },
    {
      question: "What is your return policy?",
      answer: "We offer a 30-day return policy for all eligible products.",
    },
    {
      question: "How can I contact support?",
      answer: "You can reach us anytime at support@shopify.com.",
    },
  ];

  const toggleFAQ = (index: number) => {
    setOpenIndex((prev) => (prev === index ? null : index));
  };

  return (
    <div className="flex flex-col min-h-[60vh] max-w-screen-xl mx-auto bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
      <h2 className="text-2xl sm:text-3xl font-bold text-center text-gray-900 dark:text-gray-100 mb-6">
        Frequently Asked Questions
      </h2>

      <div className="space-y-4">
        {faqList.map((faq, idx) => {
          const isOpen = openIndex === idx;
          return (
            <div
              key={idx}
              className="border border-gray-300 dark:border-gray-600 rounded-lg"
            >
              <button
                onClick={() => toggleFAQ(idx)}
                className="w-full flex items-center justify-between px-4 py-3 text-left focus:outline-none"
              >
                <span className="text-base sm:text-lg font-medium text-gray-800 dark:text-gray-100">
                  {faq.question}
                </span>
                {isOpen ? (
                  <X className="w-7 h-7 text-red-500 transition-all duration-500 ease-in-out" />
                ) : (
                  <Plus className="w-7 h-7 text-green-500 transition-all duration-500 ease-in-out" />
                )}
              </button>

              <div
                className={`px-4 overflow-hidden transition-all duration-500 ease-in-out ${
                  isOpen ? "max-h-40 py-2" : "max-h-0"
                }`}
              >
                <p className="text-gray-600 dark:text-gray-300 text-sm sm:text-base">
                  {faq.answer}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default FAQs;
