"use client";
import React from "react";
import { motion, Variants } from "motion/react";

const CollectionDashboard = () => {
  const customEase = [0.22, 1, 0.36, 1] as const;

  // Animation variants for staggered loading
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.3 },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 10, filter: "blur(4px)" },
    show: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: { duration: 0.5, ease: customEase },
    },
  };

  return (
    <div className="w-full h-full flex items-center justify-center p-6 md:p-12 relative font-sans">
      {/* Warm Background Blurs for the final "organized" feel */}
      <div className="absolute top-1/4 right-1/4 w-56 h-56 bg-orange-200/40 rounded-full blur-3xl" />
      <div className="absolute bottom-1/3 left-1/4 w-64 h-64 bg-rose-200/30 rounded-full blur-3xl" />

      {/* Main Dashboard Window */}
      <motion.div
        initial={{ y: 20, opacity: 0, scale: 0.95 }}
        animate={{ y: 0, opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, ease: customEase }}
        className="w-full max-w-[420px] bg-white rounded-2xl shadow-[0_20px_40px_-15px_rgba(0,0,0,0.08)] border border-neutral-200/60 overflow-hidden relative z-10 flex h-[280px]"
      >
        {/* Sidebar */}
        <div className="w-[130px] bg-neutral-50/80 backdrop-blur-md border-r border-neutral-100 flex flex-col p-3 z-10">
          {/* User Profile Mock */}
          <div className="flex items-center gap-2 mb-6 px-1">
            <div className="w-5 h-5 rounded-full bg-linear-to-tr from-orange-400 to-rose-400" />
            <div className="h-2 w-12 bg-neutral-200 rounded-full" />
          </div>

          {/* Navigation Links */}
          <div className="flex flex-col gap-1">
            <span className="text-[9px] font-bold text-neutral-400 uppercase tracking-wider px-1 mb-1">
              Collections
            </span>

            <div className="px-2 py-1.5 rounded-md text-xs font-medium text-neutral-500 hover:bg-neutral-100 flex items-center gap-2">
              <svg
                className="w-3.5 h-3.5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
                />
              </svg>
              Inbox
            </div>

            {/* Active Folder */}
            <motion.div
              initial={{ backgroundColor: "rgba(255, 237, 213, 0)" }} // orange-100
              animate={{ backgroundColor: "rgba(255, 237, 213, 1)" }}
              transition={{ delay: 0.8, duration: 0.4 }}
              className="px-2 py-1.5 rounded-md text-xs font-medium text-orange-700 flex items-center justify-between shadow-sm border border-orange-200/50"
            >
              <div className="flex items-center gap-2">
                <svg
                  className="w-3.5 h-3.5 text-orange-500"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path d="M3 4a2 2 0 00-2 2v8a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5.828a2 2 0 01-1.414-.586l-1.172-1.172A2 2 0 009.172 3H5a2 2 0 00-2 2z" />
                </svg>
                Design
              </div>
              <span className="text-[9px] bg-orange-200/80 px-1 rounded text-orange-700">
                4
              </span>
            </motion.div>

            <div className="px-2 py-1.5 rounded-md text-xs font-medium text-neutral-500 hover:bg-neutral-100 flex items-center gap-2">
              <svg
                className="w-3.5 h-3.5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path d="M3 4a2 2 0 00-2 2v8a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5.828a2 2 0 01-1.414-.586l-1.172-1.172A2 2 0 009.172 3H5a2 2 0 00-2 2z" />
              </svg>
              Startups
            </div>
          </div>
        </div>

        {/* Main Content Area */}
        <div className="flex-1 bg-white p-4 flex flex-col relative">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="flex items-center justify-between mb-4 border-b border-neutral-100 pb-3"
          >
            <h2 className="text-sm font-semibold text-neutral-800 flex items-center gap-2">
              Design Inspiration
              <span className="flex items-center gap-1 text-[9px] font-bold text-orange-500 uppercase tracking-wider bg-orange-50 px-1.5 py-0.5 rounded-sm border border-orange-100">
                <span className="w-1.5 h-1.5 rounded-full bg-orange-400 animate-pulse" />
                Auto-Curated
              </span>
            </h2>
          </motion.div>

          {/* Cards Grid */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="show"
            className="grid grid-cols-2 gap-3"
          >
            {/* Card 1 */}
            <motion.div
              variants={itemVariants}
              className="bg-neutral-50 border border-neutral-100 rounded-xl p-2 flex flex-col gap-1.5 shadow-sm hover:shadow-md transition-shadow cursor-pointer"
            >
              <div className="w-full h-14 bg-linear-to-br from-neutral-200 to-neutral-300 rounded-lg" />
              <div className="h-2 w-3/4 bg-neutral-800 rounded-full mt-1" />
              <div className="h-1.5 w-1/2 bg-neutral-400 rounded-full" />
            </motion.div>

            {/* Card 2 */}
            <motion.div
              variants={itemVariants}
              className="bg-neutral-50 border border-neutral-100 rounded-xl p-2 flex flex-col gap-1.5 shadow-sm hover:shadow-md transition-shadow cursor-pointer"
            >
              <div className="w-full h-14 bg-linear-to-br from-rose-100 to-orange-100 rounded-lg flex items-center justify-center">
                <svg
                  className="w-5 h-5 text-orange-400/50"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M4.5 4.5a3 3 0 00-3 3v9a3 3 0 003 3h8.25m0 0H18a3 3 0 003-3v-9a3 3 0 00-3-3H3.375" />
                </svg>
              </div>
              <div className="h-2 w-full bg-neutral-800 rounded-full mt-1" />
              <div className="h-1.5 w-2/3 bg-neutral-400 rounded-full" />
            </motion.div>

            {/* Card 3 */}
            <motion.div
              variants={itemVariants}
              className="bg-neutral-50 border border-neutral-100 rounded-xl p-2 flex flex-col gap-1.5 shadow-sm hover:shadow-md transition-shadow cursor-pointer"
            >
              <div className="w-full h-14 bg-linear-to-br from-neutral-200 to-neutral-300 rounded-lg" />
              <div className="h-2 w-4/5 bg-neutral-800 rounded-full mt-1" />
              <div className="h-1.5 w-1/3 bg-neutral-400 rounded-full" />
            </motion.div>

            {/* Card 4 */}
            <motion.div
              variants={itemVariants}
              className="bg-neutral-50 border border-neutral-100 rounded-xl p-2 flex flex-col gap-1.5 shadow-sm hover:shadow-md transition-shadow cursor-pointer"
            >
              <div className="w-full h-14 bg-linear-to-br from-neutral-200 to-neutral-300 rounded-lg" />
              <div className="h-2 w-full bg-neutral-800 rounded-full mt-1" />
              <div className="h-1.5 w-1/2 bg-neutral-400 rounded-full" />
            </motion.div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default CollectionDashboard;
