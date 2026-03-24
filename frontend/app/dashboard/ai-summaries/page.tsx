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
    <div className="max-w-[1300px] mx-auto pb-16 font-poppins px-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 py-6 border-b border-gray-100">
        <div>
          <div className="bg-violet-50 text-violet-700 w-fit px-3 py-1 rounded-full mb-3 flex items-center justify-center border border-violet-100">
            <p className="uppercase tracking-widest font-bold text-[10px] flex items-center gap-1.5">
              <Sparkle size={12} weight="fill" />
              Intelligence
            </p>
          </div>
          <h1 className="text-[36px] font-bold text-gray-950 tracking-tighter mb-2">
            AI Summaries
          </h1>
          <p className="text-gray-500 text-[16px] font-medium max-w-xl leading-relaxed">
            Distilled knowledge from your saved articles. Instantly extract the
            signal from the noise.
          </p>
        </div>
      </div>

      {/* Content Grid */}
      <div className="flex flex-col gap-8">
        {mockSummaries.map((summary) => (
          <div
            key={summary.id}
            className="bg-white border border-gray-100/80 rounded-[28px] p-1 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.02)] overflow-hidden group"
          >
            <div className="flex flex-col lg:flex-row">
              {/* Left Column: Source Context */}
              <div className="lg:w-1/3 bg-gray-50/50 p-8 border-b lg:border-b-0 lg:border-r border-gray-100/80 flex flex-col justify-between rounded-[24px]">
                <div>
                  <span className="text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-3 block">
                    Source Material
                  </span>
                  <h3 className="font-bold text-xl text-gray-950 leading-snug mb-2">
                    {summary.sourceTitle}
                  </h3>
                  <p className="text-[13px] text-gray-500 font-medium flex items-center gap-1.5 mb-6">
                    {summary.domain}
                  </p>
                </div>
                <div className="flex items-center justify-between mt-auto">
                  <span className="text-[12px] font-medium text-gray-400">
                    {summary.date}
                  </span>
                  <button className="text-violet-600 hover:text-violet-800 transition-colors p-2 hover:bg-violet-50 rounded-full">
                    <ArrowRight size={20} weight="bold" />
                  </button>
                </div>
              </div>

              {/* Right Column: AI Synthesis */}
              <div className="lg:w-2/3 p-8 relative">
                <div className="flex justify-between items-start mb-6">
                  <span className="text-[11px] font-bold text-violet-600 uppercase tracking-widest flex items-center gap-1.5">
                    <Sparkle size={14} weight="duotone" /> Key Takeaways
                  </span>
                  <button
                    onClick={() => handleCopy(summary.id, summary.bullets)}
                    className="flex items-center gap-1.5 text-[12px] font-bold text-gray-400 hover:text-gray-700 transition-colors bg-gray-50 hover:bg-gray-100 px-3 py-1.5 rounded-lg"
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
                    <li key={idx} className="flex gap-4">
                      <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-violet-400 shrink-0 shadow-[0_0_8px_rgba(167,139,250,0.6)]"></div>
                      <p className="text-[15px] text-gray-700 leading-relaxed font-medium">
                        {bullet}
                      </p>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
