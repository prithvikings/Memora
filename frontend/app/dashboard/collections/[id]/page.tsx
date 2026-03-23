// src/app/dashboard/collections/[id]/page.tsx
"use client";

import { useEffect, useState, use } from "react";
import { api } from "@/lib/api";

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

  // 1. Initial Fetch (Bookmarks in this collection + All Collections for the dropdown)
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

  // 2. Short-Polling for AI Processing
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

      // If moved out of this specific collection, remove it from the UI immediately
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
    return <div className="text-gray-500">Loading collection...</div>;
  if (error) return <div className="text-red-500">{error}</div>;

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Collection View</h1>

      {bookmarks.length === 0 ? (
        <div className="text-gray-500">This collection is empty.</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {bookmarks.map((bookmark) => (
            <div
              key={bookmark._id}
              className="bg-white border rounded-xl p-5 shadow-sm hover:shadow-md transition-shadow flex flex-col h-80 group"
            >
              <div className="flex justify-between items-start mb-2">
                <h3
                  className="font-semibold text-lg line-clamp-2 leading-tight pr-2"
                  title={bookmark.title}
                >
                  {bookmark.title || "Untitled"}
                </h3>

                <div className="flex items-center gap-3 opacity-0 group-hover:opacity-100 transition-opacity">
                  {bookmark.collection_id && (
                    <button
                      onClick={() => handleMoveBookmark(bookmark._id, "")}
                      className="text-xs text-orange-500 hover:text-orange-700 font-medium"
                      title="Remove from this folder"
                    >
                      Remove
                    </button>
                  )}

                  <button
                    onClick={() => handleDelete(bookmark._id)}
                    className="text-red-400 hover:text-red-600 font-bold"
                    title="Delete permanently"
                  >
                    ✕
                  </button>
                </div>
              </div>

              <p className="text-sm text-gray-600 line-clamp-3 mb-4 flex-1">
                {bookmark.summary?.short || "Waiting for AI processing..."}
              </p>

              <div className="flex flex-wrap gap-2 mb-4 overflow-hidden h-6">
                {bookmark.tags?.slice(0, 3).map((tag) => (
                  <span
                    key={tag}
                    className="px-2 py-0.5 bg-blue-50 text-blue-700 text-xs font-medium rounded-full truncate max-w-[100px]"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <div className="flex flex-col gap-3 mt-auto pt-4 border-t border-gray-100">
                <select
                  value={bookmark.collection_id || ""}
                  onChange={(e) =>
                    handleMoveBookmark(bookmark._id, e.target.value)
                  }
                  className="w-full text-xs border border-gray-200 rounded p-1.5 bg-gray-50 text-gray-700 outline-none focus:border-blue-500"
                >
                  <option value="">Unorganized (Root)</option>
                  {collections.map((c) => (
                    <option key={c._id} value={c._id}>
                      {c.name}
                    </option>
                  ))}
                </select>

                <div className="flex items-center justify-between text-xs">
                  <a
                    href={bookmark.url}
                    target="_blank"
                    rel="noreferrer"
                    className="text-gray-400 hover:text-blue-600 truncate w-2/3 transition-colors"
                  >
                    {bookmark.url.replace(/^https?:\/\//, "")}
                  </a>
                  <span
                    className={`px-2 py-1 rounded-md font-medium ${
                      bookmark.status === "processing"
                        ? "bg-amber-50 text-amber-700"
                        : "bg-emerald-50 text-emerald-700"
                    }`}
                  >
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
