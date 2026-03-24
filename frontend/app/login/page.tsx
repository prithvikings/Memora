"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  SignIn,
  EnvelopeSimple,
  LockKey,
  Eye,
  EyeClosed,
  GoogleLogo,
  Moon,
} from "@phosphor-icons/react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const { user, loading, login } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && user) {
      router.push("/dashboard");
    }
  }, [user, loading, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      await login(email, password);
    } catch (err: any) {
      setError(
        err.response?.data?.message ||
          "Failed to login. Check your credentials.",
      );
    }
  };

  if (loading || user) {
    return <div className="min-h-screen bg-[#fcfcfc]"></div>;
  }

  return (
    <div className="flex flex-col min-h-screen items-center justify-center bg-[#fcfcfc] relative font-jetbrains">
      {/* Theme Toggle Top Right */}
      <button className="absolute top-6 right-6 text-gray-600 hover:text-gray-900 transition-colors">
        <Moon size={20} />
      </button>

      {/* Header / Logo */}
      <h1 className="text-3xl font-semibold text-gray-900 mb-8 tracking-tight">
        Memora
      </h1>

      {/* Main Card */}
      <div className="w-full max-w-[480px] bg-white border border-gray-200 shadow-[0_2px_10px_-3px_rgba(6,81,237,0.05)] p-8 rounded-2xl flex flex-col gap-6">
        {/* Title Section */}
        <div className="flex flex-col gap-1.5">
          <div className="flex gap-2 items-center">
            <SignIn size={20} weight="bold" className="text-gray-700" />
            <h2 className="text-sm font-semibold text-gray-900">Sign in</h2>
          </div>
          <p className="text-xs text-gray-500">
            Enter your email and password to sign in to your account
          </p>
        </div>

        {/* Error Message */}
        {error && (
          <div className="p-3 text-sm text-red-600 bg-red-50 rounded-lg">
            {error}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          {/* Email Input Group */}
          <div className="flex flex-col gap-1.5">
            <label
              htmlFor="email"
              className="text-sm font-medium text-gray-900"
            >
              Email
            </label>
            <div className="relative">
              <EnvelopeSimple
                size={18}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              />
              <input
                id="email"
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-10 pr-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-gray-400 focus:ring-1 focus:ring-gray-400 transition-all placeholder:text-gray-400 placeholder:text-xs"
                required
              />
            </div>
          </div>

          {/* Password Input Group */}
          <div className="flex flex-col gap-1.5">
            <div className="flex justify-between items-center">
              <label
                htmlFor="password"
                className="text-sm font-medium text-gray-900"
              >
                Password
              </label>
              <Link
                href="/forgot-password"
                className="text-xs text-gray-500 hover:text-green-600 transition-colors"
              >
                Forgot password?
              </Link>
            </div>
            <div className="relative">
              <LockKey
                size={18}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              />
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-10 pr-10 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-gray-400 focus:ring-1 focus:ring-gray-400 transition-all placeholder:text-gray-400 placeholder:text-xs"
                required
              />

              {/* UPDATED: Smooth Animation Toggle Button */}
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 w-5 h-5 flex items-center justify-center"
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {/* Open Eye Icon */}
                <Eye
                  size={18}
                  className={`absolute transition-all duration-300 ease-in-out ${
                    showPassword
                      ? "opacity-100 scale-100"
                      : "opacity-0 scale-50 rotate-[-10deg]"
                  }`}
                />
                {/* Closed Eye Icon */}
                <EyeClosed
                  size={18}
                  className={`absolute transition-all duration-300 ease-in-out ${
                    !showPassword
                      ? "opacity-100 scale-100"
                      : "opacity-0 scale-50 rotate-[10deg]"
                  }`}
                />
              </button>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-medium px-4 py-2.5 rounded-lg text-sm transition-colors mt-2 cursor-pointer"
          >
            Sign in
          </button>
        </form>

        {/* Magic Link */}
        <div className="text-center">
          <button
            type="button"
            className="text-xs text-gray-500 hover:text-emerald-600 transition-colors cursor-pointer"
          >
            Use magic link instead
          </button>
        </div>

        {/* Divider */}
        <div className="flex items-center gap-3">
          <div className="h-px bg-gray-200 flex-1"></div>
          <span className="text-[11px] uppercase tracking-wider text-gray-400 font-medium">
            Or continue with
          </span>
          <div className="h-px bg-gray-200 flex-1"></div>
        </div>

        {/* Google OAuth Button */}
        <button
          type="button"
          className="w-full flex items-center justify-center gap-2 border border-gray-200 bg-white hover:bg-gray-50 text-gray-700 font-medium px-4 py-2.5 rounded-lg text-sm transition-colors cursor-pointer"
        >
          <GoogleLogo size={18} weight="bold" />
          Google
        </button>

        {/* Footer Link */}
        <div className="text-center mt-2">
          <p className="text-xs text-gray-500">
            Don't have an account?{" "}
            <Link
              href="/register"
              className="text-emerald-600 font-medium hover:underline cursor-pointer"
            >
              Register
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

// <div className="flex min-h-screen items-center justify-center bg-gray-50">
//   <div className="w-full max-w-md space-y-8 rounded-lg bg-white p-6 shadow-md">
//     <div>
//       <h2 className="text-center text-3xl font-bold tracking-tight text-gray-900">
//         Sign in to Memora
//       </h2>
//     </div>
//     <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
//       {error && (
//         <div className="text-sm text-red-600 bg-red-50 p-3 rounded">
//           {error}
//         </div>
//       )}
//       <div className="space-y-4 rounded-md shadow-sm">
//         <div>
//           <label htmlFor="email-address" className="sr-only">
//             Email address
//           </label>
//           <input
//             id="email-address"
//             name="email"
//             type="email"
//             required
//             className="relative block w-full rounded-md border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6 px-3"
//             placeholder="Email address"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//           />
//         </div>
//         <div>
//           <label htmlFor="password" className="sr-only">
//             Password
//           </label>
//           <input
//             id="password"
//             name="password"
//             type="password"
//             required
//             className="relative block w-full rounded-md border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6 px-3"
//             placeholder="Password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//           />
//         </div>
//       </div>
//       <div>
//         <button
//           type="submit"
//           className="group relative flex w-full justify-center rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
//         >
//           Sign in
//         </button>
//       </div>
//     </form>
//     <div className="text-center text-sm">
//       <Link
//         href="/register"
//         className="font-medium text-blue-600 hover:text-blue-500"
//       >
//         Don't have an account? Register here.
//       </Link>
//     </div>
//   </div>
// </div>
