"use client";
import React from "react";
import { motion } from "motion/react";

export const SemanticSearchIllustration = () => {
  return (
    <motion.svg
      className="w-full h-full overflow-visible"
      viewBox="0 0 200 200"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g transform="translate(100, 100)">
        {/* Background Network Nodes */}
        <motion.g
          variants={{
            initial: { opacity: 0.5 },
            animate: { opacity: 1, transition: { duration: 0.3 } },
          }}
        >
          {/* Passive Connecting lines - Very subtle light grey */}
          <g stroke="#E2E8F0" strokeWidth="1.5">
            <path d="M -45 -30 L 15 -45" />
            <path d="M 15 -45 L 45 15" />
            <path d="M 45 15 L 10 45" />
            <path d="M 10 45 L -35 25" />
            <path d="M -35 25 L -45 -30" />
            <path d="M -45 -30 L 10 45" />
            <path d="M -35 25 L 15 -45" />
          </g>
          {/* Passive Nodes - Neutral mid-grey */}
          <circle cx="-45" cy="-30" r="4" fill="#94A3B8" />
          <circle cx="15" cy="-45" r="4" fill="#94A3B8" />
          <circle cx="45" cy="15" r="4" fill="#94A3B8" />
          <circle cx="10" cy="45" r="4" fill="#94A3B8" />
          <circle cx="-35" cy="25" r="4" fill="#94A3B8" />
        </motion.g>

        {/* Highlighted Semantic Neural Path */}
        <motion.g
          variants={{
            initial: { pathLength: 0, opacity: 0 },
            animate: {
              pathLength: 1,
              opacity: 1,
              transition: { duration: 0.8, ease: "easeOut" },
            },
          }}
        >
          {/* Active Path - Deep Slate Grey for neutral contrast */}
          <path
            d="M -45 -30 L 15 -45 L 45 15"
            fill="none"
            stroke="#475569" // Deep Slate
            strokeWidth="2.5"
          />
          <circle cx="-45" cy="-30" r="5" fill="#475569" />
          <circle cx="15" cy="-45" r="5" fill="#475569" />
          <circle cx="45" cy="15" r="5" fill="#475569" />
        </motion.g>

        {/* AI Magnifying Glass - Split into two wrappers for absolute control */}

        {/* Outer Wrapper: Handles Fading in and Scaling up on hover */}
        <motion.g
          variants={{
            initial: { opacity: 0, scale: 0.8 },
            animate: {
              opacity: 1,
              scale: 1,
              transition: { duration: 0.4, ease: "easeOut" },
            },
          }}
        >
          {/* Inner Wrapper: Handles the infinite scanning movement */}
          <motion.g
            variants={{
              initial: { x: -30, y: 15 },
              animate: {
                x: [-30, 5, 30],
                y: [15, -35, 5],
                transition: {
                  duration: 2.5,
                  ease: "easeInOut",
                  repeat: Infinity,
                  repeatType: "mirror",
                },
              },
            }}
          >
            {/* Glass Circle */}
            <circle
              cx="0"
              cy="0"
              r="22"
              fill="#F8FAFC"
              fillOpacity="0.8"
              stroke="#A1A1AA" // Cool Zinc
              strokeWidth="3"
            />
            {/* Handle - Metallic tone */}
            <path
              d="M 16 16 L 32 32"
              stroke="#A1A1AA"
              strokeWidth="4"
              strokeLinecap="round"
            />
            {/* Inner Tech Reticle - Lighter neutral grey for detail */}
            <path
              d="M 0 -10 L 0 -5 M 0 10 L 0 5 M -10 0 L -5 0 M 10 0 L 5 0"
              stroke="#D4D4D8" // Light Zinc
              strokeWidth="1.5"
              strokeLinecap="round"
            />
            <circle cx="0" cy="0" r="1.5" fill="#D4D4D8" />
          </motion.g>
        </motion.g>
      </g>
    </motion.svg>
  );
};

export default SemanticSearchIllustration;
