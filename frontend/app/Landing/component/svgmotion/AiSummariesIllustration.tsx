"use client";
import React from "react";
import { motion } from "motion/react";

export const AiSummariesIllustration = () => {
  // Custom buttery-smooth easing curve for a premium feel
  const premiumEase = [0.16, 1, 0.3, 1] as const;

  return (
    <motion.svg
      whileHover="animate"
      initial="initial"
      className="w-full h-full overflow-visible"
      viewBox="0 0 200 200"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g transform="translate(100, 100)">
        {/* 1. Base Document - Clean and minimal */}
        <rect
          x="-45"
          y="-60"
          width="90"
          height="120"
          rx="6"
          fill="#F8FAFC"
          stroke="#CBD5E1"
          strokeWidth="1.5"
        />

        {/* 2. Unimportant Context - Smoothly fades into the background on hover */}
        <motion.g
          variants={{
            initial: { opacity: 1 },
            animate: {
              opacity: 0.2,
              transition: { duration: 1.2, ease: premiumEase },
            },
          }}
        >
          <path
            d="M -30 -40 L 30 -40"
            stroke="#E2E8F0"
            strokeWidth="4"
            strokeLinecap="round"
          />
          <path
            d="M -30 -25 L 10 -25"
            stroke="#E2E8F0"
            strokeWidth="4"
            strokeLinecap="round"
          />
          <path
            d="M -30 25 L 25 25"
            stroke="#E2E8F0"
            strokeWidth="4"
            strokeLinecap="round"
          />
          <path
            d="M -30 40 L 5 40"
            stroke="#E2E8F0"
            strokeWidth="4"
            strokeLinecap="round"
          />
        </motion.g>

        {/* 3. Primary Summary Line (Blue) - Draws highlight, then lifts up */}
        <motion.g
          variants={{
            initial: { y: 0, scale: 1 },
            animate: {
              y: -2,
              scale: 1.05,
              transition: { delay: 0.4, duration: 1.2, ease: premiumEase },
            },
          }}
        >
          {/* Subtle Blue Highlight Background */}
          <motion.path
            d="M -34 -8 L 24 -8"
            stroke="#DBEAFE" // Soft blue
            strokeWidth="10"
            strokeLinecap="round"
            variants={{
              initial: { pathLength: 0, opacity: 0 },
              animate: {
                pathLength: 1,
                opacity: 1,
                transition: { duration: 1.5, ease: "easeInOut" },
              },
            }}
          />
          {/* Crisp Blue Text Line */}
          <path
            d="M -30 -8 L 20 -8"
            stroke="#3B82F6"
            strokeWidth="4"
            strokeLinecap="round"
          />
        </motion.g>

        {/* 4. Secondary Summary Line (Green) - Staggered draw and lift */}
        <motion.g
          variants={{
            initial: { y: 0, scale: 1 },
            animate: {
              y: -2,
              scale: 1.05,
              transition: { delay: 0.6, duration: 1.2, ease: premiumEase },
            },
          }}
        >
          {/* Subtle Green Highlight Background */}
          <motion.path
            d="M -34 7 L 14 7"
            stroke="#D1FAE5" // Soft emerald
            strokeWidth="10"
            strokeLinecap="round"
            variants={{
              initial: { pathLength: 0, opacity: 0 },
              animate: {
                pathLength: 1,
                opacity: 1,
                transition: { delay: 0.2, duration: 1.5, ease: "easeInOut" },
              },
            }}
          />
          {/* Crisp Green Text Line */}
          <path
            d="M -30 7 L 10 7"
            stroke="#34D399"
            strokeWidth="4"
            strokeLinecap="round"
          />
        </motion.g>

        {/* 5. Minimal AI Sparkle - Gracefully rotates and scales in as a finishing touch */}
        <motion.g
          transform="translate(35, -50)"
          variants={{
            initial: { opacity: 0, scale: 0, rotate: -45 },
            animate: {
              opacity: 1,
              scale: 1,
              rotate: 0,
              transition: { delay: 0.8, duration: 1, ease: premiumEase },
            },
          }}
        >
          {/* 4-point sleek star */}
          <path
            d="M 0 -10 Q 0 0 10 0 Q 0 0 0 10 Q 0 0 -10 0 Q 0 0 0 -10 Z"
            fill="#8B5CF6" // Vibrant purple
          />
          {/* Inner bright core */}
          <circle cx="0" cy="0" r="2" fill="#FFFFFF" />
        </motion.g>
      </g>
    </motion.svg>
  );
};

export default AiSummariesIllustration;
