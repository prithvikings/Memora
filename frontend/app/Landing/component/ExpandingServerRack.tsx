"use client";
import React from "react";
import { motion } from "motion/react";

export const ExpandingServerRack = () => {
  // Define dimensions for consistency
  const bladeWidth = 120; // x projection
  const bladeDepth = 60; // projection on isometric axis
  const bladeHeight = 18; // vertical thickness
  const gapSize = 12; // vertical gap when expanded

  // Isometric path helpers
  const topPath = `M -${bladeWidth / 2} 0 L 0 -${bladeDepth / 2} L ${bladeWidth / 2} 0 L 0 ${bladeDepth / 2} Z`;
  const sideRightPath = `M 0 ${bladeDepth / 2} L ${bladeWidth / 2} 0 L ${bladeWidth / 2} ${bladeHeight} L 0 ${bladeDepth / 2 + bladeHeight} Z`;
  const sideLeftPath = `M 0 ${bladeDepth / 2} L -${bladeWidth / 2} 0 L -${bladeWidth / 2} ${bladeHeight} L 0 ${bladeDepth / 2 + bladeHeight} Z`;

  // Color palette - updated with Red & Green
  const palette = {
    stroke: "#CBD5E1",
    fillTop: "white",
    fillSide: "#F8FAFC",
    shadow: "#E2E8F0",
    lightPower: "#34D399", // Emerald Green
    lightAlert: "#F87171", // Soft Red
  };

  // Right-aligned status lights on the front-left face
  const renderStatusLights = (delayOffset: number) => (
    <>
      {/* Power/Active Light (Green) */}
      <motion.circle
        cx="-20"
        cy="29"
        r="2.5"
        strokeWidth="1"
        variants={{
          animate: {
            fill: palette.lightPower,
            stroke: palette.fillSide,
            opacity: 1,
          },
          initial: { fill: palette.stroke, stroke: "none", opacity: 0.5 },
        }}
        transition={{ duration: 0.35, delay: delayOffset, ease: "easeOut" }}
      />
      {/* Activity/Alert Light (Red) */}
      <motion.circle
        cx="-10"
        cy="34"
        r="2.5"
        strokeWidth="1"
        variants={{
          animate: {
            fill: palette.lightAlert,
            stroke: palette.fillSide,
            opacity: 1,
          },
          initial: { fill: palette.stroke, stroke: "none", opacity: 0.5 },
        }}
        transition={{ duration: 0.35, delay: delayOffset, ease: "easeOut" }}
      />
    </>
  );

  return (
    <motion.svg
      whileHover="animate"
      initial="initial"
      className="isometric-stack w-[300px] h-[380px] overflow-visible"
      viewBox="0 0 200 280"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient
          id="topGradientRack"
          x1="0%"
          y1="0%"
          x2="100%"
          y2="100%"
        >
          <stop offset="0%" stopColor="#FFFFFF" stopOpacity={0.8} />
          <stop offset="100%" stopColor="#F8FAFC" stopOpacity={0.8} />
        </linearGradient>
      </defs>

      <g transform="translate(100, 100) scale(0.75)">
        {/* Loop renders from bottom (3) to top (0) to ensure proper depth overlapping */}
        {[3, 2, 1, 0].map((index) => (
          <motion.g
            key={index}
            variants={{
              animate: { y: bladeHeight * index + gapSize * index },
              initial: { y: bladeHeight * index },
            }}
            transition={{
              duration: 0.35,
              delay: (3 - index) * 0.05, // Bottom drops first, creating a cascade
              ease: "easeOut",
            }}
          >
            <path
              d={topPath}
              fill="url(#topGradientRack)"
              stroke={palette.stroke}
              strokeWidth="1"
            />
            <path
              d={sideRightPath}
              fill={palette.fillSide}
              stroke={palette.stroke}
              strokeLinejoin="round"
              strokeWidth="1.5"
            />
            <path
              d={sideLeftPath}
              fill={palette.fillSide}
              stroke={palette.stroke}
              strokeLinejoin="round"
              strokeWidth="1.5"
            />

            {/* Buttons pinned securely inside the blade */}
            {renderStatusLights((3 - index) * 0.05 + 0.1)}
          </motion.g>
        ))}
      </g>
    </motion.svg>
  );
};

export default ExpandingServerRack;
