"use client";
import React from "react";
import { motion, Variants } from "motion/react";
import Check from "../image/check";
import Tick from "../image/tick";
import Developers from "../component/Developers";
import Researchers from "../component/Researchers";
import Students from "../component/Students";
import Foundersc from "../component/Foundersc";
import Designers from "../component/Designers";
import Folder from "@/components/Folder";
const Built = () => {
  return (
    <div className="max-w-5xl mx-auto py-24 px-4 md:px-0">
      <div className="flex items-center justify-center mb-16">
        <h1 className="text-4xl md:text-4xl font-poppins text-center tracking-tight">
          Built for people <br /> who live on the internet
        </h1>
      </div>

      {/* Grid Container */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-1 p-4">
        {/* Card 1: Real time messaging */}
        <motion.div
          initial="initial"
          whileHover="hover"
          className="border border-gray-200 rounded-3xl min-h-[350px] md:col-span-1 flex flex-col justify-between overflow-hidden bg-white cursor-pointer"
        >
          <ChatVisual />
          <div className="flex flex-col items-start justify-center p-6 gap-2">
            <h3 className="text-lg font-medium text-neutral-900">
              Real Time messaging
            </h3>
            <p className="text-sm text-neutral-800">
              Send and receive messages in real time with text.
            </p>
          </div>
        </motion.div>

        {/* Card 2: Secure file sharing */}
        <div className="group border border-gray-200 rounded-3xl min-h-[350px] md:col-span-1 flex flex-col justify-between overflow-hidden bg-white">
          {/* Our new custom visual */}
          <FileVisual />

          <div className="flex flex-col items-start justify-center p-6 gap-2 mt-auto z-10 bg-white">
            <h3 className="text-lg font-medium text-neutral-900">
              Secure file sharing
            </h3>
            <p className="text-sm text-neutral-800">
              Share files securely with end-to-end encryption.
            </p>
          </div>
        </div>

        {/* Card 3: Team collaboration */}
        <div className="border border-gray-200 rounded-3xl min-h-[350px] md:col-span-1 md:row-span-2 flex flex-col justify-between overflow-hidden bg-white">
          <CollabVisual />
          <div className="flex flex-col items-start justify-center p-6 gap-2 mt-auto">
            <h3 className="text-lg font-medium text-neutral-900">
              Team collaboration
            </h3>
            <p className="text-sm text-neutral-800">
              Collaborate with your team in shared workspaces.
            </p>
          </div>
        </div>

        {/* Card 4: Loved by developers */}
        <div className="border border-gray-200 rounded-3xl min-h-[350px] md:col-span-2 flex flex-col justify-between overflow-hidden bg-white">
          <TestimonialVisual />
          <div className="flex flex-col items-start justify-center p-6 gap-2 z-10 bg-white">
            <h3 className="text-lg font-medium text-neutral-900">
              Loved by developers
            </h3>
            <p className="text-sm text-neutral-800">
              Trusted by thousands of developers and teams worldwide.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Built;

const FileVisual = () => {
  // 1. We create the custom item that goes INSIDE the folder
  const avatarCard = (
    <div className="w-full h-full bg-gradient-to-b from-blue-400 to-blue-600 rounded-[8px] overflow-hidden relative shadow-inner flex flex-col justify-end items-center pb-0">
      {/* Abstract Head */}
      <div className="w-4 h-5 bg-[#fca5a5] rounded-t-full rounded-b-md z-10 mb-[-2px]" />
      {/* Abstract Shoulders/Shirt */}
      <div className="w-9 h-4 bg-[#1e293b] rounded-t-full z-10" />
      {/* Subtle shine effect on the card */}
      <div className="absolute inset-0 bg-gradient-to-tr from-transparent to-white/20 pointer-events-none" />
    </div>
  );

  // Configuration for each animated row (duration and delay variation)
  const beamAnimations = [
    { duration: 3, delay: 0 },
    { duration: 4, delay: 1.5 },
    { duration: 2.5, delay: 0.5 },
    { duration: 3.5, delay: 2 },
  ];

  return (
    <div className="flex-1 w-full flex items-center justify-center relative min-h-[200px] px-8 overflow-hidden pointer-events-auto">
      {/* ✨ NEW: Edge Fades for Premium Look ✨ */}
      <div className="absolute inset-y-0 left-0 w-20 bg-gradient-to-r from-white to-transparent z-20 pointer-events-none" />
      <div className="absolute inset-y-0 right-0 w-20 bg-gradient-to-l from-white to-transparent z-20 pointer-events-none" />
      {/* --- BACKGROUND ELEMENTS --- */}
      {/* Animated Horizontal Dashed Lines */}
      <div className="absolute inset-0 flex flex-col justify-center gap-[22px] pointer-events-none z-0 overflow-hidden">
        {beamAnimations.map((anim, index) => (
          <div key={index} className="relative w-full h-[1px]">
            {/* The static dashed line */}
            <div className="absolute inset-0 border-t border-dashed border-gray-400 opacity-40 w-11/12 mx-auto" />

            {/* The animated blue beam */}
            <motion.div
              className="absolute top-[-1px] h-[2px] w-1/3 bg-gradient-to-r from-transparent via-blue-500 to-transparent opacity-70"
              animate={{ left: ["-50%", "150%"] }}
              transition={{
                duration: anim.duration,
                repeat: Infinity,
                ease: "linear",
                delay: anim.delay,
              }}
            />
          </div>
        ))}
      </div>

      {/* --- FOREGROUND ELEMENTS --- */}
      <div className="flex items-center justify-between w-full max-w-[260px] z-10">
        {/* Left: The Interactive Folder */}
        <div className="relative pt-6">
          <Folder
            size={0.85}
            color="#FDB900"
            className="custom-folder drop-shadow-xl"
            items={[avatarCard]} // Passing our custom card into the folder!
          />
        </div>

        {/* Right: The UI Settings Panel */}
        <div className="bg-neutral-100 backdrop-blur-sm border border-gray-200 shadow-xs rounded-xl py-2 px-2.5 flex flex-col gap-2 w-[90px] pointer-events-none relative z-10">
          {/* Top Barcode Pill */}
          <div className="border border-gray-200 rounded-sm p-2 flex justify-center items-center gap-1 h-4 bg-gray-50/50 shadow-xs">
            <div className="w-[1.5px] h-3 bg-gray-700 rounded-full" />
            <div className="w-[1.5px] h-3 bg-gray-700 rounded-full" />
            <div className="w-[1.5px] h-3 bg-gray-700 rounded-full" />
            <div className="w-[1.5px] h-3 bg-gray-700 rounded-full" />
            <div className="w-[1.5px] h-3 bg-gray-700 rounded-full" />
          </div>

          {/* Middle Input Skeleton */}
          <div className="flex flex-col gap-1">
            <div className="border border-gray-200 rounded-sm h-7 flex items-center px-2.5 shadow-xs bg-white">
              <div className="w-4 h-1 bg-gray-300 rounded-full" />
            </div>

            {/* Bottom Input Skeleton */}
            <div className="border border-gray-200 rounded-sm h-7 flex items-center px-2.5 shadow-xs bg-white">
              <div className="w-4 h-1 bg-gray-300 rounded-full" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const TestimonialVisual = () => {
  // Define the hover effect once to keep code clean
  const hoverEffect = {
    rotate: 6, // Tilts it slightly left
    scale: 1.05, // Makes it slightly larger
    y: 10, // Lifts it up
    x: 5,
    boxShadow:
      "0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)", // shadow-xl
  };

  const springTransition = { type: "spring", stiffness: 300, damping: 20 };

  return (
    // ✨ Removed pointer-events-none here so individual cards can detect hover! ✨
    <div className="relative flex-1 w-full flex items-center gap-4 overflow-hidden px-4 pt-8 pb-4">
      {/* Edge Fades: Added pointer-events-none specifically here so they don't block your mouse */}
      <div className="absolute inset-y-0 left-0 w-12 bg-gradient-to-r from-white to-transparent z-30 pointer-events-none" />
      <div className="absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-white to-transparent z-30 pointer-events-none" />

      {/* Testimonial 1 */}
      <div className="relative min-w-[200px]">
        {/* Hatched Ghost Box */}
        <div className="absolute inset-0 rounded-xl border border-gray-200 bg-[repeating-linear-gradient(45deg,transparent,transparent_2px,#f3f4f6_2px,#f3f4f6_4px)]" />
        <motion.div
          whileHover={hoverEffect}
          transition={springTransition}
          className="relative w-full h-full border border-gray-200 rounded-xl p-4 bg-white z-20 "
        >
          <p className="text-xs text-gray-600 mb-4 line-clamp-3">
            Aceternity UI is the best UI library I have ever used. It is very
            easy to use and very customizable.
          </p>
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-gray-200 rounded-full" />
            <div>
              <p className="text-[10px] font-bold text-gray-900">Bill Gates</p>
              <p className="text-[9px] text-gray-500">CEO of Microsoft</p>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Testimonial 2 */}
      <div className="relative min-w-[200px]">
        <div className="absolute inset-0 rounded-xl border border-gray-200 bg-[repeating-linear-gradient(45deg,transparent,transparent_2px,#f3f4f6_2px,#f3f4f6_4px)]" />
        <motion.div
          whileHover={hoverEffect}
          transition={springTransition}
          className="relative w-full h-full border border-gray-200 rounded-xl p-4 bg-white z-20 "
        >
          <p className="text-xs text-gray-600 mb-4 line-clamp-3">
            The components are beautifully designed and saved us hundreds of
            hours of development time.
          </p>
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-gray-200 rounded-full" />
            <div>
              <p className="text-[10px] font-bold text-gray-900">Sarah Chen</p>
              <p className="text-[9px] text-gray-500">CTO at TechFlow</p>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Testimonial 3 (Cut off) */}
      <div className="relative min-w-[200px] opacity-50">
        <div className="absolute inset-0 rounded-xl border border-gray-200 bg-[repeating-linear-gradient(45deg,transparent,transparent_2px,#f3f4f6_2px,#f3f4f6_4px)]" />
        <motion.div
          whileHover={hoverEffect}
          transition={springTransition}
          className="relative w-full h-full border border-gray-200 rounded-xl p-4 bg-white z-20 "
        >
          <p className="text-xs text-gray-600 mb-4 line-clamp-3">
            I've tried many UI libraries, but Aceternity stands out with its
            attention to detail.
          </p>
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-gray-200 rounded-full" />
            <div>
              <p className="text-[10px] font-bold text-gray-900">
                Marcus Johnson
              </p>
              <p className="text-[9px] text-gray-500">
                Lead Developer at Stripe
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

const CollabVisual = () => {
  return (
    <div className="flex-1 w-full flex items-center justify-center relative pointer-events-none p-6 pt-10">
      {/* Fake Editor Window (Stays exactly the same) */}
      <div className="w-full max-w-[260px] bg-white border border-gray-200 shadow-sm rounded-xl overflow-hidden">
        <div className="border-b border-gray-100 px-3 py-2.5 flex items-center gap-1.5">
          <div className="w-2.5 h-2.5 rounded-full bg-[#FF5F56]" />
          <div className="w-2.5 h-2.5 rounded-full bg-[#FFBD2E]" />
          <div className="w-2.5 h-2.5 rounded-full bg-[#27C93F]" />
          <div className="ml-3 flex gap-1.5">
            <div className="h-2 w-8 bg-gray-100 rounded-full" />
            <div className="h-2 w-6 bg-gray-100 rounded-full" />
          </div>
        </div>
        <div className="p-3 flex gap-3">
          <div className="flex flex-col gap-[11px] text-[8px] text-gray-300 font-mono text-right select-none pt-0.5">
            {Array.from({ length: 12 }).map((_, i) => (
              <span key={i}>{i + 1}</span>
            ))}
          </div>
          <div className="flex flex-col gap-3 flex-1">
            <div className="h-2 w-3/4 bg-[#D3A8FF] rounded-full" />
            <div className="h-2 w-5/6 bg-gray-200 rounded-full" />
            <div className="h-2 w-2/3 bg-[#79B6F2] rounded-full ml-4" />
            <div className="h-2 w-1/2 bg-gray-200 rounded-full ml-4" />
            <div className="h-2 w-1/2 bg-[#5EEAD4] rounded-full ml-4" />
            <div className="h-2 w-4/5 bg-gray-200 rounded-full ml-4" />
            <div className="h-2 w-1/4 bg-[#D3A8FF] rounded-full" />
            <div className="h-2 w-3/4 bg-[#FCD34D] rounded-full" />
            <div className="h-2 w-5/6 bg-gray-200 rounded-full ml-4" />
            <div className="h-2 w-1/2 bg-[#79B6F2] rounded-full ml-4" />
            <div className="h-2 w-1/3 bg-gray-200 rounded-full ml-4" />
            <div className="h-2 w-1/6 bg-[#FCD34D] rounded-full" />
          </div>
        </div>
      </div>

      {/* Cursor 1 (Sarah - Blue) - ✨ Now uses 'animate' and 'transition' directly ✨ */}
      <motion.div
        animate={{ x: [-10, -40, -20, -10], y: [0, -30, -10, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-24 right-28 flex flex-col items-center z-20"
      >
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          className="text-[#3B82F6] drop-shadow-md -ml-6"
        >
          <path
            d="M5.5 3L18.5 16L12.5 17L9.5 22L5.5 3Z"
            fill="currentColor"
            stroke="white"
            strokeWidth="2"
          />
        </svg>
        <div className="bg-[#3B82F6] text-white text-[10px] font-medium pr-2.5 pl-1 py-1 rounded-full -mt-2 ml-10 shadow-lg flex items-center gap-1.5">
          <div className="w-3.5 h-3.5 rounded-full bg-blue-200 flex items-center justify-center text-[7px] text-blue-700 font-bold">
            S
          </div>
          Sarah
        </div>
      </motion.div>

      {/* Cursor 2 (Tyler - Green) - ✨ Now uses 'animate' and 'transition' directly ✨ */}
      <motion.div
        animate={{ x: [0, 20, 10, 0], y: [0, -20, 10, 0] }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 0.5,
        }}
        className="absolute bottom-12 right-10 flex flex-col items-center z-20"
      >
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          className="text-[#10B981] drop-shadow-md -ml-6"
        >
          <path
            d="M5.5 3L18.5 16L12.5 17L9.5 22L5.5 3Z"
            fill="currentColor"
            stroke="white"
            strokeWidth="2"
          />
        </svg>
        <div className="bg-[#10B981] text-white text-[10px] font-medium pr-2.5 pl-1 py-1 rounded-full -mt-2 ml-8 shadow-lg flex items-center gap-1.5">
          <div className="w-3.5 h-3.5 rounded-full bg-green-200 flex items-center justify-center text-[7px] text-green-700 font-bold">
            T
          </div>
          Tyler
        </div>
      </motion.div>
    </div>
  );
};

const ChatVisual = () => {
  // We use perfectly matched transitions so the shrinking and growing stay in sync
  const transition1 = { delay: 0.2, type: "spring", bounce: 0, duration: 0.5 };
  const transition2 = { delay: 1.0, type: "spring", bounce: 0, duration: 0.5 };

  // --- OLD MESSAGES (These shrink and fade out) ---
  const oldMessage1 = {
    initial: {
      opacity: 1,
      height: "auto",
      marginTop: 0,
      scale: 1,
      overflow: "hidden",
    },
    hover: {
      opacity: 0,
      height: 0,
      marginTop: 0,
      scale: 0.9,
      transition: transition1,
    },
  };

  const oldMessage2 = {
    initial: {
      opacity: 1,
      height: "auto",
      marginTop: 12,
      scale: 1,
      overflow: "hidden",
    }, // 12px = mt-3
    hover: {
      opacity: 0,
      height: 0,
      marginTop: 0,
      scale: 0.9,
      transition: transition2,
    },
  };

  // --- NEW MESSAGES (These expand and fade in) ---
  const newMessage1 = {
    initial: {
      opacity: 0,
      height: 0,
      marginTop: 0,
      scale: 0.8,
      overflow: "hidden",
    },
    hover: {
      opacity: 1,
      height: "auto",
      marginTop: 12,
      scale: 1,
      transition: transition1,
    },
  };

  const newMessage2 = {
    initial: {
      opacity: 0,
      height: 0,
      marginTop: 0,
      scale: 0.8,
      overflow: "hidden",
    },
    hover: {
      opacity: 1,
      height: "auto",
      marginTop: 12,
      scale: 1,
      transition: transition2,
    },
  };

  return (
    <div className="relative flex-1 w-full flex flex-col px-6 py-4 justify-center pointer-events-none overflow-hidden">
      {/* Edge Fades for masking illusion */}
      <div className="absolute inset-y-0 left-0 w-12 bg-gradient-to-r from-white to-transparent z-10" />
      <div className="absolute inset-y-0 right-0 w-12 bg-gradient-to-l from-white to-transparent z-10" />
      {/* ✨ NEW: Top & Bottom fades to hide messages scrolling in/out ✨ */}
      <div className="absolute inset-x-0 top-0 h-12 bg-gradient-to-b from-white to-transparent z-10" />
      <div className="absolute inset-x-0 bottom-0 h-12 bg-gradient-to-t from-white to-transparent z-10" />

      <div className="flex flex-col w-full z-0">
        {/* --- MESSAGE 1 (Fades out first) --- */}
        <motion.div
          variants={oldMessage1}
          className="flex gap-2 items-end origin-top"
        >
          <div className="w-6 h-6 rounded-full bg-blue-600 flex-shrink-0" />
          <div className="border border-gray-200 text-xs px-2 py-1 rounded-lg shadow-2xs text-gray-800">
            Hey! Are you free for a quick call?
          </div>
        </motion.div>

        {/* --- MESSAGE 2 (Fades out second) --- */}
        <motion.div
          variants={oldMessage2}
          className="flex gap-2 items-end justify-end origin-top"
        >
          <div className="border border-gray-200 text-xs px-2 py-1 rounded-lg shadow-2xs text-gray-800">
            Sure, give me 5 minutes!
          </div>
          <div className="w-6 h-6 rounded-full bg-teal-500 flex-shrink-0" />
        </motion.div>

        {/* --- MESSAGE 3 (Always visible, slides up) --- */}
        <div className="flex gap-2 items-end mt-3">
          <div className="w-6 h-6 rounded-full bg-red-400 flex-shrink-0" />
          <div className="border border-gray-200 text-xs px-2 py-1 rounded-lg shadow-2xs text-gray-800">
            Sounds good 👍
          </div>
        </div>

        {/* --- MESSAGE 4 (Always visible, slides up) --- */}
        <div className="flex gap-2 items-end justify-end mt-3">
          <div className="border border-gray-200 text-xs px-2 py-1 rounded-lg shadow-2xs text-gray-800">
            I'm not sure if I can make it.
          </div>
          <div className="w-6 h-6 rounded-full bg-teal-500 flex-shrink-0" />
        </div>

        {/* --- MESSAGE 5 (Appears first) --- */}
        <motion.div
          variants={newMessage1}
          className="flex gap-2 items-end origin-bottom-left"
        >
          <div className="w-6 h-6 rounded-full bg-red-400 flex-shrink-0" />
          <div className="border border-gray-200 text-xs px-2 py-1 rounded-lg shadow-2xs text-gray-800">
            No worries! Everything okay?
          </div>
        </motion.div>

        {/* --- MESSAGE 6 (Appears second) --- */}
        <motion.div
          variants={newMessage2}
          className="flex gap-2 items-end justify-end origin-bottom-right"
        >
          <div className="border border-gray-200 text-xs px-2 py-1 rounded-lg shadow-2xs text-gray-800">
            Yeah, just a bug to fix. 🐛
          </div>
          <div className="w-6 h-6 rounded-full bg-teal-500 flex-shrink-0" />
        </motion.div>
      </div>
    </div>
  );
};
