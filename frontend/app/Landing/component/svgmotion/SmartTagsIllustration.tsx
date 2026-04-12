"use client";
import React from "react";
import { motion } from "motion/react";

export const SmartTagsIllustration = () => {
  const premiumEase = [0.16, 1, 0.3, 1] as const;

  return (
    <motion.svg
      className="w-full h-full overflow-visible"
      viewBox="0 0 200 200"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g transform="translate(100, 100)">
        {/* Connecting Dashed Lines */}
        <motion.g
          stroke="#CBD5E1"
          strokeWidth="1.5"
          strokeDasharray="3 3"
          variants={{
            initial: { opacity: 0 },
            animate: {
              opacity: 1,
              transition: { delay: 0.3, duration: 1.2, ease: premiumEase },
            },
          }}
        >
          <path d="M 0 0 L -35 -40" />
          <path d="M 0 0 L 45 -25" />
          <path d="M 0 0 L 35 40" />
          <path d="M 0 0 L -40 30" />
        </motion.g>

        {/* Central Bookmark Base */}
        <motion.g
          variants={{
            initial: { scale: 1 },
            animate: {
              scale: 1.05,
              transition: { duration: 1, ease: premiumEase },
            },
          }}
        >
          <rect
            x="-20"
            y="-25"
            width="40"
            height="50"
            rx="6"
            fill="#F8FAFC"
            stroke="#94A3B8"
            strokeWidth="2"
          />
          <path d="M 5 -25 L 5 -5 L 12 -10 L 19 -5 L 19 -25 Z" fill="#475569" />
          <path
            d="M -10 5 L 10 5 M -10 13 L 5 13"
            stroke="#CBD5E1"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </motion.g>

        {/* Tag 1 - Top Left (Cool Zinc) */}
        <motion.g
          variants={{
            initial: { x: 0, y: 0, scale: 0, opacity: 0 },
            animate: {
              x: -35,
              y: -40,
              scale: 1,
              opacity: 1,
              transition: { duration: 1.2, delay: 0.15, ease: premiumEase },
            },
          }}
        >
          <rect
            x="-30"
            y="-12"
            width="60"
            height="24"
            rx="12"
            fill="#F4F4F5"
            stroke="#A1A1AA"
            strokeWidth="1.5"
          />
          <circle cx="-18" cy="0" r="4" fill="#71717A" />
          <path
            d="M -8 0 L 15 0"
            stroke="#D4D4D8"
            strokeWidth="3"
            strokeLinecap="round"
          />
        </motion.g>

        {/* Tag 2 - Top Right (Soft Gray) */}
        <motion.g
          variants={{
            initial: { x: 0, y: 0, scale: 0, opacity: 0 },
            animate: {
              x: 45,
              y: -25,
              scale: 1,
              opacity: 1,
              transition: { duration: 1.2, delay: 0.3, ease: premiumEase },
            },
          }}
        >
          <rect
            x="-25"
            y="-12"
            width="50"
            height="24"
            rx="12"
            fill="#F3F4F6"
            stroke="#9CA3AF"
            strokeWidth="1.5"
          />
          <circle cx="-13" cy="0" r="4" fill="#6B7280" />
          <path
            d="M -3 0 L 12 0"
            stroke="#D1D5DB"
            strokeWidth="3"
            strokeLinecap="round"
          />
        </motion.g>

        {/* Tag 3 - Bottom Right (Slate) */}
        <motion.g
          variants={{
            initial: { x: 0, y: 0, scale: 0, opacity: 0 },
            animate: {
              x: 35,
              y: 40,
              scale: 1,
              opacity: 1,
              transition: { duration: 1.2, delay: 0.45, ease: premiumEase },
            },
          }}
        >
          <rect
            x="-25"
            y="-12"
            width="50"
            height="24"
            rx="12"
            fill="#F8FAFC"
            stroke="#94A3B8"
            strokeWidth="1.5"
          />
          <circle cx="-13" cy="0" r="4" fill="#64748B" />
          <path
            d="M -3 0 L 12 0"
            stroke="#CBD5E1"
            strokeWidth="3"
            strokeLinecap="round"
          />
        </motion.g>

        {/* Tag 4 - Bottom Left (Warm Stone) */}
        <motion.g
          variants={{
            initial: { x: 0, y: 0, scale: 0, opacity: 0 },
            animate: {
              x: -40,
              y: 30,
              scale: 1,
              opacity: 1,
              transition: { duration: 1.2, delay: 0.6, ease: premiumEase },
            },
          }}
        >
          <rect
            x="-25"
            y="-12"
            width="50"
            height="24"
            rx="12"
            fill="#FAFAF9"
            stroke="#A8A29E"
            strokeWidth="1.5"
          />
          <circle cx="-13" cy="0" r="4" fill="#78716C" />
          <path
            d="M -3 0 L 12 0"
            stroke="#D6D3D1"
            strokeWidth="3"
            strokeLinecap="round"
          />
        </motion.g>
      </g>
    </motion.svg>
  );
};

export default SmartTagsIllustration;
