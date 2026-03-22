"use client";
import React from "react";
import { motion } from "motion/react";

const Foundersc = () => {
  return (
    <div className="w-full h-full bg-neutral-200 flex items-center justify-center p-4 overflow-hidden rounded-xl">
      <div className="w-full max-w-[220px] h-32 bg-white rounded-xl shadow-lg shadow-black/5 p-3 flex flex-col justify-between border border-neutral-100">
        {/* Top Metrics */}
        <div className="flex justify-between items-start">
          <div className="flex flex-col gap-1">
            <div className="w-12 h-1.5 bg-neutral-200 rounded-full" />
            <div className="flex items-center gap-1">
              <div className="w-16 h-3 bg-neutral-800 rounded-full" />
              <motion.div
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="w-1.5 h-1.5 rounded-full bg-emerald-500"
              />
            </div>
          </div>
          <div className="bg-emerald-50 px-1.5 py-0.5 rounded flex items-center gap-0.5">
            <svg
              className="w-2.5 h-2.5 text-emerald-500"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M12 7a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0V8.414l-4.293 4.293a1 1 0 01-1.414 0L8 10.414l-4.293 4.293a1 1 0 01-1.414-1.414l5-5a1 1 0 011.414 0L11 10.586 14.586 7H12z"
                clipRule="evenodd"
              />
            </svg>
          </div>
        </div>

        {/* Animated Bar Chart */}
        <div className="flex items-end gap-1.5 h-12 mt-2 border-b border-neutral-100 pb-1">
          {[40, 60, 45, 80, 55, 95].map((height, i) => (
            <div
              key={i}
              className="flex-1 bg-neutral-100 rounded-t-sm h-full flex items-end"
            >
              <motion.div
                initial={{ height: "10%" }}
                animate={{ height: `${height}%` }}
                transition={{ duration: 1.5, delay: i * 0.1, ease: "easeOut" }}
                className={`w-full rounded-t-sm ${i === 5 ? "bg-emerald-400" : "bg-neutral-300"}`}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Foundersc;
