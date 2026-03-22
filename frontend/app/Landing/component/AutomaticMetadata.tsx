"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion"; // or "motion/react"

const AutomaticMetadata = () => {
  const customEase = [0.22, 1, 0.36, 1] as const;
  const [stage, setStage] = useState(0); // 0: Pasting Link, 1: Loading, 2: Loaded

  // Handle the state transitions
  React.useEffect(() => {
    // 1. Simulate pasting finishing after 1 second
    const pasteTimer = setTimeout(() => setStage(1), 1000);

    // 2. Simulate loading finishing 1.5 seconds later
    const loadTimer = setTimeout(() => setStage(2), 2500);

    return () => {
      clearTimeout(pasteTimer);
      clearTimeout(loadTimer);
    };
  }, []);

  return (
    <div className="w-full h-full flex items-center justify-center p-6 relative">
      <motion.div
        initial={{ y: 20, opacity: 0, scale: 0.95 }}
        animate={{ y: 0, opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, ease: customEase }}
        className="w-full max-w-[300px] bg-white rounded-2xl shadow-xl shadow-black/5 border border-black/5 p-4 flex flex-col gap-4 relative overflow-hidden"
      >
        {/* Fake URL Input */}
        <div className="w-full bg-neutral-50 border border-neutral-100 rounded-lg p-2 flex items-center gap-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            className="w-3 h-3 text-neutral-400 shrink-0"
          >
            <path d="M12.234 2.834a4 4 0 00-5.658 5.658l.792.792a.5.5 0 01-.707.707l-.792-.792a5 5 0 017.07-7.07l1.626 1.626a5 5 0 010 7.071l-.792.792a.5.5 0 01-.707-.707l.792-.792a4 4 0 000-5.658l-1.626-1.626z" />
            <path d="M7.766 17.166a4 4 0 005.658-5.658l-.792-.792a.5.5 0 01.707-.707l.792.792a5 5 0 01-7.07 7.07l-1.626-1.626a5 5 0 010-7.071l.792-.792a.5.5 0 01.707.707l-.792.792a4 4 0 000 5.658l1.626 1.626z" />
          </svg>

          <div className="relative flex items-center w-full h-4 overflow-hidden">
            {/* The Text Being Typed */}
            <motion.div
              initial={{ width: "0%" }}
              animate={{ width: "100%" }}
              transition={{ delay: 0.3, duration: 0.7, ease: "linear" }}
              className="absolute left-0 top-0 h-full overflow-hidden whitespace-nowrap text-[11px] text-neutral-500 font-mono tracking-tight flex items-center"
            >
              https://linear.app/blog/rethinking...
            </motion.div>
          </div>
        </div>

        {/* The Link Preview Card (Populates based on stage) */}
        <motion.div
          animate={{ height: stage === 2 ? "auto" : "50px" }}
          transition={{ duration: 0.5, ease: customEase }}
          className="w-full bg-neutral-50 border border-neutral-100 rounded-xl overflow-hidden shadow-inner relative"
        >
          <AnimatePresence mode="wait">
            {/* STAGE 1: LOADING */}
            {stage === 1 && (
              <motion.div
                key="loading"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 flex items-center justify-center gap-2 text-xs text-neutral-500 font-medium"
              >
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                  className="w-3 h-3 border-2 border-neutral-300 border-t-neutral-600 rounded-full"
                />
                Fetching Metadata
              </motion.div>
            )}

            {/* STAGE 2: LOADED */}
            {stage === 2 && (
              <motion.div
                key="loaded"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, ease: customEase }}
                className="flex flex-col gap-3 p-3"
              >
                {/* Hero Image Mockup */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.2, duration: 0.4 }}
                  className="w-full h-24 bg-neutral-200 rounded-lg flex items-center justify-center overflow-hidden relative"
                >
                  <div className="absolute inset-0 bg-linear-to-br from-neutral-200 to-neutral-300" />
                  <span className="text-xl font-gist text-neutral-400">L</span>
                </motion.div>

                {/* Title and Description lines */}
                <div className="flex flex-col gap-2">
                  <motion.div
                    initial={{ width: "0%" }}
                    animate={{ width: "95%" }}
                    transition={{ delay: 0.4, duration: 0.5 }}
                    className="h-2.5 bg-neutral-800 rounded-full"
                  />
                  <motion.div
                    initial={{ width: "0%" }}
                    animate={{ width: "60%" }}
                    transition={{ delay: 0.5, duration: 0.5 }}
                    className="h-2.5 bg-neutral-800 rounded-full"
                  />
                  <div className="h-1.5 w-full bg-neutral-100 rounded-full mt-1.5" />
                  <div className="h-1.5 w-[90%] bg-neutral-100 rounded-full" />
                </div>

                {/* Metadata Footer (Author + Date) */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.7, duration: 0.3 }}
                  className="flex items-center gap-2 pt-2 border-t border-neutral-100 mt-1"
                >
                  <div className="w-5 h-5 rounded-full bg-neutral-200"></div>
                  <div className="flex flex-col gap-0.5">
                    <div className="h-1.5 w-16 bg-neutral-200 rounded-full"></div>
                    <div className="h-1.5 w-10 bg-neutral-100 rounded-full"></div>
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default AutomaticMetadata;
