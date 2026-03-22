"use client";
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

const Collections = () => {
  const customEase = [0.22, 1, 0.36, 1] as const;
  const [isOrganized, setIsOrganized] = useState(false);

  // Trigger the organization animation after a short delay
  useEffect(() => {
    const timer = setTimeout(() => setIsOrganized(true), 1200);
    return () => clearTimeout(timer);
  }, []);

  // The messy initial positions vs the perfectly snapped grid positions
  const cards = [
    {
      id: 1,
      messy: { x: -30, y: -20, rotate: -15 },
      neat: { x: -28, y: -28, rotate: 0 },
    },
    {
      id: 2,
      messy: { x: 25, y: -35, rotate: 10 },
      neat: { x: 28, y: -28, rotate: 0 },
    },
    {
      id: 3,
      messy: { x: -20, y: 30, rotate: -8 },
      neat: { x: -28, y: 28, rotate: 0 },
    },
    {
      id: 4,
      messy: { x: 35, y: 20, rotate: 18 },
      neat: { x: 28, y: 28, rotate: 0 },
    },
  ];

  return (
    <div className="w-full h-full flex items-center justify-center p-6 relative">
      <motion.div
        initial={{ y: 20, opacity: 0, scale: 0.95 }}
        animate={{ y: 0, opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, ease: customEase }}
        className="w-full max-w-[280px] h-[240px] bg-white rounded-2xl shadow-xl shadow-black/5 border border-black/5 flex flex-col items-center justify-center relative overflow-hidden"
      >
        {/* The "Smart Folder" Background that expands when organizing */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8, borderRadius: "20%" }}
          animate={
            isOrganized
              ? { opacity: 1, scale: 1, borderRadius: "16px" }
              : { opacity: 0, scale: 0.8 }
          }
          transition={{ duration: 0.6, ease: customEase }}
          className="absolute inset-4 bg-neutral-50 border border-neutral-100/80 shadow-inner flex flex-col"
        >
          {/* Folder Header */}
          <div className="w-full px-3 py-2.5 border-b border-neutral-200/60 flex items-center justify-between bg-white/50 backdrop-blur-sm rounded-t-[16px]">
            <span className="text-xs font-semibold text-neutral-700 flex items-center gap-1.5">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                className="w-3.5 h-3.5 text-blue-500"
              >
                <path d="M3 4a2 2 0 00-2 2v8a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5.828a2 2 0 01-1.414-.586l-1.172-1.172A2 2 0 009.172 3H5a2 2 0 00-2 2z" />
              </svg>
              Design System
            </span>

            {/* Auto-update ping indicator */}
            <motion.div
              initial={{ scale: 0 }}
              animate={isOrganized ? { scale: 1 } : { scale: 0 }}
              transition={{ delay: 0.8, type: "spring" }}
              className="flex items-center gap-1 text-[9px] font-bold text-blue-500 uppercase tracking-wider bg-blue-100 px-1.5 py-0.5 rounded-sm"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse" />
              Synced
            </motion.div>
          </div>
        </motion.div>

        {/* The Link Cards */}
        <div className="relative w-full h-full flex items-center justify-center mt-6">
          {cards.map((card, i) => (
            <motion.div
              key={card.id}
              initial={{
                x: card.messy.x,
                y: card.messy.y,
                rotate: card.messy.rotate,
                opacity: 0,
                scale: 0.8,
              }}
              animate={
                isOrganized
                  ? {
                      x: card.neat.x,
                      y: card.neat.y,
                      rotate: card.neat.rotate,
                      opacity: 1,
                      scale: 1,
                    }
                  : {
                      x: card.messy.x,
                      y: card.messy.y,
                      rotate: card.messy.rotate,
                      opacity: 1,
                      scale: 1,
                    }
              }
              transition={{
                // Drop in stagger
                opacity: { delay: i * 0.1, duration: 0.3 },
                scale: { delay: i * 0.1, duration: 0.3 },
                // Snap to grid transition
                x: { duration: 0.6, ease: customEase },
                y: { duration: 0.6, ease: customEase },
                rotate: { duration: 0.5, ease: customEase },
              }}
              className="absolute w-12 h-12 bg-white rounded-lg shadow-sm border border-neutral-200 p-1.5 flex flex-col gap-1 z-10"
            >
              {/* Fake mini-card UI */}
              <div className="w-full h-5 bg-neutral-100 rounded-md"></div>
              <div className="w-3/4 h-1.5 bg-neutral-200 rounded-full mt-0.5"></div>
              <div className="w-1/2 h-1.5 bg-neutral-100 rounded-full"></div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default Collections;
