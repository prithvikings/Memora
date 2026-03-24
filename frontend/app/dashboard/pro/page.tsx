// src/app/dashboard/pro/page.tsx
"use client";

import React, { useState } from "react";
import {
  Crown,
  Sparkle,
  Infinity,
  MagnifyingGlassPlus,
  Users,
  CheckCircle,
  PaperPlaneRight,
  Hammer,
} from "@phosphor-icons/react";

const plannedFeatures = [
  {
    icon: Infinity,
    title: "Unlimited AI Summaries",
    description:
      "Bypass the daily limits and generate deep, contextual abstracts for every single bookmark.",
  },
  {
    icon: MagnifyingGlassPlus,
    title: "Deep Semantic Search",
    description:
      "Search not just titles and tags, but the actual body content and AI insights of your entire archive.",
  },
  {
    icon: Sparkle,
    title: "Automated Tagging & Curation",
    description:
      "Let our AI automatically categorize, tag, and organize your links into smart collections.",
  },
  {
    icon: Users,
    title: "Team Workspaces",
    description:
      "Share specific collections with colleagues or co-founders with granular permission controls.",
  },
];

export default function ProPlanPage() {
  const [email, setEmail] = useState("");
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [isHovering, setIsHovering] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    // Mock API call for joining waitlist
    setIsSubscribed(true);
    setEmail("");
  };

  return (
    <div className="max-w-[1300px] mx-auto pb-16 font-poppins px-6">
      {/* --- HEADER SECTION --- */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10 py-6 border-b border-gray-100">
        <div>
          <div className="bg-emerald-50 text-emerald-700 w-fit px-3 py-1 rounded-full mb-3 flex items-center justify-center border border-emerald-100">
            <p className="uppercase tracking-widest font-bold text-[10px] flex items-center gap-1.5">
              <Hammer size={12} weight="fill" />
              Under Construction
            </p>
          </div>
          <h1 className="text-[36px] font-bold text-gray-950 tracking-tighter mb-2">
            Memora Pro
          </h1>
          <p className="text-gray-500 text-[16px] font-medium max-w-xl leading-relaxed">
            We are currently crafting the ultimate premium experience. Get early
            access when we launch.
          </p>
        </div>
      </div>

      {/* --- PREMIUM DARK CARD (THE TEASER) --- */}
      <div
        className="relative bg-gray-950 rounded-[32px] p-1 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.3)] overflow-hidden mb-16 group"
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
      >
        {/* Animated Background Glow Effect */}
        <div
          className={`absolute -inset-full bg-gradient-to-r from-transparent via-emerald-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-1000 ${isHovering ? "animate-shimmer" : ""}`}
          style={{ transform: "skewX(-45deg)" }}
        ></div>

        <div className="relative bg-gray-900/90 backdrop-blur-xl rounded-[28px] p-8 md:p-16 flex flex-col md:flex-row items-center justify-between gap-12 border border-gray-800">
          {/* Left Side: Copy & Waitlist */}
          <div className="flex-1 text-center md:text-left z-10">
            <div className="inline-flex items-center justify-center p-3 bg-gray-800 rounded-2xl mb-6 shadow-inner border border-gray-700">
              <Crown size={32} weight="duotone" className="text-emerald-400" />
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 tracking-tight">
              Supercharge your knowledge base.
            </h2>
            <p className="text-gray-400 text-[16px] leading-relaxed mb-8 max-w-lg mx-auto md:mx-0 font-medium">
              Memora Pro is being built from the ground up for power users,
              researchers, and teams who need absolute control over their
              digital archives.
            </p>

            {/* Waitlist Form */}
            {isSubscribed ? (
              <div className="inline-flex items-center gap-3 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 px-6 py-4 rounded-2xl animate-in fade-in zoom-in duration-300">
                <CheckCircle size={24} weight="fill" />
                <span className="font-semibold">
                  You're on the priority waitlist!
                </span>
              </div>
            ) : (
              <form
                onSubmit={handleSubscribe}
                className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto md:mx-0"
              >
                <input
                  type="email"
                  required
                  placeholder="Enter your email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="flex-1 bg-gray-950 border border-gray-700 text-white px-5 py-3.5 rounded-xl focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 placeholder-gray-500 font-medium transition-all"
                />
                <button
                  type="submit"
                  className="bg-emerald-500 hover:bg-emerald-600 text-white px-6 py-3.5 rounded-xl font-bold flex items-center justify-center gap-2 transition-colors active:scale-95 shrink-0"
                >
                  Notify Me <PaperPlaneRight size={18} weight="bold" />
                </button>
              </form>
            )}
            <p className="text-[12px] text-gray-500 mt-4 font-medium">
              No spam. We'll only email you when Pro is ready.
            </p>
          </div>

          {/* Right Side: Visual Graphic / Badge */}
          <div className="hidden lg:flex w-72 h-72 relative items-center justify-center shrink-0">
            <div className="absolute inset-0 bg-emerald-500/20 blur-[80px] rounded-full"></div>
            <div className="relative w-48 h-64 bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700 rounded-2xl shadow-2xl flex flex-col p-6 items-center justify-center transform rotate-6 hover:rotate-0 transition-transform duration-500">
              <Crown
                size={48}
                weight="fill"
                className="text-emerald-400 mb-4"
              />
              <div className="h-2 w-20 bg-gray-700 rounded-full mb-3"></div>
              <div className="h-2 w-16 bg-gray-700 rounded-full mb-6"></div>
              <div className="w-full h-10 bg-emerald-500/10 border border-emerald-500/30 rounded-lg flex items-center justify-center">
                <div className="h-1.5 w-12 bg-emerald-400 rounded-full"></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* --- UPCOMING FEATURES GRID --- */}
      <div className="mb-8">
        <h3 className="text-[20px] font-bold text-gray-950 mb-6 text-center md:text-left">
          What to expect in Pro
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {plannedFeatures.map((feature, idx) => {
            const Icon = feature.icon;
            return (
              <div
                key={idx}
                className="bg-white border border-gray-100/80 rounded-[24px] p-8 shadow-[0_2px_10px_-4px_rgba(0,0,0,0.02)] hover:shadow-[0_10px_30px_-10px_rgba(0,0,0,0.06)] hover:border-emerald-100 transition-all duration-300 group"
              >
                <div className="w-12 h-12 bg-gray-50 group-hover:bg-emerald-50 rounded-xl flex items-center justify-center mb-5 transition-colors duration-300 border border-gray-100 group-hover:border-emerald-100">
                  <Icon
                    size={24}
                    weight="duotone"
                    className="text-gray-400 group-hover:text-emerald-500 transition-colors"
                  />
                </div>
                <h4 className="text-[17px] font-bold text-gray-900 mb-2">
                  {feature.title}
                </h4>
                <p className="text-[14px] text-gray-500 leading-relaxed font-medium">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
