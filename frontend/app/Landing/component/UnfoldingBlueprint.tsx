"use client";
import React from "react";
import { motion } from "motion/react";

export const UnfoldingBlueprint = () => {
  // Tile dimensions
  const TILE_W = 64;
  const TILE_H = 32;
  const THICK = 4;
  const GAP = 6;

  const topFace = `M 0 -${TILE_H} L ${TILE_W} 0 L 0 ${TILE_H} L -${TILE_W} 0 Z`;
  const leftFace = `M -${TILE_H * 2} 0 L 0 ${TILE_H} L 0 ${TILE_H + THICK} L -${TILE_H * 2} ${THICK} Z`;
  const rightFace = `M 0 ${TILE_H} L ${TILE_W} 0 L ${TILE_W} ${THICK} L 0 ${TILE_H + THICK} Z`;

  const paper = "#F9FAFB";
  const paperLeft = "#E5E7EB";
  const paperRight = "#F3F4F6";
  const outline = "#D1D5DB";

  const inkMain = "#4B5563";
  const inkSubtle = "#9CA3AF";
  const activeAccent = "#A1A1AA";
  const shadowGround = "#D1D5DB";

  const drawVariants = {
    initial: { pathLength: 0, opacity: 0 },
    animate: { pathLength: 1, opacity: 1 },
  };

  const infiniteLoop = (duration = 2, delay = 0) => ({
    repeat: Infinity,
    repeatType: "mirror" as const,
    ease: "easeInOut" as const,
    duration,
    delay,
  });

  const panels = [
    {
      id: "top-left",
      targetX: -(TILE_W + GAP),
      targetY: -(TILE_H + GAP / 2),
      delay: 0,
      isCenter: false,
      schematics: (delayOffset: number) => (
        <motion.g
          variants={drawVariants}
          transition={{ duration: 0.6, delay: delayOffset, ease: "easeOut" }}
        >
          <ellipse
            cx="0"
            cy="0"
            rx="16"
            ry="8"
            fill="none"
            stroke={inkSubtle}
            strokeWidth="1.5"
          />
          <ellipse
            cx="0"
            cy="-6"
            rx="16"
            ry="8"
            fill="none"
            stroke={inkSubtle}
            strokeWidth="1.5"
          />
          <path
            d="M -16 -12 L -16 0 M 16 -12 L 16 0"
            fill="none"
            stroke={inkSubtle}
            strokeWidth="1.5"
          />
          <motion.ellipse
            cx="0"
            cy="-12"
            rx="16"
            ry="8"
            fill="none"
            stroke={activeAccent}
            strokeWidth="2"
            animate={{ y: [-1, 1, -1] }}
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
      schematics: (delayOffset: number) => {
        const networkDelay = delayOffset + 0.6;
        return (
          <motion.g
            variants={drawVariants}
            transition={{ duration: 0.6, delay: delayOffset, ease: "easeOut" }}
          >
            <path
              d="M -15 -5 L 15 -10 L 0 10 Z"
              fill="none"
              stroke={inkSubtle}
              strokeWidth="1.5"
            />
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
                fill={inkMain}
                animate={{ scale: [1, 1.3, 1], opacity: [0.8, 1, 0.8] }}
                transition={infiniteLoop(2, node.delay)}
              />
            ))}
            <motion.circle
              r="2"
              fill={activeAccent}
              animate={{ cx: [-15, 15, -15], cy: [-5, -10, -5] }}
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
      schematics: (delayOffset: number) => (
        <motion.g
          variants={drawVariants}
          animate={{ stroke: [inkMain, inkSubtle, inkMain] }}
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
      schematics: (delayOffset: number) => {
        const chartDelay = delayOffset + 0.6;
        return (
          <motion.g
            variants={drawVariants}
            transition={{ duration: 0.6, delay: delayOffset, ease: "easeOut" }}
          >
            <path
              d="M -20 12 L 20 12"
              fill="none"
              stroke={inkSubtle}
              strokeWidth="1.5"
              strokeLinecap="round"
            />
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
                stroke={i === 1 ? inkMain : activeAccent}
                strokeWidth="4"
                strokeLinecap="round"
                animate={{ d: bar.d }}
                transition={{
                  repeat: Infinity,
                  duration: 1.2,
                  delay: chartDelay + i * 0.15,
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
      schematics: (delayOffset: number) => (
        <motion.g
          variants={drawVariants}
          transition={{ duration: 0.6, delay: delayOffset, ease: "easeOut" }}
        >
          <path
            d="M -20 -10 L 20 10 M -10 -15 L 30 5"
            fill="none"
            stroke={inkSubtle}
            strokeWidth="1"
            opacity={0.7}
          />
          <path
            d="M -20 10 L 20 -10 M -30 5 L 10 -15"
            fill="none"
            stroke={inkSubtle}
            strokeWidth="1"
            opacity={0.7}
          />
          <motion.path
            d="M -10 5 L 0 10 L 10 5 L 0 0 Z"
            fill={activeAccent}
            stroke={paper}
            strokeWidth={1}
            animate={{
              opacity: [0.3, 0.7, 0.3],
              x: [0, 10, -10, 0],
              y: [0, 5, -5, 0],
            }}
            transition={infiniteLoop(3, delayOffset + 0.6)}
          />
        </motion.g>
      ),
    },
  ];

  return (
    <motion.svg
      className="w-[400px] h-[300px] overflow-visible"
      viewBox="0 0 400 300"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g transform="translate(200, 150) scale(0.8)">
        <motion.ellipse
          cx="0"
          cy="20"
          rx="90"
          ry="30"
          fill={shadowGround}
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
            transition={{ duration: 0.4, delay: panel.delay, ease: "easeOut" }}
          >
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
            {panel.schematics(0.3 + panel.delay)}
          </motion.g>
        ))}
      </g>
    </motion.svg>
  );
};

export default UnfoldingBlueprint;
