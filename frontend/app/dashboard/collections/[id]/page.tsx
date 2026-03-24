// src/app/dashboard/collections/[id]/page.tsx
"use client";

import { useEffect, useState, use } from "react";
import { api } from "@/lib/api";
import {
  Trash,
  FolderMinus,
  Globe,
  CircleNotch,
  FolderOpen,
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
    } catch (err) {
      alert("Failed to move bookmark");
      console.error(err);
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
      <div className="flex items-center gap-2 text-gray-500">
        <CircleNotch size={20} className="animate-spin text-[#0a9a1a]" />
        Loading collection...
      </div>
    );

  if (error)
    return (
      <div className="p-4 bg-red-50 text-red-600 rounded-lg border border-red-100">
        {error}
      </div>
    );

  const currentCollectionName =
    collections.find((c) => c._id === collectionId)?.name || "Collection View";

  return (
    <div className="max-w-7xl mx-auto">
      <div className="flex items-center gap-3 mb-8">
        <div className="p-2 bg-gray-100 rounded-lg">
          <FolderOpen size={24} weight="duotone" className="text-gray-500" />
        </div>
        <h1 className="text-2xl font-semibold text-gray-900 tracking-tight">
          {currentCollectionName}
        </h1>
      </div>

      {bookmarks.length === 0 ? (
        <div className="text-gray-500 bg-white border border-gray-200 p-8 rounded-2xl text-center shadow-[0_2px_10px_-3px_rgba(6,81,237,0.05)]">
          This collection is empty.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {bookmarks.map((bookmark) => (
            <div
              key={bookmark._id}
              className="bg-white border border-gray-200 rounded-2xl p-5 shadow-[0_2px_10px_-3px_rgba(6,81,237,0.05)] hover:shadow-md transition-all flex flex-col h-[320px] group"
            >
              {/* Card Header */}
              <div className="flex justify-between items-start mb-3 gap-2">
                <h3
                  className="font-semibold text-[15px] text-gray-900 line-clamp-2 leading-snug"
                  title={bookmark.title}
                >
                  {bookmark.title || "Untitled"}
                </h3>

                {/* Actions (Visible on Hover) */}
                <div className="flex items-center gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity bg-white pl-2">
                  {bookmark.collection_id && (
                    <button
                      onClick={() => handleMoveBookmark(bookmark._id, "")}
                      className="p-1.5 text-gray-400 hover:text-orange-500 hover:bg-orange-50 rounded-md transition-colors"
                      title="Remove from folder"
                    >
                      <FolderMinus size={16} />
                    </button>
                  )}
                  <button
                    onClick={() => handleDelete(bookmark._id)}
                    className="p-1.5 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-md transition-colors"
                    title="Delete permanently"
                  >
                    <Trash size={16} />
                  </button>
                </div>
              </div>

              {/* Summary */}
              <p className="text-sm text-gray-500 line-clamp-3 mb-4 flex-1 leading-relaxed">
                {bookmark.summary?.short || "Waiting for AI processing..."}
              </p>

              {/* Tags */}
              <div className="flex flex-wrap gap-1.5 mb-4 overflow-hidden h-[22px]">
                {bookmark.tags?.slice(0, 3).map((tag) => (
                  <span
                    key={tag}
                    className="px-2 py-0.5 bg-gray-100 text-gray-600 text-[11px] font-medium rounded-md truncate max-w-[100px]"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* Card Footer */}
              <div className="flex flex-col gap-3 mt-auto pt-4 border-t border-gray-100">
                <select
                  value={bookmark.collection_id || ""}
                  onChange={(e) =>
                    handleMoveBookmark(bookmark._id, e.target.value)
                  }
                  className="w-full text-xs border border-gray-200 rounded-lg p-2 bg-gray-50 text-gray-700 outline-none focus:border-gray-400 focus:ring-1 focus:ring-gray-400 transition-all cursor-pointer appearance-none"
                >
                  <option value="">Unorganized (Root)</option>
                  {collections.map((c) => (
                    <option key={c._id} value={c._id}>
                      {c.name}
                    </option>
                  ))}
                </select>

                <div className="flex items-center justify-between mt-1">
                  <a
                    href={bookmark.url}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-1 text-[11px] text-gray-400 hover:text-[#0a9a1a] truncate w-2/3 transition-colors font-medium"
                  >
                    <Globe size={12} />
                    {bookmark.url.replace(/^https?:\/\//, "")}
                  </a>
                  <span
                    className={`flex items-center gap-1 px-2 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider ${
                      bookmark.status === "processing"
                        ? "bg-amber-50 text-amber-600 border border-amber-100"
                        : "bg-green-50 text-[#0a9a1a] border border-green-100"
                    }`}
                  >
                    {bookmark.status === "processing" && (
                      <CircleNotch size={10} className="animate-spin" />
                    )}
                    {bookmark.status}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
