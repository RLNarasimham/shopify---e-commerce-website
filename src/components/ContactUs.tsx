// import React from "react";

// const ContactUs: React.FC = () => {
//   return (
//     <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
//       <div className="max-w-3xl mx-auto bg-white dark:bg-gray-800 shadow-md rounded-lg p-8">
//         <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
//           Contact Us
//         </h2>

//         <p className="text-gray-600 dark:text-gray-300 mb-6">
//           Have a question or need help with your order? Send us a message and
//           we'll get back to you as soon as possible.
//         </p>

//         <form className="space-y-6">
//           <div>
//             <label
//               htmlFor="name"
//               className="block text-sm font-medium text-gray-700 dark:text-gray-200"
//             >
//               Name
//             </label>
//             <input
//               type="text"
//               id="name"
//               name="name"
//               required
//               className="mt-1 block w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-blue-500 focus:border-blue-500"
//               placeholder="Your full name"
//             />
//           </div>

//           <div>
//             <label
//               htmlFor="email"
//               className="block text-sm font-medium text-gray-700 dark:text-gray-200"
//             >
//               Email
//             </label>
//             <input
//               type="email"
//               id="email"
//               name="email"
//               required
//               className="mt-1 block w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-blue-500 focus:border-blue-500"
//               placeholder="you@example.com"
//             />
//           </div>

//           <div>
//             <label
//               htmlFor="message"
//               className="block text-sm font-medium text-gray-700 dark:text-gray-200"
//             >
//               Message
//             </label>
//             <textarea
//               id="message"
//               name="message"
//               rows={5}
//               required
//               className="mt-1 block w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-blue-500 focus:border-blue-500"
//               placeholder="Enter your message here"
//             ></textarea>
//           </div>

//           <button
//             type="submit"
//             className="w-full inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
//           >
//             Send Message
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default ContactUs;

import React, { useState } from "react";

const ContactUs: React.FC = () => {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you can add actual API/EmailJS/Formspree integration.
    setSubmitted(true);
    // Optionally reset form
    setForm({ name: "", email: "", message: "" });
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto bg-white dark:bg-gray-800 shadow-md rounded-lg p-8">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
          Contact Us
        </h2>

        <p className="text-gray-600 dark:text-gray-300 mb-6">
          Have a question or need help with your order? Send us a message and
          we'll get back to you as soon as possible.
        </p>

        {submitted ? (
          <div className="bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-100 p-4 rounded mb-6 text-center">
            Thank you for contacting us! We have received your message.
          </div>
        ) : (
          <form
            className="space-y-6"
            onSubmit={handleSubmit}
            autoComplete="off"
          >
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700 dark:text-gray-200"
              >
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                required
                className="mt-1 block w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-blue-500 focus:border-blue-500"
                placeholder="Your full name"
                value={form.name}
                onChange={handleChange}
              />
            </div>

            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 dark:text-gray-200"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                required
                className="mt-1 block w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-blue-500 focus:border-blue-500"
                placeholder="you@example.com"
                value={form.email}
                onChange={handleChange}
              />
            </div>

            <div>
              <label
                htmlFor="message"
                className="block text-sm font-medium text-gray-700 dark:text-gray-200"
              >
                Message
              </label>
              <textarea
                id="message"
                name="message"
                rows={5}
                required
                className="mt-1 block w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter your message here"
                value={form.message}
                onChange={handleChange}
              ></textarea>
            </div>

            <button
              type="submit"
              className="w-full inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Send Message
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default ContactUs;
