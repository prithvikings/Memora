"use client";
import React from "react";
import { motion } from "motion/react";

const Students = () => {
  return (
    <div className="w-full h-full bg-neutral-200 flex items-center justify-center p-4 overflow-hidden rounded-xl relative perspective-midrange">
      <div className="relative w-[160px] h-[100px] flex items-center justify-center">
        {/* Back Card */}
        <motion.div
          animate={{
            y: [-10, -15, -10],
            scale: [0.9, 0.85, 0.9],
            opacity: [0.5, 0.3, 0.5],
          }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          className="absolute w-full h-full bg-white rounded-xl shadow-sm border border-neutral-100"
        />

        {/* Middle Card */}
        <motion.div
          animate={{
            y: [-5, -8, -5],
            scale: [0.95, 0.92, 0.95],
            opacity: [0.8, 0.6, 0.8],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 0.2,
          }}
          className="absolute w-full h-full bg-white rounded-xl shadow-md border border-neutral-100"
        />

        {/* Front Card */}
        <motion.div
          animate={{ y: [0, -2, 0] }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 0.4,
          }}
          className="absolute w-full h-full bg-white rounded-xl shadow-lg border border-neutral-100 p-3 flex flex-col items-center justify-center gap-2 z-10"
        >
          <div className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center">
            <svg
              className="w-4 h-4 text-purple-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
              />
            </svg>
          </div>
          <div className="w-16 h-1.5 bg-neutral-200 rounded-full" />
        </motion.div>
      </div>
    </div>
  );
};

export default Students;
