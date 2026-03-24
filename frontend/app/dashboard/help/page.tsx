// src/app/dashboard/help/page.tsx
"use client";

import React from "react";
import {
  Question,
  MagnifyingGlass,
  BookOpen,
  ChatCircle,
  ArrowUpRight,
  CaretRight,
} from "@phosphor-icons/react";

const faqs = [
  { question: "How does the AI auto-tagging work?", category: "Features" },
  {
    question: "Can I export my archive to Notion or CSV?",
    category: "Data & Privacy",
  },
  { question: "How do I upgrade or cancel my Pro plan?", category: "Billing" },
  {
    question: "Is the browser extension available for Safari?",
    category: "Integrations",
  },
];

export default function HelpPage() {
  return (
    <div className="max-w-[1000px] mx-auto pb-16 font-poppins px-6">
      {/* Hero Section */}
      <div className="flex flex-col items-center text-center pt-12 pb-16">
        <div className="bg-sky-50 p-4 rounded-full mb-6 border border-sky-100">
          <Question size={32} weight="duotone" className="text-sky-500" />
        </div>
        <h1 className="text-[40px] font-bold text-gray-950 tracking-tighter mb-4">
          How can we help you?
        </h1>

        {/* Help Search */}
        <div className="relative w-full max-w-2xl group mt-4 shadow-sm hover:shadow-md transition-shadow rounded-2xl">
          <MagnifyingGlass
            size={22}
            className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-sky-500 transition-colors"
          />
          <input
            type="text"
            placeholder="Search for articles, tutorials, or troubleshooting..."
            className="w-full pl-14 pr-6 py-4 border border-gray-200 rounded-2xl bg-white focus:outline-none focus:ring-4 focus:ring-sky-500/10 focus:border-sky-500 transition-all text-[15px] placeholder:text-gray-400 font-medium"
          />
        </div>
      </div>

      {/* Main Support Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
        {/* Documentation Card */}
        <div className="group bg-white border border-gray-200/60 hover:border-sky-200 rounded-[24px] p-8 shadow-sm hover:shadow-lg hover:shadow-sky-900/5 transition-all duration-300 cursor-pointer flex items-start gap-6">
          <div className="p-4 bg-gray-50 group-hover:bg-sky-50 rounded-2xl transition-colors">
            <BookOpen
              size={28}
              weight="fill"
              className="text-gray-400 group-hover:text-sky-500 transition-colors"
            />
          </div>
          <div>
            <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-sky-700 transition-colors">
              Documentation
            </h3>
            <p className="text-[14px] text-gray-500 font-medium leading-relaxed mb-4">
              Detailed guides on how to make the most out of your digital
              archive.
            </p>
            <span className="text-[13px] font-bold text-sky-600 flex items-center gap-1">
              Browse docs <ArrowUpRight size={14} weight="bold" />
            </span>
          </div>
        </div>

        {/* Contact Card */}
        <div className="group bg-white border border-gray-200/60 hover:border-emerald-200 rounded-[24px] p-8 shadow-sm hover:shadow-lg hover:shadow-emerald-900/5 transition-all duration-300 cursor-pointer flex items-start gap-6">
          <div className="p-4 bg-gray-50 group-hover:bg-emerald-50 rounded-2xl transition-colors">
            <ChatCircle
              size={28}
              weight="fill"
              className="text-gray-400 group-hover:text-emerald-500 transition-colors"
            />
          </div>
          <div>
            <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-emerald-700 transition-colors">
              Contact Support
            </h3>
            <p className="text-[14px] text-gray-500 font-medium leading-relaxed mb-4">
              Can't find what you're looking for? Reach out to our human support
              team.
            </p>
            <span className="text-[13px] font-bold text-emerald-600 flex items-center gap-1">
              Start a chat <ArrowUpRight size={14} weight="bold" />
            </span>
          </div>
        </div>
      </div>

      {/* Popular FAQs */}
      <div>
        <h3 className="text-[18px] font-bold text-gray-900 mb-6">
          Frequently Asked Questions
        </h3>
        <div className="bg-white border border-gray-100 rounded-[24px] overflow-hidden shadow-sm">
          <div className="flex flex-col divide-y divide-gray-100">
            {faqs.map((faq, index) => (
              <button
                key={index}
                className="flex items-center justify-between p-6 hover:bg-gray-50 transition-colors group text-left"
              >
                <div>
                  <span className="text-[11px] font-bold text-sky-600 uppercase tracking-widest block mb-1">
                    {faq.category}
                  </span>
                  <p className="text-[15px] font-semibold text-gray-800 group-hover:text-sky-800 transition-colors">
                    {faq.question}
                  </p>
                </div>
                <div className="p-2 bg-gray-100 group-hover:bg-sky-100 rounded-full text-gray-400 group-hover:text-sky-600 transition-colors">
                  <CaretRight size={16} weight="bold" />
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
