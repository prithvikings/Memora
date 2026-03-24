// src/app/dashboard/archive/page.tsx
"use client";

import React, { useState } from "react";
import {
  MagnifyingGlass,
  Funnel,
  DotsThree,
  ArrowUpRight,
  Archive as ArchiveIcon,
  CalendarBlank,
  TagSimple,
} from "@phosphor-icons/react";

// Mock data tailored for a list view
const mockArchive = [
  {
    _id: "1",
    title: "Understanding React Server Components",
    url: "https://vercel.com/blog/understanding-react-server-components",
    domain: "vercel.com",
    tags: ["react", "architecture"],
    date: "Oct 24, 2023",
  },
  {
    _id: "2",
    title: "The Future of Design Systems",
    url: "https://figma.com/blog",
    domain: "figma.com",
    tags: ["design", "ui"],
    date: "Oct 22, 2023",
  },
  {
    _id: "3",
    title: "A Complete Guide to CSS Grid",
    url: "https://css-tricks.com",
    domain: "css-tricks.com",
    tags: ["css", "frontend"],
    date: "Sep 15, 2023",
  },
  {
    _id: "4",
    title: "Framer Motion Handbooks and Animation curves",
    url: "https://framer.com/motion",
    domain: "framer.com",
    tags: ["animation", "react"],
    date: "Aug 02, 2023",
  },
  {
    _id: "5",
    title: "TypeScript 5.0 Release Notes",
    url: "https://devblogs.microsoft.com",
    domain: "microsoft.com",
    tags: ["typescript", "news"],
    date: "Mar 16, 2023",
  },
];

export default function ArchivePage() {
  const [activeMenu, setActiveMenu] = useState<string | null>(null);

  return (
    <div className="max-w-[1300px] mx-auto pb-16 font-poppins px-6">
      {/* --- HEADER SECTION --- */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8 py-6 border-b border-gray-100">
        <div>
          <div className="bg-gray-100 text-gray-600 w-fit px-3 py-1 rounded-full mb-3 flex items-center justify-center border border-gray-200">
            <p className="uppercase tracking-widest font-bold text-[10px] flex items-center gap-1.5">
              <ArchiveIcon size={12} weight="bold" />
              Root Archive
            </p>
          </div>
          <h1 className="text-[36px] font-bold text-gray-950 tracking-tighter mb-2">
            Everything
          </h1>
          <p className="text-gray-500 text-[16px] font-medium max-w-xl leading-relaxed">
            Your entire library of captured knowledge, fully indexed and
            instantly searchable.
          </p>
        </div>
      </div>

      {/* --- TOOLBAR: SEARCH & FILTER --- */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-6">
        {/* Search Input */}
        <div className="relative w-full sm:max-w-md group">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <MagnifyingGlass
              size={18}
              className="text-gray-400 group-focus-within:text-emerald-500 transition-colors"
              weight="bold"
            />
          </div>
          <input
            type="text"
            placeholder="Search titles, tags, or domains..."
            className="w-full pl-11 pr-4 py-3 bg-white border border-gray-200 hover:border-gray-300 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 rounded-2xl text-[14px] font-medium text-gray-900 placeholder-gray-400 transition-all outline-none shadow-sm"
          />
        </div>

        {/* Filter Button */}
        <button className="flex items-center gap-2 px-4 py-3 bg-white border border-gray-200 hover:border-gray-300 hover:bg-gray-50 rounded-2xl text-[14px] font-semibold text-gray-700 transition-all shadow-sm w-full sm:w-auto justify-center">
          <Funnel size={16} weight="bold" className="text-gray-500" />
          Filter
        </button>
      </div>

      {/* --- LIST CONTAINER --- */}
      <div className="bg-white border border-gray-100/70 rounded-[28px] overflow-hidden shadow-[0_4px_20px_-4px_rgba(0,0,0,0.02)]">
        {/* Table Header */}
        <div className="grid grid-cols-12 gap-4 p-4 bg-gray-50/50 border-b border-gray-100 text-[11px] font-bold text-gray-400 uppercase tracking-widest">
          <div className="col-span-12 sm:col-span-6 pl-4">Resource</div>
          <div className="hidden sm:flex col-span-3 items-center gap-1.5">
            <TagSimple size={14} /> Tags
          </div>
          <div className="hidden sm:flex col-span-2 items-center gap-1.5">
            <CalendarBlank size={14} /> Added
          </div>
          <div className="hidden sm:block col-span-1 text-right pr-4">
            Actions
          </div>
        </div>

        {/* List Items */}
        <div className="flex flex-col divide-y divide-gray-100/70">
          {mockArchive.map((item) => (
            <div
              key={item._id}
              className="group grid grid-cols-12 gap-4 p-4 items-center hover:bg-emerald-50/30 transition-colors duration-200 cursor-pointer relative"
            >
              {/* Column 1: Title & Domain */}
              <div className="col-span-12 sm:col-span-6 pl-4 pr-4">
                <a
                  href={item.url}
                  target="_blank"
                  rel="noreferrer"
                  className="block font-semibold text-[15px] text-gray-900 truncate mb-1 group-hover:text-emerald-700 transition-colors"
                >
                  {item.title}
                </a>
                <p className="text-[12px] text-gray-500 font-medium flex items-center gap-1">
                  {item.domain}
                </p>
              </div>

              {/* Column 2: Tags (Hidden on very small screens) */}
              <div className="hidden sm:flex col-span-3 items-center flex-wrap gap-2">
                {item.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-2.5 py-1 bg-gray-100 text-gray-600 group-hover:bg-white group-hover:border-gray-200 border border-transparent text-[10px] font-bold rounded-md uppercase tracking-wide transition-colors"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* Column 3: Date */}
              <div className="hidden sm:flex col-span-2 items-center text-[13px] font-medium text-gray-400">
                {item.date}
              </div>

              {/* Column 4: Quick Actions & Kebab */}
              <div className="hidden sm:flex col-span-1 items-center justify-end gap-1 pr-2">
                {/* Quick Link Icon - reveals on hover */}
                <a
                  href={item.url}
                  target="_blank"
                  rel="noreferrer"
                  className="p-2 text-gray-300 hover:text-emerald-600 hover:bg-emerald-100 rounded-lg transition-all opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0"
                  title="Visit website"
                >
                  <ArrowUpRight size={18} weight="bold" />
                </a>

                {/* Kebab Menu */}
                <div className="relative kebab-menu-container">
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      setActiveMenu(activeMenu === item._id ? null : item._id);
                    }}
                    className={`p-2 rounded-lg transition-all ${
                      activeMenu === item._id
                        ? "bg-gray-200 text-gray-900"
                        : "text-gray-400 hover:text-gray-900 hover:bg-gray-100"
                    }`}
                  >
                    <DotsThree size={24} weight="bold" />
                  </button>

                  {/* Dropdown Menu */}
                  {activeMenu === item._id && (
                    <div
                      onClick={(e) => e.stopPropagation()}
                      className="absolute right-0 top-full mt-1 w-48 py-2 bg-white border border-gray-100 rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.12)] z-50 overflow-hidden font-poppins origin-top-right animate-in fade-in slide-in-from-top-2 duration-200"
                    >
                      <button className="w-full text-left px-4 py-2 text-[13px] font-medium text-gray-600 hover:bg-gray-50 hover:text-gray-900 transition-colors">
                        Move to Collection
                      </button>
                      <button className="w-full text-left px-4 py-2 text-[13px] font-medium text-gray-600 hover:bg-red-50 hover:text-red-700 transition-colors mt-1 border-t border-gray-50 pt-3">
                        Delete permanently
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
