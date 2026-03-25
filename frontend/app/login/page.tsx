"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { GoogleLogin } from "@react-oauth/google";
import {
  SignIn,
  EnvelopeSimple,
  LockKey,
  Eye,
  EyeClosed,
  Moon,
} from "@phosphor-icons/react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const { user, loading, login, googleLogin } = useAuth();
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

  const handleGoogleSuccess = async (credentialResponse: any) => {
    try {
      if (credentialResponse.credential) {
        await googleLogin(credentialResponse.credential);
      }
    } catch (err: any) {
      setError(err.response?.data?.message || "Google login failed.");
    }
  };

  if (loading || user) {
    return <div className="min-h-screen bg-[#fcfcfc]"></div>;
  }

  return (
    <div className="flex flex-col min-h-screen items-center justify-center bg-[#fcfcfc] relative font-jetbrains">
      <button className="absolute top-6 right-6 text-gray-600 hover:text-gray-900 transition-colors">
        <Moon size={20} />
      </button>

      <h1 className="text-3xl font-semibold text-gray-900 mb-8 tracking-tight">
        Memora
      </h1>

      <div className="w-full max-w-[480px] bg-white border border-gray-200 shadow-[0_2px_10px_-3px_rgba(6,81,237,0.05)] p-8 rounded-2xl flex flex-col gap-6">
        <div className="flex flex-col gap-1.5">
          <div className="flex gap-2 items-center">
            <SignIn size={20} weight="bold" className="text-gray-700" />
            <h2 className="text-sm font-semibold text-gray-900">Sign in</h2>
          </div>
          <p className="text-xs text-gray-500">
            Enter your email and password to sign in to your account
          </p>
        </div>

        {error && (
          <div className="p-3 text-sm text-red-600 bg-red-50 rounded-lg">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
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
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 w-5 h-5 flex items-center justify-center"
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
          </div>

          <button
            type="submit"
            className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-medium px-4 py-2.5 rounded-lg text-sm transition-colors mt-2 cursor-pointer"
          >
            Sign in
          </button>
        </form>

        <div className="text-center">
          <button
            type="button"
            className="text-xs text-gray-500 hover:text-emerald-600 transition-colors cursor-pointer"
          >
            Use magic link instead
          </button>
        </div>

        <div className="flex items-center gap-3">
          <div className="h-px bg-gray-200 flex-1"></div>
          <span className="text-[11px] uppercase tracking-wider text-gray-400 font-medium">
            Or continue with
          </span>
          <div className="h-px bg-gray-200 flex-1"></div>
        </div>

        <div className="flex justify-center w-full">
          <GoogleLogin
            onSuccess={handleGoogleSuccess}
            onError={() => setError("Google authentication failed")}
            width="100%"
          />
        </div>

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
