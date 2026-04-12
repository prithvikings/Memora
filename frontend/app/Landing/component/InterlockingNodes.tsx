"use client";
import React from "react";
import { motion } from "motion/react";

export const InterlockingNodes = () => {
  // Base Palette (The Core System)
  const base = {
    top: "url(#baseTop)",
    left: "#F8FAFC",
    right: "#F1F5F9",
    stroke: "#CBD5E1",
    shadow: "#E2E8F0",
  };

  // Insert Palette (The Integration Node)
  const insert = {
    top: "url(#insertTop)",
    left: "#DBEAFE", // Light blue
    right: "#BFDBFE", // Slightly darker blue
    stroke: "#93C5FD",
    glow: "#3B82F6",
  };

  return (
    <div className="flex flex-col items-center justify-center p-8 rounded-2xl bg-white border border-slate-200 shadow-sm shadow-inner w-fit mx-auto">
      <motion.svg
        whileHover="animate"
        initial="initial"
        className="w-[300px] h-[300px] overflow-visible cursor-pointer"
        viewBox="-150 -100 300 250"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="baseTop" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFFFFF" />
            <stop offset="100%" stopColor="#F8FAFC" />
          </linearGradient>
          <linearGradient id="insertTop" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#EFF6FF" />
            <stop offset="100%" stopColor="#DBEAFE" />
          </linearGradient>
        </defs>

        <g transform="translate(0, 0)">
          {/* Static Floor Shadow */}
          <path
            d="M 0 10 L 120 70 L 60 100 L 0 70 L -60 100 L -120 70 Z"
            fill={base.shadow}
            className="opacity-50"
          />

          {/* --- CORE SYSTEM (The Receptacle) --- */}
          <g>
            {/* Outer Left Tip */}
            <path
              d="M -60 30 L -120 0 L -120 60 L -60 90 Z"
              fill={base.left}
              stroke={base.stroke}
              strokeLinejoin="round"
              strokeWidth="1.5"
            />
            {/* Inner Right Wall (Has API ports) */}
            <path
              d="M 0 0 L -60 30 L -60 90 L 0 60 Z"
              fill={base.right}
              stroke={base.stroke}
              strokeLinejoin="round"
              strokeWidth="1.5"
            />
            {/* Inner Left Wall (Has API ports) */}
            <path
              d="M 60 30 L 0 0 L 0 60 L 60 90 Z"
              fill={base.left}
              stroke={base.stroke}
              strokeLinejoin="round"
              strokeWidth="1.5"
            />
            {/* Outer Right Tip */}
            <path
              d="M 120 0 L 60 30 L 60 90 L 120 60 Z"
              fill={base.right}
              stroke={base.stroke}
              strokeLinejoin="round"
              strokeWidth="1.5"
            />
            {/* Top Base Face (L-Shape) */}
            <path
              d="M 0 -60 L 120 0 L 60 30 L 0 0 L -60 30 L -120 0 Z"
              fill={base.top}
              stroke={base.stroke}
              strokeLinejoin="round"
              strokeWidth="1.5"
            />

            {/* API Connection Ports (They glow right before connection) */}
            <motion.circle
              cx="-20"
              cy="40"
              r="2.5"
              fill="#94A3B8"
              variants={{ animate: { fill: insert.glow, scale: 1.2 } }}
              transition={{ duration: 0.2 }}
            />
            <motion.circle
              cx="-40"
              cy="50"
              r="2.5"
              fill="#94A3B8"
              variants={{ animate: { fill: insert.glow, scale: 1.2 } }}
              transition={{ duration: 0.2 }}
            />
            <motion.circle
              cx="20"
              cy="40"
              r="2.5"
              fill="#94A3B8"
              variants={{ animate: { fill: insert.glow, scale: 1.2 } }}
              transition={{ duration: 0.2 }}
            />
            <motion.circle
              cx="40"
              cy="50"
              r="2.5"
              fill="#94A3B8"
              variants={{ animate: { fill: insert.glow, scale: 1.2 } }}
              transition={{ duration: 0.2 }}
            />
          </g>

          {/* --- INTEGRATION NODE (The Insert Piece) --- */}
          <motion.g
            variants={{
              initial: {
                x: 50, // Hovering off to the top right
                y: -50,
                opacity: 0.6,
              },
              animate: {
                x: 0, // Slots perfectly into the 0,0 center
                y: 0,
                opacity: 1,
              },
            }}
            transition={{
              type: "spring",
              stiffness: 150,
              damping: 15,
              mass: 1,
            }}
          >
            {/* Insert Front-Left Face */}
            <path
              d="M -60 30 L 0 60 L 0 120 L -60 90 Z"
              fill={insert.left}
              stroke={insert.stroke}
              strokeLinejoin="round"
              strokeWidth="1.5"
            />
            {/* Insert Front-Right Face */}
            <path
              d="M 0 60 L 60 30 L 60 90 L 0 120 Z"
              fill={insert.right}
              stroke={insert.stroke}
              strokeLinejoin="round"
              strokeWidth="1.5"
            />
            {/* Insert Top Face */}
            <path
              d="M 0 0 L 60 30 L 0 60 L -60 30 Z"
              fill={insert.top}
              stroke={insert.stroke}
              strokeLinejoin="round"
              strokeWidth="1.5"
            />

            {/* Status Indicator (Turns green when connected) */}
            <motion.circle
              cx="0"
              cy="30"
              r="4"
              variants={{
                initial: { fill: "#93C5FD" },
                animate: { fill: "#34D399" }, // Emerald green
              }}
              transition={{ delay: 0.35, duration: 0.2 }} // Waits for the physical "snap" to finish
            />
          </motion.g>
        </g>
      </motion.svg>
    </div>
  );
};

export default InterlockingNodes;
