// import React from "react";
// import {
//   Search,
//   ShoppingCart,
//   Menu,
//   Grid,
//   List,
//   Sun,
//   Moon,
// } from "lucide-react";
// import { HiShoppingBag } from "react-icons/hi";
// import { useAppSelector, useAppDispatch } from "../store";
// import { toggleCart } from "../store/slices/cartSlice";
// import { Link, useLocation } from "react-router-dom";
// import {
//   setViewMode,
//   setSearchQuery,
//   toggleTheme,
// } from "../store/slices/uiSlice";
// import { useForm } from "react-hook-form";

// interface SearchFormData {
//   query: string;
// }

// const Header: React.FC = () => {
//   const dispatch = useAppDispatch();
//   const items = useAppSelector((state) => state.cart.items ?? []);
//   const cartItemCount = items.reduce((sum, item) => sum + item.quantity, 0);
//   const { viewMode, searchQuery, theme } = useAppSelector((state) => state.ui);
//   const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);
//   const location = useLocation();
//   const currentPath = location.pathname;

//   const isSearchablePage =
//     currentPath === "/" ||
//     currentPath.startsWith("/products") ||
//     currentPath.startsWith("/category");

//   const { register, handleSubmit, watch } = useForm<SearchFormData>({
//     defaultValues: { query: searchQuery },
//   });

//   const isListGridPage =
//     currentPath.startsWith("/products") || currentPath.startsWith("/category");

//   const watchedQuery = watch("query");

//   React.useEffect(() => {
//     const timeoutId = setTimeout(() => {
//       dispatch(setSearchQuery(watchedQuery || ""));
//     }, 300);

//     return () => clearTimeout(timeoutId);
//   }, [watchedQuery, dispatch]);

//   const handleCartToggle = () => {
//     dispatch(toggleCart());
//   };

//   const handleViewModeChange = (mode: "grid" | "list") => {
//     dispatch(setViewMode(mode));
//   };

//   const handleThemeToggle = () => {
//     dispatch(toggleTheme());
//   };

//   const onSearch = (data: SearchFormData) => {
//     dispatch(setSearchQuery(data.query));
//   };

//   const navLinks = [
//     { label: "Home", to: "/" },
//     { label: "Products", to: "/category/all" },
//     { label: "About Us", to: "/about" },
//     { label: "Contact", to: "/contact" },
//     { label: "FAQ", to: "/faq" },
//   ];

//   return (
//     <header className="bg-white dark:bg-gray-900 shadow-lg border-b border-gray-200 dark:border-gray-700 sticky top-0 z-50 transition-colors duration-200">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         <div className="flex items-center justify-between h-14 sm:h-16">
//           {/* Logo + Mobile menu */}
//           <div className="flex items-center space-x-4">
//             <Link
//               to="/"
//               className="flex items-center space-x-2 flex-shrink-0 hover:opacity-80 transition-opacity"
//             >
//               <HiShoppingBag className="text-blue-600 w-12 h-12" />
//               <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-blue-600 dark:text-blue-400 transition-all hover:scale-105">
//                 Shopify
//               </h1>
//             </Link>
//             <button
//               onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
//               className="md:hidden p-2 text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
//               aria-label="Toggle mobile menu"
//             >
//               <Menu className="h-5 w-5" />
//             </button>
//           </div>

//           {/* Center navigation */}
//           <nav className="hidden md:flex items-center text-lg space-x-6">
//             {navLinks.map((item) => {
//               const isActive =
//                 item.to === "/"
//                   ? currentPath === "/"
//                   : currentPath.startsWith(item.to);

//               return (
//                 <Link
//                   key={item.to}
//                   to={item.to}
//                   className={`text-xl font-medium transition-colors ${
//                     isActive
//                       ? "text-blue-600 dark:text-blue-400"
//                       : "text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400"
//                   }`}
//                 >
//                   {item.label}
//                 </Link>
//               );
//             })}
//           </nav>

//           {/* Search bar + theme/view/cart */}
//           <div className="flex items-center space-x-2 lg:space-x-4">
//             {isSearchablePage && (
//               <div className="hidden md:block max-w-lg w-full mx-2">
//                 <form onSubmit={handleSubmit(onSearch)} className="relative">
//                   <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                     <Search className="h-5 w-5 text-gray-400 dark:text-gray-500" />
//                   </div>
//                   <input
//                     {...register("query")}
//                     type="text"
//                     placeholder="Search products..."
//                     className="block w-full pl-10 pr-4 py-1.5 sm:py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400"
//                   />
//                 </form>
//               </div>
//             )}

//             <button
//               onClick={handleThemeToggle}
//               className="p-1.5 lg:p-2 text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300 transition-colors border border-gray-300 dark:border-gray-600 rounded-md"
//               aria-label="Toggle theme"
//             >
//               {theme === "light" ? (
//                 <Moon className="h-4 w-4 lg:h-5 lg:w-5" />
//               ) : (
//                 <Sun className="h-4 w-4 lg:h-5 lg:w-5" />
//               )}
//             </button>

//             {isListGridPage && (
//               <>
//                 <button
//                   onClick={() => handleViewModeChange("grid")}
//                   className={`p-1.5 lg:p-2 rounded-md transition-colors ${
//                     viewMode === "grid"
//                       ? "bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400"
//                       : "text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300"
//                   }`}
//                   aria-label="Grid view"
//                 >
//                   <Grid className="h-4 w-4 lg:h-5 lg:w-5" />
//                 </button>
//                 <button
//                   onClick={() => handleViewModeChange("list")}
//                   className={`p-1.5 lg:p-2 rounded-md transition-colors ${
//                     viewMode === "list"
//                       ? "bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400"
//                       : "text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300"
//                   }`}
//                   aria-label="List view"
//                 >
//                   <List className="h-4 w-4 lg:h-5 lg:w-5" />
//                 </button>
//               </>
//             )}

//             <Link
//               to="/orders"
//               className="flex items-center px-1 sm:px-4 lg:px-6 py-1.5 text-xs sm:text-base lg:text-lg font-medium text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors rounded-md min-w-max whitespace-nowrap"
//             >
//               <span className="hidden sm:inline">Returns & Orders</span>
//               <span className="sm:hidden">Orders</span>
//             </Link>

//             <button
//               onClick={handleCartToggle}
//               className="relative p-1.5 lg:p-2 text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300 transition-all duration-300 ease-in-out hover:scale-105 active:scale-95"
//               aria-label="Shopping cart"
//             >
//               <ShoppingCart className="h-5 w-5 lg:h-10 lg:w-10 dark:text-white text-black transition-transform duration-200" />
//               {cartItemCount > 0 && (
//                 <span className="absolute -top-1 -right-1 bg-red-500 dark:bg-red-600 text-white text-xs rounded-full h-4 w-4 lg:h-5 lg:w-5 flex items-center justify-center transition-all duration-300 ease-in-out animate-pulse">
//                   {cartItemCount > 99 ? "99+" : cartItemCount}
//                 </span>
//               )}
//             </button>
//           </div>
//         </div>

//         {/* Mobile menu */}
//         {isMobileMenuOpen && (
//           <div className="md:hidden mt-2 text-lg space-y-2">
//             {navLinks.map((item) => (
//               <Link
//                 key={item.to}
//                 to={item.to}
//                 onClick={() => setIsMobileMenuOpen(false)}
//                 className="block px-4 py-2 text-lg font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded"
//               >
//                 {item.label}
//               </Link>
//             ))}
//           </div>
//         )}
//       </div>
//     </header>
//   );
// };

// export default Header;

import React from "react";
import {
  Search,
  ShoppingCart,
  Menu,
  Grid,
  List,
  Sun,
  Moon,
} from "lucide-react";
import { HiShoppingBag } from "react-icons/hi";
import { useAppSelector, useAppDispatch } from "../store";
import { toggleCart } from "../store/slices/cartSlice";
import { Link, useLocation } from "react-router-dom";
import {
  setViewMode,
  setSearchQuery,
  toggleTheme,
} from "../store/slices/uiSlice";
import { useForm } from "react-hook-form";

interface SearchFormData {
  query: string;
}

const Header: React.FC = () => {
  const dispatch = useAppDispatch();
  const items = useAppSelector((state) => state.cart.items ?? []);
  const cartItemCount = items.reduce((sum, item) => sum + item.quantity, 0);
  const { viewMode, searchQuery, theme } = useAppSelector((state) => state.ui);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);
  const location = useLocation();
  const currentPath = location.pathname;

  const isSearchablePage =
    currentPath === "/" ||
    currentPath.startsWith("/products") ||
    currentPath.startsWith("/category");

  const { register, handleSubmit, watch } = useForm<SearchFormData>({
    defaultValues: { query: searchQuery },
  });

  const isListGridPage =
    currentPath.startsWith("/products") || currentPath.startsWith("/category");

  const watchedQuery = watch("query");

  React.useEffect(() => {
    const timeoutId = setTimeout(() => {
      dispatch(setSearchQuery(watchedQuery || ""));
    }, 300);
    return () => clearTimeout(timeoutId);
  }, [watchedQuery, dispatch]);

  const handleCartToggle = () => {
    dispatch(toggleCart());
  };

  const handleViewModeChange = (mode: "grid" | "list") => {
    dispatch(setViewMode(mode));
  };

  const handleThemeToggle = () => {
    dispatch(toggleTheme());
  };

  const onSearch = (data: SearchFormData) => {
    dispatch(setSearchQuery(data.query));
  };

  const navLinks = [
    { label: "Home", to: "/" },
    { label: "Products", to: "/category/all" },
    { label: "About Us", to: "/about" },
    { label: "Contact", to: "/contact" },
    { label: "FAQ", to: "/faq" },
  ];

  return (
    <header className="bg-white dark:bg-gray-900 shadow-lg border-b border-gray-200 dark:border-gray-700 sticky top-0 z-50 transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14 sm:h-16">
          {/* Logo + Mobile menu */}
          <div className="flex items-center space-x-4">
            <Link
              to="/"
              className="flex items-center space-x-2 flex-shrink-0 hover:opacity-80 transition-opacity"
            >
              <HiShoppingBag className="text-blue-600 w-12 h-12" />
              <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-blue-600 dark:text-blue-400 transition-all hover:scale-105">
                Shopify
              </h1>
            </Link>
            <button
              onClick={() => setIsMobileMenuOpen((open) => !open)}
              className="md:hidden p-2 text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
              aria-label="Toggle mobile menu"
            >
              <Menu className="h-5 w-5" />
            </button>
          </div>

          {/* Center navigation */}
          <nav className="hidden md:flex items-center text-lg space-x-6">
            {navLinks.map((item) => {
              const isActive =
                item.to === "/"
                  ? currentPath === "/"
                  : currentPath.startsWith(item.to);
              return (
                <Link
                  key={item.to}
                  to={item.to}
                  className={`text-xl font-medium transition-colors ${
                    isActive
                      ? "text-blue-600 dark:text-blue-400"
                      : "text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          {/* Search bar + theme/view/cart */}
          <div className="flex items-center space-x-2 lg:space-x-4">
            {isSearchablePage && (
              <div className="hidden md:block max-w-lg w-full mx-2">
                <form onSubmit={handleSubmit(onSearch)} className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Search className="h-5 w-5 text-gray-400 dark:text-gray-500" />
                  </div>
                  <input
                    {...register("query")}
                    type="text"
                    placeholder="Search products..."
                    className="block w-full pl-10 pr-4 py-1.5 sm:py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400"
                  />
                </form>
              </div>
            )}

            <button
              onClick={handleThemeToggle}
              className="p-1.5 lg:p-2 text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300 transition-colors border border-gray-300 dark:border-gray-600 rounded-md"
              aria-label="Toggle theme"
            >
              {theme === "light" ? (
                <Moon className="h-4 w-4 lg:h-5 lg:w-5" />
              ) : (
                <Sun className="h-4 w-4 lg:h-5 lg:w-5" />
              )}
            </button>

            {isListGridPage && (
              <>
                <button
                  onClick={() => handleViewModeChange("grid")}
                  className={`p-1.5 lg:p-2 rounded-md transition-colors ${
                    viewMode === "grid"
                      ? "bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400"
                      : "text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300"
                  }`}
                  aria-label="Grid view"
                >
                  <Grid className="h-4 w-4 lg:h-5 lg:w-5" />
                </button>
                <button
                  onClick={() => handleViewModeChange("list")}
                  className={`p-1.5 lg:p-2 rounded-md transition-colors ${
                    viewMode === "list"
                      ? "bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400"
                      : "text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300"
                  }`}
                  aria-label="List view"
                >
                  <List className="h-4 w-4 lg:h-5 lg:w-5" />
                </button>
              </>
            )}

            <Link
              to="/orders"
              className="flex items-center px-1 sm:px-4 lg:px-6 py-1.5 text-xs sm:text-base lg:text-lg font-medium text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors rounded-md min-w-max whitespace-nowrap"
            >
              <span className="hidden sm:inline">Returns & Orders</span>
              <span className="sm:hidden">Orders</span>
            </Link>

            <button
              onClick={handleCartToggle}
              className="relative p-1.5 lg:p-2 text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300 transition-all duration-300 ease-in-out hover:scale-105 active:scale-95"
              aria-label="Shopping cart"
            >
              <ShoppingCart className="h-5 w-5 lg:h-10 lg:w-10 dark:text-white text-black transition-transform duration-200" />
              {cartItemCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 dark:bg-red-600 text-white text-xs rounded-full h-4 w-4 lg:h-5 lg:w-5 flex items-center justify-center transition-all duration-300 ease-in-out animate-pulse">
                  {cartItemCount > 99 ? "99+" : cartItemCount}
                </span>
              )}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {isMobileMenuOpen && (
          <nav className="md:hidden mt-2 text-lg space-y-2">
            {navLinks.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                onClick={() => setIsMobileMenuOpen(false)}
                className="block px-4 py-2 text-lg font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded"
              >
                {item.label}
              </Link>
            ))}
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;
