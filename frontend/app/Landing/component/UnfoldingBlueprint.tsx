"use client";
import React from "react";
import { motion } from "motion/react";

export const UnfoldingBlueprint = () => {
  // Tile dimensions
  const TILE_W = 64;
  const TILE_H = 32;
  const THICK = 4;
  const GAP = 6; // Isometric gap between tiles when expanded

  // Pre-calculated paths for a 3D isometric tile
  const topFace = `M 0 -${TILE_H} L ${TILE_W} 0 L 0 ${TILE_H} L -${TILE_W} 0 Z`;
  const leftFace = `M -${TILE_H * 2} 0 L 0 ${TILE_H} L 0 ${TILE_H + THICK} L -${TILE_H * 2} ${THICK} Z`;
  const rightFace = `M 0 ${TILE_H} L ${TILE_W} 0 L ${TILE_W} ${THICK} L 0 ${TILE_H + THICK} Z`;

  // Palette
  const paper = "#F8FAFC"; // Slate 50
  const paperLeft = "#E2E8F0"; // Slate 200
  const paperRight = "#F1F5F9"; // Slate 100
  const outline = "#CBD5E1"; // Slate 300
  const inkBlue = "#3B82F6"; // Blue 500
  const inkLight = "#93C5FD"; // Blue 300
  const activeGreen = "#34D399"; // Emerald 400 for activity

  // Initial Entrance Animation settings for the schematic drawing effect
  const drawVariants = {
    initial: { pathLength: 0, opacity: 0 },
    animate: { pathLength: 1, opacity: 1 },
  };

  // Helper for infinite loop transitions
  const infiniteLoop = (duration = 2, delay = 0) => ({
    repeat: Infinity,
    repeatType: "mirror" as const, // smooth back and forth
    ease: "easeInOut" as const,
    duration,
    delay, // Initial delay before loop starts
  });

  // 5 Panels Configuration
  const panels = [
    {
      id: "top-left",
      targetX: -(TILE_W + GAP),
      targetY: -(TILE_H + GAP / 2),
      delay: 0,
      isCenter: false,
      // Schematic: Database / Storage Rings with LIVE motion
      schematics: (delayOffset: number) => (
        <motion.g
          variants={drawVariants}
          transition={{ duration: 0.6, delay: delayOffset, ease: "easeOut" }}
        >
          {/* Static base rings */}
          <ellipse
            cx="0"
            cy="0"
            rx="16"
            ry="8"
            fill="none"
            stroke={inkLight}
            strokeWidth="1.5"
          />
          <ellipse
            cx="0"
            cy="-6"
            rx="16"
            ry="8"
            fill="none"
            stroke={inkLight}
            strokeWidth="1.5"
          />
          <path
            d="M -16 -12 L -16 0 M 16 -12 L 16 0"
            fill="none"
            stroke={inkLight}
            strokeWidth="1.5"
          />

          {/* Dynamic Top Ring (Read/Write pulse) */}
          <motion.ellipse
            cx="0"
            cy="-12"
            rx="16"
            ry="8"
            fill="none"
            stroke={activeGreen}
            strokeWidth="2"
            animate={{ y: [-1, 1, -1] }} // Keyframes for tiny vertical movement
            transition={infiniteLoop(1.5, delayOffset + 0.6)}
          />
        </motion.g>
      ),
    },
    {
      id: "top-right",
      targetX: TILE_W + GAP,
      targetY: -(TILE_H + GAP / 2),
      delay: 0.05,
      isCenter: false,
      // Schematic: Network Nodes with LIVE data flow
      schematics: (delayOffset: number) => {
        const networkDelay = delayOffset + 0.6;
        return (
          <motion.g
            variants={drawVariants}
            transition={{ duration: 0.6, delay: delayOffset, ease: "easeOut" }}
          >
            {/* Triangle path */}
            <path
              d="M -15 -5 L 15 -10 L 0 10 Z"
              fill="none"
              stroke={inkLight}
              strokeWidth="1.5"
            />

            {/* Breathing nodes */}
            {[
              { cx: -15, cy: -5, delay: networkDelay },
              { cx: 15, cy: -10, delay: networkDelay + 0.2 },
              { cx: 0, cy: 10, delay: networkDelay + 0.4 },
            ].map((node, i) => (
              <motion.circle
                key={i}
                cx={node.cx}
                cy={node.cy}
                r="2.5"
                fill={inkBlue}
                animate={{ scale: [1, 1.3, 1], opacity: [0.8, 1, 0.8] }}
                transition={infiniteLoop(2, node.delay)}
              />
            ))}

            {/* Data Packet moving along a line */}
            <motion.circle
              r="2"
              fill={activeGreen}
              animate={{
                cx: [-15, 15, -15], // Keyframes to move along top line
                cy: [-5, -10, -5],
              }}
              transition={{
                repeat: Infinity,
                duration: 3,
                delay: networkDelay,
                ease: "linear",
              }}
            />
          </motion.g>
        );
      },
    },
    {
      id: "center",
      targetX: 0,
      targetY: 0,
      delay: 0.1,
      isCenter: true,
      // Schematic: Core Server Cube with LIVE heartbeat
      schematics: (delayOffset: number) => (
        <motion.g
          variants={drawVariants}
          animate={{ stroke: [inkBlue, inkLight, inkBlue] }} // Keyframes for subtle color pulse
          transition={{
            duration: 0.6,
            delay: delayOffset,
            ease: "easeOut",
            stroke: infiniteLoop(4, delayOffset + 0.6),
          }}
        >
          <path
            d="M 0 -12 L 18 -3 L 0 6 L -18 -3 Z"
            fill="none"
            strokeWidth="1.5"
            strokeLinejoin="round"
          />
          <path
            d="M -18 -3 L -18 9 L 0 18 L 18 9 L 18 -3"
            fill="none"
            strokeWidth="1.5"
            strokeLinejoin="round"
          />
          <path d="M 0 6 L 0 18" fill="none" strokeWidth="1.5" />
        </motion.g>
      ),
    },
    {
      id: "bottom-left",
      targetX: -(TILE_W + GAP),
      targetY: TILE_H + GAP / 2,
      delay: 0.15,
      isCenter: false,
      // Schematic: Analytics Bar Chart with LIVE Equalizer motion
      schematics: (delayOffset: number) => {
        const chartDelay = delayOffset + 0.6;
        return (
          <motion.g
            variants={drawVariants}
            transition={{ duration: 0.6, delay: delayOffset, ease: "easeOut" }}
          >
            {/* Baseline */}
            <path
              d="M -20 12 L 20 12"
              fill="none"
              stroke={inkLight}
              strokeWidth="1.5"
              strokeLinecap="round"
            />

            {/* Moving Bars ( animating paths ) */}
            {[
              {
                x: -10,
                d: [
                  "M -10 12 L -10 2",
                  "M -10 12 L -10 -5",
                  "M -10 12 L -10 2",
                ],
              },
              { x: 0, d: ["M 0 12 L 0 -10", "M 0 12 L 0 0", "M 0 12 L 0 -10"] },
              {
                x: 10,
                d: ["M 10 12 L 10 4", "M 10 12 L 10 -2", "M 10 12 L 10 4"],
              },
            ].map((bar, i) => (
              <motion.path
                key={i}
                d={bar.d[0]}
                fill="none"
                stroke={i === 1 ? inkBlue : activeGreen} // Middle bar blue, others green
                strokeWidth="4"
                strokeLinecap="round"
                animate={{ d: bar.d }} // Keyframes for bar height
                transition={{
                  repeat: Infinity,
                  duration: 1.2,
                  delay: chartDelay + i * 0.15, // Staggered loop
                  ease: "easeInOut",
                }}
              />
            ))}
          </motion.g>
        );
      },
    },
    {
      id: "bottom-right",
      targetX: TILE_W + GAP,
      targetY: TILE_H + GAP / 2,
      delay: 0.2,
      isCenter: false,
      // Schematic: UI / Layout Grid with LIVE flow
      schematics: (delayOffset: number) => (
        <motion.g
          variants={drawVariants}
          transition={{ duration: 0.6, delay: delayOffset, ease: "easeOut" }}
        >
          {/* Static Grid */}
          <path
            d="M -20 -10 L 20 10 M -10 -15 L 30 5"
            fill="none"
            stroke={inkLight}
            strokeWidth="1"
            opacity={0.7}
          />
          <path
            d="M -20 10 L 20 -10 M -30 5 L 10 -15"
            fill="none"
            stroke={inkLight}
            strokeWidth="1"
            opacity={0.7}
          />

          {/* Floating Highlight square */}
          <motion.path
            d="M -10 5 L 0 10 L 10 5 L 0 0 Z"
            fill={activeGreen}
            stroke={paper}
            strokeWidth={1}
            animate={{
              opacity: [0.3, 0.7, 0.3], // Fades
              x: [0, 10, -10, 0], // moves along grid lines
              y: [0, 5, -5, 0],
            }}
            transition={infiniteLoop(3, delayOffset + 0.6)}
          />
        </motion.g>
      ),
    },
  ];

  return (
    <div className="flex flex-col items-center justify-center p-8 rounded-2xl bg-white border border-slate-200 shadow-sm shadow-inner w-fit mx-auto">
      <motion.svg
        whileHover="animate"
        initial="initial"
        className="w-[400px] h-[300px] overflow-visible cursor-pointer"
        viewBox="0 0 400 300"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g transform="translate(200, 150)">
          {/* Central Ground Shadow */}
          <motion.ellipse
            cx="0"
            cy="20"
            rx="90"
            ry="30"
            fill="#E2E8F0"
            variants={{
              initial: { opacity: 0.4, scale: 0.5 },
              animate: { opacity: 0.7, scale: 1.2 },
            }}
            transition={{ duration: 0.4, ease: "easeOut" }}
          />

          {panels.map((panel) => (
            <motion.g
              key={panel.id}
              variants={{
                initial: {
                  x: 0,
                  y: 0,
                  opacity: panel.isCenter ? 1 : 0,
                  scale: panel.isCenter ? 1 : 0.8,
                },
                animate: {
                  x: panel.targetX,
                  y: panel.targetY,
                  opacity: 1,
                  scale: 1,
                },
              }}
              transition={{
                duration: 0.4,
                delay: panel.delay,
                ease: "easeOut",
              }}
            >
              {/* Tile Paper Base */}
              <g>
                <path
                  d={topFace}
                  fill={paper}
                  stroke={outline}
                  strokeWidth="1"
                  strokeLinejoin="round"
                />
                <path
                  d={leftFace}
                  fill={paperLeft}
                  stroke={outline}
                  strokeWidth="1"
                  strokeLinejoin="round"
                />
                <path
                  d={rightFace}
                  fill={paperRight}
                  stroke={outline}
                  strokeWidth="1"
                  strokeLinejoin="round"
                />
                <path
                  d="M -20 0 L 20 0 M 0 -10 L 0 10"
                  fill="none"
                  stroke="#F1F5F9"
                  strokeWidth="1"
                />
              </g>

              {/* Render specific LIVE schematics inside the tile */}
              {panel.schematics(0.3 + panel.delay)}
            </motion.g>
          ))}
        </g>
      </motion.svg>
    </div>
  );
};

export default UnfoldingBlueprint;
