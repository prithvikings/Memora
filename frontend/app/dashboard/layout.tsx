"use client";

import { useAuth } from "@/context/AuthContext";
import { useRouter, usePathname } from "next/navigation";
import { useEffect, useState, useRef } from "react";
import { api } from "@/lib/api";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  MagnifyingGlass,
  SignOut,
  Plus,
  CircleNotch,
  Bell,
  Gear,
  ClockCounterClockwise,
  Star,
  Trash,
  Question,
  Sparkle,
  Books,
  FolderOpen,
  Archive,
  ArrowLeft,
  ArrowRight,
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
  const dropdownRef = useRef<HTMLDivElement>(null);

  const [collections, setCollections] = useState<Collection[]>([]);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);

  // Sidebar states
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [hoveredPath, setHoveredPath] = useState<string | null>(null);

  const primaryLinks = [
    { name: "Library", path: "/dashboard", icon: Books },
    { name: "Collections", path: "/dashboard/collections", icon: FolderOpen },
    { name: "Archive", path: "/dashboard/archive", icon: Archive },
  ];

  const secondaryLinks = [
    { name: "Recent", path: "/dashboard/recent", icon: ClockCounterClockwise },
    { name: "Starred", path: "/dashboard/starred", icon: Star },
    { name: "AI Summaries", path: "/dashboard/ai-summaries", icon: Sparkle },
    { name: "Trash", path: "/dashboard/trash", icon: Trash },
  ];

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsProfileMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
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

  if (loading || !user) {
    return (
      <div className="flex h-screen w-full items-center justify-center bg-gray-50">
        <div className="flex flex-col items-center gap-3">
          <CircleNotch size={32} className="animate-spin text-emerald-600" />
          <span className="text-sm font-medium text-gray-500 animate-pulse">
            Loading workspace...
          </span>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-screen w-full bg-gray-50 text-gray-900 font-sans selection:bg-emerald-100 selection:text-emerald-900 overflow-hidden">
      {/* --- COLLAPSIBLE LEFT SIDEBAR --- */}
      <motion.aside
        initial={false}
        animate={{ width: isSidebarOpen ? 256 : 80 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className="relative bg-white border-r border-gray-200 flex flex-col shrink-0 z-20 h-full"
      >
        <button
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="absolute -right-3.5 top-7 flex h-7 w-7 items-center justify-center rounded-md border border-gray-200 bg-white shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-emerald-500 text-gray-500 z-50 transition-colors"
        >
          {isSidebarOpen ? (
            <ArrowLeft size={14} weight="bold" />
          ) : (
            <ArrowRight size={14} weight="bold" />
          )}
        </button>

        <div className="flex-1 flex flex-col overflow-x-hidden overflow-y-auto scrollbar-hide">
          {/* Brand Header */}
          <div
            className={`h-16 flex items-center border-b border-gray-100 shrink-0 transition-all duration-300 ${isSidebarOpen ? "px-6" : "px-0 justify-center"}`}
          >
            <div className="w-6 h-6 bg-black rounded-md shrink-0 flex items-center justify-center" />
            <AnimatePresence mode="wait">
              {isSidebarOpen && (
                <motion.span
                  initial={{ opacity: 0, width: 0 }}
                  animate={{ opacity: 1, width: "auto" }}
                  exit={{ opacity: 0, width: 0 }}
                  transition={{ duration: 0.2 }}
                  className="font-semibold text-lg tracking-tight text-gray-900 font-poppins ml-3 whitespace-nowrap"
                >
                  Memora AI
                </motion.span>
              )}
            </AnimatePresence>
          </div>

          {/* Navigation Wrapper */}
          <div
            className="flex-1 py-6 px-4 flex flex-col gap-8"
            onMouseLeave={() => setHoveredPath(null)} // Reset hover when leaving nav area
          >
            {/* Primary Nav */}
            <nav className="flex flex-col gap-1">
              <AnimatePresence>
                {isSidebarOpen && (
                  <motion.h4
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="text-xs font-semibold text-gray-400 uppercase tracking-wider px-2 mb-2 whitespace-nowrap"
                  >
                    Workspace
                  </motion.h4>
                )}
              </AnimatePresence>

              {primaryLinks.map((link) => {
                const Icon = link.icon;
                const isActive = pathname === link.path;

                return (
                  <Link
                    key={link.name}
                    href={link.path}
                    onMouseEnter={() => setHoveredPath(link.path)}
                    className={`relative group flex items-center rounded-lg text-sm font-medium transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-600 ${
                      isSidebarOpen
                        ? "px-3 py-2"
                        : "justify-center px-0 py-2.5 w-11 mx-auto"
                    } ${
                      isActive
                        ? "text-emerald-700"
                        : "text-gray-600 hover:text-gray-900"
                    }`}
                  >
                    {/* Active Static Background */}
                    {isActive && (
                      <div className="absolute inset-0 bg-emerald-50 rounded-lg" />
                    )}

                    {/* Magic Hover Background */}
                    {hoveredPath === link.path && !isActive && (
                      <motion.div
                        layoutId="sidebar-nav-hover"
                        className="absolute inset-0 bg-gray-100 shadow-sm rounded-lg"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{
                          type: "spring",
                          stiffness: 350,
                          damping: 30,
                        }}
                      />
                    )}

                    {/* Content (Z-10 to sit above absolute backgrounds) */}
                    <div className="relative z-10 flex items-center gap-3 w-full">
                      <Icon
                        size={20}
                        weight={isActive ? "fill" : "regular"}
                        className={`shrink-0 transition-colors ${
                          isActive
                            ? "text-emerald-600"
                            : "text-gray-400 group-hover:text-gray-600"
                        }`}
                      />
                      <AnimatePresence mode="wait">
                        {isSidebarOpen && (
                          <motion.span
                            initial={{ opacity: 0, width: 0 }}
                            animate={{ opacity: 1, width: "auto" }}
                            exit={{ opacity: 0, width: 0 }}
                            transition={{ duration: 0.2 }}
                            className="whitespace-nowrap"
                          >
                            {link.name}
                          </motion.span>
                        )}
                      </AnimatePresence>
                    </div>
                  </Link>
                );
              })}
            </nav>

            {/* Secondary Nav */}
            <nav className="flex flex-col gap-1">
              <AnimatePresence>
                {isSidebarOpen && (
                  <motion.h4
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="text-xs font-semibold text-gray-400 uppercase tracking-wider px-2 mb-2 whitespace-nowrap"
                  >
                    Views
                  </motion.h4>
                )}
              </AnimatePresence>

              {secondaryLinks.map((link) => {
                const Icon = link.icon;
                const isActive = pathname.startsWith(link.path);

                return (
                  <Link
                    key={link.name}
                    href={link.path}
                    onMouseEnter={() => setHoveredPath(link.path)}
                    className={`relative group flex items-center rounded-lg text-sm font-medium transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-600 ${
                      isSidebarOpen
                        ? "px-3 py-2"
                        : "justify-center px-0 py-2.5 w-11 mx-auto"
                    } ${
                      isActive
                        ? "text-emerald-700"
                        : "text-gray-600 hover:text-gray-900"
                    }`}
                  >
                    {/* Active Static Background */}
                    {isActive && (
                      <div className="absolute inset-0 bg-emerald-50 rounded-lg" />
                    )}

                    {/* Magic Hover Background */}
                    {hoveredPath === link.path && !isActive && (
                      <motion.div
                        layoutId="sidebar-nav-hover"
                        className="absolute inset-0 bg-gray-100 shadow-sm rounded-lg"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{
                          type: "spring",
                          stiffness: 350,
                          damping: 30,
                        }}
                      />
                    )}

                    {/* Content (Z-10 to sit above absolute backgrounds) */}
                    <div className="relative z-10 flex items-center gap-3 w-full">
                      <Icon
                        size={20}
                        weight={isActive ? "fill" : "regular"}
                        className={`shrink-0 transition-colors ${
                          isActive
                            ? "text-emerald-600"
                            : "text-gray-400 group-hover:text-gray-600"
                        }`}
                      />
                      <AnimatePresence mode="wait">
                        {isSidebarOpen && (
                          <motion.span
                            initial={{ opacity: 0, width: 0 }}
                            animate={{ opacity: 1, width: "auto" }}
                            exit={{ opacity: 0, width: 0 }}
                            transition={{ duration: 0.2 }}
                            className="whitespace-nowrap"
                          >
                            {link.name}
                          </motion.span>
                        )}
                      </AnimatePresence>
                    </div>
                  </Link>
                );
              })}
            </nav>
          </div>

          {/* Sidebar Footer */}
          <div className="p-4 border-t border-gray-100 flex flex-col gap-3 shrink-0">
            {isSidebarOpen ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="bg-gray-900 rounded-xl p-4 shadow-sm relative overflow-hidden group"
              >
                <div className="absolute top-0 right-0 -translate-y-4 translate-x-4 w-20 h-20 bg-emerald-500/20 blur-xl rounded-full"></div>
                <div className="relative z-10">
                  <div className="flex items-center gap-2 mb-1.5">
                    <Sparkle
                      size={16}
                      weight="fill"
                      className="text-emerald-400"
                    />
                    <span className="text-sm font-bold text-white">
                      Pro Plan
                    </span>
                  </div>
                  <p className="text-xs text-gray-400 mb-3 leading-relaxed">
                    Unlock unlimited AI insights and deeper curation.
                  </p>
                  <button
                    onClick={() => router.push("/dashboard/pro")}
                    className="w-full bg-white/10 hover:bg-white/20 text-white border border-white/5 text-xs font-semibold py-2 rounded-lg transition-colors focus:outline-none active:scale-[0.98]"
                  >
                    Upgrade to Pro
                  </button>
                </div>
              </motion.div>
            ) : (
              <button
                onClick={() => router.push("/dashboard/pro")}
                className="w-11 h-11 mx-auto bg-gray-900 hover:bg-gray-800 rounded-xl flex items-center justify-center transition-colors focus:outline-none"
                title="Upgrade to Pro"
              >
                <Sparkle size={20} weight="fill" className="text-emerald-400" />
              </button>
            )}

            <Link
              href="/dashboard/help"
              className={`group flex items-center rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-100 hover:text-gray-900 transition-colors focus:outline-none overflow-hidden ${
                isSidebarOpen
                  ? "px-3 py-2 gap-3"
                  : "justify-center px-0 py-2.5 w-11 mx-auto"
              }`}
            >
              <Question
                size={20}
                className="shrink-0 text-gray-400 group-hover:text-gray-500 transition-colors"
              />
              <AnimatePresence mode="wait">
                {isSidebarOpen && (
                  <motion.span
                    initial={{ opacity: 0, width: 0 }}
                    animate={{ opacity: 1, width: "auto" }}
                    exit={{ opacity: 0, width: 0 }}
                    className="whitespace-nowrap"
                  >
                    Help & Support
                  </motion.span>
                )}
              </AnimatePresence>
            </Link>
          </div>
        </div>
      </motion.aside>

      {/* --- MAIN CONTENT AREA --- */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* --- TOP HEADER --- */}
        <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-8 shrink-0 z-10">
          <div className="flex-1 max-w-xl">
            <div className="relative group">
              <MagnifyingGlass
                size={18}
                className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-emerald-600 transition-colors"
              />
              <input
                type="text"
                placeholder="Search documents, summaries, or collections... (Press '/' to focus)"
                className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-transparent rounded-lg text-sm text-gray-900 placeholder-gray-400 transition-all hover:bg-gray-100 hover:border-gray-200 focus:bg-white focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 focus:outline-none"
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
          </div>

          <div className="flex items-center gap-4 ml-6">
            <button className="group flex items-center gap-2 px-4 py-2 bg-emerald-600 text-white text-sm font-medium rounded-lg shadow-[0px_1px_2px_0px_rgba(16,185,129,0.4),_inset_0px_1px_0px_0px_rgba(255,255,255,0.2)] ring-1 ring-inset ring-emerald-700 hover:bg-emerald-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-600 focus-visible:ring-offset-2 transition-all duration-200 active:scale-[0.98] cursor-pointer">
              <Plus
                size={16}
                weight="bold"
                className="transition-transform group-hover:rotate-90 duration-300"
              />
              <span>New</span>
            </button>

            <div className="w-px h-6 bg-gray-200 mx-1"></div>

            <button className="relative p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-300">
              <Bell size={20} weight="fill" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border border-white"></span>
            </button>

            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
                className="flex items-center justify-center w-8 h-8 rounded-full bg-emerald-100 text-emerald-700 font-bold text-sm border border-emerald-200 overflow-hidden focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-600 focus-visible:ring-offset-2 hover:ring-2 hover:ring-emerald-500/30 transition-all"
              >
                {user.avatar ? (
                  <img
                    src={user.avatar}
                    alt={user.name || "Profile"}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  (user.name?.[0] || user.email[0]).toUpperCase()
                )}
              </button>

              {isProfileMenuOpen && (
                <div className="absolute right-0 top-full mt-2 w-56 bg-white border border-gray-200 rounded-xl shadow-lg py-1.5 z-50 animate-in fade-in slide-in-from-top-2 duration-200">
                  <div className="px-4 py-2.5 border-b border-gray-100 mb-1">
                    <p className="text-sm font-medium text-gray-900 truncate">
                      {user.name || "User"}
                    </p>
                    <p
                      className="text-xs text-gray-500 truncate"
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
                    className="w-full flex items-center gap-2.5 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-gray-900 transition-colors"
                  >
                    <Gear size={16} />
                    Account Settings
                  </button>

                  <button
                    onClick={() => {
                      setIsProfileMenuOpen(false);
                      logout();
                    }}
                    className="w-full flex items-center gap-2.5 px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors"
                  >
                    <SignOut size={16} />
                    Sign Out
                  </button>
                </div>
              )}
            </div>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto bg-gray-50 p-8 scrollbar-hide">
          <div className="max-w-6xl mx-auto">{children}</div>
        </main>
      </div>
    </div>
  );
}
