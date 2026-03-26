"use client";

import React, { useState, useEffect } from "react";
import { api } from "@/lib/api";
import { useAuth } from "@/context/AuthContext";
import {
  MagnifyingGlass,
  Funnel,
  DotsThree,
  ArrowUpRight,
  Archive as ArchiveIcon,
  CalendarBlank,
  TagSimple,
  LockKey,
  ShieldCheck,
  CircleNotch,
} from "@phosphor-icons/react";

interface Bookmark {
  _id: string;
  title?: string;
  url: string;
  domain?: string;
  tags?: string[];
  created_at: string;
}

export default function ArchivePage() {
  const { user } = useAuth();

  // Security State
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [pinInput, setPinInput] = useState("");
  const [pinError, setPinError] = useState("");
  const [isVerifying, setIsVerifying] = useState(false);

  // Data State
  const [archiveItems, setArchiveItems] = useState<Bookmark[]>([]);
  const [loadingData, setLoadingData] = useState(false);
  const [activeMenu, setActiveMenu] = useState<string | null>(null);

  // Automatically fetch data once unlocked
  useEffect(() => {
    if (isUnlocked) {
      setLoadingData(true);
      api
        .get("/bookmarks?is_archived=true")
        .then((res) => {
          const enriched = res.data.data.map((b: any) => {
            let domain = b.url;
            try {
              domain = new URL(b.url).hostname.replace("www.", "");
            } catch {}
            return { ...b, domain };
          });
          setArchiveItems(enriched);
        })
        .catch(() => setPinError("Failed to load archive data."))
        .finally(() => setLoadingData(false));
    }
  }, [isUnlocked]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as Element;
      if (target && target.closest(".kebab-menu-container")) return;
      setActiveMenu(null);
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSetupPin = async (e: React.FormEvent) => {
    e.preventDefault();
    setPinError("");
    if (pinInput.length !== 4) return setPinError("PIN must be 4 digits.");

    setIsVerifying(true);
    try {
      await api.post("/auth/archive-pin", { pin: pinInput });
      window.location.reload();
    } catch (err: any) {
      setPinError(err.response?.data?.message || "Failed to set PIN");
      setIsVerifying(false);
    }
  };

  const handleUnlock = async (e: React.FormEvent) => {
    e.preventDefault();
    setPinError("");
    if (pinInput.length !== 4) return setPinError("PIN must be 4 digits.");

    setIsVerifying(true);
    try {
      await api.post("/auth/archive-pin/verify", { pin: pinInput });
      setIsUnlocked(true);
      setPinInput("");
    } catch (err: any) {
      setPinError(err.response?.data?.message || "Incorrect PIN");
    } finally {
      setIsVerifying(false);
    }
  };

  // 1. SHOW SETUP SCREEN
  if (user && !user.has_archive_pin) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[80vh] px-6">
        <div className="bg-white border border-gray-200 rounded-2xl p-6 sm:p-8 max-w-md w-full shadow-sm text-center">
          <div className="flex items-center justify-center w-14 h-14 bg-emerald-50 text-emerald-600 rounded-full mx-auto mb-5 border border-emerald-100">
            <ShieldCheck size={28} weight="fill" />
          </div>
          <h2 className="text-xl font-bold text-gray-900 mb-2">
            Secure Your Archive
          </h2>
          <p className="text-sm text-gray-500 mb-8">
            Create a 4-digit PIN to lock your root archive. You will need to
            enter this every time you view this page.
          </p>
          <form onSubmit={handleSetupPin} className="flex flex-col gap-4">
            <input
              type="password"
              maxLength={4}
              placeholder="••••"
              value={pinInput}
              onChange={(e) => setPinInput(e.target.value.replace(/\D/g, ""))}
              className="w-full text-center tracking-widest font-mono text-2xl py-3 bg-white border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:border-transparent transition-shadow placeholder:tracking-normal"
            />
            {pinError && (
              <p className="text-red-600 text-sm font-medium">{pinError}</p>
            )}
            <button
              type="submit"
              disabled={isVerifying || pinInput.length !== 4}
              className="w-full flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white text-sm font-medium py-3 rounded-lg transition-all shadow-sm active:scale-[0.98] focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-600 focus-visible:ring-offset-2 disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {isVerifying ? (
                <CircleNotch size={18} className="animate-spin" />
              ) : (
                "Set PIN & Unlock"
              )}
            </button>
          </form>
        </div>
      </div>
    );
  }

  // 2. SHOW LOCK SCREEN
  if (user && user.has_archive_pin && !isUnlocked) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[80vh] px-6 animate-in fade-in duration-300">
        <div className="bg-white border border-gray-200 rounded-2xl p-6 sm:p-8 max-w-md w-full shadow-sm text-center">
          <div className="flex items-center justify-center w-14 h-14 bg-gray-50 text-gray-600 rounded-full mx-auto mb-5 border border-gray-200">
            <LockKey size={28} weight="fill" />
          </div>
          <h2 className="text-xl font-bold text-gray-900 mb-2">
            Archive Locked
          </h2>
          <p className="text-sm text-gray-500 mb-8">
            Enter your 4-digit PIN to access your root archive.
          </p>
          <form onSubmit={handleUnlock} className="flex flex-col gap-4">
            <input
              type="password"
              maxLength={4}
              autoFocus
              placeholder="••••"
              value={pinInput}
              onChange={(e) => setPinInput(e.target.value.replace(/\D/g, ""))}
              className="w-full text-center tracking-widest font-mono text-2xl py-3 bg-white border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-shadow placeholder:tracking-normal"
            />
            {pinError && (
              <p className="text-red-600 text-sm font-medium">{pinError}</p>
            )}
            <button
              type="submit"
              disabled={isVerifying || pinInput.length !== 4}
              className="w-full flex items-center justify-center gap-2 bg-gray-900 hover:bg-gray-800 text-white text-sm font-medium py-3 rounded-lg transition-all shadow-sm active:scale-[0.98] focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-900 focus-visible:ring-offset-2 disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {isVerifying ? (
                <CircleNotch size={18} className="animate-spin" />
              ) : (
                "Unlock"
              )}
            </button>
          </form>
        </div>
      </div>
    );
  }

  // 3. SHOW ACTUAL ARCHIVE
  return (
    <div className="max-w-[1300px] mx-auto pb-16 px-6 animate-in fade-in duration-300">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8 py-6 border-b border-gray-200">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-gray-100 border border-gray-200 mb-4 shadow-sm">
            <ArchiveIcon size={14} weight="bold" className="text-gray-600" />
            <span className="text-xs font-semibold text-gray-700 uppercase tracking-wider">
              Root Archive
            </span>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 tracking-tight mb-2">
            Everything
          </h1>
          <p className="text-sm text-gray-500 max-w-xl">
            Your entire library of captured knowledge, fully indexed and
            instantly searchable.
          </p>
        </div>

        <button
          onClick={() => setIsUnlocked(false)}
          className="flex items-center justify-center gap-2 px-4 py-2 bg-white border border-gray-200 text-gray-700 text-sm font-medium rounded-lg shadow-sm hover:bg-gray-50 hover:text-gray-900 focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-200 transition-colors shrink-0 active:scale-[0.98]"
        >
          <LockKey size={16} weight="bold" /> Lock Archive
        </button>
      </div>

      {/* Controls */}
      <div className="flex flex-col sm:flex-row items-center gap-3 mb-6">
        <div className="relative w-full sm:max-w-md group">
          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
            <MagnifyingGlass
              size={18}
              className="text-gray-400 group-focus-within:text-emerald-600 transition-colors"
            />
          </div>
          <input
            type="text"
            placeholder="Search titles, tags, or domains..."
            className="w-full pl-10 pr-4 py-2.5 bg-white border border-gray-300 rounded-lg text-sm text-gray-900 placeholder-gray-400 shadow-sm focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-shadow"
          />
        </div>
        <button className="flex items-center justify-center gap-2 px-4 py-2.5 bg-white border border-gray-300 hover:bg-gray-50 rounded-lg text-sm font-medium text-gray-700 transition-colors shadow-sm w-full sm:w-auto focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-200 active:scale-[0.98]">
          <Funnel size={16} weight="bold" className="text-gray-500" /> Filter
        </button>
      </div>

      {/* Content */}
      {loadingData ? (
        <div className="flex justify-center py-24">
          <CircleNotch size={28} className="animate-spin text-emerald-600" />
        </div>
      ) : archiveItems.length === 0 ? (
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-300">
          <div className="flex flex-col items-center justify-center py-24 px-6 text-center bg-gray-50/50 border-2 border-dashed border-gray-200 rounded-2xl">
            <div className="flex items-center justify-center w-14 h-14 mb-5 bg-white border border-gray-200 rounded-xl shadow-sm ring-4 ring-gray-50">
              <ArchiveIcon size={24} className="text-gray-400" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-1">
              Your archive is empty
            </h3>
            <p className="text-sm text-gray-500 max-w-sm">
              Saved items that are sent to the root archive will appear here.
            </p>
          </div>
        </div>
      ) : (
        <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm">
          {/* Table Header */}
          <div className="grid grid-cols-12 gap-4 px-6 py-3 bg-gray-50 border-b border-gray-200 text-xs font-semibold text-gray-500 uppercase tracking-wider">
            <div className="col-span-12 sm:col-span-6">Resource</div>
            <div className="hidden sm:flex col-span-3 items-center gap-1.5">
              <TagSimple size={14} /> Tags
            </div>
            <div className="hidden sm:flex col-span-2 items-center gap-1.5">
              <CalendarBlank size={14} /> Added
            </div>
            <div className="hidden sm:block col-span-1 text-right">Actions</div>
          </div>

          {/* Table Body */}
          <div className="flex flex-col divide-y divide-gray-100">
            {archiveItems.map((item) => (
              <div
                key={item._id}
                className="group grid grid-cols-12 gap-4 px-6 py-4 items-center hover:bg-gray-50 transition-colors duration-200"
              >
                {/* Resource Column */}
                <div className="col-span-12 sm:col-span-6 pr-4 min-w-0">
                  <a
                    href={item.url}
                    target="_blank"
                    rel="noreferrer"
                    className="block font-medium text-sm text-gray-900 truncate mb-0.5 group-hover:text-emerald-700 transition-colors focus:outline-none focus-visible:underline"
                  >
                    {item.title || item.url}
                  </a>
                  <p className="text-xs text-gray-500 truncate">
                    {item.domain}
                  </p>
                </div>

                {/* Tags Column */}
                <div className="hidden sm:flex col-span-3 items-center flex-wrap gap-1.5">
                  {item.tags?.slice(0, 3).map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-1 bg-gray-100 text-gray-600 border border-gray-200 text-xs font-medium rounded-md transition-colors"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Added Column */}
                <div className="hidden sm:flex col-span-2 items-center text-sm text-gray-500">
                  {new Date(item.created_at).toLocaleDateString()}
                </div>

                {/* Actions Column */}
                <div className="hidden sm:flex col-span-1 items-center justify-end gap-1 opacity-0 group-hover:opacity-100 focus-within:opacity-100 transition-opacity">
                  <a
                    href={item.url}
                    target="_blank"
                    rel="noreferrer"
                    className="p-1.5 text-gray-400 hover:text-emerald-600 hover:bg-emerald-50 rounded-lg transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500"
                    title="Open Source"
                  >
                    <ArrowUpRight size={18} weight="bold" />
                  </a>

                  <div className="relative kebab-menu-container">
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        setActiveMenu(
                          activeMenu === item._id ? null : item._id,
                        );
                      }}
                      className={`p-1.5 rounded-lg transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-300 ${
                        activeMenu === item._id
                          ? "bg-gray-100 text-gray-900"
                          : "text-gray-400 hover:text-gray-900 hover:bg-gray-100"
                      }`}
                    >
                      <DotsThree size={20} weight="bold" />
                    </button>

                    {activeMenu === item._id && (
                      <div
                        onClick={(e) => e.stopPropagation()}
                        className="absolute right-0 top-full mt-1 w-40 bg-white border border-gray-200 shadow-lg rounded-xl overflow-hidden py-1.5 animate-in fade-in slide-in-from-top-2 duration-200 z-50"
                      >
                        <button className="w-full flex items-center gap-2.5 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors">
                          Edit details
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
