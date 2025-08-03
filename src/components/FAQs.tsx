// import React, { useState } from "react";
// import { Plus, X } from "lucide-react";

// const FAQs: React.FC = () => {
//   const [openIndex, setOpenIndex] = useState<number | null>(null);

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

//   const toggleFAQ = (index: number) => {
//     setOpenIndex((prev) => (prev === index ? null : index));
//   };

//   return (
//     <div className="flex flex-col min-h-[60vh] max-w-screen-xl md:my-10 mx-auto bg-gray-50 justify-center items-center dark:bg-gray-900 transition-colors duration-200">
//       <h2 className="text-2xl sm:text-3xl font-bold text-center text-gray-900 dark:text-gray-100 mb-6">
//         Frequently Asked Questions
//       </h2>

//       <div className="space-y-4">
//         {faqList.map((faq, idx) => {
//           const isOpen = openIndex === idx;
//           return (
//             <div
//               key={idx}
//               className="border border-gray-300 dark:border-gray-600 rounded-lg"
//             >
//               <button
//                 onClick={() => toggleFAQ(idx)}
//                 className="w-full flex items-center justify-between px-4 py-3 text-left focus:outline-none"
//               >
//                 <span className="text-base sm:text-lg font-medium text-gray-800 dark:text-gray-100">
//                   {faq.question}
//                 </span>
//                 {isOpen ? (
//                   <X className="w-7 h-7 text-red-500 transition-all duration-500 ease-in-out" />
//                 ) : (
//                   <Plus className="w-7 h-7 text-green-500 transition-all duration-500 ease-in-out" />
//                 )}
//               </button>

//               <div
//                 className={`px-4 overflow-hidden transition-all duration-500 ease-in-out ${
//                   isOpen ? "max-h-40 py-2" : "max-h-0"
//                 }`}
//               >
//                 <p className="text-gray-600 dark:text-gray-300 text-sm sm:text-base">
//                   {faq.answer}
//                 </p>
//               </div>
//             </div>
//           );
//         })}
//       </div>
//     </div>
//   );
// };

// export default FAQs;

import React, { useState } from "react";
import { Plus, X } from "lucide-react";

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

const FAQs: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex((prev) => (prev === index ? null : index));
  };

  return (
    <section
      className="flex flex-col min-h-[60vh] max-w-screen-xl md:my-10 mx-auto bg-gray-50 justify-center items-center dark:bg-gray-900 transition-colors duration-200"
      aria-label="Frequently Asked Questions"
    >
      <h2 className="text-2xl sm:text-3xl font-bold text-center text-gray-900 dark:text-gray-100 mb-6">
        Frequently Asked Questions
      </h2>

      <div className="space-y-4 w-full max-w-2xl">
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
                aria-expanded={isOpen}
                aria-controls={`faq-panel-${idx}`}
                id={`faq-header-${idx}`}
              >
                <span className="text-base sm:text-lg font-medium text-gray-800 dark:text-gray-100">
                  {faq.question}
                </span>
                {isOpen ? (
                  <X className="w-7 h-7 text-red-500 transition-all duration-300 ease-in-out" />
                ) : (
                  <Plus className="w-7 h-7 text-green-500 transition-all duration-300 ease-in-out" />
                )}
              </button>

              <div
                id={`faq-panel-${idx}`}
                role="region"
                aria-labelledby={`faq-header-${idx}`}
                className={`px-4 overflow-hidden transition-all duration-500 ease-in-out ${
                  isOpen ? "max-h-40 py-2" : "max-h-0"
                }`}
                style={{ pointerEvents: isOpen ? "auto" : "none" }}
              >
                <p className="text-gray-600 dark:text-gray-300 text-sm sm:text-base">
                  {faq.answer}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default FAQs;
