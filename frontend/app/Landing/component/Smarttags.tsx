"use client";
import React from "react";
import { motion } from "framer-motion";

const Smarttags = () => {
  const customEase = [0.22, 1, 0.36, 1] as const;

  // The simulated AI tags that will pop up
  const tags = [
    { text: "Frontend", color: "bg-blue-100 text-blue-700 border-blue-200" },
    { text: "React 19", color: "bg-cyan-100 text-cyan-700 border-cyan-200" },
    { text: "UI/UX", color: "bg-purple-100 text-purple-700 border-purple-200" },
    {
      text: "Design Systems",
      color: "bg-pink-100 text-pink-700 border-pink-200",
    },
  ];

  return (
    <div className="w-full h-full flex items-center justify-center p-6 relative">
      {/* The "Saved Link" Card */}
      <motion.div
        initial={{ y: 20, opacity: 0, scale: 0.95 }}
        animate={{ y: 0, opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, ease: customEase }}
        className="w-full max-w-[280px] bg-white rounded-2xl shadow-xl shadow-black/5 border border-black/5 p-5 relative overflow-hidden flex flex-col gap-4"
      >
        {/* Fake Browser/Link Header */}
        <div className="flex items-center gap-2 mb-2 pb-3 border-b border-neutral-100">
          <div className="w-4 h-4 rounded-full bg-neutral-200"></div>
          <div className="h-2 w-32 bg-neutral-200 rounded-full"></div>
        </div>

        {/* Fake Article Content */}
        <div className="flex flex-col gap-2.5 mb-6">
          <div className="h-3 w-[85%] bg-neutral-800 rounded-full"></div>
          <div className="h-3 w-[60%] bg-neutral-800 rounded-full"></div>
          <div className="h-2 w-full bg-neutral-100 rounded-full mt-2"></div>
          <div className="h-2 w-[90%] bg-neutral-100 rounded-full"></div>
        </div>

        {/* The Scanning Laser Effect */}
        <motion.div
          initial={{ top: "0%", opacity: 0 }}
          animate={{ top: "100%", opacity: [0, 1, 1, 0] }}
          transition={{ delay: 0.5, duration: 1.2, ease: "linear" }}
          className="absolute left-0 right-0 h-1 bg-green-400 shadow-[0_0_15px_3px_rgba(74,222,128,0.5)] z-10"
          style={{ width: "100%" }}
        />

        {/* The Tags Container */}
        <div className="relative mt-auto">
          {/* Section Label */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5, duration: 0.3 }}
            className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider mb-2 flex items-center gap-1"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              className="w-3 h-3 text-green-500"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
                clipRule="evenodd"
              />
            </svg>
            Auto-Tagged
          </motion.div>

          {/* Staggered Tags */}
          <div className="flex flex-wrap gap-2">
            {tags.map((tag, i) => (
              <motion.div
                key={tag.text}
                initial={{ opacity: 0, scale: 0.5, y: 10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{
                  delay: 1.7 + i * 0.1, // Starts right after the scan finishes
                  duration: 0.4,
                  type: "spring",
                  stiffness: 200,
                  damping: 12,
                }}
                className={`text-[11px] font-medium px-2.5 py-1 rounded-md border ${tag.color}`}
              >
                {tag.text}
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Smarttags;
