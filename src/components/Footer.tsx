// import React from "react";
// import {
//   Facebook,
//   Twitter,
//   Instagram,
//   Mail,
//   Phone,
//   MapPin,
// } from "lucide-react";
// import { Link } from "react-router-dom";

// const Footer: React.FC = () => {
//   return (
//     <footer className="bg-gray-900 dark:bg-gray-950 text-white">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
//         <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
//           {/* Company Info */}
//           <div className="space-y-4">
//             <h3 className="text-xl font-bold text-blue-400">Shopify</h3>
//             <p className="text-gray-400 dark:text-gray-500 text-sm">
//               Your trusted online shopping destination for quality products at
//               unbeatable prices.
//             </p>
//             <div className="flex space-x-4">
//               <a
//                 href="https://www.facebook.com/"
//                 target="_blank"
//                 rel="noopener noreferrer"
//               >
//                 <Facebook className="h-5 w-5 text-blue-400 hover:text-blue-600 transition-colors" />
//               </a>
//               <a
//                 href="https://twitter.com/"
//                 target="_blank"
//                 rel="noopener noreferrer"
//               >
//                 <Twitter className="h-5 w-5 text-blue-400 hover:text-blue-600 transition-colors" />
//               </a>
//               <a
//                 href="https://www.instagram.com/"
//                 target="_blank"
//                 rel="noopener noreferrer"
//               >
//                 <Instagram className="h-5 w-5 text-blue-400 hover:text-blue-600 transition-colors" />
//               </a>
//             </div>
//           </div>

//           {/* Quick Links */}
//           <div className="space-y-4">
//             <h4 className="text-lg font-semibold">Quick Links</h4>
//             <ul className="space-y-2 text-sm">
//               <li>
//                 <Link
//                   to="/"
//                   className="text-gray-400 dark:hover:text-white dark:text-gray-500 hover:text-white transition-colors"
//                 >
//                   Home
//                 </Link>
//               </li>
//               <li>
//                 <Link
//                   to="/products"
//                   className="text-gray-400 dark:hover:text-white dark:text-gray-500 hover:text-white transition-colors"
//                 >
//                   All Products
//                 </Link>
//               </li>
//               <li>
//                 <Link
//                   to="/about"
//                   className="text-gray-400 dark:text-gray-500 dark:hover:text-white hover:text-white transition-colors"
//                 >
//                   About Us
//                 </Link>
//               </li>
//               <li>
//                 <Link
//                   to="/contact"
//                   className="text-gray-400 dark:text-gray-500 dark:hover:text-white hover:text-white transition-colors"
//                 >
//                   Contact Us
//                 </Link>
//               </li>
//               <li>
//                 <Link
//                   to="/faq"
//                   className="text-gray-400 dark:text-gray-500 dark:hover:text-white hover:text-white transition-colors"
//                 >
//                   FAQ
//                 </Link>
//               </li>
//             </ul>
//           </div>

//           {/* Categories */}
//           <div className="space-y-4">
//             <h4 className="text-lg font-semibold">Categories</h4>
//             <ul className="space-y-2 text-sm">
//               <li>
//                 <Link
//                   to="/category/electronics"
//                   className="text-gray-400 dark:text-gray-500 dark:hover:text-white hover:text-white transition-colors"
//                 >
//                   Electronics
//                 </Link>
//               </li>
//               <li>
//                 <Link
//                   to="/category/men's-clothing"
//                   className="text-gray-400 dark:text-gray-500 dark:hover:text-white hover:text-white transition-colors"
//                 >
//                   Men's Clothing
//                 </Link>
//               </li>
//               <li>
//                 <Link
//                   to="/category/women's-clothing"
//                   className="text-gray-400 dark:text-gray-500 dark:hover:text-white hover:text-white transition-colors"
//                 >
//                   Women's Clothing
//                 </Link>
//               </li>
//               <li>
//                 <Link
//                   to="/category/jewelery"
//                   className="text-gray-400 dark:text-gray-500 dark:hover:text-white hover:text-white transition-colors"
//                 >
//                   Jewelery
//                 </Link>
//               </li>
//             </ul>
//           </div>

//           {/* Contact Info */}
//           <div className="space-y-4">
//             <h4 className="text-lg font-semibold">Contact Us</h4>
//             <div className="space-y-3 text-sm">
//               <div className="flex items-center space-x-3">
//                 <Mail className="h-4 w-4 text-gray-400 dark:text-gray-500" />
//                 <span className="text-gray-400 dark:text-gray-500">
//                   support@shopify.com
//                 </span>
//               </div>
//               <div className="flex items-center space-x-3">
//                 <Phone className="h-4 w-4 text-gray-400 dark:text-gray-500" />
//                 <span className="text-gray-400 dark:text-gray-500">
//                   +1 (555) 123-4567
//                 </span>
//               </div>
//               <div className="flex items-center space-x-3">
//                 <MapPin className="h-4 w-4 text-gray-400 dark:text-gray-500" />
//                 <span className="text-gray-400 dark:text-gray-500">
//                   123 Shopping St, City, State 12345
//                 </span>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </footer>
//   );
// };

// export default Footer;

import React from "react";
import {
  Facebook,
  Twitter,
  Instagram,
  Mail,
  Phone,
  MapPin,
} from "lucide-react";
import { Link } from "react-router-dom";

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 dark:bg-gray-950 text-white">
      <div className="w-full mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-blue-400">Shopify</h3>
            <p className="text-gray-400 dark:text-gray-500 text-sm">
              Your trusted online shopping destination for quality products at
              unbeatable prices.
            </p>
            <div className="flex space-x-4">
              <a
                href="https://www.facebook.com/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Facebook className="h-5 w-5 text-blue-400 hover:text-blue-600 transition-colors" />
              </a>
              <a
                href="https://twitter.com/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Twitter className="h-5 w-5 text-blue-400 hover:text-blue-600 transition-colors" />
              </a>
              <a
                href="https://www.instagram.com/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Instagram className="h-5 w-5 text-blue-400 hover:text-blue-600 transition-colors" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  to="/"
                  className="text-gray-400 dark:hover:text-white dark:text-gray-500 hover:text-white transition-colors"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/products"
                  className="text-gray-400 dark:hover:text-white dark:text-gray-500 hover:text-white transition-colors"
                >
                  All Products
                </Link>
              </li>
              <li>
                <Link
                  to="/about"
                  className="text-gray-400 dark:text-gray-500 dark:hover:text-white hover:text-white transition-colors"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  to="/contact"
                  className="text-gray-400 dark:text-gray-500 dark:hover:text-white hover:text-white transition-colors"
                >
                  Contact
                </Link>
              </li>
              <li>
                <Link
                  to="/faq"
                  className="text-gray-400 dark:text-gray-500 dark:hover:text-white hover:text-white transition-colors"
                >
                  FAQ
                </Link>
              </li>
            </ul>
          </div>

          {/* Categories */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold">Categories</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  to="/category/electronics"
                  className="text-gray-400 dark:text-gray-500 dark:hover:text-white hover:text-white transition-colors"
                >
                  Electronics
                </Link>
              </li>
              <li>
                <Link
                  to="/category/men's-clothing"
                  className="text-gray-400 dark:text-gray-500 dark:hover:text-white hover:text-white transition-colors"
                >
                  Men's Clothing
                </Link>
              </li>
              <li>
                <Link
                  to="/category/women's-clothing"
                  className="text-gray-400 dark:text-gray-500 dark:hover:text-white hover:text-white transition-colors"
                >
                  Women's Clothing
                </Link>
              </li>
              <li>
                <Link
                  to="/category/jewelery"
                  className="text-gray-400 dark:text-gray-500 dark:hover:text-white hover:text-white transition-colors"
                >
                  Jewelery
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold">
              Get in touch with us <span className="text-blue-400">@</span>
            </h4>
            <div className="space-y-3 text-sm">
              <div className="flex items-center space-x-3">
                <Mail className="h-4 w-4 text-gray-400 dark:text-gray-500" />
                <span className="text-gray-400 dark:text-gray-500">
                  support@shopify.com
                </span>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="h-4 w-4 text-gray-400 dark:text-gray-500" />
                <span className="text-gray-400 dark:text-gray-500">
                  +1 (555) 123-4567
                </span>
              </div>
              <div className="flex items-center space-x-3">
                <MapPin className="h-4 w-4 text-gray-400 dark:text-gray-500" />
                <span className="text-gray-400 dark:text-gray-500">
                  123 Shopping St, City, State 12345
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
