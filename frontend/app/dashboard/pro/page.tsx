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

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    // Mock API call for joining waitlist
    setIsSubscribed(true);
    setEmail("");
  };

  return (
    <div className="max-w-[1300px] mx-auto pb-16 px-6">
      {/* --- HEADER SECTION --- */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8 py-6 border-b border-gray-200">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-gray-100 border border-gray-200 mb-4 shadow-sm">
            <Hammer size={14} weight="fill" className="text-gray-600" />
            <span className="text-xs font-semibold text-gray-700 uppercase tracking-wider">
              Under Construction
            </span>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 tracking-tight mb-2">
            Memora Pro
          </h1>
          <p className="text-sm text-gray-500 max-w-xl">
            We are currently crafting the ultimate premium experience. Get early
            access when we launch.
          </p>
        </div>
      </div>

      {/* --- PREMIUM DARK CARD (THE TEASER) --- */}
      <div className="bg-gray-950 border border-gray-800 rounded-2xl p-8 sm:p-12 mb-12 shadow-xl flex flex-col md:flex-row items-center justify-between gap-12 relative overflow-hidden">
        {/* Subtle Background Accent */}
        <div className="absolute top-0 right-0 -translate-y-12 translate-x-1/3 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none"></div>

        {/* Left Side: Copy & Waitlist */}
        <div className="flex-1 text-center md:text-left z-10 relative">
          <div className="inline-flex items-center justify-center w-14 h-14 bg-gray-800 border border-gray-700 rounded-xl mb-6 shadow-sm">
            <Crown size={28} weight="duotone" className="text-emerald-400" />
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4 tracking-tight">
            Supercharge your knowledge base.
          </h2>
          <p className="text-sm text-gray-400 leading-relaxed mb-8 max-w-lg mx-auto md:mx-0">
            Memora Pro is being built from the ground up for power users,
            researchers, and teams who need absolute control over their digital
            archives.
          </p>

          {/* Waitlist Form */}
          {isSubscribed ? (
            <div className="inline-flex items-center gap-3 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 px-5 py-3 rounded-lg animate-in fade-in zoom-in duration-300">
              <CheckCircle size={20} weight="fill" />
              <span className="text-sm font-medium">
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
                className="flex-1 bg-gray-900 border border-gray-700 text-white text-sm px-4 py-2.5 rounded-lg shadow-sm focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 placeholder-gray-500 transition-colors"
              />
              <button
                type="submit"
                className="flex items-center justify-center gap-2 px-5 py-2.5 bg-emerald-600 text-white text-sm font-medium rounded-lg shadow-[0px_1px_2px_0px_rgba(16,185,129,0.4),_inset_0px_1px_0px_0px_rgba(255,255,255,0.2)] ring-1 ring-inset ring-emerald-700 hover:bg-emerald-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-600 focus-visible:ring-offset-2 transition-all active:scale-[0.98] shrink-0"
              >
                Notify Me <PaperPlaneRight size={16} weight="bold" />
              </button>
            </form>
          )}
          <p className="text-xs text-gray-500 mt-3">
            No spam. We'll only email you when Pro is ready.
          </p>
        </div>

        {/* Right Side: Visual Graphic */}
        <div className="hidden lg:flex relative items-center justify-center shrink-0 w-64 h-64 z-10">
          <div className="relative w-48 h-60 bg-gray-900 border border-gray-700 rounded-2xl shadow-2xl flex flex-col p-6 items-center justify-center transform rotate-6 hover:rotate-0 transition-transform duration-500">
            <Crown size={40} weight="fill" className="text-emerald-500 mb-6" />
            <div className="w-24 h-2 bg-gray-800 rounded-full mb-3"></div>
            <div className="w-16 h-2 bg-gray-800 rounded-full mb-6"></div>
            <div className="w-full h-8 bg-emerald-500/10 border border-emerald-500/20 rounded-lg"></div>
          </div>
        </div>
      </div>

      {/* --- UPCOMING FEATURES GRID --- */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-6">
          <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider">
            What to expect in Pro
          </h3>
          <div className="h-px bg-gray-200 flex-1"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {plannedFeatures.map((feature, idx) => {
            const Icon = feature.icon;
            return (
              <div
                key={idx}
                className="bg-white border border-gray-200 rounded-2xl p-6 sm:p-8 shadow-sm hover:shadow-md hover:border-emerald-300 transition-all duration-300 group"
              >
                <div className="w-12 h-12 bg-gray-50 group-hover:bg-emerald-50 border border-gray-100 group-hover:border-emerald-100 rounded-xl flex items-center justify-center mb-5 transition-colors duration-300">
                  <Icon
                    size={24}
                    weight="duotone"
                    className="text-gray-400 group-hover:text-emerald-600 transition-colors"
                  />
                </div>
                <h4 className="text-lg font-semibold text-gray-900 mb-2">
                  {feature.title}
                </h4>
                <p className="text-sm text-gray-500 leading-relaxed">
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
