// src/app/dashboard/ai-summaries/page.tsx
"use client";

import React from "react";
import {
  Sparkle,
  ArrowRight,
  CopySimple,
  CheckCircle,
} from "@phosphor-icons/react";

const mockSummaries = [
  {
    id: "1",
    sourceTitle: "The Principles of Product Design",
    domain: "linear.app",
    date: "Generated 2 hrs ago",
    bullets: [
      "Opinionated software built for speed outperforms heavily customizable, slow software.",
      "Design should reduce cognitive load, requiring fewer decisions from the end-user.",
      "Quality is achieved by obsessing over the micro-interactions, not just the macro-architecture.",
    ],
  },
  {
    id: "2",
    sourceTitle: "Understanding React Server Components",
    domain: "vercel.com",
    date: "Generated yesterday",
    bullets: [
      "Server Components execute on the server and send zero JavaScript to the client.",
      "They allow direct access to backend resources like databases and file systems without APIs.",
      "Client components are still required for interactivity (onClick, useState, etc).",
    ],
  },
];

export default function AiSummariesPage() {
  const [copiedId, setCopiedId] = React.useState<string | null>(null);

  const handleCopy = (id: string, bullets: string[]) => {
    navigator.clipboard.writeText(bullets.join("\n- "));
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="max-w-[1300px] mx-auto pb-16 px-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8 py-6 border-b border-gray-200">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-violet-50 border border-violet-100 mb-4 shadow-sm">
            <Sparkle size={14} weight="fill" className="text-violet-600" />
            <span className="text-xs font-semibold text-violet-700 uppercase tracking-wider">
              Intelligence
            </span>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 tracking-tight mb-2">
            AI Summaries
          </h1>
          <p className="text-sm text-gray-500">
            Distilled knowledge from your saved articles. Instantly extract the
            signal from the noise.
          </p>
        </div>
      </div>

      {/* Content Grid */}
      <div className="flex flex-col gap-6">
        {mockSummaries.map((summary) => (
          <div
            key={summary.id}
            className="bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden group flex flex-col lg:flex-row transition-shadow hover:shadow-md"
          >
            {/* Left Column: Source Context */}
            <div className="lg:w-1/3 bg-gray-50 border-b lg:border-b-0 lg:border-r border-gray-200 p-6 sm:p-8 flex flex-col justify-between">
              <div>
                <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3 block">
                  Source Material
                </span>
                <h3 className="font-semibold text-lg text-gray-900 leading-snug mb-2">
                  {summary.sourceTitle}
                </h3>
                <p className="text-sm text-gray-500 mb-6">{summary.domain}</p>
              </div>
              <div className="flex items-center justify-between mt-auto pt-4 border-t border-gray-200/60">
                <span className="text-xs font-medium text-gray-500">
                  {summary.date}
                </span>
                <button
                  className="text-violet-600 hover:text-violet-800 hover:bg-violet-50 p-1.5 rounded-lg transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-violet-500"
                  aria-label="View original source"
                >
                  <ArrowRight size={18} weight="bold" />
                </button>
              </div>
            </div>

            {/* Right Column: AI Synthesis */}
            <div className="lg:w-2/3 p-6 sm:p-8 relative">
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-4 mb-6">
                <span className="text-xs font-bold text-violet-600 uppercase tracking-wider flex items-center gap-1.5">
                  <Sparkle size={14} weight="fill" /> Key Takeaways
                </span>
                <button
                  onClick={() => handleCopy(summary.id, summary.bullets)}
                  className="flex items-center gap-1.5 px-3 py-1.5 bg-gray-50 hover:bg-gray-100 text-gray-600 hover:text-gray-900 text-xs font-medium rounded-lg transition-colors border border-gray-200 shadow-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-300 active:scale-[0.98]"
                >
                  {copiedId === summary.id ? (
                    <CheckCircle
                      size={16}
                      weight="fill"
                      className="text-emerald-500"
                    />
                  ) : (
                    <CopySimple size={16} weight="bold" />
                  )}
                  {copiedId === summary.id ? "Copied" : "Copy text"}
                </button>
              </div>

              <ul className="space-y-4">
                {summary.bullets.map((bullet, idx) => (
                  <li key={idx} className="flex gap-3.5">
                    <div className="mt-2 w-1.5 h-1.5 rounded-full bg-violet-500 shrink-0"></div>
                    <p className="text-sm text-gray-700 leading-relaxed font-medium">
                      {bullet}
                    </p>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
