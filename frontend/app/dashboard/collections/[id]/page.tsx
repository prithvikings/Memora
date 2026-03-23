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
  status?: "processing" | "ready";
}

export default function CollectionPage({ params }: { params: Promise<{ id: string }> }) {
  // Unwrap the params promise (Next.js 15+)
  const unwrappedParams = use(params);
  const collectionId = unwrappedParams.id;

  const [bookmarks, setBookmarks] = useState<Bookmark[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    // Hit the filtered endpoint
    api
      .get(`/bookmarks?collection_id=${collectionId}`)
      .then((res) => {
        setBookmarks(res.data.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setError("Failed to load collection");
        setLoading(false);
      });
  }, [collectionId]);

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
              className="bg-white border rounded-xl p-5 shadow-sm hover:shadow-md transition-shadow flex flex-col h-72"
            >
              <h3
                className="font-semibold text-lg mb-2 line-clamp-2 leading-tight"
                title={bookmark.title}
              >
                {bookmark.title || "Untitled"}
              </h3>

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

              <div className="flex items-center justify-between text-xs mt-auto pt-4 border-t border-gray-100">
                <a
                  href={bookmark.url}
                  target="_blank"
                  rel="noreferrer"
                  className="text-gray-400 hover:text-blue-600 truncate w-2/3 transition-colors"
                >
                  {bookmark.url.replace(/^https?:\/\//, "")}
                </a>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
