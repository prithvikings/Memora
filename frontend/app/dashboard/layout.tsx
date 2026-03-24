// src/app/dashboard/layout.tsx
"use client";

import { useAuth } from "@/context/AuthContext";
import { useRouter, usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { api } from "@/lib/api";
import Link from "next/link";
import {
  MagnifyingGlass,
  SignOut,
  House,
  Plus,
  CircleNotch,
  Bell,
  Gear,
  ClockCounterClockwise,
  Star,
  Trash,
  Question,
  Sparkle,
} from "@phosphor-icons/react";

interface Collection {
  _id: string;
  name: string;
}

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, loading, logout } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  const [collections, setCollections] = useState<Collection[]>([]);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);

  // Define Topbar Navigation Links
  const topNavLinks = [
    { name: "Library", path: "/dashboard" },
    { name: "Collections", path: "/dashboard/collections" },
    { name: "Archive", path: "/dashboard/archive" },
  ];

  // Define Sidebar Navigation Links
  const sidebarLinks = [
    { name: "Home", path: "/dashboard", icon: House },
    { name: "Recent", path: "/dashboard/recent", icon: ClockCounterClockwise },
    { name: "Starred", path: "/dashboard/starred", icon: Star },
    { name: "AI Summaries", path: "/dashboard/ai-summaries", icon: Sparkle },
    { name: "Trash", path: "/dashboard/trash", icon: Trash },
  ];

  // Close profile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as Element;
      if (target && !document.contains(target)) return;
      if (!target.closest(".profile-menu-container")) {
        setIsProfileMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    if (!loading && !user) {
      router.push("/login");
    }
  }, [user, loading, router]);

  useEffect(() => {
    if (user) {
      api
        .get("/collections")
        .then((res) => setCollections(res.data.data))
        .catch(console.error);
    }
  }, [user]);

  if (loading || !user)
    return (
      <div className="flex h-screen items-center justify-center bg-[#fafafa]">
        <div className="flex flex-col items-center gap-3">
          <CircleNotch size={32} className="animate-spin text-emerald-600" />
          <span className="text-sm font-medium text-gray-500 animate-pulse">
            Loading workspace...
          </span>
        </div>
      </div>
    );

  return (
    <div className="flex h-screen bg-[#fafafa] text-gray-900 selection:bg-emerald-100 selection:text-emerald-900 font-poppins">
      {/* --- LEFT SIDEBAR --- */}
      <div className="w-[260px] bg-[#fdfdfd] border-r border-gray-200/60 flex flex-col z-10 shrink-0">
        <div className="h-20 flex items-center gap-2.5 px-6 font-semibold text-2xl tracking-tight text-gray-700">
          Memora AI
        </div>

        <div className="px-6 mb-2">
          <span className="text-[11px] font-semibold text-gray-400 uppercase tracking-wide">
            Workspace
          </span>
        </div>

        <nav className="flex-1 overflow-y-auto py-2 px-3 space-y-1 custom-scrollbar">
          {/* Dynamic Main Sidebar Links */}
          {sidebarLinks.map((link) => {
            const Icon = link.icon;
            // Exact match for Home, partial match for others (so sub-pages keep the highlight)
            const isActive =
              link.path === "/dashboard"
                ? pathname === "/dashboard"
                : pathname.startsWith(link.path);

            return (
              <Link
                key={link.name}
                href={link.path}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl font-medium text-sm transition-all ${
                  isActive
                    ? "bg-emerald-50/50 text-emerald-700 font-semibold"
                    : "text-gray-600 hover:bg-gray-100/50"
                }`}
              >
                <Icon
                  size={20}
                  weight={isActive ? "fill" : "regular"}
                  className={isActive ? "text-emerald-600" : "text-gray-400"}
                />
                {link.name}
              </Link>
            );
          })}

          {/* Pro Plan CTA */}
          <div className="mt-8 mb-4 bg-emerald-50 border border-emerald-200 flex flex-col gap-2 px-4 py-4 rounded-xl">
            <h3 className="text-sm font-semibold text-emerald-900">Pro Plan</h3>
            <p className="text-xs text-gray-600">
              Unlock unlimited AI insights and deeper curation.
            </p>
            <button
              onClick={() => router.push("/dashboard/pro")}
              className="text-xs mt-2 px-3 py-2 rounded-xl bg-emerald-100 text-emerald-600 hover:bg-emerald-200 hover:text-emerald-700 transition-all active:scale-[0.98] font-semibold"
            >
              Upgrade to Pro Plan
            </button>
          </div>

          {/* Help Link */}
          <Link
            href="/dashboard/help"
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl font-medium text-sm transition-all ${
              pathname.startsWith("/dashboard/help")
                ? "bg-sky-50 text-sky-700 font-semibold"
                : "text-gray-600 hover:bg-sky-50/50 hover:text-sky-600"
            }`}
          >
            <Question
              size={20}
              weight={
                pathname.startsWith("/dashboard/help") ? "fill" : "regular"
              }
              className={
                pathname.startsWith("/dashboard/help")
                  ? "text-sky-600"
                  : "text-gray-400"
              }
            />
            Help
          </Link>

          {/* Logout Button */}
          <button
            onClick={logout}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-orange-50/50 font-medium text-sm text-gray-600 hover:text-orange-700 transition-all text-left group"
          >
            <SignOut
              size={20}
              className="text-gray-400 group-hover:text-orange-700 transition-colors"
            />
            Logout
          </button>
        </nav>
      </div>

      {/* --- MAIN CONTENT AREA --- */}
      <div className="flex-1 flex flex-col overflow-hidden relative">
        {/* DYNAMIC TOPBAR */}
        <header className="h-20 bg-[#fafafa] flex items-center px-10 justify-between sticky top-0 z-20 border-b border-gray-200/60 shrink-0">
          {/* Topbar Links */}
          <div className="flex items-center gap-8 text-sm font-medium">
            {topNavLinks.map((link) => {
              const isActive = pathname === link.path;
              return (
                <Link
                  key={link.name}
                  href={link.path}
                  className={`pb-1 -mb-1 transition-all duration-200 border-b-2 ${
                    isActive
                      ? "text-gray-900 border-emerald-500 font-semibold"
                      : "text-gray-500 border-transparent hover:text-gray-900 hover:border-gray-300"
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
          </div>

          {/* Search Bar */}
          <div className="relative w-full max-w-md group mx-8">
            <MagnifyingGlass
              size={18}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-emerald-600 transition-colors"
            />
            <input
              type="text"
              placeholder="Search your archive..."
              className="w-full pl-11 pr-4 py-2.5 border-none rounded-full bg-gray-100/80 hover:bg-gray-200/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500/20 shadow-inner transition-all text-sm placeholder:text-gray-400"
              onKeyDown={(e) => {
                const target = e.target as HTMLInputElement;
                if (e.key === "Enter" && target.value.trim() !== "") {
                  router.push(
                    `/dashboard/search?q=${encodeURIComponent(target.value)}`,
                  );
                }
              }}
            />
          </div>

          {/* Add Bookmark Action */}
          <button className="bg-emerald-500 text-white px-4 py-2.5 rounded-full hover:bg-emerald-600 transition-all active:scale-95 font-poppins font-semibold flex items-center gap-2 shadow-[0_4px_14px_0_rgba(16,185,129,0.39)] text-xs tracking-tight cursor-pointer">
            <Plus size={14} weight="bold" />
            ADD BOOKMARK
          </button>

          {/* Right Action Icons & Profile Menu */}
          <div className="flex items-center gap-4 ml-4">
            <button className="text-gray-400 hover:text-gray-600 transition-colors relative">
              <Bell size={22} weight="fill" />
              {/* Notification dot */}
              <span className="absolute top-0 right-0 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-[#fafafa]"></span>
            </button>

            {/* Interactive Profile Dropdown */}
            <div className="relative profile-menu-container">
              <button
                onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
                className={`h-9 w-9 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center font-bold text-sm shadow-sm cursor-pointer ml-2 transition-all focus:outline-none focus:ring-4 focus:ring-emerald-500/20 ${
                  isProfileMenuOpen ? "ring-4 ring-emerald-500/20" : ""
                }`}
              >
                {user.email[0].toUpperCase()}
              </button>

              {/* Profile Dropdown Menu */}
              {isProfileMenuOpen && (
                <div className="absolute right-0 top-full mt-2 w-56 bg-white border border-gray-100 rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.12)] py-1.5 z-50 overflow-hidden font-poppins animate-in fade-in slide-in-from-top-2 duration-200">
                  <div className="px-4 py-3 border-b border-gray-50 mb-1">
                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-0.5">
                      Account
                    </p>
                    <p
                      className="text-[13px] font-medium text-gray-900 truncate"
                      title={user.email}
                    >
                      {user.email}
                    </p>
                  </div>

                  <button
                    onClick={() => {
                      setIsProfileMenuOpen(false);
                      router.push("/dashboard/settings");
                    }}
                    className="w-full text-left px-4 py-2.5 text-[13px] font-medium text-gray-600 hover:bg-gray-50 hover:text-gray-900 transition-colors flex items-center gap-2.5"
                  >
                    <Gear size={16} weight="bold" />
                    Settings
                  </button>

                  <button
                    onClick={() => {
                      setIsProfileMenuOpen(false);
                      logout();
                    }}
                    className="w-full text-left px-4 py-2.5 text-[13px] font-medium text-red-600 hover:bg-red-50 transition-colors flex items-center gap-2.5"
                  >
                    <SignOut size={16} weight="bold" />
                    Logout
                  </button>
                </div>
              )}
            </div>
          </div>
        </header>

        {/* Dynamic Page Content */}
        <main className="flex-1 overflow-y-auto px-10 py-6 custom-scrollbar">
          {children}
        </main>
      </div>
    </div>
  );
}
