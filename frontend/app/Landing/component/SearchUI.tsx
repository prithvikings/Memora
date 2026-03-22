"use client";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";

const SearchUI = () => {
  const customEase = [0.22, 1, 0.36, 1] as const;
  // 0: Initial, 1: Typing, 2: Searching, 3: Results
  const [step, setStep] = useState(0);

  useEffect(() => {
    // Sequence the animations
    const typeTimer = setTimeout(() => setStep(1), 400);
    const searchTimer = setTimeout(() => setStep(2), 2000); // Finished typing
    const resultsTimer = setTimeout(() => setStep(3), 3200); // Finished searching

    return () => {
      clearTimeout(typeTimer);
      clearTimeout(searchTimer);
      clearTimeout(resultsTimer);
    };
  }, []);

  return (
    <div className="w-full h-full flex items-center justify-center p-6 md:p-12 relative font-sans">
      {/* Deep Background Blurs */}
      <div className="absolute top-1/4 left-1/3 w-64 h-64 bg-fuchsia-200/40 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 right-1/3 w-64 h-64 bg-violet-200/40 rounded-full blur-3xl" />

      {/* Main Command Palette Modal */}
      <motion.div
        initial={{ y: 20, opacity: 0, scale: 0.95 }}
        animate={{ y: 0, opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, ease: customEase }}
        className="w-full max-w-md bg-white/95 backdrop-blur-xl rounded-2xl shadow-[0_30px_60px_-15px_rgba(0,0,0,0.1)] border border-neutral-200/60 overflow-hidden relative z-10 flex flex-col"
      >
        {/* Search Input Area */}
        <div className="px-5 py-4 flex items-center gap-3 border-b border-neutral-100 relative">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            className={`w-5 h-5 transition-colors duration-500 ${step >= 2 ? "text-violet-500" : "text-neutral-400"}`}
          >
            <path
              fillRule="evenodd"
              d="M9 3.5a5.5 5.5 0 100 11 5.5 5.5 0 000-11zM2 9a7 7 0 1112.452 4.391l3.328 3.329a.75.75 0 11-1.06 1.06l-3.329-3.328A7 7 0 012 9z"
              clipRule="evenodd"
            />
          </svg>

          {/* Typing Simulator */}
          <div className="relative flex items-center flex-1 h-6 overflow-hidden">
            {step === 0 && (
              <span className="text-neutral-400 text-sm font-medium">
                Search for concepts, not just keywords...
              </span>
            )}

            {(step === 1 || step === 2 || step === 3) && (
              <motion.div
                initial={{ width: "0%" }}
                animate={{ width: "100%" }}
                transition={{ duration: 1.2, ease: "linear" }}
                className="absolute left-0 top-0 h-full overflow-hidden whitespace-nowrap text-sm text-neutral-800 font-medium tracking-tight flex items-center"
              >
                "secure login stuff"
              </motion.div>
            )}

            {/* Blinking Cursor */}
            {(step === 1 || step === 2) && (
              <motion.div
                initial={{ opacity: 1, left: "0%" }}
                animate={
                  step === 1
                    ? { opacity: [1, 0, 1], left: "100%" }
                    : { opacity: 0, left: "100%" }
                }
                transition={{
                  left: { duration: 1.2, ease: "linear" },
                  opacity: { repeat: Infinity, duration: 0.7, ease: "linear" },
                }}
                className="absolute top-1 bottom-1 w-[1.5px] bg-violet-500"
              />
            )}
          </div>

          <div className="px-1.5 py-0.5 rounded text-[10px] font-bold text-neutral-400 bg-neutral-100 border border-neutral-200">
            ⌘K
          </div>
        </div>

        {/* Results Area */}
        <div className="flex flex-col bg-neutral-50/50 min-h-[160px] relative">
          <AnimatePresence mode="wait">
            {/* Thinking / Searching State */}
            {step === 2 && (
              <motion.div
                key="searching"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 flex items-center justify-center"
              >
                <div className="flex items-center gap-2 text-xs font-medium text-neutral-500">
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{
                      repeat: Infinity,
                      duration: 1,
                      ease: "linear",
                    }}
                    className="w-4 h-4 border-2 border-neutral-200 border-t-violet-500 rounded-full"
                  />
                  Searching across 1,240 bookmarks...
                </div>
              </motion.div>
            )}

            {/* Actual Results */}
            {step === 3 && (
              <motion.div
                key="results"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex flex-col p-2 gap-1"
              >
                {/* Result 1: The Semantic Match */}
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ duration: 0.4, ease: customEase }}
                  className="w-full bg-white rounded-xl p-3 shadow-[0_2px_10px_-4px_rgba(0,0,0,0.1)] border border-violet-100 flex gap-3 items-start relative overflow-hidden cursor-pointer"
                >
                  {/* Subtle highlight background */}
                  <div className="absolute inset-0 bg-linear-to-r from-violet-50/50 to-transparent pointer-events-none" />

                  <div className="w-8 h-8 rounded-lg bg-violet-100 text-violet-600 flex items-center justify-center shrink-0 relative z-10">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      className="w-4 h-4"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 1a4.5 4.5 0 00-4.5 4.5V9H5a2 2 0 00-2 2v6a2 2 0 002 2h10a2 2 0 002-2v-6a2 2 0 00-2-2h-.5V5.5A4.5 4.5 0 0010 1zm3 8V5.5a3 3 0 10-6 0V9h6z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <div className="flex flex-col gap-1 relative z-10 w-full">
                    <div className="flex items-center justify-between">
                      <h3 className="text-sm font-semibold text-neutral-800">
                        Complete Guide to JWT Auth
                      </h3>
                      <span className="text-[9px] font-bold text-violet-600 uppercase tracking-wider bg-violet-100 px-1.5 py-0.5 rounded flex items-center gap-1">
                        <svg
                          className="w-2.5 h-2.5"
                          viewBox="0 0 24 24"
                          fill="currentColor"
                        >
                          <path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z" />
                        </svg>
                        98% Match
                      </span>
                    </div>
                    <p className="text-xs text-neutral-500">
                      Best practices for storing JSON Web Tokens securely in
                      modern web apps...
                    </p>
                  </div>
                </motion.div>

                {/* Result 2: Secondary Match */}
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ delay: 0.1, duration: 0.4, ease: customEase }}
                  className="w-full bg-transparent rounded-xl p-3 flex gap-3 items-start border border-transparent hover:bg-neutral-100 cursor-pointer transition-colors"
                >
                  <div className="w-8 h-8 rounded-lg bg-neutral-200 text-neutral-500 flex items-center justify-center shrink-0">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      className="w-4 h-4"
                    >
                      <path
                        fillRule="evenodd"
                        d="M3 4a2 2 0 012-2h4a2 2 0 012 2v2.5a.5.5 0 01-1 0V4a1 1 0 00-1-1H5a1 1 0 00-1 1v12a1 1 0 001 1h4a1 1 0 001-1v-2.5a.5.5 0 011 0V16a2 2 0 01-2 2H5a2 2 0 01-2-2V4z"
                        clipRule="evenodd"
                      />
                      <path
                        fillRule="evenodd"
                        d="M13.854 6.854a.5.5 0 010 .708L10.707 10l3.147 3.146a.5.5 0 01-.708.708l-3.5-3.5a.5.5 0 010-.708l3.5-3.5a.5.5 0 01.708 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <div className="flex flex-col gap-1 w-full pt-0.5">
                    <h3 className="text-sm font-medium text-neutral-700">
                      OAuth 2.0 flow explained
                    </h3>
                    <div className="flex gap-2 mt-1">
                      <div className="h-1.5 w-16 bg-neutral-200 rounded-full" />
                      <div className="h-1.5 w-24 bg-neutral-200 rounded-full" />
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  );
};

export default SearchUI;
