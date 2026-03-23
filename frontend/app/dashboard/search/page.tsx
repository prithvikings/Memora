// src/app/dashboard/search/page.tsx
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

export default function SearchPage({ searchParams }: { searchParams: Promise<{ q?: string }> }) {
  // Unwrap the searchParams promise (Next.js 15+)
  const unwrappedParams = use(searchParams);
  const query = unwrappedParams.q;

  const [results, setResults] = useState<Bookmark[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!query) {
      setLoading(false);
      return;
    }

    setLoading(true);
    // Hit the Elasticsearch endpoint
    api
      .get(`/search?q=${encodeURIComponent(query)}&type=hybrid`)
      .then((res) => {
        setResults(res.data.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, [query]);

  if (loading)
    return (
      <div className="text-gray-500">Searching AI vectors for "{query}"...</div>
    );

  return (
    <div>
      <h1 className="text-2xl font-bold mb-2">Search Results</h1>
      <p className="text-gray-500 mb-6">
        Showing AI semantic matches for "{query}"
      </p>

      {!query || results.length === 0 ? (
        <div className="text-gray-500">
          No matches found. Try describing the concept differently.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {results.map((bookmark) => (
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
