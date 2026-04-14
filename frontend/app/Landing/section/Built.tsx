"use client";
import React from "react";
import { motion, Variants, Transition } from "motion/react";
import Folder from "@/components/Folder";

const Built = () => {
  return (
    <div className="mx-auto max-w-5xl px-4 py-24 md:px-0">
      <div className="mb-16 flex items-center justify-center">
        <h1 className="font-poppins text-center text-4xl tracking-tight md:text-4xl">
          Built for people <br /> who live on the internet
        </h1>
      </div>

      {/* Grid Container */}
      <div className="grid grid-cols-1 gap-1 p-4 md:grid-cols-3">
        {/* Card 1: Real time messaging */}
        <motion.div
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, margin: "-50px" }} // Triggers when scrolling into view
          className="col-span-1 flex min-h-[350px] cursor-pointer flex-col justify-between overflow-hidden rounded-3xl border border-gray-200 bg-white md:col-span-1"
        >
          <ChatVisual />
          <div className="flex flex-col items-start justify-center gap-2 p-6">
            <h3 className="text-lg font-medium text-neutral-900">
              AI Knowledge Base  
            </h3>
            <p className="text-sm text-neutral-800">
              Capture and search every piece of your memories. 
            </p>
          </div>
        </motion.div>

        {/* Card 2: Secure file sharing */}
        <div className="group col-span-1 flex min-h-[350px] flex-col justify-between overflow-hidden rounded-3xl border border-gray-200 bg-white md:col-span-1">
          {/* Our new custom visual */}
          <FileVisual />

          <div className="z-10 mt-auto flex flex-col items-start justify-center gap-2 bg-white p-6">
            <h3 className="text-lg font-medium text-neutral-900">
              Smart link saving  
            </h3>
            <p className="text-sm text-neutral-800">
              Store web content securely with smart summaries.
            </p>
          </div>
        </div>

        {/* Card 3: Team collaboration */}
        <div className="col-span-1 row-span-2 flex min-h-[350px] flex-col justify-between overflow-hidden rounded-3xl border border-gray-200 bg-white md:col-span-1 md:row-span-2">
          <CollabVisual />
          <div className="mt-auto flex flex-col items-start justify-center gap-2 p-6">
            <h3 className="text-lg font-medium text-neutral-900">
              Personal organizer
            </h3>
            <p className="text-sm text-neutral-800">
              Organize your thoughts in shared smart folders. 
            </p>
          </div>
        </div>

        {/* Card 4: Loved by developers */}
        <div className="col-span-2 flex min-h-[350px] flex-col justify-between overflow-hidden rounded-3xl border border-gray-200 bg-white md:col-span-2">
          <TestimonialVisual />
          <div className="z-10 flex flex-col items-start justify-center gap-2 bg-white p-6">
            <h3 className="text-lg font-medium text-neutral-900">
              Loved by organizers 
            </h3>
            <p className="text-sm text-neutral-800">
              Trusted by thousands of people and teams to organize. 
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
    <div className="relative flex h-full w-full flex-col items-center justify-end overflow-hidden rounded-[8px] bg-linear-to-b from-blue-400 to-blue-600 pb-0 shadow-inner">
      {/* Abstract Head */}
      <div className="mb-[-2px] h-5 w-4 rounded-t-full rounded-b-md bg-[#fca5a5] z-10" />
      {/* Abstract Shoulders/Shirt */}
      <div className="h-4 w-9 rounded-t-full bg-[#1e293b] z-10" />
      {/* Subtle shine effect on the card */}
      <div className="pointer-events-none absolute inset-0 bg-linear-to-tr from-transparent to-white/20" />
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
    <div className="pointer-events-auto relative flex min-h-[200px] w-full flex-1 items-center justify-center overflow-hidden px-8">
      {/* ✨ NEW: Edge Fades for Premium Look ✨ */}
      <div className="pointer-events-none absolute inset-y-0 left-0 z-20 w-20 bg-linear-to-r from-white to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-20 w-20 bg-linear-to-l from-white to-transparent" />
      {/* --- BACKGROUND ELEMENTS --- */}
      {/* Animated Horizontal Dashed Lines */}
      <div className="pointer-events-none absolute inset-0 z-0 flex flex-col justify-center gap-[22px] overflow-hidden">
        {beamAnimations.map((anim, index) => (
          <div key={index} className="relative h-px w-full">
            {/* The static dashed line */}
            <div className="absolute inset-0 mx-auto w-11/12 border-t border-dashed border-gray-400 opacity-40" />

            {/* The animated blue beam */}
            <motion.div
              className="absolute -top-px h-[2px] w-1/3 bg-linear-to-r from-transparent via-blue-500 to-transparent opacity-70"
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
      <div className="z-10 flex w-full max-w-[260px] items-center justify-between">
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
        <div className="pointer-events-none relative z-10 flex w-[90px] flex-col gap-2 rounded-xl border border-gray-200 bg-neutral-100 px-2.5 py-2 shadow-xs backdrop-blur-sm">
          {/* Top Barcode Pill */}
          <div className="flex h-4 items-center justify-center gap-1 rounded-sm border border-gray-200 bg-gray-50/50 p-2 shadow-xs">
            <div className="h-3 w-[1.5px] rounded-full bg-gray-700" />
            <div className="h-3 w-[1.5px] rounded-full bg-gray-700" />
            <div className="h-3 w-[1.5px] rounded-full bg-gray-700" />
            <div className="h-3 w-[1.5px] rounded-full bg-gray-700" />
            <div className="h-3 w-[1.5px] rounded-full bg-gray-700" />
          </div>

          {/* Middle Input Skeleton */}
          <div className="flex flex-col gap-1">
            <div className="flex h-7 items-center rounded-sm border border-gray-200 bg-white px-2.5 shadow-xs">
              <div className="h-1 w-4 rounded-full bg-gray-300" />
            </div>

            {/* Bottom Input Skeleton */}
            <div className="flex h-7 items-center rounded-sm border border-gray-200 bg-white px-2.5 shadow-xs">
              <div className="h-1 w-4 rounded-full bg-gray-300" />
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

  const springTransition: Transition = { type: "spring", stiffness: 300, damping: 20 };

  return (
    // ✨ Removed pointer-events-none here so individual cards can detect hover! ✨
    <div className="relative flex w-full flex-1 items-center gap-4 overflow-hidden px-4 pb-4 pt-8">
      {/* Edge Fades: Added pointer-events-none specifically here so they don't block your mouse */}
      <div className="pointer-events-none absolute inset-y-0 left-0 z-30 w-12 bg-linear-to-r from-white to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-30 w-24 bg-linear-to-l from-white to-transparent" />

      {/* Testimonial 1 */}
      <div className="relative min-w-[200px]">
        {/* Hatched Ghost Box */}
        <div className="absolute inset-0 rounded-xl border border-gray-200 bg-[repeating-linear-gradient(45deg,transparent,transparent_2px,#f3f4f6_2px,#f3f4f6_4px)]" />
        <motion.div
          whileHover={hoverEffect}
          transition={springTransition}
          className="relative z-20 h-full w-full rounded-xl border border-gray-200 bg-white p-4 "
        >
          <p className="mb-4 line-clamp-3 text-xs text-gray-600">
            Memora is the best knowledge tool I have ever used. It is very
            easy to use and very well organized. 
          </p>
          <div className="flex items-center gap-2">
            <div className="h-6 w-6 rounded-full bg-gray-200" />
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
          className="relative z-20 h-full w-full rounded-xl border border-gray-200 bg-white p-4 "
        >
          <p className="mb-4 line-clamp-3 text-xs text-gray-600">
            The smart tools are beautifully designed and saved us hundreds
            of hours of searching time. 
          </p>
          <div className="flex items-center gap-2">
            <div className="h-6 w-6 rounded-full bg-gray-200" />
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
          className="relative z-20 h-full w-full rounded-xl border border-gray-200 bg-white p-4 "
        >
          <p className="mb-4 line-clamp-3 text-xs text-gray-600">
            I have tried many tools, but Memora stands out with its
            attention to every detail. 
          </p>
          <div className="flex items-center gap-2">
            <div className="h-6 w-6 rounded-full bg-gray-200" />
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
    <div className="pointer-events-none relative flex w-full flex-1 items-center justify-center p-6 pt-10">
      {/* Fake Editor Window (Stays exactly the same) */}
      <div className="w-full max-w-[260px] overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
        <div className="flex items-center gap-1.5 border-b border-gray-100 px-3 py-2.5">
          <div className="h-2.5 w-2.5 rounded-full bg-[#FF5F56]" />
          <div className="h-2.5 w-2.5 rounded-full bg-[#FFBD2E]" />
          <div className="h-2.5 w-2.5 rounded-full bg-[#27C93F]" />
          <div className="ml-3 flex gap-1.5">
            <div className="h-2 w-8 rounded-full bg-gray-100" />
            <div className="h-2 w-6 rounded-full bg-gray-100" />
          </div>
        </div>
        <div className="flex gap-3 p-3">
          <div className="select-none pt-0.5 font-mono text-[8px] text-gray-300 flex flex-col gap-[11px] text-right">
            {Array.from({ length: 12 }).map((_, i) => (
              <span key={i}>{i + 1}</span>
            ))}
          </div>
          <div className="flex flex-1 flex-col gap-3">
            <div className="h-2 w-3/4 rounded-full bg-[#D3A8FF]" />
            <div className="h-2 w-5/6 rounded-full bg-gray-200" />
            <div className="ml-4 h-2 w-2/3 rounded-full bg-[#79B6F2]" />
            <div className="ml-4 h-2 w-1/2 rounded-full bg-gray-200" />
            <div className="ml-4 h-2 w-1/2 rounded-full bg-[#5EEAD4]" />
            <div className="ml-4 h-2 w-4/5 rounded-full bg-gray-200" />
            <div className="h-2 w-1/4 rounded-full bg-[#D3A8FF]" />
            <div className="h-2 w-3/4 rounded-full bg-[#FCD34D]" />
            <div className="ml-4 h-2 w-5/6 rounded-full bg-gray-200" />
            <div className="ml-4 h-2 w-1/2 rounded-full bg-[#79B6F2]" />
            <div className="ml-4 h-2 w-1/3 rounded-full bg-gray-200" />
            <div className="h-2 w-1/6 rounded-full bg-[#FCD34D]" />
          </div>
        </div>
      </div>

      {/* Cursor 1 (Sarah - Blue) - ✨ Now uses 'animate' and 'transition' directly ✨ */}
      <motion.div
        animate={{ x: [-10, -40, -20, -10], y: [0, -30, -10, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-24 right-28 z-20 flex flex-col items-center"
      >
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          className="-ml-6 text-[#3B82F6] drop-shadow-md"
        >
          <path
            d="M5.5 3L18.5 16L12.5 17L9.5 22L5.5 3Z"
            fill="currentColor"
            stroke="white"
            strokeWidth="2"
          />
        </svg>
        <div className="-mt-2 ml-10 flex items-center gap-1.5 rounded-full bg-[#3B82F6] pl-1 pr-2.5 py-1 text-[10px] font-medium text-white shadow-lg">
          <div className="flex h-3.5 w-3.5 items-center justify-center rounded-full bg-blue-200 text-[7px] font-bold text-blue-700">
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
        className="absolute bottom-12 right-10 z-20 flex flex-col items-center"
      >
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          className="-ml-6 text-[#10B981] drop-shadow-md"
        >
          <path
            d="M5.5 3L18.5 16L12.5 17L9.5 22L5.5 3Z"
            fill="currentColor"
            stroke="white"
            strokeWidth="2"
          />
        </svg>
        <div className="-mt-2 ml-8 flex items-center gap-1.5 rounded-full bg-[#10B981] pl-1 pr-2.5 py-1 text-[10px] font-medium text-white shadow-lg">
          <div className="flex h-3.5 w-3.5 items-center justify-center rounded-full bg-green-200 text-[7px] font-bold text-green-700">
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
  const transition1: Transition = { delay: 0.2, type: "spring", bounce: 0, duration: 0.5 };
  const transition2: Transition = { delay: 1.0, type: "spring", bounce: 0, duration: 0.5 };

  // --- OLD MESSAGES (These shrink and fade out) ---
  const oldMessage1: Variants = {
    initial: {
      opacity: 1,
      height: "auto",
      marginTop: 0,
      scale: 1,
      overflow: "hidden",
    },
    animate: {
      // Changed from 'hover' to 'animate'
      opacity: 0,
      height: 0,
      marginTop: 0,
      scale: 0.9,
      transition: transition1,
    },
  };

  const oldMessage2: Variants = {
    initial: {
      opacity: 1,
      height: "auto",
      marginTop: 12,
      scale: 1,
      overflow: "hidden",
    }, // 12px = mt-3
    animate: {
      // Changed from 'hover' to 'animate'
      opacity: 0,
      height: 0,
      marginTop: 0,
      scale: 0.9,
      transition: transition2,
    },
  };

  // --- NEW MESSAGES (These expand and fade in) ---
  const newMessage1: Variants = {
    initial: {
      opacity: 0,
      height: 0,
      marginTop: 0,
      scale: 0.8,
      overflow: "hidden",
    },
    animate: {
      // Changed from 'hover' to 'animate'
      opacity: 1,
      height: "auto",
      marginTop: 12,
      scale: 1,
      transition: transition1,
    },
  };

  const newMessage2: Variants = {
    initial: {
      opacity: 0,
      height: 0,
      marginTop: 0,
      scale: 0.8,
      overflow: "hidden",
    },
    animate: {
      // Changed from 'hover' to 'animate'
      opacity: 1,
      height: "auto",
      marginTop: 12,
      scale: 1,
      transition: transition2,
    },
  };

  return (
    <div className="pointer-events-none relative flex w-full flex-1 flex-col justify-center overflow-hidden px-6 py-4">
      {/* Edge Fades for masking illusion */}
      <div className="absolute inset-y-0 left-0 z-10 w-12 bg-linear-to-r from-white to-transparent" />
      <div className="absolute inset-y-0 right-0 z-10 w-12 bg-linear-to-l from-white to-transparent" />
      {/* ✨ NEW: Top & Bottom fades to hide messages scrolling in/out ✨ */}
      <div className="absolute inset-x-0 top-0 z-10 h-12 bg-linear-to-b from-white to-transparent" />
      <div className="absolute inset-x-0 bottom-0 z-10 h-12 bg-linear-to-t from-white to-transparent" />

      <div className="z-0 flex w-full flex-col">
        {/* --- MESSAGE 1 (Fades out first) --- */}
        <motion.div
          variants={oldMessage1}
          className="origin-top flex items-end gap-2"
        >
          <div className="h-6 w-6 shrink-0 rounded-full bg-teal-500" />
          <div className="rounded-lg border border-gray-200 px-2 py-1 text-xs text-gray-800 shadow-2xs bg-zinc-100">
            Hey! Have you seen that new link?  
          </div>
        </motion.div>

        {/* --- MESSAGE 2 (Fades out second) --- */}
        <motion.div
          variants={oldMessage2}
          className="origin-top flex items-end justify-end gap-2"
        >
          <div className="rounded-lg border border-gray-200 px-2 py-1 text-xs text-gray-800 shadow-2xs bg-zinc-100">
            Yeah, just saved it now!
          </div>
          <div className="h-6 w-6 shrink-0 rounded-full bg-teal-500" />
        </motion.div>

        {/* --- MESSAGE 3 (Always visible, slides up) --- */}
        <div className="mt-3 flex items-end gap-2">
          <div className="h-6 w-6 shrink-0 rounded-full bg-red-400" />
          <div className="rounded-lg border border-gray-200 px-2 py-1 text-xs text-gray-100 shadow-2xs bg-blue-400">
            Looks good! 👍
          </div>
        </div>

        {/* --- MESSAGE 4 (Always visible, slides up) --- */}
        <div className="mt-3 flex items-end justify-end gap-2">
          <div className="rounded-lg border border-gray-200 px-2 py-1 text-xs text-gray-800 shadow-2xs bg-zinc-100">
            I'll tag it for the team now. 
          </div>
          <div className="h-6 w-6 shrink-0 rounded-full bg-teal-500" />
        </div>

        {/* --- MESSAGE 5 (Appears first) --- */}
        <motion.div
          variants={newMessage1}
          className="origin-bottom-left flex items-end gap-2"
        >
          <div className="h-6 w-6 shrink-0 rounded-full bg-red-400" />
          <div className="rounded-lg border border-gray-200 px-2 py-1 text-xs text-gray-100 bg-blue-400 shadow-2xs">
            Perfect! Did you summarize? 
          </div>
        </motion.div>

        {/* --- MESSAGE 6 (Appears second) --- */}
        <motion.div
          variants={newMessage2}
          className="origin-bottom-right flex items-end justify-end gap-2"
        >
          <div className="rounded-lg border border-gray-200 px-2 py-1 text-xs text-gray-800 bg-zinc-100 shadow-2xs">
            Sure, AI did it for me! 🤖
          </div>
          <div className="h-6 w-6 shrink-0 rounded-full bg-teal-500" />
        </motion.div>
      </div>
    </div>
  );
};
