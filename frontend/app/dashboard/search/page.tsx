// src/app/dashboard/search/page.tsx
"use client";

import { useEffect, useState, use } from "react";
import { api } from "@/lib/api";
import {
  Link as LinkIcon,
  CircleNotch,
  Robot,
  MagnifyingGlass,
} from "@phosphor-icons/react";

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
      <div className="flex h-full flex-col items-center justify-center gap-3 text-gray-400">
        <div className="relative">
          <CircleNotch size={32} className="animate-spin text-[#00a870]" />
          <Robot
            size={14}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-emerald-700"
          />
        </div>
        <p className="text-sm font-medium animate-pulse">
          Searching AI vectors for{" "}
          <span className="text-gray-800 font-bold">"{query}"</span>...
        </p>
      </div>
    );

  return (
    <div className="max-w-5xl mx-auto pb-16">
      <div className="mb-10">
        <h1 className="text-[32px] font-bold text-gray-900 tracking-tight mb-2">
          Search Results
        </h1>
        <p className="flex items-center gap-2 text-[15px] text-gray-500">
          <Robot size={18} className="text-emerald-600" />
          Showing AI semantic matches for{" "}
          <span className="font-bold text-gray-800">"{query}"</span>
        </p>
      </div>

      {!query || results.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-24 px-4 bg-white border border-gray-200 rounded-3xl text-center shadow-sm">
          <div className="bg-gray-50 p-5 rounded-full mb-5">
            <MagnifyingGlass size={36} className="text-gray-400" />
          </div>
          <h3 className="text-xl font-bold text-gray-900 mb-2">
            No matches found
          </h3>
          <p className="text-[15px] text-gray-500 max-w-md">
            Try describing the concept differently. Our AI understands ideas and
            topics, not just exact keywords.
          </p>
        </div>
      ) : (
        <div className="flex flex-col gap-5">
          {results.map((bookmark) => (
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
                {bookmark.summary?.short || "Waiting for AI processing..."}
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
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
