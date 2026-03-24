"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  UserPlus,
  User,
  EnvelopeSimple,
  LockKey,
  Eye,
  EyeClosed,
  GoogleLogo,
  Moon,
} from "@phosphor-icons/react";

export default function RegisterPage() {
  const [name, setName] = useState(""); // Added name state for the new field
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const { user, loading, register } = useAuth();
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
      // Note: You might need to pass `name` here if your backend requires it
      await register(email, password);
    } catch (err: any) {
      setError(
        err.response?.data?.message || "Failed to register. Please try again.",
      );
    }
  };

  if (loading || user) {
    return <div className="min-h-screen bg-[#fcfcfc]"></div>;
  }

  return (
    <div className="flex flex-col min-h-screen items-center justify-center bg-[#fcfcfc] relative font-jetbrains pt-4">
      {/* Theme Toggle Top Right */}
      <button className="absolute top-6 right-6 text-gray-600 hover:text-gray-900 transition-colors">
        <Moon size={20} />
      </button>

      {/* Header / Logo */}
      <h1 className="text-3xl font-semibold text-gray-900 mb-8 tracking-tight">
        Memora
      </h1>

      {/* Main Card */}
      <div className="w-full max-w-[440px] bg-[#fcfcfc] border border-gray-200 shadow-sm p-8 py-6  rounded-2xl flex flex-col gap-4">
        {/* Title Section */}
        <div className="flex flex-col gap-1.5">
          <div className="flex gap-2 items-center">
            <UserPlus size={20} weight="bold" className="text-gray-700" />
            <h2 className="text-sm font-semibold text-gray-900">
              Create an account
            </h2>
          </div>
          <p className="text-xs text-gray-500">
            Enter your details below to create your account
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
          {/* Name Input Group */}
          <div className="flex flex-col gap-1.5">
            <label htmlFor="name" className="text-sm font-medium text-gray-900">
              Name
            </label>
            <div className="relative">
              <User
                size={18}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              />
              <input
                id="name"
                type="text"
                placeholder="John Doe"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full pl-10 pr-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-gray-400 focus:ring-1 focus:ring-gray-400 transition-all placeholder:text-gray-400 placeholder:text-xs"
                required
              />
            </div>
          </div>

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
          <div className="flex flex-col gap-1">
            <label
              htmlFor="password"
              className="text-sm font-medium text-gray-900 mb-0.5"
            >
              Password
            </label>
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
                minLength={8}
              />

              {/* Smooth Animation Toggle Button */}
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 w-5 h-5 flex items-center justify-center"
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                <Eye
                  size={18}
                  className={`absolute transition-all duration-300 ease-in-out ${
                    showPassword
                      ? "opacity-100 scale-100"
                      : "opacity-0 scale-50 rotate-[-10deg]"
                  }`}
                />
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
            {/* Password Requirement Text */}
            <p className="text-[11px] text-gray-500 mt-1">
              Password must be at least 8 characters
            </p>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-medium px-4 py-2.5 rounded-lg text-sm transition-colors mt-2 cursor-pointer"
          >
            Create account
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
            Already have an account?{" "}
            <Link
              href="/login"
              className="text-emerald-600 font-medium hover:underline cursor-pointer"
            >
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
