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
        .get("/bookmarks?is_archived=true") // Fetching all bookmarks for the root archive
        .then((res) => {
          // Add simple domain parsing for the UI
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

  const handleSetupPin = async (e: React.FormEvent) => {
    e.preventDefault();
    setPinError("");
    if (pinInput.length !== 4) return setPinError("PIN must be 4 digits.");

    setIsVerifying(true);
    try {
      await api.post("/auth/archive-pin", { pin: pinInput });
      // Force reload to update user context, or just optimistically unlock
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
      setPinInput(""); // Clear it out of memory
    } catch (err: any) {
      setPinError(err.response?.data?.message || "Incorrect PIN");
    } finally {
      setIsVerifying(false);
    }
  };

  // 1. SHOW SETUP SCREEN
  if (user && !user.has_archive_pin) {
    return (
      <div className="max-w-[1300px] mx-auto pb-16 font-poppins px-6 flex flex-col items-center justify-center pt-24">
        <div className="bg-white border border-gray-200 rounded-[28px] p-8 max-w-md w-full shadow-lg text-center">
          <div className="bg-emerald-50 text-emerald-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
            <ShieldCheck size={32} weight="fill" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Secure Your Archive
          </h2>
          <p className="text-gray-500 text-[14px] mb-8">
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
              className="w-full text-center tracking-[1em] text-2xl py-4 bg-gray-50 border border-gray-200 rounded-xl focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500 outline-none transition-all"
            />
            {pinError && (
              <p className="text-red-500 text-sm font-medium">{pinError}</p>
            )}
            <button
              type="submit"
              disabled={isVerifying || pinInput.length !== 4}
              className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-3.5 rounded-xl transition-all shadow-md active:scale-95 disabled:opacity-50"
            >
              {isVerifying ? "Setting PIN..." : "Set PIN & Unlock"}
            </button>
          </form>
        </div>
      </div>
    );
  }

  // 2. SHOW LOCK SCREEN
  if (user && user.has_archive_pin && !isUnlocked) {
    return (
      <div className="max-w-[1300px] mx-auto pb-16 font-poppins px-6 flex flex-col items-center justify-center pt-24">
        <div className="bg-white border border-gray-200 rounded-[28px] p-8 max-w-md w-full shadow-lg text-center">
          <div className="bg-gray-100 text-gray-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
            <LockKey size={32} weight="fill" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Archive Locked
          </h2>
          <p className="text-gray-500 text-[14px] mb-8">
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
              className="w-full text-center tracking-[1em] text-2xl py-4 bg-gray-50 border border-gray-200 rounded-xl focus:ring-4 focus:ring-gray-900/10 focus:border-gray-900 outline-none transition-all"
            />
            {pinError && (
              <p className="text-red-500 text-sm font-medium">{pinError}</p>
            )}
            <button
              type="submit"
              disabled={isVerifying || pinInput.length !== 4}
              className="w-full bg-gray-950 hover:bg-gray-800 text-white font-semibold py-3.5 rounded-xl transition-all shadow-md active:scale-95 disabled:opacity-50"
            >
              {isVerifying ? (
                <CircleNotch size={20} className="animate-spin mx-auto" />
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
    <div className="max-w-[1300px] mx-auto pb-16 font-poppins px-6 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8 py-6 border-b border-gray-100">
        <div>
          <div className="bg-gray-100 text-gray-600 w-fit px-3 py-1 rounded-full mb-3 flex items-center justify-center border border-gray-200">
            <p className="uppercase tracking-widest font-bold text-[10px] flex items-center gap-1.5">
              <ArchiveIcon size={12} weight="bold" />
              Root Archive
            </p>
          </div>
          <h1 className="text-[36px] font-bold text-gray-950 tracking-tighter mb-2">
            Everything
          </h1>
          <p className="text-gray-500 text-[16px] font-medium max-w-xl leading-relaxed">
            Your entire library of captured knowledge, fully indexed and
            instantly searchable.
          </p>
        </div>

        {/* Lock button to manually lock the session */}
        <button
          onClick={() => setIsUnlocked(false)}
          className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl text-sm font-semibold transition-colors shrink-0"
        >
          <LockKey size={16} weight="bold" /> Lock Archive
        </button>
      </div>

      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-6">
        <div className="relative w-full sm:max-w-md group">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <MagnifyingGlass
              size={18}
              className="text-gray-400 group-focus-within:text-emerald-500 transition-colors"
              weight="bold"
            />
          </div>
          <input
            type="text"
            placeholder="Search titles, tags, or domains..."
            className="w-full pl-11 pr-4 py-3 bg-white border border-gray-200 hover:border-gray-300 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 rounded-2xl text-[14px] font-medium text-gray-900 placeholder-gray-400 transition-all outline-none shadow-sm"
          />
        </div>
        <button className="flex items-center gap-2 px-4 py-3 bg-white border border-gray-200 hover:border-gray-300 hover:bg-gray-50 rounded-2xl text-[14px] font-semibold text-gray-700 transition-all shadow-sm w-full sm:w-auto justify-center">
          <Funnel size={16} weight="bold" className="text-gray-500" /> Filter
        </button>
      </div>

      {loadingData ? (
        <div className="flex justify-center py-20">
          <CircleNotch size={32} className="animate-spin text-emerald-500" />
        </div>
      ) : archiveItems.length === 0 ? (
        <div className="text-center py-20 text-gray-500 font-medium">
          Your archive is empty.
        </div>
      ) : (
        <div className="bg-white border border-gray-100/70 rounded-[28px] overflow-hidden shadow-[0_4px_20px_-4px_rgba(0,0,0,0.02)]">
          <div className="grid grid-cols-12 gap-4 p-4 bg-gray-50/50 border-b border-gray-100 text-[11px] font-bold text-gray-400 uppercase tracking-widest">
            <div className="col-span-12 sm:col-span-6 pl-4">Resource</div>
            <div className="hidden sm:flex col-span-3 items-center gap-1.5">
              <TagSimple size={14} /> Tags
            </div>
            <div className="hidden sm:flex col-span-2 items-center gap-1.5">
              <CalendarBlank size={14} /> Added
            </div>
            <div className="hidden sm:block col-span-1 text-right pr-4">
              Actions
            </div>
          </div>

          <div className="flex flex-col divide-y divide-gray-100/70">
            {archiveItems.map((item) => (
              <div
                key={item._id}
                className="group grid grid-cols-12 gap-4 p-4 items-center hover:bg-emerald-50/30 transition-colors duration-200 cursor-pointer relative"
              >
                <div className="col-span-12 sm:col-span-6 pl-4 pr-4">
                  <a
                    href={item.url}
                    target="_blank"
                    rel="noreferrer"
                    className="block font-semibold text-[15px] text-gray-900 truncate mb-1 group-hover:text-emerald-700 transition-colors"
                  >
                    {item.title || item.url}
                  </a>
                  <p className="text-[12px] text-gray-500 font-medium flex items-center gap-1">
                    {item.domain}
                  </p>
                </div>

                <div className="hidden sm:flex col-span-3 items-center flex-wrap gap-2">
                  {item.tags?.slice(0, 3).map((tag) => (
                    <span
                      key={tag}
                      className="px-2.5 py-1 bg-gray-100 text-gray-600 group-hover:bg-white group-hover:border-gray-200 border border-transparent text-[10px] font-bold rounded-md uppercase tracking-wide transition-colors"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="hidden sm:flex col-span-2 items-center text-[13px] font-medium text-gray-400">
                  {new Date(item.created_at).toLocaleDateString()}
                </div>

                <div className="hidden sm:flex col-span-1 items-center justify-end gap-1 pr-2">
                  <a
                    href={item.url}
                    target="_blank"
                    rel="noreferrer"
                    className="p-2 text-gray-300 hover:text-emerald-600 hover:bg-emerald-100 rounded-lg transition-all opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0"
                  >
                    <ArrowUpRight size={18} weight="bold" />
                  </a>
                  <button className="p-2 rounded-lg text-gray-400 hover:text-gray-900 hover:bg-gray-100 transition-all">
                    <DotsThree size={24} weight="bold" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
