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
      return <FileText size={20} weight="fill" className="text-indigo-500" />;
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
        <CircleNotch size={28} className="animate-spin text-indigo-600" />
      </div>
    );
  }

  return (
    <div className="max-w-[1300px] mx-auto pb-16 px-6">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8 py-6 border-b border-gray-200">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-indigo-50 border border-indigo-100 mb-4 shadow-sm">
            <ClockCounterClockwise
              size={14}
              weight="bold"
              className="text-indigo-600"
            />
            <span className="text-xs font-semibold text-indigo-700 uppercase tracking-wider">
              History
            </span>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 tracking-tight mb-2">
            Recently Viewed
          </h1>
          <p className="text-sm text-gray-500">
            Pick up exactly where you left off. Your recent reads, research, and
            references.
          </p>
        </div>
      </div>

      {/* Content Section */}
      {groupedActivity.length === 0 ? (
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-300">
          <div className="flex flex-col items-center justify-center py-24 px-6 text-center bg-gray-50/50 border-2 border-dashed border-gray-200 rounded-2xl">
            <div className="flex items-center justify-center w-14 h-14 mb-5 bg-white border border-gray-200 rounded-xl shadow-sm ring-4 ring-gray-50">
              <ClockCounterClockwise size={24} className="text-indigo-500" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-1">
              No recent activity
            </h3>
            <p className="text-sm text-gray-500 max-w-sm">
              Items you view or save will automatically appear here
              chronologically.
            </p>
          </div>
        </div>
      ) : (
        <div className="flex flex-col gap-10">
          {groupedActivity.map((group, groupIndex) => (
            <div key={groupIndex} className="relative">
              {/* Timeline Header */}
              <div className="flex items-center gap-3 mb-4">
                <h2 className="text-xs font-bold text-gray-500 uppercase tracking-wider">
                  {group.group}
                </h2>
                <div className="h-px bg-gray-200 flex-1"></div>
              </div>

              {/* Timeline Items */}
              <div className="flex flex-col gap-3">
                {group.items.map((item: any) => (
                  <div
                    key={item._id}
                    className="group bg-white border border-gray-200 rounded-2xl p-4 sm:p-5 shadow-sm hover:shadow-md hover:border-indigo-300 transition-all duration-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4 relative"
                  >
                    <div className="flex items-center gap-4 min-w-0">
                      <div className="hidden sm:flex shrink-0 p-3 bg-gray-50 border border-gray-100 rounded-xl group-hover:bg-white group-hover:border-indigo-100 transition-colors duration-200">
                        <TypeIcon type={item.type} />
                      </div>

                      <div className="min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-xs font-semibold text-indigo-600 uppercase tracking-wider block sm:hidden">
                            {item.timeStr}
                          </span>
                        </div>
                        <a
                          href={item.url}
                          target="_blank"
                          rel="noreferrer"
                          className="font-medium text-base text-gray-900 truncate block hover:text-indigo-600 transition-colors line-clamp-1 focus:outline-none focus-visible:underline"
                          title={item.title}
                        >
                          {item.title || item.url}
                        </a>
                        <div className="flex items-center gap-2 mt-1 text-xs text-gray-500">
                          <span className="truncate">{item.domain}</span>
                          <span className="w-1 h-1 rounded-full bg-gray-300 shrink-0"></span>
                          <span className="flex items-center gap-1.5 truncate text-gray-600">
                            <FolderOpen
                              size={14}
                              weight="fill"
                              className="text-gray-400"
                            />
                            {item.collectionName}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between sm:justify-end gap-3 shrink-0 mt-2 sm:mt-0 pt-3 sm:pt-0 border-t sm:border-0 border-gray-100">
                      <span className="hidden sm:block text-xs font-semibold text-gray-400 w-16 text-right mr-2">
                        {item.timeStr}
                      </span>

                      <div className="flex items-center gap-1">
                        <a
                          href={item.url}
                          target="_blank"
                          rel="noreferrer"
                          className="flex items-center gap-1.5 px-3 py-2 bg-indigo-50 text-indigo-700 hover:bg-indigo-600 hover:text-white rounded-lg text-sm font-medium transition-colors opacity-100 sm:opacity-0 sm:group-hover:opacity-100 focus-within:opacity-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500"
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
                              className="absolute right-0 top-full mt-1 w-48 py-1.5 bg-white border border-gray-200 rounded-xl shadow-lg z-50 overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200"
                            >
                              <button
                                onClick={(e) => handleDelete(item._id, e)}
                                className="w-full flex items-center gap-2 px-4 py-2 text-sm font-medium text-red-600 hover:bg-red-50 focus:outline-none focus-visible:bg-red-50 transition-colors"
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
