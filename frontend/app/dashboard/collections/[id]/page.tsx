"use client";

import { useEffect, useState, use } from "react";
import { api } from "@/lib/api";
import {
  Trash,
  FolderMinus,
  CircleNotch,
  FolderOpen,
  Warning,
  ArrowUpRight,
  DotsThree,
  Check,
  Star,
  Archive as ArchiveIcon,
} from "@phosphor-icons/react";

interface Bookmark {
  _id: string;
  title?: string;
  url: string;
  summary?: {
    short: string;
  };
  tags?: string[];
  status: "processing" | "completed" | "failed";
  collection_id?: string | null;
  is_starred?: boolean;
}

interface Collection {
  _id: string;
  name: string;
}

export default function CollectionPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const unwrappedParams = use(params);
  const collectionId = unwrappedParams.id;

  const [bookmarks, setBookmarks] = useState<Bookmark[]>([]);
  const [collections, setCollections] = useState<Collection[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const [activeFolderMenu, setActiveFolderMenu] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    Promise.all([
      api.get(`/bookmarks?collection_id=${collectionId}`),
      api.get("/collections"),
    ])
      .then(([bookmarksRes, collectionsRes]) => {
        setBookmarks(bookmarksRes.data.data);
        setCollections(collectionsRes.data.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setError("Failed to load collection data");
        setLoading(false);
      });
  }, [collectionId]);

  useEffect(() => {
    const isProcessing = bookmarks.some((b) => b.status === "processing");
    if (!isProcessing) return;

    const interval = setInterval(async () => {
      try {
        const res = await api.get(`/bookmarks?collection_id=${collectionId}`);
        setBookmarks(res.data.data);
      } catch (err) {
        console.error("Failed to poll for updates", err);
      }
    }, 3000);

    return () => clearInterval(interval);
  }, [bookmarks, collectionId]);

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

  const handleMoveBookmark = async (
    bookmarkId: string,
    newCollectionId: string,
  ) => {
    try {
      const targetId = newCollectionId === "" ? null : newCollectionId;
      await api.patch(`/bookmarks/${bookmarkId}`, { collection_id: targetId });

      if (targetId !== collectionId) {
        setBookmarks(bookmarks.filter((b) => b._id !== bookmarkId));
      } else {
        setBookmarks(
          bookmarks.map((b) =>
            b._id === bookmarkId ? { ...b, collection_id: targetId } : b,
          ),
        );
      }
      setActiveFolderMenu(null);
    } catch (err) {
      alert("Failed to move bookmark");
    }
  };

  const handleToggleStar = async (
    bookmarkId: string,
    currentStatus: boolean,
  ) => {
    setBookmarks((prev) =>
      prev.map((b) =>
        b._id === bookmarkId ? { ...b, is_starred: !currentStatus } : b,
      ),
    );
    try {
      await api.patch(`/bookmarks/${bookmarkId}`, {
        is_starred: !currentStatus,
      });
    } catch (err) {
      setBookmarks((prev) =>
        prev.map((b) =>
          b._id === bookmarkId ? { ...b, is_starred: currentStatus } : b,
        ),
      );
      alert("Failed to update favorite status");
    }
  };

  const handleArchiveBookmark = async (bookmarkId: string) => {
    setBookmarks((prev) => prev.filter((b) => b._id !== bookmarkId));
    try {
      await api.patch(`/bookmarks/${bookmarkId}`, { is_archived: true });
    } catch (err) {
      alert("Failed to archive bookmark");
    }
  };

  const handleDelete = async (bookmarkId: string) => {
    if (!confirm("Are you sure you want to delete this bookmark?")) return;
    try {
      await api.delete(`/bookmarks/${bookmarkId}`);
      setBookmarks(bookmarks.filter((b) => b._id !== bookmarkId));
    } catch (err) {
      alert("Failed to delete");
    }
  };

  if (loading)
    return (
      <div className="flex h-[60vh] flex-col items-center justify-center gap-3 text-gray-400">
        <CircleNotch size={28} className="animate-spin text-emerald-600" />
      </div>
    );

  if (error)
    return (
      <div className="max-w-[1300px] mx-auto px-6 py-10">
        <div className="p-4 bg-red-50 border border-red-200 text-red-700 rounded-lg text-sm font-medium flex items-center gap-3 shadow-sm">
          <Warning size={20} weight="fill" />
          {error}
        </div>
      </div>
    );

  const currentCollectionName =
    collections.find((c) => c._id === collectionId)?.name || "Collection View";

  return (
    <div className="max-w-[1300px] mx-auto pb-16 px-6">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8 py-6 border-b border-gray-200">
        <div className="flex items-center gap-4">
          <div className="flex items-center justify-center w-14 h-14 bg-gray-50 border border-gray-200 rounded-xl shadow-sm">
            <FolderOpen size={28} weight="fill" className="text-gray-400" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-gray-900 tracking-tight mb-1">
              {currentCollectionName}
            </h1>
            <p className="text-sm text-gray-500">
              Organized insights and saved documents.
            </p>
          </div>
        </div>
      </div>

      {bookmarks.length === 0 ? (
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-300">
          <div className="flex flex-col items-center justify-center py-24 px-6 text-center bg-gray-50/50 border-2 border-dashed border-gray-200 rounded-2xl">
            <div className="flex items-center justify-center w-14 h-14 mb-5 bg-white border border-gray-200 rounded-xl shadow-sm ring-4 ring-gray-50">
              <FolderOpen size={24} className="text-gray-400" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-1">
              Folder is empty
            </h3>
            <p className="text-sm text-gray-500 max-w-sm">
              Move bookmarks into this collection to keep related research
              together.
            </p>
          </div>
        </div>
      ) : (
        <div className="flex flex-col gap-5">
          {bookmarks.map((bookmark) => (
            <div
              key={bookmark._id}
              className="bg-white border border-gray-200 rounded-2xl p-6 sm:p-8 shadow-sm hover:shadow-md hover:border-emerald-300 transition-all duration-200 flex flex-col group relative"
            >
              {/* Card Header */}
              <div className="flex justify-between items-start gap-8 mb-3">
                <a
                  href={bookmark.url}
                  target="_blank"
                  rel="noreferrer"
                  className="font-semibold text-xl text-gray-900 leading-snug hover:text-emerald-600 transition-colors line-clamp-2 focus:outline-none focus-visible:underline"
                  title={bookmark.title}
                >
                  {bookmark.title || "Untitled Document"}
                </a>
                <div className="flex items-center gap-2 shrink-0">
                  <span
                    className={`inline-flex items-center justify-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-semibold uppercase tracking-wider ${
                      bookmark.status === "processing"
                        ? "bg-emerald-50 text-emerald-700 border border-emerald-100"
                        : bookmark.status === "failed"
                          ? "bg-red-50 text-red-700 border border-red-100"
                          : "bg-emerald-50 text-emerald-600 border border-emerald-100"
                    }`}
                  >
                    {bookmark.status === "processing" && (
                      <CircleNotch size={12} className="animate-spin" />
                    )}
                    {bookmark.status === "failed" && (
                      <Warning size={12} weight="fill" />
                    )}
                    {bookmark.status}
                  </span>
                  <a
                    href={bookmark.url}
                    target="_blank"
                    rel="noreferrer"
                    className="p-1.5 rounded-lg text-gray-400 hover:text-emerald-600 hover:bg-emerald-50 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500"
                    title="Visit source website"
                  >
                    <ArrowUpRight size={18} weight="bold" />
                  </a>
                </div>
              </div>

              {/* Summary */}
              <p className="text-sm text-gray-600 leading-relaxed mb-6 max-w-4xl">
                {bookmark.summary?.short || (
                  <span
                    className={`flex items-center gap-2 italic ${
                      bookmark.status === "failed"
                        ? "text-red-400"
                        : "text-gray-400"
                    }`}
                  >
                    {bookmark.status === "processing" && (
                      <CircleNotch size={14} className="animate-spin" />
                    )}
                    {bookmark.status === "failed"
                      ? "Failed to extract content."
                      : "Analyzing content and generating abstract..."}
                  </span>
                )}
              </p>

              {/* Footer & Actions */}
              <div className="flex items-center justify-between mt-auto pt-4 border-t border-gray-100">
                <div className="flex flex-wrap gap-1.5">
                  {bookmark.tags?.map((tag) => (
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
                      handleToggleStar(bookmark._id, !!bookmark.is_starred);
                    }}
                    className={`p-1.5 rounded-lg transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 ${
                      bookmark.is_starred
                        ? "text-amber-500 bg-amber-50 hover:bg-amber-100"
                        : "text-gray-400 hover:text-amber-500 hover:bg-amber-50"
                    }`}
                    title={bookmark.is_starred ? "Unstar" : "Star"}
                  >
                    <Star
                      size={18}
                      weight={bookmark.is_starred ? "fill" : "bold"}
                    />
                  </button>

                  <div className="relative folder-menu-container">
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        setActiveFolderMenu(
                          activeFolderMenu === bookmark._id
                            ? null
                            : bookmark._id,
                        );
                        setActiveMenu(null);
                      }}
                      className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium border rounded-lg transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-300 ${
                        activeFolderMenu === bookmark._id
                          ? "bg-white border-gray-300 text-gray-900 shadow-sm"
                          : "bg-gray-50 border-gray-200 text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                      }`}
                    >
                      <FolderOpen
                        size={14}
                        weight={bookmark.collection_id ? "fill" : "regular"}
                        className={
                          bookmark.collection_id
                            ? "text-emerald-500"
                            : "text-gray-400"
                        }
                      />
                      <span className="max-w-[120px] truncate">
                        {currentCollectionName}
                      </span>
                    </button>

                    {activeFolderMenu === bookmark._id && (
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
                            onClick={() => handleMoveBookmark(bookmark._id, "")}
                            className="w-full text-left px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 hover:text-gray-900 rounded-lg transition-colors flex items-center justify-between"
                          >
                            <span>Root Archive</span>
                            {!bookmark.collection_id && (
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
                                handleMoveBookmark(bookmark._id, c._id)
                              }
                              className="w-full text-left px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 hover:text-gray-900 rounded-lg transition-colors flex items-center justify-between group"
                            >
                              <span className="truncate pr-4">{c.name}</span>
                              {bookmark.collection_id === c._id ? (
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
                          activeMenu === bookmark._id ? null : bookmark._id,
                        );
                        setActiveFolderMenu(null);
                      }}
                      className={`p-1.5 rounded-lg transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-300 ${
                        activeMenu === bookmark._id
                          ? "bg-gray-100 text-gray-900"
                          : "text-gray-400 hover:text-gray-900 hover:bg-gray-100"
                      }`}
                    >
                      <DotsThree size={20} weight="bold" />
                    </button>

                    {activeMenu === bookmark._id && (
                      <div
                        onClick={(e) => e.stopPropagation()}
                        className="absolute right-0 top-full mt-1 w-48 py-1.5 bg-white border border-gray-200 shadow-lg rounded-xl overflow-hidden z-50 animate-in fade-in slide-in-from-top-2 duration-200"
                      >
                        <button
                          onClick={() => handleArchiveBookmark(bookmark._id)}
                          className="w-full text-left px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors flex items-center gap-2.5"
                        >
                          <ArchiveIcon size={16} /> Send to Archive
                        </button>
                        <button
                          onClick={() => handleDelete(bookmark._id)}
                          className="w-full text-left px-4 py-2 text-sm font-medium text-red-600 hover:bg-red-50 transition-colors flex items-center gap-2.5 mt-1 border-t border-gray-100 pt-2"
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
