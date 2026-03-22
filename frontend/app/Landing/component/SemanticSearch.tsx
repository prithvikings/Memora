"use client";
import React from "react";
import { motion } from "framer-motion"; // or "motion/react"

const SemanticSearch = () => {
  const customEase = [0.22, 1, 0.36, 1] as const;

  return (
    <div className="w-full h-full flex items-center justify-center p-6 relative">
      <motion.div
        initial={{ y: 20, opacity: 0, scale: 0.95 }}
        animate={{ y: 0, opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, ease: customEase }}
        className="w-full max-w-[280px] bg-white rounded-2xl shadow-xl shadow-black/5 border border-black/5 p-4 flex flex-col gap-3 relative"
      >
        {/* Search Input Mockup */}
        <motion.div
          animate={{
            boxShadow: [
              "0px 0px 0px rgba(0,0,0,0)",
              "0px 4px 20px -2px rgba(168,85,247,0.15)",
              "0px 0px 0px rgba(0,0,0,0)",
            ],
            borderColor: ["#f5f5f5", "#e9d5ff", "#f5f5f5"],
          }}
          transition={{ delay: 2.2, duration: 1.5, ease: "easeInOut" }}
          className="w-full bg-neutral-50 border border-neutral-100 rounded-xl p-2.5 flex items-center gap-2 relative z-10"
        >
          {/* Search Icon */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            className="w-4 h-4 text-neutral-400 shrink-0"
          >
            <path
              fillRule="evenodd"
              d="M9 3.5a5.5 5.5 0 100 11 5.5 5.5 0 000-11zM2 9a7 7 0 1112.452 4.391l3.328 3.329a.75.75 0 11-1.06 1.06l-3.329-3.328A7 7 0 012 9z"
              clipRule="evenodd"
            />
          </svg>

          {/* Typing Animation Container */}
          <div className="relative flex items-center w-full h-5 overflow-hidden">
            {/* The Text Being Typed */}
            <motion.div
              initial={{ width: "0%" }}
              animate={{ width: "100%" }}
              transition={{ delay: 0.8, duration: 1.2, ease: "linear" }}
              className="absolute left-0 top-0 h-full overflow-hidden whitespace-nowrap text-sm text-neutral-700 font-medium tracking-tight flex items-center"
            >
              "ideas for a second brain"
            </motion.div>

            {/* Blinking Cursor */}
            <motion.div
              initial={{ opacity: 1, left: "0%" }}
              animate={{ opacity: [1, 0, 1], left: "100%" }}
              transition={{
                left: { delay: 0.8, duration: 1.2, ease: "linear" },
                opacity: { repeat: Infinity, duration: 0.7, ease: "linear" },
              }}
              className="absolute top-1 bottom-1 w-[1.5px] bg-purple-500"
            />
          </div>
        </motion.div>

        {/* Search Results Dropdown */}
        <div className="flex flex-col gap-2">
          {/* Result 1: The Semantic Match (Notice the words don't match the query exactly) */}
          <motion.div
            initial={{ opacity: 0, y: -10, filter: "blur(4px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ delay: 2.6, duration: 0.4, ease: customEase }}
            className="w-full bg-white rounded-xl border border-purple-100 p-3 shadow-sm relative overflow-hidden"
          >
            {/* Subtle purple gradient background for the top result */}
            <div className="absolute inset-0 bg-linear-to-br from-purple-50/50 to-transparent pointer-events-none" />

            <div className="relative z-10">
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-[10px] font-bold text-purple-600 uppercase tracking-wider bg-purple-100 px-1.5 py-0.5 rounded-sm">
                  Semantic Match
                </span>
                <span className="text-[10px] text-neutral-400">99%</span>
              </div>
              <h1 className="text-sm font-semibold text-neutral-800 leading-tight mb-1">
                The Ultimate Zettelkasten Workflow
              </h1>
              <p className="text-[11px] text-neutral-500 line-clamp-2 leading-snug">
                How to organize your personal knowledge base in Obsidian for
                maximum recall...
              </p>
            </div>
          </motion.div>

          {/* Result 2: Standard Match */}
          <motion.div
            initial={{ opacity: 0, y: -10, filter: "blur(4px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ delay: 2.75, duration: 0.4, ease: customEase }}
            className="w-full bg-neutral-50 rounded-xl border border-neutral-100 p-3"
          >
            <h1 className="text-sm font-medium text-neutral-700 leading-tight mb-1">
              Note-taking strategies for 2024
            </h1>
            <div className="flex gap-1.5 mt-2">
              <div className="h-1.5 w-12 bg-neutral-200 rounded-full"></div>
              <div className="h-1.5 w-8 bg-neutral-200 rounded-full"></div>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default SemanticSearch;
