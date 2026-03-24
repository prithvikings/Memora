// src/app/dashboard/recent/page.tsx
"use client";

import React, { useState } from "react";
import {
  ClockCounterClockwise,
  DotsThree,
  ArrowUpRight,
  FolderOpen,
  Globe,
  FileText,
  YoutubeLogo,
  CalendarBlank,
} from "@phosphor-icons/react";

// Mock data structured by time groups
const recentActivity = [
  {
    group: "Today",
    items: [
      {
        _id: "1",
        title: "React 19 RC Release Notes",
        url: "https://react.dev/blog",
        domain: "react.dev",
        time: "10:42 AM",
        type: "article",
        collection_name: "Frontend Architecture",
        label: "Recent",
      },
      {
        _id: "2",
        title: "Building Fluid Interfaces with Framer Motion",
        url: "https://youtube.com/watch",
        domain: "youtube.com",
        time: "09:15 AM",
        type: "video",
        collection_name: "Design Inspiration",
        label: "Recent",
      },
    ],
  },
  {
    group: "Yesterday",
    items: [
      {
        _id: "3",
        title: "Stripe API Reference - Subscriptions",
        url: "https://stripe.com/docs/api",
        domain: "stripe.com",
        time: "4:30 PM",
        type: "docs",
        collection_name: "Finance & Taxes",
        label: "Recent",
      },
      {
        _id: "4",
        title: "Linear's approach to issue tracking",
        url: "https://linear.app/method",
        domain: "linear.app",
        time: "1:05 PM",
        type: "article",
        collection_name: "Startup Ideas",
        label: "Recent",
      },
      {
        _id: "5",
        title: "Tailwind CSS v4.0 Alpha",
        url: "https://tailwindcss.com/blog",
        domain: "tailwindcss.com",
        time: "10:00 AM",
        type: "article",
        collection_name: "Frontend Architecture",
        label: "Recent",
      },
    ],
  },
  {
    group: "Earlier this week",
    items: [
      {
        _id: "6",
        title: "Understanding Server Actions in Next.js",
        url: "https://nextjs.org/docs",
        domain: "nextjs.org",
        time: "Mon, 2:15 PM",
        type: "docs",
        collection_name: "Frontend Architecture",
        label: "Recent",
      },
    ],
  },
];

// Helper component to render the correct icon based on content type
const TypeIcon = ({ type }: { type: string }) => {
  switch (type) {
    case "video":
      return <YoutubeLogo size={20} weight="fill" className="text-red-500" />;
    case "docs":
      return <FileText size={20} weight="fill" className="text-indigo-400" />;
    case "article":
    default:
      return <Globe size={20} weight="fill" className="text-emerald-500" />;
  }
};

export default function RecentPage() {
  const [activeMenu, setActiveMenu] = useState<string | null>(null);

  return (
    <div className="max-w-[1300px] mx-auto pb-16 font-poppins px-6">
      {/* --- HEADER SECTION --- */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 py-6 border-b border-gray-100">
        <div>
          {/* Subtle Indigo badge for Time/Activity */}
          <div className="bg-indigo-50 text-indigo-700 w-fit px-3 py-1 rounded-full mb-3 flex items-center justify-center border border-indigo-100">
            <p className="uppercase tracking-widest font-bold text-[10px] flex items-center gap-1.5">
              <ClockCounterClockwise size={12} weight="bold" />
              History
            </p>
          </div>
          <h1 className="text-[36px] font-bold text-gray-950 tracking-tighter mb-2">
            Recently Viewed
          </h1>
          <p className="text-gray-500 text-[16px] font-medium max-w-xl leading-relaxed">
            Pick up exactly where you left off. Your recent reads, research, and
            references.
          </p>
        </div>
      </div>

      {/* --- TIMELINE CONTENT --- */}
      {recentActivity.length === 0 ? (
        /* EMPTY STATE */
        <div className="flex flex-col items-center justify-center py-32 px-4 bg-white border border-gray-100/70 rounded-[28px] text-center shadow-[0_4px_20px_-4px_rgba(0,0,0,0.02)]">
          <div className="relative mb-6">
            <div className="absolute inset-0 bg-indigo-100 rounded-full blur-xl opacity-40"></div>
            <div className="relative p-6 bg-indigo-50 rounded-full border border-indigo-100">
              <ClockCounterClockwise
                size={48}
                weight="duotone"
                className="text-indigo-500"
              />
            </div>
          </div>
          <h3 className="text-2xl font-bold text-gray-950 mb-2 tracking-tight">
            No recent activity
          </h3>
          <p className="text-[15px] text-gray-500 max-w-md font-medium">
            Items you view or save will automatically appear here
            chronologically.
          </p>
        </div>
      ) : (
        <div className="flex flex-col gap-10">
          {recentActivity.map((group, groupIndex) => (
            <div key={groupIndex} className="relative">
              {/* Group Header (Today, Yesterday, etc.) */}
              <div className="flex items-center gap-3 mb-5">
                <div className="bg-gray-100/80 p-1.5 rounded-lg text-gray-500">
                  <CalendarBlank size={16} weight="bold" />
                </div>
                <h2 className="text-[15px] font-bold text-gray-800 uppercase tracking-widest">
                  {group.group}
                </h2>
                <div className="h-px bg-gray-100 flex-1 ml-4"></div>
              </div>

              {/* Group Items List */}
              <div className="flex flex-col gap-3">
                {group.items.map((item) => (
                  <div
                    key={item._id}
                    className="group bg-white border border-gray-100/70 rounded-[20px] p-4 sm:p-5 shadow-[0_2px_10px_-4px_rgba(0,0,0,0.02)] hover:shadow-[0_10px_30px_-10px_rgba(0,0,0,0.06)] hover:-translate-y-0.5 hover:border-indigo-100/50 transition-all duration-300 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                  >
                    {/* Left: Icon, Title, Domain */}
                    <div className="flex items-center gap-4 min-w-0">
                      {/* Dynamic Content Type Icon Box */}
                      <div className="hidden sm:flex shrink-0 p-3 bg-gray-50 rounded-2xl group-hover:scale-105 transition-transform duration-300">
                        <TypeIcon type={item.type} />
                      </div>

                      <div className="min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-[12px] font-bold text-indigo-600/70 uppercase tracking-wider block sm:hidden">
                            {item.time}
                          </span>
                        </div>
                        <a
                          href={item.url}
                          target="_blank"
                          rel="noreferrer"
                          className="font-semibold text-[16px] text-gray-950 truncate block hover:text-indigo-600 transition-colors"
                          title={item.title}
                        >
                          {item.title}
                        </a>
                        <div className="flex items-center gap-3 mt-1 text-[13px] font-medium text-gray-400">
                          <span className="truncate">{item.domain}</span>
                          <span className="w-1 h-1 rounded-full bg-gray-200 shrink-0"></span>
                          <span className="flex items-center gap-1.5 truncate">
                            <FolderOpen
                              size={14}
                              weight="fill"
                              className="text-gray-300"
                            />
                            {item.collection_name}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Right: Time & Actions */}
                    <div className="flex items-center justify-between sm:justify-end gap-4 shrink-0 mt-2 sm:mt-0 pt-3 sm:pt-0 border-t sm:border-0 border-gray-50">
                      {/* Desktop Time */}
                      <span className="hidden sm:block text-[13px] font-bold text-gray-400 tracking-wide w-20 text-right">
                        {item.time}
                      </span>

                      {/* Quick Actions Container */}
                      <div className="flex items-center gap-1">
                        {/* Jump Back In Button */}
                        <a
                          href={item.url}
                          target="_blank"
                          rel="noreferrer"
                          className="flex items-center gap-1.5 px-3 py-2 bg-indigo-50 text-indigo-600 hover:bg-indigo-600 hover:text-white rounded-xl text-[12px] font-bold transition-colors opacity-100 sm:opacity-0 sm:-translate-x-2 group-hover:opacity-100 group-hover:translate-x-0"
                        >
                          Open <ArrowUpRight size={14} weight="bold" />
                        </a>

                        {/* Kebab Menu */}
                        <div className="relative kebab-menu-container">
                          <button
                            onClick={(e) => {
                              e.preventDefault();
                              e.stopPropagation();
                              setActiveMenu(
                                activeMenu === item._id ? null : item._id,
                              );
                            }}
                            className={`p-2 rounded-xl transition-all ${
                              activeMenu === item._id
                                ? "bg-gray-100 text-gray-900"
                                : "text-gray-400 hover:text-gray-900 hover:bg-gray-100"
                            }`}
                          >
                            <DotsThree size={24} weight="bold" />
                          </button>

                          {/* Dropdown */}
                          {activeMenu === item._id && (
                            <div
                              onClick={(e) => e.stopPropagation()}
                              className="absolute right-0 top-full mt-1 w-48 py-2 bg-white border border-gray-100 rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.12)] z-50 overflow-hidden font-poppins animate-in fade-in slide-in-from-top-2 duration-200"
                            >
                              <button className="w-full text-left px-4 py-2 text-[13px] font-medium text-gray-600 hover:bg-gray-50 hover:text-gray-900 transition-colors">
                                Move to Collection
                              </button>
                              <button className="w-full text-left px-4 py-2 text-[13px] font-medium text-gray-600 hover:bg-gray-50 hover:text-gray-900 transition-colors">
                                Remove from History
                              </button>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
