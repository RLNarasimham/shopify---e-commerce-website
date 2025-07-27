import React, { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { Eye, EyeOff, Lock, Mail, LogIn } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../services/firebase";

interface LoginForm {
  email: string;
  password: string;
}

const LoginPage: React.FC = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [loginError, setLoginError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginForm>();

  const navigate = useNavigate();

  const onSubmit: SubmitHandler<LoginForm> = async (data) => {
    setLoading(true);
    setLoginError(null);
    try {
      const userCred = await signInWithEmailAndPassword(
        auth,
        data.email,
        data.password
      );
      const token = await userCred.user.getIdToken();
      localStorage.setItem("authToken", token);
      navigate("/");
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Login failed";
      setLoginError(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-tr from-blue-100 via-blue-200 to-blue-300 dark:from-blue-400 dark:via-blue-500 dark:to-blue-600 flex items-center justify-center py-8 px-4">
      <div className="w-full max-w-md rounded-2xl shadow-xl bg-white dark:bg-gray-900 p-8 transition-all">
        {/* Brand */}
        <div className="mb-8 flex flex-col items-center">
          <span className="bg-blue-600 dark:bg-blue-400 text-white dark:text-gray-900 rounded-full h-14 w-14 flex items-center justify-center mb-2 shadow-lg">
            <Lock className="h-7 w-7" />
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 dark:text-white">
            Sign in to Shopify
          </h2>
          <p className="mt-2 text-gray-400 dark:text-gray-400 text-sm">
            Welcome back! Please enter your details below.
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Email address
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="email"
                {...register("email", { required: "Email is required" })}
                className="w-full pl-10 pr-4 py-2 rounded-lg bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                placeholder="you@example.com"
              />
            </div>
            {errors.email && (
              <span className="text-xs text-red-500 mt-1 block">
                {errors.email.message}
              </span>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                {...register("password", { required: "Password is required" })}
                className="w-full pr-10 pl-4 py-2 rounded-lg bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                placeholder="Enter your password"
              />
              <button
                type="button"
                tabIndex={-1}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
                onClick={() => setShowPassword((v) => !v)}
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? (
                  <EyeOff className="h-5 w-5" />
                ) : (
                  <Eye className="h-5 w-5" />
                )}
              </button>
            </div>
            {errors.password && (
              <span className="text-xs text-red-500 mt-1 block">
                {errors.password.message}
              </span>
            )}
          </div>

          {loginError && (
            <p className="text-sm text-red-500 mt-1">{loginError}</p>
          )}

          <div className="flex items-center justify-between">
            <Link
              to="/forgot-password"
              className="text-sm text-blue-600 dark:text-blue-400 hover:underline transition-colors"
            >
              Forgot password?
            </Link>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-2.5 flex justify-center items-center gap-2 rounded-lg bg-blue-600 hover:bg-blue-700 dark:bg-blue-400 dark:hover:bg-blue-500 text-white dark:text-gray-900 font-semibold text-lg shadow-md transition-colors disabled:opacity-50"
          >
            {loading ? (
              "Signing In…"
            ) : (
              <>
                <LogIn className="h-5 w-5" /> Sign In
              </>
            )}
          </button>
        </form>

        {/* Divider */}
        <div className="flex items-center my-6">
          <div className="flex-1 h-px bg-gray-200 dark:bg-gray-800" />
          <span className="px-3 text-sm text-gray-400 dark:text-gray-500">
            OR
          </span>
          <div className="flex-1 h-px bg-gray-200 dark:bg-gray-800" />
        </div>

        {/* Sign up link */}
        <div className="text-center">
          <span className="text-gray-500 dark:text-gray-400 text-sm">
            New to Shopify?
          </span>
          <Link
            to="/signup"
            className="ml-2 text-blue-600 dark:text-blue-400 hover:underline font-semibold"
          >
            Create an account
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
