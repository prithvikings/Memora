"use client";

import React, { useState, useEffect } from "react";
import { api } from "@/lib/api";
import {
  Star,
  DotsThree,
  ArrowUpRight,
  FolderOpen,
  CircleNotch,
  Warning,
  Check,
  ArchiveIcon,
  Trash,
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
  is_starred?: boolean;
}

interface Collection {
  _id: string;
  name: string;
}

export default function StarredPage() {
  const [starredItems, setStarredItems] = useState<
    (Bookmark & { collection_name: string })[]
  >([]);
  const [collections, setCollections] = useState<Collection[]>([]);
  const [loading, setLoading] = useState(true);

  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const [activeFolderMenu, setActiveFolderMenu] = useState<string | null>(null);

  const fetchData = async () => {
    try {
      const [bookmarksRes, collectionsRes] = await Promise.all([
        api.get("/bookmarks?is_starred=true"),
        api.get("/collections"),
      ]);

      const bookmarks: Bookmark[] = bookmarksRes.data.data;
      const colls: Collection[] = collectionsRes.data.data;
      setCollections(colls);

      const enrichedBookmarks = bookmarks.map((b) => ({
        ...b,
        collection_name:
          colls.find((c) => c._id === b.collection_id)?.name || "Root Archive",
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

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as Element;
      if (target && !document.contains(target)) return;
      if (!target.closest(".kebab-menu-container")) setActiveMenu(null);
      if (!target.closest(".folder-menu-container")) setActiveFolderMenu(null);
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleUnstar = async (id: string) => {
    setStarredItems((prev) => prev.filter((item) => item._id !== id));
    try {
      await api.patch(`/bookmarks/${id}`, { is_starred: false });
    } catch (error) {
      alert("Failed to unstar bookmark.");
      fetchData();
    }
  };

  const handleMoveBookmark = async (
    bookmarkId: string,
    newCollectionId: string,
  ) => {
    try {
      const targetId = newCollectionId === "" ? null : newCollectionId;
      await api.patch(`/bookmarks/${bookmarkId}`, { collection_id: targetId });

      setStarredItems(
        starredItems.map((b) =>
          b._id === bookmarkId
            ? {
                ...b,
                collection_id: targetId,
                collection_name:
                  collections.find((c) => c._id === targetId)?.name ||
                  "Root Archive",
              }
            : b,
        ),
      );
      setActiveFolderMenu(null);
    } catch (err) {
      alert("Failed to move bookmark");
    }
  };

  const handleDelete = async (bookmarkId: string) => {
    if (!confirm("Are you sure you want to delete this bookmark?")) return;
    try {
      await api.delete(`/bookmarks/${bookmarkId}`);
      setStarredItems(starredItems.filter((b) => b._id !== bookmarkId));
    } catch (err) {
      alert("Failed to delete");
    }
  };

  if (loading) {
    return (
      <div className="flex h-[60vh] flex-col items-center justify-center gap-3 text-gray-400">
        <CircleNotch size={28} className="animate-spin text-amber-500" />
      </div>
    );
  }

  return (
    <div className="max-w-[1300px] mx-auto pb-16 px-6">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8 py-6 border-b border-gray-200">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-amber-50 border border-amber-100 mb-4 shadow-sm">
            <Star size={14} weight="fill" className="text-amber-500" />
            <span className="text-xs font-semibold text-amber-700 uppercase tracking-wider">
              Favorites
            </span>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 tracking-tight mb-2">
            Starred
          </h1>
          <p className="text-sm text-gray-500">
            Your most valuable assets and quick references, kept front and
            center.
          </p>
        </div>
      </div>

      {starredItems.length === 0 ? (
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-300">
          <div className="flex flex-col items-center justify-center py-24 px-6 text-center bg-gray-50/50 border-2 border-dashed border-gray-200 rounded-2xl">
            <div className="flex items-center justify-center w-14 h-14 mb-5 bg-white border border-gray-200 rounded-xl shadow-sm ring-4 ring-gray-50">
              <Star size={24} className="text-gray-400" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-1">
              No starred items yet
            </h3>
            <p className="text-sm text-gray-500 max-w-sm">
              Click the star icon on any bookmark to pin your favorite resources
              here for quick access.
            </p>
          </div>
        </div>
      ) : (
        <div className="flex flex-col gap-5">
          {starredItems.map((item) => (
            <div
              key={item._id}
              className="bg-white border border-gray-200 rounded-2xl p-6 sm:p-8 shadow-sm hover:shadow-md hover:border-amber-300 transition-all duration-200 flex flex-col group relative"
            >
              {/* Card Header */}
              <div className="flex justify-between items-start gap-8 mb-3">
                <a
                  href={item.url}
                  target="_blank"
                  rel="noreferrer"
                  className="font-semibold text-xl text-gray-900 leading-snug hover:text-amber-600 transition-colors line-clamp-2 focus:outline-none focus-visible:underline"
                  title={item.title}
                >
                  {item.title || item.url}
                </a>
                <div className="flex items-center gap-2 shrink-0">
                  <span
                    className={`inline-flex items-center justify-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-semibold uppercase tracking-wider ${
                      item.status === "processing"
                        ? "bg-amber-50 text-amber-700 border border-amber-100"
                        : item.status === "failed"
                          ? "bg-red-50 text-red-700 border border-red-100"
                          : "bg-emerald-50 text-emerald-600 border border-emerald-100"
                    }`}
                  >
                    {item.status === "processing" && (
                      <CircleNotch size={12} className="animate-spin" />
                    )}
                    {item.status === "failed" && (
                      <Warning size={12} weight="fill" />
                    )}
                    {item.status || "COMPLETED"}
                  </span>
                  <a
                    href={item.url}
                    target="_blank"
                    rel="noreferrer"
                    className="p-1.5 rounded-lg text-gray-400 hover:text-amber-600 hover:bg-amber-50 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-500"
                    title="Visit source website"
                  >
                    <ArrowUpRight size={18} weight="bold" />
                  </a>
                </div>
              </div>

              {/* Summary */}
              <p className="text-sm text-gray-600 leading-relaxed mb-6 max-w-4xl">
                {item.summary?.short || (
                  <span
                    className={`flex items-center gap-2 italic ${
                      item.status === "failed"
                        ? "text-red-400"
                        : "text-gray-400"
                    }`}
                  >
                    {item.status === "processing" && (
                      <CircleNotch size={14} className="animate-spin" />
                    )}
                    {item.status === "failed"
                      ? "Failed to extract content."
                      : "Analyzing content and generating abstract..."}
                  </span>
                )}
              </p>

              {/* Footer & Actions */}
              <div className="flex items-center justify-between mt-auto pt-4 border-t border-gray-100">
                <div className="flex flex-wrap gap-1.5">
                  {item.tags?.map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-1 bg-gray-50 border border-gray-200 text-gray-600 text-xs font-medium rounded-md uppercase tracking-wider"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="flex items-center gap-1">
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      handleUnstar(item._id);
                    }}
                    className="p-1.5 rounded-lg transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 text-amber-500 bg-amber-50 hover:bg-amber-100"
                    title="Unstar"
                  >
                    <Star size={18} weight="fill" />
                  </button>

                  <div className="relative folder-menu-container">
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        setActiveFolderMenu(
                          activeFolderMenu === item._id ? null : item._id,
                        );
                        setActiveMenu(null);
                      }}
                      className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium border rounded-lg transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-300 ${
                        activeFolderMenu === item._id
                          ? "bg-white border-gray-300 text-gray-900 shadow-sm"
                          : "bg-gray-50 border-gray-200 text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                      }`}
                    >
                      <FolderOpen
                        size={14}
                        weight={item.collection_id ? "fill" : "regular"}
                        className={
                          item.collection_id
                            ? "text-emerald-500"
                            : "text-gray-400"
                        }
                      />
                      <span className="max-w-[120px] truncate">
                        {item.collection_name}
                      </span>
                    </button>

                    {activeFolderMenu === item._id && (
                      <div
                        onClick={(e) => e.stopPropagation()}
                        className="absolute right-0 bottom-full mb-2 w-56 bg-white border border-gray-200 rounded-xl shadow-lg py-1.5 z-50 overflow-hidden animate-in fade-in slide-in-from-bottom-2 duration-200"
                      >
                        <div className="px-3 pb-1.5 mb-1.5 border-b border-gray-100">
                          <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
                            Move to...
                          </span>
                        </div>
                        <div className="max-h-[200px] overflow-y-auto px-1.5">
                          <button
                            onClick={() => handleMoveBookmark(item._id, "")}
                            className="w-full text-left px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 hover:text-gray-900 rounded-lg transition-colors flex items-center justify-between"
                          >
                            <span>Root Archive</span>
                            {!item.collection_id && (
                              <Check
                                size={14}
                                weight="bold"
                                className="text-emerald-600"
                              />
                            )}
                          </button>
                          {collections.map((c) => (
                            <button
                              key={c._id}
                              onClick={() =>
                                handleMoveBookmark(item._id, c._id)
                              }
                              className="w-full text-left px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 hover:text-gray-900 rounded-lg transition-colors flex items-center justify-between group"
                            >
                              <span className="truncate pr-4">{c.name}</span>
                              {item.collection_id === c._id ? (
                                <Check
                                  size={14}
                                  weight="bold"
                                  className="text-emerald-600 shrink-0"
                                />
                              ) : (
                                <FolderOpen
                                  size={14}
                                  className="text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity shrink-0"
                                />
                              )}
                            </button>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="relative kebab-menu-container">
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        setActiveMenu(
                          activeMenu === item._id ? null : item._id,
                        );
                        setActiveFolderMenu(null);
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
                        className="absolute right-0 top-full mt-1 w-48 py-1.5 bg-white border border-gray-200 shadow-lg rounded-xl overflow-hidden z-50 animate-in fade-in slide-in-from-top-2 duration-200"
                      >
                        <button
                          onClick={() => handleDelete(item._id)}
                          className="w-full text-left px-4 py-2 text-sm font-medium text-red-600 hover:bg-red-50 transition-colors flex items-center gap-2.5"
                        >
                          <Trash size={16} /> Delete
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
