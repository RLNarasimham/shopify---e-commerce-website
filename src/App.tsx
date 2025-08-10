import React from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Provider } from "react-redux";
import { store } from "./store";
import Header from "./components/Header";
import { themeProvider } from "./context/themeContext";
import ContactUs from "./components/ContactUs";
import { fetchCategories } from "./store/slices/categoriesSlice";
import HomePage from "./components/HomePage";
import ProductList from "./components/ProductList";
import ProductFilter from "./components/ProductFilter";
import Cart from "./components/Cart";
import ProductDetails from "./pages/ProductDetails";
import Footer from "./components/Footer";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useTheme } from "./hooks/useTheme";
import AboutUs from "./components/AboutUs";
import FAQs from "./components/FAQs";
import { fetchProducts } from "./store/slices/productsSlice";
import { useAppDispatch } from "./store";
import Orders from "./components/ReturnsOrders";
import SignUp from "./components/SignUp";
import LoginPage from "./components/LoginPage";
import Checkout from "./pages/Checkout";
import Success from "./pages/Success";
import TopPicksPage from "./pages/TopPicksPage";
import OrderConfirmation from "./pages/OrderConfirmation";

const queryClient = new QueryClient();

function AppContent() {
  useTheme(); // Initialize theme

  const dispatch = useAppDispatch();

  React.useEffect(() => {
    dispatch(fetchProducts());
    dispatch(fetchCategories());
  }, [dispatch]);

  return (
    <div className="flex flex-col justify-between min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-200 xl:w-full w-fit">
      <div className="px-0 sm:px-0 lg:px-0">
        <Header />
        <Cart />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route
            path="/products"
            element={
              <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="flex flex-col lg:flex-row gap-8">
                  <aside className="w-full lg:w-64 flex-shrink-0">
                    <ProductFilter />
                  </aside>
                  <div className="flex-1">
                    <ProductList />
                  </div>
                </div>
              </main>
            }
          />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/confirmation" element={<OrderConfirmation />} />
          <Route
            path="/category/:categoryName"
            element={
              <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="flex flex-col lg:flex-row gap-8">
                  <aside className="w-full lg:w-64 flex-shrink-0">
                    <ProductFilter />
                  </aside>
                  <div className="flex-1">
                    <ProductList />
                  </div>
                </div>
              </main>
            }
          />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/contact" element={<ContactUs />} />
          <Route path="/faq" element={<FAQs />} />
          {/* ✅ Step 2: Add the orders route */}
          <Route
            path="/orders"
            element={
              <div className="flex justify-center">
                <div className="max-w-4xl w-full px-4 sm:px-6 lg:px-8 py-12 text-gray-900 dark:text-gray-100">
                  <main className="max-w-3xl mx-auto py-8 w-full">
                    <Orders />
                  </main>
                </div>
              </div>
            }
          />
          <Route path="/product/:productId" element={<ProductDetails />} />
          <Route path="/login" element={<LoginPage />} />
          <Route
            path="/signup"
            element={
              <main className="w-full">
                <SignUp />
              </main>
            }
          />
          <Route path="/success" element={<Success />} />
          <Route
            path="/top-picks"
            element={
              <main className="flex-1">
                <TopPicksPage />
              </main>
            }
          />
        </Routes>
        <Footer />
      </div>
    </div>
  );
}

function App() {
  return (
    <themeProvider>
      <QueryClientProvider client={queryClient}>
        <Provider store={store}>
          <Router>
            <AppContent />
          </Router>
        </Provider>
      </QueryClientProvider>
    </themeProvider>
  );
}

export default App;
