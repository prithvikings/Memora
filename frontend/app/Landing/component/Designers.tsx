"use client";
import React from "react";
import { motion } from "motion/react";

const Designers = () => {
  return (
    <div className="w-full h-full bg-neutral-200 flex items-center justify-center overflow-hidden rounded-xl relative">
      {/* Floating Canvas Elements */}
      <motion.div
        animate={{ y: [-5, 5, -5], rotate: [-2, 2, -2] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-4 left-6 w-16 h-16 bg-white rounded-2xl shadow-sm border border-neutral-100 flex items-center justify-center"
      >
        <div className="w-8 h-8 rounded-full bg-linear-to-tr from-orange-300 to-rose-400" />
      </motion.div>

      <motion.div
        animate={{ y: [5, -5, 5], rotate: [2, -2, 2] }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1,
        }}
        className="absolute bottom-6 right-6 w-20 h-12 bg-white rounded-xl shadow-sm border border-neutral-100 p-2 flex flex-col gap-1.5"
      >
        <div className="w-full h-2 bg-neutral-100 rounded-full" />
        <div className="w-3/4 h-2 bg-neutral-100 rounded-full" />
      </motion.div>

      {/* Main Pallete Tool */}
      <motion.div
        animate={{ scale: [0.95, 1, 0.95] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        className="w-[110px] bg-white/90 backdrop-blur-sm rounded-xl shadow-lg border border-neutral-100 p-2 flex flex-col gap-1.5 z-10"
      >
        <div className="w-full h-10 bg-neutral-900 rounded-lg mb-1" />
        <div className="flex gap-1.5">
          <div className="flex-1 h-6 bg-blue-500 rounded-md" />
          <div className="flex-1 h-6 bg-indigo-400 rounded-md" />
          <div className="flex-1 h-6 bg-violet-300 rounded-md" />
        </div>
      </motion.div>
    </div>
  );
};

export default Designers;
