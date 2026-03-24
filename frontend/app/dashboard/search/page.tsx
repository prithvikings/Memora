// src/app/dashboard/search/page.tsx
"use client";

import { useEffect, useState, use } from "react";
import { api } from "@/lib/api";
import { Globe, CircleNotch, Robot } from "@phosphor-icons/react";

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

export default function SearchPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
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
      <div className="flex items-center gap-2 text-gray-500">
        <CircleNotch size={20} className="animate-spin text-[#0a9a1a]" />
        Searching AI vectors for "{query}"...
      </div>
    );

  return (
    <div className="max-w-7xl mx-auto">
      <h1 className="text-2xl font-semibold text-gray-900 mb-2 tracking-tight">
        Search Results
      </h1>
      <p className="flex items-center gap-1.5 text-sm text-gray-500 mb-8">
        <Robot size={16} />
        Showing AI semantic matches for{" "}
        <span className="font-semibold text-gray-700">"{query}"</span>
      </p>

      {!query || results.length === 0 ? (
        <div className="text-gray-500 bg-white border border-gray-200 p-8 rounded-2xl text-center shadow-[0_2px_10px_-3px_rgba(6,81,237,0.05)]">
          No matches found. Try describing the concept differently.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {results.map((bookmark) => (
            <div
              key={bookmark._id}
              className="bg-white border border-gray-200 rounded-2xl p-5 shadow-[0_2px_10px_-3px_rgba(6,81,237,0.05)] hover:shadow-md transition-all flex flex-col h-[280px]"
            >
              {/* Card Header */}
              <h3
                className="font-semibold text-[15px] text-gray-900 mb-3 line-clamp-2 leading-snug"
                title={bookmark.title}
              >
                {bookmark.title || "Untitled"}
              </h3>

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
              <div className="flex items-center justify-between mt-auto pt-4 border-t border-gray-100">
                <a
                  href={bookmark.url}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-1 text-[11px] text-gray-400 hover:text-[#0a9a1a] truncate w-full transition-colors font-medium"
                >
                  <Globe size={12} />
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
