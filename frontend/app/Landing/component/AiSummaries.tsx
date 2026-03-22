"use client";
import React from "react";
import { motion } from "framer-motion"; // or "motion/react" based on your setup

const AiSummaries = () => {
  return (
    <div className="w-full h-full flex items-center justify-center p-6">
      {/* Main Card Wrapper */}
      <motion.div
        initial={{ y: 20, opacity: 0, scale: 0.95 }}
        animate={{ y: 0, opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] as const }}
        className="w-full max-w-[280px] bg-white rounded-2xl shadow-xl shadow-black/5 border border-black/5 p-5 flex flex-col gap-4 relative overflow-hidden"
      >
        {/* Fake Article Header */}
        <div className="flex gap-3 items-center mb-2">
          <div className="w-10 h-10 rounded-md bg-neutral-100 shrink-0"></div>
          <div className="flex flex-col gap-2 w-full">
            <div className="h-3 w-3/4 bg-neutral-200 rounded-full"></div>
            <div className="h-2 w-1/2 bg-neutral-100 rounded-full"></div>
          </div>
        </div>

        {/* Fake Long Article Content (Fades out slightly when AI kicks in) */}
        <motion.div
          animate={{ opacity: 0.3 }}
          transition={{ delay: 0.8, duration: 0.5 }}
          className="flex flex-col gap-2"
        >
          <div className="h-2 w-full bg-neutral-100 rounded-full"></div>
          <div className="h-2 w-[90%] bg-neutral-100 rounded-full"></div>
          <div className="h-2 w-[95%] bg-neutral-100 rounded-full"></div>
        </motion.div>

        {/* The AI Summary Magic Box */}
        <motion.div
          initial={{ height: 36, opacity: 0, y: 10 }}
          animate={{ height: "auto", opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.5, ease: [0.22, 1, 0.36, 1] as const }}
          className="absolute bottom-5 left-5 right-5 bg-neutral-50 rounded-xl border border-neutral-200/60 p-4 shadow-sm backdrop-blur-sm"
        >
          {/* AI Header with Sparkle Icon */}
          <div className="flex items-center gap-1.5 mb-3 text-xs font-semibold text-neutral-800">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-3.5 h-3.5 text-black"
            >
              <path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z" />
            </svg>
            Generated Summary
          </div>

          {/* Animating Summary Lines */}
          <div className="flex flex-col gap-2.5">
            {[1, 2, 3].map((i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, width: "0%" }}
                animate={{ opacity: 1, width: i === 3 ? "65%" : "100%" }}
                transition={{
                  delay: 1.2 + i * 0.15, // Staggered typing effect
                  duration: 0.6,
                  ease: "easeOut",
                }}
                className="h-2 bg-neutral-800 rounded-full"
              />
            ))}
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default AiSummaries;
