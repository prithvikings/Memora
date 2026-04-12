"use client";
import React from "react";
import { motion } from "motion/react";

export const AiSummariessvg = () => {
  const palette = {
    paper: "#FFFFFF",
    outline: "#E2E8F0",
    noiseText: "#F1F5F9",
    rawText: "#94A3B8",
    highlight: "#3B82F6",
    summaryText: "#0F172A",
  };

  const lines = [
    { id: 1, initialY: 76, target: true, width: 120, finalY: 60 },
    { id: 4, initialY: 124, target: true, width: 140, finalY: 76 },
    { id: 6, initialY: 156, target: true, width: 90, finalY: 92 },
  ];

  const noiseLines = [60, 92, 108, 140, 172, 188];

  return (
    <div className="flex flex-col items-center justify-center p-8 rounded-2xl bg-white border border-slate-200 shadow-sm w-fit mx-auto cursor-pointer">
      <motion.svg
        initial="initial"
        whileHover="animate"
        className="w-[240px] h-[300px] overflow-visible"
        viewBox="0 0 240 300"
      >
        <rect
          x="20"
          y="20"
          width="200"
          height="260"
          rx="12"
          fill={palette.paper}
          stroke={palette.outline}
          strokeWidth="2"
        />

        {/* AI Star: Simple Upward Float + Full Rotation + Fade Out */}
        <motion.path
          d="M 200 20 L 204 32 L 216 36 L 204 40 L 200 52 L 196 40 L 184 36 L 196 32 Z"
          fill={palette.highlight}
          variants={{
            initial: { y: 0, opacity: 0, rotate: 0, scale: 0.8 },
            animate: { y: -25, opacity: 0, rotate: 360, scale: 1 },
          }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          style={{ originX: "200px", originY: "36px" }}
        />

        {/* Signal Lines */}
        {lines.map((line) => (
          <motion.rect
            key={line.id}
            x="40"
            width={line.width}
            height="8"
            rx="4"
            variants={{
              initial: { y: line.initialY, fill: palette.rawText },
              animate: { y: line.finalY, fill: palette.summaryText },
            }}
            transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
          />
        ))}

        {/* Noise Lines */}
        {noiseLines.map((y, i) => (
          <motion.rect
            key={i}
            x="40"
            y={y}
            width={130 - i * 5}
            height="8"
            rx="4"
            variants={{
              initial: { opacity: 1, fill: palette.rawText },
              animate: { opacity: 0, fill: palette.noiseText },
            }}
            transition={{ duration: 0.3 }}
          />
        ))}
      </motion.svg>
    </div>
  );
};
