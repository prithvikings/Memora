"use client";
import React from "react";
import { motion } from "motion/react";

export const SmartTagssvg = () => {
  const palette = {
    paper: "#FFFFFF",
    outline: "#E2E8F0",
    skeleton: "#F1F5F9",
    skeletonDark: "#E2E8F0",
    accent: "#3B82F6",
    tagBg: "#EFF6FF",
    tagBorder: "#BFDBFE",
  };

  const tags = [
    { id: 0, x: 80, width: 36, delay: 0.1 },
    { id: 1, x: 124, width: 44, delay: 0.15 },
    { id: 2, x: 176, width: 28, delay: 0.2 },
  ];

  return (
    <div className="flex flex-col items-center justify-center p-8 rounded-2xl bg-white border border-slate-200 shadow-sm w-fit mx-auto cursor-pointer">
      <motion.svg
        initial="initial"
        whileHover="animate"
        className="w-[280px] h-[280px] overflow-visible"
        viewBox="0 0 280 280"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Main Card */}
        <rect
          x="60"
          y="40"
          width="160"
          height="200"
          rx="12"
          fill={palette.paper}
          stroke={palette.outline}
          strokeWidth="2"
        />

        {/* Skeleton Content */}
        <rect
          x="80"
          y="60"
          width="80"
          height="12"
          rx="4"
          fill={palette.skeletonDark}
        />
        <rect
          x="80"
          y="84"
          width="120"
          height="6"
          rx="3"
          fill={palette.skeleton}
        />
        <rect
          x="80"
          y="100"
          width="100"
          height="6"
          rx="3"
          fill={palette.skeleton}
        />
        <rect
          x="80"
          y="116"
          width="110"
          height="6"
          rx="3"
          fill={palette.skeleton}
        />

        {/* AI Node - Pulses on hover */}
        <motion.circle
          cx="60"
          cy="140"
          r="10"
          variants={{
            initial: { scale: 1, fill: palette.paper, stroke: palette.outline },
            animate: {
              scale: 1.2,
              fill: palette.accent,
              stroke: palette.accent,
            },
          }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          style={{ originX: "60px", originY: "140px" }}
        />

        {/* Checkmark inside Node - Appears on hover */}
        <motion.path
          d="M 56 140 L 59 144 L 65 136"
          fill="none"
          stroke={palette.paper}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          variants={{
            initial: { pathLength: 0, opacity: 0 },
            animate: { pathLength: 1, opacity: 1 },
          }}
          transition={{ duration: 0.3, delay: 0.1 }}
        />

        {/* Tags - Spring out on hover */}
        {tags.map((tag) => (
          <motion.g key={tag.id}>
            <motion.rect
              x={tag.x}
              y="190"
              width={tag.width}
              height="20"
              rx="10"
              fill={palette.tagBg}
              stroke={palette.tagBorder}
              strokeWidth="1.5"
              variants={{
                initial: { y: -10, scale: 0.5, opacity: 0 },
                animate: { y: 0, scale: 1, opacity: 1 },
              }}
              transition={{ duration: 0.4, delay: tag.delay, ease: "backOut" }}
              style={{
                originX: `${tag.x + tag.width / 2}px`,
                originY: "200px",
              }}
            />
            {/* Tag text skeleton */}
            <motion.rect
              x={tag.x + 8}
              y="198"
              width={tag.width - 16}
              height="4"
              rx="2"
              fill={palette.accent}
              variants={{
                initial: { opacity: 0 },
                animate: { opacity: 1 },
              }}
              transition={{ duration: 0.2, delay: tag.delay + 0.1 }}
            />
          </motion.g>
        ))}
      </motion.svg>
    </div>
  );
};
