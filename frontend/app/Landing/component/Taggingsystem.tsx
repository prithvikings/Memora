"use client";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";

const Taggingsystem = () => {
  const customEase = [0.22, 1, 0.36, 1] as const;
  const [isGenerating, setIsGenerating] = useState(true);

  // Simulate the AI analyzing the content and then generating tags
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsGenerating(false);
    }, 1800); // 1.8 seconds of "analyzing"
    return () => clearTimeout(timer);
  }, []);

  const tags = [
    {
      label: "Architecture",
      bg: "bg-blue-50",
      text: "text-blue-600",
      border: "border-blue-200",
    },
    {
      label: "System Design",
      bg: "bg-indigo-50",
      text: "text-indigo-600",
      border: "border-indigo-200",
    },
    {
      label: "Backend",
      bg: "bg-emerald-50",
      text: "text-emerald-600",
      border: "border-emerald-200",
    },
    {
      label: "Scaling",
      bg: "bg-amber-50",
      text: "text-amber-600",
      border: "border-amber-200",
    },
  ];

  return (
    <div className="w-full h-full flex items-center justify-center p-6 md:p-12 relative font-sans">
      {/* Subtle Background Glows */}
      <div className="absolute top-1/3 right-1/4 w-48 h-48 bg-emerald-200/30 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 left-1/4 w-56 h-56 bg-indigo-200/30 rounded-full blur-3xl" />

      <motion.div
        initial={{ y: 30, opacity: 0, scale: 0.95 }}
        animate={{ y: 0, opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, ease: customEase }}
        className="w-full max-w-sm bg-white rounded-3xl shadow-[0_20px_40px_-15px_rgba(0,0,0,0.05)] border border-neutral-200/60 overflow-hidden relative z-10 flex flex-col"
      >
        {/* Panel Header */}
        <div className="px-6 py-4 border-b border-neutral-100 flex items-center justify-between bg-neutral-50/50">
          <div className="flex items-center gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              className="w-4 h-4 text-neutral-400"
            >
              <path
                fillRule="evenodd"
                d="M5.5 3A2.5 2.5 0 003 5.5v2.879a2.5 2.5 0 00.732 1.767l6.5 6.5a2.5 2.5 0 003.536 0l2.878-2.878a2.5 2.5 0 000-3.536l-6.5-6.5A2.5 2.5 0 008.38 3H5.5zM6 7a1 1 0 100-2 1 1 0 000 2z"
                clipRule="evenodd"
              />
            </svg>
            <span className="text-sm font-semibold text-neutral-700">
              Tag Management
            </span>
          </div>

          {/* Fake Toggle */}
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider">
              AI Auto
            </span>
            <div className="w-8 h-4.5 bg-emerald-500 rounded-full flex items-center px-0.5 shadow-inner">
              <div className="w-3.5 h-3.5 bg-white rounded-full shadow-sm translate-x-3.5" />
            </div>
          </div>
        </div>

        {/* Panel Body */}
        <div className="p-6 flex flex-col gap-5">
          {/* Target Article Mockup */}
          <div className="flex flex-col gap-1.5">
            <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider">
              Target Resource
            </span>
            <div className="w-full bg-neutral-50 border border-neutral-100 rounded-xl p-3 flex items-start gap-3">
              <div className="w-8 h-8 rounded-lg bg-neutral-200 shrink-0 flex items-center justify-center text-neutral-400 font-serif text-xs">
                W
              </div>
              <div className="flex flex-col gap-1.5 w-full pt-0.5">
                <div className="h-2 w-3/4 bg-neutral-800 rounded-full" />
                <div className="h-1.5 w-1/2 bg-neutral-300 rounded-full" />
              </div>
            </div>
          </div>

          {/* Tags Container */}
          <div className="flex flex-col gap-2 relative min-h-[100px]">
            <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider">
              Generated Tags
            </span>

            <div className="flex flex-wrap gap-2 w-full">
              <AnimatePresence mode="wait">
                {isGenerating ? (
                  // Loading State
                  <motion.div
                    key="loading"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.2 }}
                    className="w-full h-16 border-2 border-dashed border-neutral-200 rounded-xl flex items-center justify-center gap-2 text-xs text-neutral-400 font-medium"
                  >
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{
                        repeat: Infinity,
                        duration: 1,
                        ease: "linear",
                      }}
                      className="w-3.5 h-3.5 border-2 border-neutral-200 border-t-emerald-500 rounded-full"
                    />
                    Analyzing semantics...
                  </motion.div>
                ) : (
                  // Generated Tags State
                  tags.map((tag, i) => (
                    <motion.div
                      key={tag.label}
                      initial={{ opacity: 0, scale: 0.8, y: 10 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      transition={{
                        delay: i * 0.1, // Stagger effect
                        type: "spring",
                        stiffness: 250,
                        damping: 15,
                      }}
                      className={`px-3 py-1.5 rounded-lg border text-xs font-semibold tracking-wide ${tag.bg} ${tag.text} ${tag.border} shadow-sm`}
                    >
                      #{tag.label}
                    </motion.div>
                  ))
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Taggingsystem;
