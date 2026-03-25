"use client";

import React, { useState, useEffect } from "react";
import { api } from "@/lib/api";
import {
  ClockCounterClockwise,
  DotsThree,
  ArrowUpRight,
  FolderOpen,
  Globe,
  FileText,
  YoutubeLogo,
  CalendarBlank,
  CircleNotch,
  Trash,
} from "@phosphor-icons/react";

interface Bookmark {
  _id: string;
  title?: string;
  url: string;
  created_at: string;
  collection_id?: string | null;
}

interface Collection {
  _id: string;
  name: string;
}

// Helper to determine the content type icon based on URL
const TypeIcon = ({ type }: { type: string }) => {
  switch (type) {
    case "video":
      return <YoutubeLogo size={20} weight="fill" className="text-red-500" />;
    case "docs":
      return <FileText size={20} weight="fill" className="text-indigo-400" />;
    case "article":
    default:
      return <Globe size={20} weight="fill" className="text-emerald-500" />;
  }
};

export default function RecentPage() {
  const [groupedActivity, setGroupedActivity] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeMenu, setActiveMenu] = useState<string | null>(null);

  const fetchData = async () => {
    try {
      const [bookmarksRes, collectionsRes] = await Promise.all([
        api.get("/bookmarks"),
        api.get("/collections"),
      ]);

      const bookmarks: Bookmark[] = bookmarksRes.data.data;
      const collections: Collection[] = collectionsRes.data.data;

      // Time thresholds
      const today = new Date();
      today.setHours(0, 0, 0, 0);

      const yesterday = new Date(today);
      yesterday.setDate(yesterday.getDate() - 1);

      const earlierThisWeek = new Date(today);
      earlierThisWeek.setDate(today.getDate() - 7);

      const groups = {
        Today: [] as any[],
        Yesterday: [] as any[],
        "Earlier this week": [] as any[],
        Older: [] as any[],
      };

      bookmarks.forEach((b) => {
        const date = new Date(b.created_at || Date.now());

        // Find Collection Name
        const collectionName =
          collections.find((c) => c._id === b.collection_id)?.name ||
          "Root Archive";

        // Parse Domain & Type
        let domain = "";
        let type = "article";
        try {
          const urlObj = new URL(b.url);
          domain = urlObj.hostname.replace("www.", "");
          if (domain.includes("youtube.com") || domain.includes("vimeo.com"))
            type = "video";
          else if (domain.includes("docs") || domain.includes("github.com"))
            type = "docs";
        } catch (e) {
          domain = b.url;
        }

        // Format Time
        const timeStr = date.toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        });

        const enrichedItem = {
          ...b,
          domain,
          type,
          collectionName,
          timeStr,
          date,
        };

        if (date >= today) groups.Today.push(enrichedItem);
        else if (date >= yesterday) groups.Yesterday.push(enrichedItem);
        else if (date >= earlierThisWeek)
          groups["Earlier this week"].push(enrichedItem);
        else groups.Older.push(enrichedItem);
      });

      // Filter out empty groups and set state
      const finalGroups = Object.entries(groups)
        .map(([group, items]) => ({ group, items }))
        .filter((g) => g.items.length > 0);

      setGroupedActivity(finalGroups);
    } catch (err) {
      console.error("Failed to load recent activity", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as Element;
      if (target && target.closest(".kebab-menu-container")) return;
      setActiveMenu(null);
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleDelete = async (id: string, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!confirm("Remove this bookmark?")) return;

    try {
      await api.delete(`/bookmarks/${id}`);
      fetchData(); // Refresh the list to rebuild the groups
    } catch (err) {
      alert("Failed to delete bookmark");
    }
  };

  if (loading) {
    return (
      <div className="flex h-[60vh] flex-col items-center justify-center gap-3 text-gray-400">
        <CircleNotch size={28} className="animate-spin text-indigo-500" />
        <p className="text-sm font-medium animate-pulse">Loading timeline...</p>
      </div>
    );
  }

  return (
    <div className="max-w-[1300px] mx-auto pb-16 font-poppins px-6">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 py-6 border-b border-gray-100">
        <div>
          <div className="bg-indigo-50 text-indigo-700 w-fit px-3 py-1 rounded-full mb-3 flex items-center justify-center border border-indigo-100">
            <p className="uppercase tracking-widest font-bold text-[10px] flex items-center gap-1.5">
              <ClockCounterClockwise size={12} weight="bold" />
              History
            </p>
          </div>
          <h1 className="text-[36px] font-bold text-gray-950 tracking-tighter mb-2">
            Recently Viewed
          </h1>
          <p className="text-gray-500 text-[16px] font-medium max-w-xl leading-relaxed">
            Pick up exactly where you left off. Your recent reads, research, and
            references.
          </p>
        </div>
      </div>

      {groupedActivity.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-32 px-4 bg-white border border-gray-100/70 rounded-[28px] text-center shadow-[0_4px_20px_-4px_rgba(0,0,0,0.02)]">
          <div className="relative mb-6">
            <div className="absolute inset-0 bg-indigo-100 rounded-full blur-xl opacity-40"></div>
            <div className="relative p-6 bg-indigo-50 rounded-full border border-indigo-100">
              <ClockCounterClockwise
                size={48}
                weight="duotone"
                className="text-indigo-500"
              />
            </div>
          </div>
          <h3 className="text-2xl font-bold text-gray-950 mb-2 tracking-tight">
            No recent activity
          </h3>
          <p className="text-[15px] text-gray-500 max-w-md font-medium">
            Items you view or save will automatically appear here
            chronologically.
          </p>
        </div>
      ) : (
        <div className="flex flex-col gap-10">
          {groupedActivity.map((group, groupIndex) => (
            <div key={groupIndex} className="relative">
              <div className="flex items-center gap-3 mb-5">
                <div className="bg-gray-100/80 p-1.5 rounded-lg text-gray-500">
                  <CalendarBlank size={16} weight="bold" />
                </div>
                <h2 className="text-[15px] font-bold text-gray-800 uppercase tracking-widest">
                  {group.group}
                </h2>
                <div className="h-px bg-gray-100 flex-1 ml-4"></div>
              </div>

              <div className="flex flex-col gap-3">
                {group.items.map((item: any) => (
                  <div
                    key={item._id}
                    className="group bg-white border border-gray-100/70 rounded-[20px] p-4 sm:p-5 shadow-[0_2px_10px_-4px_rgba(0,0,0,0.02)] hover:shadow-[0_10px_30px_-10px_rgba(0,0,0,0.06)] hover:-translate-y-0.5 hover:border-indigo-100/50 transition-all duration-300 flex flex-col sm:flex-row sm:items-center justify-between gap-4 relative"
                  >
                    <div className="flex items-center gap-4 min-w-0">
                      <div className="hidden sm:flex shrink-0 p-3 bg-gray-50 rounded-2xl group-hover:scale-105 transition-transform duration-300">
                        <TypeIcon type={item.type} />
                      </div>

                      <div className="min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-[12px] font-bold text-indigo-600/70 uppercase tracking-wider block sm:hidden">
                            {item.timeStr}
                          </span>
                        </div>
                        <a
                          href={item.url}
                          target="_blank"
                          rel="noreferrer"
                          className="font-semibold text-[16px] text-gray-950 truncate block hover:text-indigo-600 transition-colors line-clamp-1"
                          title={item.title}
                        >
                          {item.title || item.url}
                        </a>
                        <div className="flex items-center gap-3 mt-1 text-[13px] font-medium text-gray-400">
                          <span className="truncate">{item.domain}</span>
                          <span className="w-1 h-1 rounded-full bg-gray-200 shrink-0"></span>
                          <span className="flex items-center gap-1.5 truncate">
                            <FolderOpen
                              size={14}
                              weight="fill"
                              className="text-gray-300"
                            />
                            {item.collectionName}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between sm:justify-end gap-4 shrink-0 mt-2 sm:mt-0 pt-3 sm:pt-0 border-t sm:border-0 border-gray-50">
                      <span className="hidden sm:block text-[13px] font-bold text-gray-400 tracking-wide w-20 text-right">
                        {item.timeStr}
                      </span>

                      <div className="flex items-center gap-1">
                        <a
                          href={item.url}
                          target="_blank"
                          rel="noreferrer"
                          className="flex items-center gap-1.5 px-3 py-2 bg-indigo-50 text-indigo-600 hover:bg-indigo-600 hover:text-white rounded-xl text-[12px] font-bold transition-colors opacity-100 sm:opacity-0 sm:-translate-x-2 group-hover:opacity-100 group-hover:translate-x-0"
                        >
                          Open <ArrowUpRight size={14} weight="bold" />
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
                            className={`p-2 rounded-xl transition-all ${
                              activeMenu === item._id
                                ? "bg-gray-100 text-gray-900"
                                : "text-gray-400 hover:text-gray-900 hover:bg-gray-100"
                            }`}
                          >
                            <DotsThree size={24} weight="bold" />
                          </button>

                          {activeMenu === item._id && (
                            <div
                              onClick={(e) => e.stopPropagation()}
                              className="absolute right-0 top-full mt-1 w-48 py-2 bg-white border border-gray-100 rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.12)] z-50 overflow-hidden font-poppins animate-in fade-in slide-in-from-top-2 duration-200"
                            >
                              <button
                                onClick={(e) => handleDelete(item._id, e)}
                                className="w-full flex items-center gap-2.5 px-4 py-2.5 text-[13px] font-medium text-red-600 hover:bg-red-50 transition-colors"
                              >
                                <Trash size={16} /> Remove from History
                              </button>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
