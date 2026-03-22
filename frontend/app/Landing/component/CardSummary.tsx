"use client";
import React from "react";
import { motion } from "motion/react";

const CardSummary = () => {
  const customEase = [0.22, 1, 0.36, 1] as const;

  return (
    <div className="w-full h-full flex items-center justify-center p-6 md:p-12 relative font-sans">
      {/* Background Decorative Blobs for premium feel */}
      <div className="absolute top-1/2 left-1/4 w-64 h-64 bg-purple-200/40 rounded-full blur-3xl -translate-y-1/2" />
      <div className="absolute top-1/2 right-1/4 w-64 h-64 bg-blue-200/40 rounded-full blur-3xl -translate-y-1/2" />

      {/* Main Card */}
      <motion.div
        initial={{ y: 30, opacity: 0, scale: 0.95 }}
        animate={{ y: 0, opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, ease: customEase }}
        className="w-full max-w-md bg-white rounded-3xl shadow-[0_20px_40px_-15px_rgba(0,0,0,0.05)] border border-neutral-200/60 overflow-hidden relative z-10"
      >
        {/* Card Header / Domain */}
        <div className="px-6 pt-6 pb-4 flex items-center gap-3 border-b border-neutral-100">
          <div className="w-6 h-6 rounded-md bg-neutral-900 flex items-center justify-center text-white text-[10px] font-bold">
            X
          </div>
          <p className="text-xs font-medium text-neutral-500">x.com/design</p>
          <div className="ml-auto text-xs text-neutral-400">2 mins ago</div>
        </div>

        {/* Card Body */}
        <div className="p-6 flex flex-col gap-4">
          <motion.h1
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5, ease: customEase }}
            className="text-xl md:text-2xl font-semibold text-neutral-800 leading-snug tracking-tight text-left"
          >
            The principles of spatial design in modern web interfaces
          </motion.h1>

          {/* AI Summary Box */}
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            transition={{ delay: 0.4, duration: 0.6, ease: customEase }}
            className="bg-neutral-50 rounded-2xl p-4 border border-neutral-100 relative overflow-hidden"
          >
            {/* Shimmer effect line */}
            <motion.div
              animate={{ left: ["-100%", "200%"] }}
              transition={{ repeat: Infinity, duration: 2.5, ease: "linear" }}
              className="absolute top-0 bottom-0 w-1/2 bg-linear-to-r from-transparent via-white/60 to-transparent skew-x-12"
            />

            <div className="flex items-center gap-2 mb-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-4 h-4 text-purple-500"
              >
                <path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z" />
              </svg>
              <span className="text-xs font-semibold text-purple-600 tracking-wide uppercase">
                AI Summary
              </span>
            </div>

            <p className="text-sm text-neutral-600 leading-relaxed text-left">
              Spatial design moves beyond flat screens, using depth, shadows,
              and z-index layers to create intuitive hierarchies. This article
              explores how to apply Apple's VisionOS design principles to
              standard web applications.
            </p>
          </motion.div>

          {/* Bottom Action Bar */}
          <div className="flex items-center gap-2 pt-2">
            <span className="px-3 py-1 bg-neutral-100 text-neutral-600 text-[11px] font-medium rounded-full">
              UI/UX
            </span>
            <span className="px-3 py-1 bg-neutral-100 text-neutral-600 text-[11px] font-medium rounded-full">
              Design
            </span>
            <div className="ml-auto w-8 h-8 rounded-full bg-neutral-50 flex items-center justify-center border border-neutral-200 cursor-pointer hover:bg-neutral-100 transition-colors">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                className="w-4 h-4 text-neutral-500"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25"
                />
              </svg>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default CardSummary;
