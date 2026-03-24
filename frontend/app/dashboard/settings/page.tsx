// src/app/dashboard/settings/page.tsx
"use client";

import React, { useState } from "react";
import {
  User,
  Palette,
  Bell,
  LockKey,
  CreditCard,
  UploadSimple,
  Check,
  ShieldCheck,
} from "@phosphor-icons/react";

// Define our tabs
const TABS = [
  { id: "profile", label: "Public Profile", icon: User },
  { id: "account", label: "Account Security", icon: LockKey },
  { id: "appearance", label: "Appearance", icon: Palette },
  { id: "notifications", label: "Notifications", icon: Bell },
  { id: "billing", label: "Billing & Plan", icon: CreditCard },
];

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState("profile");
  const [isSaving, setIsSaving] = useState(false);

  // Mock save function
  const handleSave = () => {
    setIsSaving(true);
    setTimeout(() => setIsSaving(false), 800);
  };

  return (
    <div className="max-w-[1300px] mx-auto pb-16 font-poppins px-6">
      {/* --- HEADER SECTION --- */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10 py-6 border-b border-gray-100">
        <div>
          <h1 className="text-[36px] font-bold text-gray-950 tracking-tighter mb-2">
            Settings
          </h1>
          <p className="text-gray-500 text-[16px] font-medium max-w-xl leading-relaxed">
            Manage your account preferences, integrations, and billing.
          </p>
        </div>
      </div>

      {/* --- MAIN LAYOUT: SIDEBAR + CONTENT --- */}
      <div className="flex flex-col lg:flex-row gap-10">
        {/* Left Sidebar Navigation */}
        <aside className="w-full lg:w-64 shrink-0">
          <nav className="flex flex-col gap-1.5">
            {TABS.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;

              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-3 w-full px-4 py-3 rounded-xl text-[14px] font-semibold transition-all duration-200 text-left ${
                    isActive
                      ? "bg-white text-gray-950 shadow-[0_2px_10px_rgba(0,0,0,0.03)] border border-gray-100/50"
                      : "text-gray-500 hover:text-gray-900 hover:bg-gray-50 border border-transparent"
                  }`}
                >
                  <Icon
                    size={20}
                    weight={isActive ? "fill" : "regular"}
                    className={isActive ? "text-emerald-600" : "text-gray-400"}
                  />
                  {tab.label}
                </button>
              );
            })}
          </nav>
        </aside>

        {/* Right Content Area */}
        <div className="flex-1 max-w-3xl">
          {/* We'll render the Profile tab content as the primary example */}
          {activeTab === "profile" && (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-300">
              {/* Profile Card */}
              <div className="bg-white border border-gray-100/70 rounded-[28px] p-8 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.02)] mb-8">
                <h2 className="text-xl font-bold text-gray-950 mb-1">
                  Personal Info
                </h2>
                <p className="text-[14px] text-gray-500 font-medium mb-8">
                  Update your photo and personal details here.
                </p>

                {/* Avatar Upload Section */}
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 mb-8 pb-8 border-b border-gray-100">
                  <div className="relative group cursor-pointer shrink-0">
                    <div className="w-24 h-24 rounded-full bg-emerald-50 border-4 border-white shadow-md flex items-center justify-center overflow-hidden">
                      {/* Placeholder for an actual image */}
                      <span className="text-2xl font-bold text-emerald-600">
                        JS
                      </span>
                    </div>
                    {/* Hover Overlay */}
                    <div className="absolute inset-0 bg-black/40 rounded-full opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <UploadSimple
                        size={24}
                        weight="bold"
                        className="text-white"
                      />
                    </div>
                  </div>
                  <div>
                    <div className="flex items-center gap-3 mb-2">
                      <button className="px-4 py-2 bg-gray-900 hover:bg-gray-800 text-white text-[13px] font-semibold rounded-xl transition-colors shadow-sm">
                        Upload new photo
                      </button>
                      <button className="px-4 py-2 bg-white border border-gray-200 hover:bg-gray-50 text-gray-600 text-[13px] font-semibold rounded-xl transition-colors">
                        Remove
                      </button>
                    </div>
                    <p className="text-[12px] font-medium text-gray-400">
                      SVG, PNG, JPG or GIF (max. 800x800px)
                    </p>
                  </div>
                </div>

                {/* Form Fields */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
                  <div className="flex flex-col gap-2">
                    <label className="text-[13px] font-bold text-gray-700">
                      First Name
                    </label>
                    <input
                      type="text"
                      defaultValue="John"
                      className="w-full px-4 py-3 bg-gray-50/50 border border-gray-200 hover:border-gray-300 focus:border-emerald-500 focus:bg-white focus:ring-4 focus:ring-emerald-500/10 rounded-xl text-[14px] font-medium text-gray-900 outline-none transition-all"
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="text-[13px] font-bold text-gray-700">
                      Last Name
                    </label>
                    <input
                      type="text"
                      defaultValue="Smith"
                      className="w-full px-4 py-3 bg-gray-50/50 border border-gray-200 hover:border-gray-300 focus:border-emerald-500 focus:bg-white focus:ring-4 focus:ring-emerald-500/10 rounded-xl text-[14px] font-medium text-gray-900 outline-none transition-all"
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-2 mb-8">
                  <label className="text-[13px] font-bold text-gray-700">
                    Email Address
                  </label>
                  <div className="relative">
                    <input
                      type="email"
                      defaultValue="john@example.com"
                      className="w-full px-4 py-3 bg-gray-50/50 border border-gray-200 hover:border-gray-300 focus:border-emerald-500 focus:bg-white focus:ring-4 focus:ring-emerald-500/10 rounded-xl text-[14px] font-medium text-gray-900 outline-none transition-all pr-12"
                    />
                    <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none">
                      <ShieldCheck
                        size={20}
                        className="text-emerald-500"
                        weight="fill"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Preferences Card (Showing custom toggles) */}
              <div className="bg-white border border-gray-100/70 rounded-[28px] p-8 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.02)] mb-8">
                <h2 className="text-xl font-bold text-gray-950 mb-1">
                  Preferences
                </h2>
                <p className="text-[14px] text-gray-500 font-medium mb-6">
                  Manage how the AI interacts with your saved content.
                </p>

                <div className="flex flex-col divide-y divide-gray-100">
                  {/* Toggle Item 1 */}
                  <div className="flex items-center justify-between py-5">
                    <div className="pr-4">
                      <h4 className="text-[14px] font-bold text-gray-900 mb-1">
                        Auto-Generate Summaries
                      </h4>
                      <p className="text-[13px] text-gray-500 font-medium">
                        Automatically create short abstracts when saving new
                        links.
                      </p>
                    </div>
                    {/* Custom Toggle Switch (Active) */}
                    <button className="relative w-11 h-6 rounded-full bg-emerald-500 transition-colors shrink-0 focus:outline-none focus:ring-4 focus:ring-emerald-500/20">
                      <span className="absolute top-1 left-1 bg-white w-4 h-4 rounded-full transition-transform translate-x-5 shadow-sm"></span>
                    </button>
                  </div>

                  {/* Toggle Item 2 */}
                  <div className="flex items-center justify-between py-5">
                    <div className="pr-4">
                      <h4 className="text-[14px] font-bold text-gray-900 mb-1">
                        Weekly Digest Email
                      </h4>
                      <p className="text-[13px] text-gray-500 font-medium">
                        Receive a weekly summary of your recently saved items.
                      </p>
                    </div>
                    {/* Custom Toggle Switch (Inactive) */}
                    <button className="relative w-11 h-6 rounded-full bg-gray-200 hover:bg-gray-300 transition-colors shrink-0 focus:outline-none focus:ring-4 focus:ring-gray-200">
                      <span className="absolute top-1 left-1 bg-white w-4 h-4 rounded-full transition-transform shadow-sm"></span>
                    </button>
                  </div>
                </div>
              </div>

              {/* Action Footer */}
              <div className="flex items-center justify-end gap-3 pt-4">
                <button className="px-5 py-2.5 bg-white border border-gray-200 hover:bg-gray-50 text-gray-700 text-[14px] font-semibold rounded-xl transition-colors">
                  Cancel
                </button>
                <button
                  onClick={handleSave}
                  className="w-[140px] flex items-center justify-center gap-2 px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white text-[14px] font-semibold rounded-xl transition-all shadow-md shadow-emerald-600/20 active:scale-95"
                >
                  {isSaving ? (
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  ) : (
                    <>
                      <Check size={18} weight="bold" />
                      Save Changes
                    </>
                  )}
                </button>
              </div>
            </div>
          )}

          {/* Placeholder for other tabs */}
          {activeTab !== "profile" && (
            <div className="flex flex-col items-center justify-center py-24 text-center animate-in fade-in duration-300">
              <div className="p-4 bg-gray-50 rounded-full mb-4">
                <Palette size={32} weight="duotone" className="text-gray-400" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                {TABS.find((t) => t.id === activeTab)?.label}
              </h3>
              <p className="text-[14px] text-gray-500 font-medium">
                This section is currently under construction.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
