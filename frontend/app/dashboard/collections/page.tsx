// src/app/dashboard/collections/page.tsx
"use client";

import React from "react";
import {
  FolderNotchIcon,
  DotsThree,
  BookmarkSimple,
  Plus,
  ArrowRight,
  ClockClockwise,
} from "@phosphor-icons/react";

// Mock data remains the same (logic is untouched)
const mockCollections = [
  { id: "1", name: "Design Inspiration", count: 24, lastUpdated: "2 hrs ago" },
  {
    id: "2",
    name: "Frontend Architecture",
    count: 18,
    lastUpdated: "1 day ago",
  },
  { id: "3", name: "Startup Ideas", count: 5, lastUpdated: "3 days ago" },
  { id: "4", name: "Machine Learning", count: 42, lastUpdated: "1 week ago" },
  { id: "5", name: "Finance & Taxes", count: 12, lastUpdated: "2 weeks ago" },
  { id: "6", name: "Reading List", count: 8, lastUpdated: "1 month ago" },
];

export default function CollectionsPage() {
  return (
    <div className="max-w-[1300px] mx-auto pb-16 font-poppins px-6">
      {/* --- REFINED MODERN HEADER --- */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 py-6 border-b border-gray-100">
        <div>
          <div className="bg-emerald-50 text-emerald-700 w-fit px-3 py-1 rounded-full mb-3 flex items-center justify-center border border-emerald-100">
            <p className="uppercase tracking-widest font-bold text-[10px]">
              Workspaces
            </p>
          </div>
          <h1 className="text-[36px] font-bold text-gray-950 tracking-tighter mb-2">
            My Collections
          </h1>
          <p className="text-gray-500 text-[16px] font-medium max-w-xl leading-relaxed">
            Organize your intellectual assets into specialized, AI-enhanced
            workspaces for focused research.
          </p>
        </div>

        {/* Action button now has depth and scaling on hover */}
        <button className="flex items-center gap-2.5 bg-gray-950 hover:bg-gray-800 text-white px-6 py-3 rounded-xl text-[14px] font-semibold transition-all shadow-lg hover:shadow-gray-950/20 hover:-translate-y-0.5 active:scale-95 shrink-0">
          <Plus size={18} weight="bold" />
          New Collection
        </button>
      </div>

      {/* --- ENHANCED GRID LAYOUT --- */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {/* Dynamic Mock Folders with depth and complex interaction */}
        {mockCollections.map((collection) => (
          <div
            key={collection.id}
            className="group relative bg-white border border-gray-100/70 rounded-[28px] p-8 shadow-[0_2px_12px_rgba(0,0,0,0.02)] hover:shadow-[0_20px_60px_-10px_rgba(0,0,0,0.1)] hover:-translate-y-1.5 transition-all duration-300 cursor-pointer flex flex-col overflow-hidden"
          >
            {/* Subtle Gradient background flash on hover */}
            <div className="absolute inset-0 bg-gradient-to-br from-emerald-50/50 to-white opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-0"></div>

            {/* Kebab menu trigger now uses soft absolute positioning */}
            <div className="absolute top-6 right-6 z-20">
              <button
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  // Logic for folder kebab menu
                }}
                className="p-2 text-gray-300 group-hover:text-gray-950 hover:bg-gray-100/80 rounded-full transition-all duration-300 opacity-0 group-hover:opacity-100 scale-90 group-hover:scale-100"
                aria-label="Collection options"
              >
                <DotsThree size={24} weight="bold" />
              </button>
            </div>

            <div className="relative z-10 flex flex-col h-full">
              {/* Folder Icon Section: Integrated shape, not boxed */}
              <div className="flex items-center gap-4 mb-10">
                <div className="relative">
                  {/* Visual metaphor of a stack of folders behind */}
                  <div className="absolute -bottom-1 -right-1 w-full h-full rounded-2xl bg-gray-100 group-hover:bg-emerald-200 transition-colors"></div>
                  <div className="relative p-4 bg-gray-50 rounded-2xl group-hover:bg-emerald-50 transition-colors duration-300">
                    <FolderNotchIcon
                      size={32}
                      weight="fill"
                      className="text-gray-300 group-hover:text-emerald-500 transition-colors duration-300"
                    />
                  </div>
                </div>
              </div>

              {/* Title and Metadata Hierarchy */}
              <h3 className="font-semibold text-[21px] text-gray-950 mb-4 group-hover:text-emerald-800 transition-colors leading-tight">
                {collection.name}
              </h3>

              {/* Modern Info Pills: Separated, sharp typography */}
              <div className="mt-auto pt-6 border-t border-gray-100/70 flex items-center justify-between text-gray-400 group-hover:border-emerald-100 transition-colors">
                <div className="flex items-center gap-4">
                  {/* Item count now a clean text label */}
                  <span className="flex items-center gap-1.5 text-[12px] font-bold uppercase tracking-wider">
                    <BookmarkSimple
                      size={15}
                      weight="bold"
                      className="text-gray-300"
                    />
                    {collection.count} Items
                  </span>
                  <span className="w-1 h-1 rounded-full bg-gray-200"></span>
                  {/* Updated time now a clean text label */}
                  <span className="flex items-center gap-1.5 text-[12px] font-bold uppercase tracking-wider">
                    <ClockClockwise
                      size={15}
                      weight="bold"
                      className="text-gray-300"
                    />
                    {collection.lastUpdated}
                  </span>
                </div>

                {/* Modern CTA Arrow reveals on hover */}
                <ArrowRight
                  size={18}
                  weight="bold"
                  className="text-gray-300 group-hover:text-emerald-600 transition-all opacity-0 group-hover:opacity-100 translate-x-3 group-hover:translate-x-0"
                />
              </div>
            </div>
          </div>
        ))}

        {/* --- ULTRA-MODERN GHOST CARD --- */}
        <div className="group border-[2px] border-dashed border-gray-100 hover:border-emerald-200 rounded-[28px] p-8 flex flex-col items-center justify-center text-center min-h-[260px] hover:bg-emerald-50/50 transition-all duration-300 cursor-pointer shadow-[0_2px_12px_rgba(0,0,0,0.01)] hover:shadow-[0_20px_50px_-10px_rgba(0,0,0,0.04)]">
          <div className="p-4 bg-gray-50 rounded-full mb-4 group-hover:bg-emerald-100 transition-colors duration-300 shadow-inner">
            <Plus
              size={28}
              weight="bold"
              className="text-gray-400 group-hover:text-emerald-600 transition-colors duration-300"
            />
          </div>
          <h3 className="font-semibold text-[16px] text-gray-700 group-hover:text-emerald-800 transition-colors mb-1">
            New Workspace
          </h3>
          <p className="text-[13px] text-gray-400 font-medium px-4 leading-relaxed group-hover:text-emerald-600/80">
            Create a specialized folder to capture and synthesize knowledge.
          </p>
        </div>
      </div>
    </div>
  );
}
