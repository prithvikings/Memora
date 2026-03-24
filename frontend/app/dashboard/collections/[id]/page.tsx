// src/app/dashboard/collections/[id]/page.tsx
"use client";

import { useEffect, useState, use } from "react";
import { api } from "@/lib/api";
import {
  Trash,
  FolderMinus,
  Link as LinkIcon,
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
      <div className="flex h-full flex-col items-center justify-center gap-3 text-gray-400">
        <CircleNotch size={28} className="animate-spin text-[#00a870]" />
        <p className="text-sm font-medium animate-pulse">
          Loading collection...
        </p>
      </div>
    );

  if (error)
    return (
      <div className="max-w-5xl mx-auto p-4 bg-red-50 text-red-600 rounded-2xl border border-red-200 font-medium flex items-center gap-3">
        <span className="bg-white p-2 rounded-xl shadow-sm">⚠️</span>
        {error}
      </div>
    );

  const currentCollectionName =
    collections.find((c) => c._id === collectionId)?.name || "Collection View";

  return (
    <div className="max-w-5xl mx-auto pb-16">
      <div className="mb-10 flex items-center gap-4">
        <div className="p-3 bg-gray-100 rounded-2xl">
          <FolderOpen size={32} weight="fill" className="text-gray-400" />
        </div>
        <div>
          <h1 className="text-[32px] font-bold text-gray-900 tracking-tight leading-tight">
            {currentCollectionName}
          </h1>
          <p className="text-gray-500 text-[15px]">
            Organized insights and saved documents.
          </p>
        </div>
      </div>

      {bookmarks.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-24 px-4 bg-white border border-gray-200 rounded-3xl text-center shadow-sm">
          <div className="bg-gray-50 p-5 rounded-full mb-5">
            <FolderOpen size={36} className="text-gray-400" />
          </div>
          <h3 className="text-xl font-bold text-gray-900 mb-2">
            Folder is empty
          </h3>
          <p className="text-[15px] text-gray-500 max-w-md">
            Move bookmarks into this collection to keep related research
            together.
          </p>
        </div>
      ) : (
        <div className="flex flex-col gap-5">
          {bookmarks.map((bookmark) => (
            <div
              key={bookmark._id}
              className="bg-white border border-gray-100 rounded-3xl p-7 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.03)] hover:shadow-[0_4px_24px_-4px_rgba(0,0,0,0.08)] transition-shadow duration-300 flex flex-col group relative"
            >
              <div className="flex justify-between items-start gap-8 mb-4">
                <h3
                  className="font-bold text-2xl text-gray-900 leading-snug group-hover:text-[#00a870] transition-colors"
                  title={bookmark.title}
                >
                  {bookmark.title || "Untitled Document"}
                </h3>

                <div className="flex flex-col items-end gap-2.5 min-w-[140px]">
                  <span
                    className={`flex items-center justify-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest w-fit ${
                      bookmark.status === "processing"
                        ? "bg-emerald-100/50 text-emerald-700"
                        : "bg-emerald-50 text-[#00a870]"
                    }`}
                  >
                    {bookmark.status === "processing" && (
                      <CircleNotch size={12} className="animate-spin" />
                    )}
                    {bookmark.status}
                  </span>
                  <a
                    href={bookmark.url}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-1.5 text-[12px] text-emerald-700 hover:text-emerald-900 truncate transition-colors font-medium group/link"
                  >
                    <LinkIcon
                      size={14}
                      weight="bold"
                      className="text-emerald-600/70 group-hover/link:text-emerald-800"
                    />
                    {bookmark.url.replace(/^https?:\/\//, "").split("/")[0]}
                  </a>
                </div>
              </div>

              <p className="text-[15px] text-gray-600 leading-relaxed mb-8 max-w-4xl">
                {bookmark.summary?.short || (
                  <span className="flex items-center gap-2 text-gray-400 italic">
                    <CircleNotch size={14} className="animate-spin" />
                    Analyzing content and generating abstract...
                  </span>
                )}
              </p>

              <div className="flex items-end justify-between mt-auto">
                <div className="flex flex-wrap gap-2">
                  {bookmark.tags?.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1.5 bg-[#f0f4f8] text-[#4a5f78] text-[11px] font-semibold rounded-full uppercase tracking-wider"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="flex items-center gap-3">
                  <div className="relative group/folder">
                    <div className="flex items-center gap-2 text-sm text-gray-600 font-medium bg-gray-50 hover:bg-gray-100 border border-gray-100 px-3 py-2 rounded-xl transition-colors cursor-pointer">
                      <FolderOpen
                        size={16}
                        weight="fill"
                        className="text-gray-400"
                      />
                      <select
                        value={bookmark.collection_id || ""}
                        onChange={(e) =>
                          handleMoveBookmark(bookmark._id, e.target.value)
                        }
                        className="bg-transparent outline-none cursor-pointer appearance-none pr-4"
                      >
                        <option value="">Root Archive</option>
                        {collections.map((c) => (
                          <option key={c._id} value={c._id}>
                            {c.name}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {bookmark.collection_id && (
                    <button
                      onClick={() => handleMoveBookmark(bookmark._id, "")}
                      className="p-2 text-gray-400 hover:text-amber-600 hover:bg-amber-50 rounded-xl transition-colors"
                      title="Remove from folder"
                    >
                      <FolderMinus size={18} weight="bold" />
                    </button>
                  )}
                  <button
                    onClick={() => handleDelete(bookmark._id)}
                    className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-xl transition-colors"
                    title="Delete permanently"
                  >
                    <Trash size={18} weight="bold" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
