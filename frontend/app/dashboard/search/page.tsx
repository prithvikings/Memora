// src/app/dashboard/search/page.tsx
"use client";

import { useEffect, useState, use } from "react";
import { api } from "@/lib/api";
import {
  Link as LinkIcon,
  CircleNotch,
  Robot,
  MagnifyingGlass,
  ArrowUpRight,
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

  if (loading) {
    return (
      <div className="flex h-[60vh] flex-col items-center justify-center gap-4 text-gray-400 animate-in fade-in duration-300">
        <CircleNotch size={32} className="animate-spin text-emerald-600" />
        <p className="text-sm font-medium text-gray-500">
          Searching AI vectors for{" "}
          <span className="text-gray-900 font-semibold">"{query}"</span>...
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-[1300px] mx-auto pb-16 px-6">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8 py-6 border-b border-gray-200">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-50 border border-emerald-100 mb-4 shadow-sm">
            <Robot size={14} weight="fill" className="text-emerald-600" />
            <span className="text-xs font-semibold text-emerald-700 uppercase tracking-wider">
              AI Semantic Search
            </span>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 tracking-tight mb-2">
            Search Results
          </h1>
          <p className="text-sm text-gray-500">
            Showing semantic matches for{" "}
            <span className="font-semibold text-gray-900">"{query}"</span>
          </p>
        </div>
      </div>

      {!query || results.length === 0 ? (
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-300">
          <div className="flex flex-col items-center justify-center py-24 px-6 text-center bg-gray-50/50 border-2 border-dashed border-gray-200 rounded-2xl">
            <div className="flex items-center justify-center w-14 h-14 mb-5 bg-white border border-gray-200 rounded-xl shadow-sm ring-4 ring-gray-50">
              <MagnifyingGlass size={24} className="text-gray-400" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-1">
              No matches found
            </h3>
            <p className="text-sm text-gray-500 max-w-sm">
              Try describing the concept differently. Our AI understands ideas
              and topics, not just exact keywords.
            </p>
          </div>
        </div>
      ) : (
        <div className="flex flex-col gap-5">
          {results.map((bookmark) => {
            // Safe domain parsing
            let domain = bookmark.url;
            try {
              domain = new URL(bookmark.url).hostname.replace("www.", "");
            } catch {}

            return (
              <div
                key={bookmark._id}
                className="bg-white border border-gray-200 rounded-2xl p-6 sm:p-8 shadow-sm hover:shadow-md hover:border-emerald-300 transition-all duration-200 flex flex-col group relative"
              >
                {/* Card Header */}
                <div className="flex justify-between items-start gap-8 mb-3">
                  <div>
                    <a
                      href={bookmark.url}
                      target="_blank"
                      rel="noreferrer"
                      className="font-semibold text-xl text-gray-900 leading-snug hover:text-emerald-600 transition-colors line-clamp-2 focus:outline-none focus-visible:underline"
                      title={bookmark.title}
                    >
                      {bookmark.title || "Untitled Document"}
                    </a>
                    <div className="flex items-center gap-1.5 mt-1">
                      <LinkIcon
                        size={14}
                        className="text-gray-400"
                        weight="bold"
                      />
                      <span className="text-xs font-medium text-gray-500 truncate">
                        {domain}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
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
                    <span className="italic text-gray-400">
                      Waiting for AI processing...
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

                  {/* Open Action (Matches Dashboard format) */}
                  <a
                    href={bookmark.url}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium bg-emerald-50 text-emerald-700 hover:bg-emerald-600 hover:text-white rounded-lg transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 shrink-0"
                  >
                    Open Link <ArrowUpRight size={14} weight="bold" />
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
