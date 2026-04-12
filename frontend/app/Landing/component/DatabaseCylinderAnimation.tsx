"use client";
import { motion } from "motion/react";

export default function DatabaseCylinderAnimation() {
  return (
    <div className="flex flex-col items-center justify-center border border-slate-200 p-8 rounded-2xl bg-white shadow-sm">
      <motion.svg
        whileHover="animate"
        initial="initial"
        className="w-56 h-64 overflow-visible"
        viewBox="0 0 200 300"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {/* Gradients to simulate 3D cylinder lighting wrapping around the curve */}
          <linearGradient id="cylinderBody" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#CBD5E1" />
            <stop offset="15%" stopColor="#FFFFFF" />
            <stop offset="85%" stopColor="#F8FAFC" />
            <stop offset="100%" stopColor="#E2E8F0" />
          </linearGradient>
          {/* Subtle gradient for the top flat lids */}
          <linearGradient id="cylinderLid" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFFFFF" />
            <stop offset="100%" stopColor="#F1F5F9" />
          </linearGradient>
        </defs>

        <g transform="translate(100, 150)">
          {/* --- TIER 6 (Animated Bottom Tier) --- */}
          <motion.g
            variants={{
              animate: {
                y: 30, // Drops the bottom layer
              },
              initial: {
                y: 0,
              },
            }}
            transition={{
              duration: 0.35,
              ease: "easeOut",
            }}
          >
            {/* Bottom Base lid */}
            <ellipse
              cx="0"
              cy="80"
              rx="70"
              ry="22"
              fill="url(#cylinderLid)"
              stroke="#CBD5E1"
              strokeWidth="1.5"
            />
            {/* Body */}
            <path
              d="M -70 80 A 70 22 0 0 0 70 80 L 70 60 A 70 22 0 0 1 -70 60 Z"
              fill="url(#cylinderBody)"
              stroke="#CBD5E1"
              strokeLinejoin="round"
              strokeWidth="1.5"
            />
            {/* Top Lid */}
            <ellipse
              cx="0"
              cy="60"
              rx="70"
              ry="22"
              fill="url(#cylinderLid)"
              stroke="#CBD5E1"
              strokeWidth="1.5"
            />
            {/* Tech detail ring */}
            <ellipse
              cx="0"
              cy="60"
              rx="50"
              ry="15"
              fill="none"
              stroke="#E2E8F0"
              strokeWidth="1.5"
            />
          </motion.g>

          {/* --- TIER 5 (Lowest Static Base) --- */}
          {/* Solid bottom shadow face (visible when Tier 6 drops) */}
          <ellipse
            cx="0"
            cy="60"
            rx="70"
            ry="22"
            fill="#94A3B8"
            stroke="#64748B"
            strokeWidth="1.5"
          />
          <path
            d="M -70 60 A 70 22 0 0 0 70 60 L 70 40 A 70 22 0 0 1 -70 40 Z"
            fill="url(#cylinderBody)"
            stroke="#CBD5E1"
            strokeLinejoin="round"
            strokeWidth="1.5"
          />
          <ellipse
            cx="0"
            cy="40"
            rx="70"
            ry="22"
            fill="url(#cylinderLid)"
            stroke="#CBD5E1"
            strokeWidth="1.5"
          />
          <ellipse
            cx="0"
            cy="40"
            rx="50"
            ry="15"
            fill="none"
            stroke="#E2E8F0"
            strokeWidth="1.5"
          />

          {/* --- TIER 4 --- */}
          <path
            d="M -70 40 A 70 22 0 0 0 70 40 L 70 20 A 70 22 0 0 1 -70 20 Z"
            fill="url(#cylinderBody)"
            stroke="#CBD5E1"
            strokeLinejoin="round"
            strokeWidth="1.5"
          />
          <ellipse
            cx="0"
            cy="20"
            rx="70"
            ry="22"
            fill="url(#cylinderLid)"
            stroke="#CBD5E1"
            strokeWidth="1.5"
          />
          <ellipse
            cx="0"
            cy="20"
            rx="50"
            ry="15"
            fill="none"
            stroke="#E2E8F0"
            strokeWidth="1.5"
          />

          {/* --- TIER 3 --- */}
          <path
            d="M -70 20 A 70 22 0 0 0 70 20 L 70 0 A 70 22 0 0 1 -70 0 Z"
            fill="url(#cylinderBody)"
            stroke="#CBD5E1"
            strokeLinejoin="round"
            strokeWidth="1.5"
          />
          <ellipse
            cx="0"
            cy="0"
            rx="70"
            ry="22"
            fill="url(#cylinderLid)"
            stroke="#CBD5E1"
            strokeWidth="1.5"
          />
          <ellipse
            cx="0"
            cy="0"
            rx="50"
            ry="15"
            fill="none"
            stroke="#E2E8F0"
            strokeWidth="1.5"
          />

          {/* --- TIER 2 (Highest Static Base) --- */}
          <path
            d="M -70 0 A 70 22 0 0 0 70 0 L 70 -20 A 70 22 0 0 1 -70 -20 Z"
            fill="url(#cylinderBody)"
            stroke="#CBD5E1"
            strokeLinejoin="round"
            strokeWidth="1.5"
          />
          <ellipse
            cx="0"
            cy="-20"
            rx="70"
            ry="22"
            fill="url(#cylinderLid)"
            stroke="#CBD5E1"
            strokeWidth="1.5"
          />
          <ellipse
            cx="0"
            cy="-20"
            rx="50"
            ry="15"
            fill="none"
            stroke="#E2E8F0"
            strokeWidth="1.5"
          />

          {/* --- TIER 1 (Animated Top Tier) --- */}
          <motion.g
            variants={{
              animate: {
                y: -30, // Lifts the top layer up dynamically
              },
              initial: {
                y: 0,
              },
            }}
            transition={{
              duration: 0.35,
              ease: "easeOut",
            }}
          >
            {/* Bottom shadow face of the top tier (Visible only when lifted) */}
            <ellipse
              cx="0"
              cy="-20"
              rx="70"
              ry="22"
              fill="#94A3B8"
              stroke="#64748B"
              strokeWidth="1.5"
            />
            {/* Body */}
            <path
              d="M -70 -20 A 70 22 0 0 0 70 -20 L 70 -40 A 70 22 0 0 1 -70 -40 Z"
              fill="url(#cylinderBody)"
              stroke="#CBD5E1"
              strokeLinejoin="round"
              strokeWidth="1.5"
            />
            {/* Topmost lid */}
            <ellipse
              cx="0"
              cy="-40"
              rx="70"
              ry="22"
              fill="url(#cylinderLid)"
              stroke="#CBD5E1"
              strokeWidth="1.5"
            />
            {/* Inner tech rings */}
            <ellipse
              cx="0"
              cy="-40"
              rx="50"
              ry="15"
              fill="none"
              stroke="#E2E8F0"
              strokeWidth="1.5"
            />
            <ellipse
              cx="0"
              cy="-40"
              rx="30"
              ry="9"
              fill="none"
              stroke="#E2E8F0"
              strokeWidth="1.5"
            />
          </motion.g>
        </g>
      </motion.svg>
    </div>
  );
}
