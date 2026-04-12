"use client";
import React from "react";
import { motion } from "motion/react";

export const ProcessingCore = () => {
  return (
    <div className="flex flex-col items-center justify-center p-8 rounded-2xl bg-white border border-slate-200 shadow-sm shadow-inner w-fit mx-auto">
      <motion.svg
        whileHover="animate"
        initial="idle"
        className="w-[350px] h-[350px] overflow-visible cursor-crosshair"
        viewBox="-150 -150 300 300"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {/* Dormant Core Gradient */}
          <radialGradient id="idleCore" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#CBD5E1" />
            <stop offset="100%" stopColor="#94A3B8" />
          </radialGradient>

          {/* Active Processing Gradient (Emerald to Blue) */}
          <radialGradient id="activeCore" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#34D399" />
            <stop offset="80%" stopColor="#3B82F6" />
            <stop offset="100%" stopColor="#2563EB" />
          </radialGradient>

          {/* Vertical Data Beam Gradient */}
          <linearGradient id="beam" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#34D399" stopOpacity="0" />
            <stop offset="50%" stopColor="#34D399" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#3B82F6" stopOpacity="0" />
          </linearGradient>
        </defs>

        {/* Ground Shadow (Pulses when active) */}
        <motion.ellipse
          cx="0"
          cy="90"
          rx="50"
          ry="15"
          fill="#E2E8F0"
          variants={{
            idle: { scale: 1, opacity: 0.6 },
            animate: { scale: [1, 1.2, 1], opacity: [0.6, 0.3, 0.6] },
          }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
        />

        {/* Orbital Rings with Data Packets */}
        {[
          { angle: 0, speed: 2 },
          { angle: 60, speed: 2.5 },
          { angle: -60, speed: 1.8 },
        ].map((orbit, i) => (
          <g key={i} transform={`rotate(${orbit.angle})`}>
            {/* Static Track */}
            <ellipse
              cx="0"
              cy="0"
              rx="90"
              ry="25"
              fill="none"
              stroke="#F1F5F9"
              strokeWidth="2"
            />
            {/* Fast-moving Data Packets (Visible only on hover) */}
            <motion.ellipse
              cx="0"
              cy="0"
              rx="90"
              ry="25"
              fill="none"
              stroke="#3B82F6"
              strokeWidth="3"
              strokeLinecap="round"
              strokeDasharray="15 195" // Creates two distinct dots on the circumference (~420px)
              variants={{
                idle: { strokeDashoffset: 420, opacity: 0 },
                animate: { strokeDashoffset: 0, opacity: 1 },
              }}
              transition={{
                strokeDashoffset: {
                  repeat: Infinity,
                  duration: orbit.speed,
                  ease: "linear",
                },
                opacity: { duration: 0.3 },
              }}
            />
          </g>
        ))}

        {/* Central Core Group (Bobs up and down when active) */}
        <motion.g
          variants={{
            idle: { y: 0 },
            animate: { y: [-6, 6, -6] },
          }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
        >
          {/* Vertical Data Beam (Shoots through the core) */}
          <motion.path
            d="M 0 -100 L 0 100"
            stroke="url(#beam)"
            strokeWidth="6"
            variants={{
              idle: { opacity: 0, scaleY: 0 },
              animate: { opacity: [0, 1, 0], scaleY: [0.5, 1.2, 0.5] },
            }}
            transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
          />

          {/* Dormant Sphere Base */}
          <circle cx="0" cy="0" r="28" fill="url(#idleCore)" />

          {/* Active Glowing Sphere (Fades in and pulses on hover) */}
          <motion.circle
            cx="0"
            cy="0"
            r="30"
            fill="url(#activeCore)"
            variants={{
              idle: { opacity: 0, scale: 0.8 },
              animate: { opacity: [0.7, 1, 0.7], scale: [1, 1.1, 1] },
            }}
            transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
          />

          {/* Inner Energy Ring */}
          <motion.ellipse
            cx="0"
            cy="0"
            rx="15"
            ry="6"
            fill="none"
            stroke="#FFFFFF"
            strokeWidth="1.5"
            variants={{
              idle: { opacity: 0 },
              animate: { opacity: [0.2, 0.8, 0.2] },
            }}
            transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
          />
        </motion.g>
      </motion.svg>
    </div>
  );
};

export default ProcessingCore;
