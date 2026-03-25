"use client";

import React, { useState, useEffect } from "react";
import { api } from "@/lib/api";
import {
  Star,
  DotsThree,
  ArrowUpRight,
  FolderOpen,
  CircleNotch,
} from "@phosphor-icons/react";

interface Bookmark {
  _id: string;
  title?: string;
  url: string;
  summary?: {
    short: string;
  };
  tags?: string[];
  collection_id?: string | null;
  status: string;
}

interface Collection {
  _id: string;
  name: string;
}

export default function StarredPage() {
  const [starredItems, setStarredItems] = useState<
    (Bookmark & { collection_name: string })[]
  >([]);
  const [loading, setLoading] = useState(true);
  const [activeMenu, setActiveMenu] = useState<string | null>(null);

  const fetchData = async () => {
    try {
      const [bookmarksRes, collectionsRes] = await Promise.all([
        // Fetch only starred bookmarks
        api.get("/bookmarks?is_starred=true"),
        api.get("/collections"),
      ]);

      const bookmarks: Bookmark[] = bookmarksRes.data.data;
      const collections: Collection[] = collectionsRes.data.data;

      // Merge collection names into the bookmarks for easy rendering
      const enrichedBookmarks = bookmarks.map((b) => ({
        ...b,
        collection_name:
          collections.find((c) => c._id === b.collection_id)?.name ||
          "Root Archive",
      }));

      setStarredItems(enrichedBookmarks);
    } catch (error) {
      console.error("Failed to load starred items", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Click outside listener for kebab menus
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as Element;
      if (target && target.closest(".kebab-menu-container")) return;
      setActiveMenu(null);
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Update backend and seamlessly remove from UI
  const handleUnstar = async (id: string) => {
    // Optimistic UI update for immediate feedback
    setStarredItems((prev) => prev.filter((item) => item._id !== id));

    try {
      await api.patch(`/bookmarks/${id}`, { is_starred: false });
    } catch (error) {
      alert("Failed to unstar bookmark.");
      fetchData(); // Revert on failure
    }
  };

  if (loading) {
    return (
      <div className="flex h-[60vh] flex-col items-center justify-center gap-3 text-gray-400">
        <CircleNotch size={28} className="animate-spin text-amber-500" />
        <p className="text-sm font-medium animate-pulse">
          Loading favorites...
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-[1300px] mx-auto pb-16 font-poppins px-6">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 py-6 border-b border-gray-100">
        <div>
          <div className="bg-amber-50 text-amber-700 w-fit px-3 py-1 rounded-full mb-3 flex items-center justify-center border border-amber-100">
            <p className="uppercase tracking-widest font-bold text-[10px] flex items-center gap-1.5">
              <Star size={12} weight="fill" />
              Favorites
            </p>
          </div>
          <h1 className="text-[36px] font-bold text-gray-950 tracking-tighter mb-2">
            Starred
          </h1>
          <p className="text-gray-500 text-[16px] font-medium max-w-xl leading-relaxed">
            Your most valuable assets and quick references, kept front and
            center.
          </p>
        </div>
      </div>

      {starredItems.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-32 px-4 bg-white border border-gray-100/70 rounded-[28px] text-center shadow-[0_4px_20px_-4px_rgba(0,0,0,0.02)]">
          <div className="relative mb-6">
            <div className="absolute inset-0 bg-amber-100 rounded-full blur-xl opacity-40"></div>
            <div className="relative p-6 bg-amber-50 rounded-full border border-amber-100">
              <Star size={48} weight="duotone" className="text-amber-500" />
            </div>
          </div>
          <h3 className="text-2xl font-bold text-gray-950 mb-2 tracking-tight">
            No starred items yet
          </h3>
          <p className="text-[15px] text-gray-500 max-w-md font-medium">
            Click the star icon on any bookmark to pin your favorite resources
            here for quick access.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {starredItems.map((item) => (
            <div
              key={item._id}
              className="group bg-white border border-gray-100/70 rounded-[28px] p-8 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.03)] hover:shadow-[0_20px_50px_-10px_rgba(0,0,0,0.08)] hover:-translate-y-1 transition-all duration-300 flex flex-col relative overflow-hidden"
            >
              <div className="flex justify-between items-start mb-5">
                <div className="flex items-center gap-2 text-[12px] font-semibold text-gray-400 uppercase tracking-wider">
                  <FolderOpen
                    size={16}
                    weight="fill"
                    className="text-gray-300"
                  />
                  <span className="truncate max-w-[150px]">
                    {item.collection_name}
                  </span>
                </div>

                <div className="flex items-center gap-1 -mr-2 -mt-2">
                  <button
                    onClick={() => handleUnstar(item._id)}
                    className="group/star p-2 rounded-full hover:bg-amber-50 transition-colors"
                    title="Remove from Starred"
                  >
                    <div className="relative">
                      <Star
                        size={20}
                        weight="fill"
                        className="text-amber-400 group-hover/star:opacity-0 transition-opacity absolute inset-0"
                      />
                      <Star
                        size={20}
                        weight="regular"
                        className="text-amber-500 opacity-0 group-hover/star:opacity-100 transition-opacity"
                      />
                    </div>
                  </button>

                  <div className="relative kebab-menu-container">
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        setActiveMenu(
                          activeMenu === item._id ? null : item._id,
                        );
                      }}
                      className="p-2 text-gray-400 hover:text-gray-900 hover:bg-gray-100 rounded-full transition-all"
                    >
                      <DotsThree size={24} weight="bold" />
                    </button>

                    {activeMenu === item._id && (
                      <div
                        onClick={(e) => e.stopPropagation()}
                        className="absolute right-0 top-full mt-1 w-48 py-2 bg-white border border-gray-100 rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.12)] z-50 overflow-hidden font-poppins animate-in fade-in slide-in-from-top-2 duration-200"
                      >
                        <button
                          onClick={() => handleUnstar(item._id)}
                          className="w-full text-left px-4 py-2.5 text-[13px] font-medium text-gray-600 hover:bg-amber-50 hover:text-amber-700 transition-colors flex items-center gap-2"
                        >
                          <Star size={16} weight="bold" /> Unstar Item
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <a
                href={item.url}
                target="_blank"
                rel="noreferrer"
                className="font-bold text-[22px] text-gray-950 leading-snug hover:text-emerald-600 transition-colors cursor-pointer mb-4 line-clamp-2"
                title={item.title}
              >
                {item.title || item.url}
              </a>

              <div className="bg-gray-50/50 rounded-2xl p-4 mb-6 border border-gray-100/50">
                <p className="text-[14px] text-gray-600 leading-relaxed font-medium">
                  {item.summary?.short || (
                    <span className="flex items-center gap-2 text-gray-400 italic">
                      <CircleNotch size={14} className="animate-spin" />
                      {item.status === "failed"
                        ? "Failed to generate summary."
                        : "Generating summary..."}
                    </span>
                  )}
                </p>
              </div>

              <div className="flex items-end justify-between mt-auto pt-4 border-t border-gray-100/70">
                <div className="flex flex-wrap gap-2">
                  {item.tags?.map((tag) => (
                    <span
                      key={tag}
                      className="px-2.5 py-1 bg-white border border-gray-200 text-gray-500 text-[10px] font-bold rounded-md uppercase tracking-wide"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <a
                  href={item.url}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-center p-2.5 rounded-xl bg-gray-900 text-white hover:bg-emerald-600 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-emerald-500/20 transition-all duration-300 shrink-0"
                  title="Visit resource"
                >
                  <ArrowUpRight size={18} weight="bold" />
                </a>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
