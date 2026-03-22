"use client";
import React from "react";
import { motion } from "motion/react";

const Researchers = () => {
  return (
    <div className="w-full h-full bg-neutral-200 flex items-center justify-center p-4 overflow-hidden rounded-xl relative">
      {/* Background Paper */}
      <div className="absolute w-[180px] h-36 bg-white/40 rounded-lg border border-white/60 shadow-sm rotate-6 translate-x-4 translate-y-2" />

      {/* Foreground Paper */}
      <motion.div
        animate={{ rotate: [-2, 0, -2] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        className="w-full max-w-[180px] h-36 bg-white rounded-lg shadow-lg shadow-black/5 flex flex-col p-3 border border-neutral-100 relative z-10"
      >
        <div className="w-3/4 h-2.5 bg-neutral-800 rounded-full mb-3" />

        <div className="flex flex-col gap-1.5 mb-2 relative">
          <div className="w-full h-1.5 bg-neutral-200 rounded-full" />
          <div className="w-full h-1.5 bg-neutral-200 rounded-full" />

          {/* Animated Highlight Effect */}
          <motion.div
            initial={{ width: "0%" }}
            animate={{ width: ["0%", "85%", "85%", "0%"] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-0 left-0 h-3.5 bg-yellow-200/80 rounded -translate-y-1 mix-blend-multiply"
          />
        </div>

        <div className="w-[90%] h-1.5 bg-neutral-200 rounded-full" />

        {/* Extracted Tag */}
        <motion.div
          animate={{ opacity: [0, 1, 1, 0], y: [5, 0, 0, 5] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          className="mt-auto self-end bg-yellow-100 border border-yellow-200 text-yellow-700 text-[8px] font-bold px-1.5 py-0.5 rounded shadow-sm"
        >
          Extracted
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Researchers;
