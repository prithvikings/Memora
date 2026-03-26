"use client";

import React, { useState, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import {
  User,
  Palette,
  Bell,
  LockKey,
  CreditCard,
  ArrowsClockwise,
  Check,
  ShieldCheck,
  Trash,
  Archive,
} from "@phosphor-icons/react";

const TABS = [
  { id: "profile", label: "Public Profile", icon: User },
  { id: "account", label: "Account Security", icon: LockKey },
  { id: "appearance", label: "Appearance", icon: Palette },
  { id: "notifications", label: "Notifications", icon: Bell },
  { id: "billing", label: "Billing & Plan", icon: CreditCard },
];

export default function SettingsPage() {
  const { user, updateProfile, updatePassword, updateArchivePin } = useAuth();
  const [activeTab, setActiveTab] = useState("profile");

  // Profile State
  const [name, setName] = useState(user?.name || "");
  const [avatar, setAvatar] = useState(user?.avatar || "");
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  // Password State
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isSavingSecurity, setIsSavingSecurity] = useState(false);
  const [securityError, setSecurityError] = useState("");
  const [securitySuccess, setSecuritySuccess] = useState("");

  // Archive PIN State
  const [currentPin, setCurrentPin] = useState("");
  const [newPin, setNewPin] = useState("");
  const [confirmPin, setConfirmPin] = useState("");
  const [isSavingPin, setIsSavingPin] = useState(false);
  const [pinError, setPinError] = useState("");
  const [pinSuccess, setPinSuccess] = useState("");

  useEffect(() => {
    if (user) {
      setName(user.name || "");
      setAvatar(user.avatar || "");
    }
  }, [user]);

  const handleGenerateAvatar = (e: React.MouseEvent) => {
    e.preventDefault();
    const randomSeed = Math.random().toString(36).substring(2, 10);
    const newAvatarUrl = `https://api.dicebear.com/9.x/lorelei/svg?seed=${randomSeed}`;
    setAvatar(newAvatarUrl);
  };

  const handleSaveProfile = async () => {
    setError("");
    setSuccessMsg("");
    setIsSaving(true);
    try {
      await updateProfile(name, avatar);
      setSuccessMsg("Profile updated successfully");
    } catch (err: any) {
      setError(err.response?.data?.message || "Failed to update profile");
    } finally {
      setIsSaving(false);
      setTimeout(() => setSuccessMsg(""), 3000);
    }
  };

  const handlePasswordUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setSecurityError("");
    setSecuritySuccess("");

    if (newPassword !== confirmPassword) {
      setSecurityError("New passwords do not match.");
      return;
    }

    setIsSavingSecurity(true);
    try {
      await updatePassword(currentPassword, newPassword);
      setSecuritySuccess("Password updated successfully.");
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } catch (err: any) {
      setSecurityError(
        err.response?.data?.message || "Failed to update password.",
      );
    } finally {
      setIsSavingSecurity(false);
      setTimeout(() => setSecuritySuccess(""), 3000);
    }
  };

  const handlePinUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setPinError("");
    setPinSuccess("");

    if (newPin !== confirmPin) {
      setPinError("New PINs do not match.");
      return;
    }
    if (newPin.length !== 4) {
      setPinError("PIN must be exactly 4 digits.");
      return;
    }

    setIsSavingPin(true);
    try {
      await updateArchivePin(currentPin, newPin);
      setPinSuccess("Archive PIN updated successfully.");
      setCurrentPin("");
      setNewPin("");
      setConfirmPin("");
    } catch (err: any) {
      setPinError(err.response?.data?.message || "Failed to update PIN.");
    } finally {
      setIsSavingPin(false);
      setTimeout(() => setPinSuccess(""), 3000);
    }
  };

  return (
    <div className="max-w-[1300px] mx-auto pb-16 font-poppins px-6">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10 py-6 border-b border-gray-100">
        <div>
          <h1 className="text-[32px] font-semibold text-gray-900 tracking-tight mb-2">
            Settings
          </h1>
          <p className="text-gray-400 text-[15px] font-geist">
            Manage your account preferences, integrations, and billing.
          </p>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-10">
        <aside className="w-full lg:w-64 shrink-0">
          <nav className="flex flex-col gap-1">
            {TABS.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveTab(tab.id)}
                  className={`group flex items-center gap-3 w-full px-3 py-2.5 rounded-lg text-sm font-medium transition-colors text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-600 cursor-pointer ${
                    isActive
                      ? "bg-emerald-50/80 text-emerald-900"
                      : "text-gray-600 hover:text-gray-900 hover:bg-gray-100/60"
                  }`}
                >
                  <Icon
                    size={18}
                    weight={isActive ? "fill" : "regular"}
                    className={`shrink-0 transition-colors ${
                      isActive
                        ? "text-emerald-600"
                        : "text-gray-400 group-hover:text-gray-600"
                    }`}
                  />
                  {tab.label}
                </button>
              );
            })}
          </nav>
        </aside>

        <div className="flex-1 max-w-3xl">
          {/* PROFILE TAB */}
          {activeTab === "profile" && (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-300">
              {error && (
                <div className="mb-4 p-3 bg-red-50 text-red-600 rounded-lg text-sm font-medium">
                  {error}
                </div>
              )}
              {successMsg && (
                <div className="mb-4 p-3 bg-emerald-50 text-emerald-600 rounded-lg text-sm font-medium">
                  {successMsg}
                </div>
              )}

              <div className="bg-white border border-gray-200 rounded-2xl p-6 sm:p-8 shadow-sm mb-8">
                <h2 className="text-lg font-semibold text-gray-900 mb-1">
                  Personal Info
                </h2>
                <p className="text-sm text-gray-500 mb-8">
                  Update your avatar and personal details here.
                </p>

                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 mb-8 pb-8 border-b border-gray-200">
                  <div className="relative shrink-0">
                    <div className="w-20 h-20 rounded-full border border-gray-200 bg-gray-50 flex items-center justify-center overflow-hidden shadow-sm">
                      {avatar ? (
                        <img
                          src={avatar}
                          alt="Avatar"
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <span className="text-2xl font-bold text-emerald-600">
                          {user?.name?.charAt(0).toUpperCase() || "U"}
                        </span>
                      )}
                    </div>
                  </div>

                  <div>
                    <div className="flex flex-wrap items-center gap-3 mb-2">
                      <button
                        type="button"
                        onClick={handleGenerateAvatar}
                        className="relative flex items-center justify-center gap-2 px-4 py-2 bg-gray-900 text-white text-sm font-medium rounded-lg shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05),_inset_0px_1px_0px_0px_rgba(255,255,255,0.1)] ring-1 ring-inset ring-gray-950 hover:bg-gray-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-900 focus-visible:ring-offset-2 transition-all active:scale-[0.98]"
                      >
                        <ArrowsClockwise size={16} weight="bold" /> Generate
                        Avatar
                      </button>

                      <button
                        type="button"
                        onClick={() => setAvatar("")}
                        className="flex items-center justify-center gap-2 px-4 py-2 bg-white border border-gray-200 text-gray-700 text-sm font-medium rounded-lg shadow-sm hover:bg-red-50 hover:text-red-700 hover:border-red-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2 transition-all active:scale-[0.98]"
                      >
                        <Trash size={16} /> Clear
                      </button>
                    </div>
                    <p className="text-xs text-gray-500">
                      Generated uniquely using DiceBear's Lorelei style.
                    </p>
                  </div>
                </div>

                <div className="flex flex-col gap-1.5 mb-6">
                  <label
                    htmlFor="fullName"
                    className="text-sm font-medium text-gray-700"
                  >
                    Full Name
                  </label>
                  <input
                    id="fullName"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-4 py-2.5 bg-white border border-gray-300 rounded-lg text-sm text-gray-900 placeholder-gray-400 shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:border-transparent transition-shadow"
                    placeholder="Enter your full name"
                  />
                </div>

                <div className="flex flex-col gap-1.5 mb-2">
                  <label
                    htmlFor="emailAddress"
                    className="text-sm font-medium text-gray-700"
                  >
                    Email Address
                  </label>
                  <div className="relative">
                    <input
                      id="emailAddress"
                      type="email"
                      value={user?.email || ""}
                      disabled
                      className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm text-gray-500 shadow-sm cursor-not-allowed pr-10 focus:outline-none"
                    />
                    <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none">
                      <ShieldCheck
                        size={20}
                        className="text-gray-400"
                        weight="fill"
                      />
                    </div>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">
                    Your email address cannot be changed.
                  </p>
                </div>
              </div>

              <div className="flex items-center justify-end gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => {
                    setName(user?.name || "");
                    setAvatar(user?.avatar || "");
                  }}
                  className="px-4 py-2 bg-white border border-gray-200 text-gray-700 text-sm font-medium rounded-lg shadow-sm hover:bg-gray-50 hover:text-gray-900 hover:border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-200 transition-all active:scale-[0.98]"
                >
                  Discard Changes
                </button>

                <button
                  type="button"
                  onClick={handleSaveProfile}
                  disabled={isSaving}
                  className="relative flex items-center justify-center gap-2 px-4 py-2 bg-emerald-600 text-white text-sm font-medium rounded-lg shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05),_inset_0px_1px_0px_0px_rgba(255,255,255,0.15)] ring-1 ring-inset ring-emerald-700 hover:bg-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:ring-offset-2 transition-all active:scale-[0.98] disabled:opacity-60 disabled:cursor-not-allowed disabled:active:scale-100"
                >
                  {isSaving ? (
                    <svg
                      className="w-4 h-4 text-white/80 animate-spin"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                  ) : (
                    <>
                      <Check size={16} weight="bold" /> Save Changes
                    </>
                  )}
                </button>
              </div>
            </div>
          )}

          {/* ACCOUNT SECURITY TAB */}
          {activeTab === "account" && (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-300 flex flex-col gap-8">
              {/* Login Password Section */}
              <div className="bg-white border border-gray-200 rounded-2xl p-6 sm:p-8 shadow-sm">
                <h2 className="text-lg font-semibold text-gray-900 mb-1">
                  Login Password
                </h2>
                <p className="text-sm text-gray-500 mb-8">
                  Manage your account authentication method.
                </p>

                {user?.auth_provider === "google" ? (
                  <div className="p-4 bg-blue-50 border border-blue-100 rounded-xl flex items-start gap-3">
                    <ShieldCheck
                      size={20}
                      weight="fill"
                      className="text-blue-500 shrink-0 mt-0.5"
                    />
                    <div>
                      <h3 className="text-sm font-semibold text-blue-900 mb-1">
                        Managed by Google
                      </h3>
                      <p className="text-sm text-blue-700 max-w-lg">
                        You signed up using your Google account. Your
                        authentication is secured by Google, so you do not need
                        a local password.
                      </p>
                    </div>
                  </div>
                ) : (
                  <form onSubmit={handlePasswordUpdate}>
                    {securityError && (
                      <div className="mb-6 p-3 bg-red-50 border border-red-100 text-red-700 rounded-lg text-sm font-medium">
                        {securityError}
                      </div>
                    )}
                    {securitySuccess && (
                      <div className="mb-6 p-3 bg-emerald-50 border border-emerald-100 text-emerald-700 rounded-lg text-sm font-medium">
                        {securitySuccess}
                      </div>
                    )}

                    <div className="flex flex-col gap-5 max-w-md">
                      <div className="flex flex-col gap-1.5">
                        <label className="text-sm font-medium text-gray-700">
                          Current Password
                        </label>
                        <input
                          type="password"
                          value={currentPassword}
                          onChange={(e) => setCurrentPassword(e.target.value)}
                          required
                          className="w-full px-4 py-2.5 bg-white border border-gray-300 rounded-lg text-sm text-gray-900 placeholder-gray-400 shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:border-transparent transition-shadow"
                        />
                      </div>

                      <div className="flex flex-col gap-1.5">
                        <label className="text-sm font-medium text-gray-700">
                          New Password
                        </label>
                        <input
                          type="password"
                          value={newPassword}
                          onChange={(e) => setNewPassword(e.target.value)}
                          required
                          minLength={8}
                          className="w-full px-4 py-2.5 bg-white border border-gray-300 rounded-lg text-sm text-gray-900 placeholder-gray-400 shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:border-transparent transition-shadow"
                        />
                      </div>

                      <div className="flex flex-col gap-1.5 mb-2">
                        <label className="text-sm font-medium text-gray-700">
                          Confirm New Password
                        </label>
                        <input
                          type="password"
                          value={confirmPassword}
                          onChange={(e) => setConfirmPassword(e.target.value)}
                          required
                          minLength={8}
                          className="w-full px-4 py-2.5 bg-white border border-gray-300 rounded-lg text-sm text-gray-900 placeholder-gray-400 shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:border-transparent transition-shadow"
                        />
                      </div>

                      <button
                        type="submit"
                        disabled={isSavingSecurity}
                        className="relative w-fit flex items-center justify-center gap-2 px-5 py-2.5 bg-gray-900 text-white text-sm font-medium rounded-lg shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05),_inset_0px_1px_0px_0px_rgba(255,255,255,0.1)] ring-1 ring-inset ring-gray-950 hover:bg-gray-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-900 focus-visible:ring-offset-2 transition-all active:scale-[0.98] disabled:opacity-60 disabled:cursor-not-allowed disabled:active:scale-100"
                      >
                        {isSavingSecurity ? "Updating..." : "Update Password"}
                      </button>
                    </div>
                  </form>
                )}
              </div>

              {/* Archive Security Section */}
              <div className="bg-white border border-gray-200 rounded-2xl p-6 sm:p-8 shadow-sm">
                <div className="flex items-center gap-2 mb-1">
                  <Archive
                    size={20}
                    weight="duotone"
                    className="text-emerald-600"
                  />
                  <h2 className="text-lg font-semibold text-gray-900">
                    Archive Security
                  </h2>
                </div>
                <p className="text-sm text-gray-500 mb-8">
                  Change the 4-digit PIN required to access your root archive.
                </p>

                {!user?.has_archive_pin ? (
                  <div className="p-4 bg-amber-50 border border-amber-100 rounded-xl flex items-start gap-3">
                    <LockKey
                      size={20}
                      weight="fill"
                      className="text-amber-500 shrink-0 mt-0.5"
                    />
                    <div>
                      <h3 className="text-sm font-semibold text-amber-900 mb-1">
                        Archive is Unlocked
                      </h3>
                      <p className="text-sm text-amber-700 max-w-lg">
                        You have not set up a PIN for your archive yet. Navigate
                        to the Archive page to secure it.
                      </p>
                    </div>
                  </div>
                ) : (
                  <form onSubmit={handlePinUpdate}>
                    {pinError && (
                      <div className="mb-6 p-3 bg-red-50 border border-red-100 text-red-700 rounded-lg text-sm font-medium">
                        {pinError}
                      </div>
                    )}
                    {pinSuccess && (
                      <div className="mb-6 p-3 bg-emerald-50 border border-emerald-100 text-emerald-700 rounded-lg text-sm font-medium">
                        {pinSuccess}
                      </div>
                    )}

                    <div className="flex flex-col gap-5 max-w-md">
                      <div className="flex flex-col gap-1.5">
                        <label className="text-sm font-medium text-gray-700">
                          Current 4-Digit PIN
                        </label>
                        <input
                          type="password"
                          maxLength={4}
                          value={currentPin}
                          onChange={(e) =>
                            setCurrentPin(e.target.value.replace(/\D/g, ""))
                          }
                          required
                          className="w-full px-4 py-2.5 bg-white border border-gray-300 rounded-lg text-sm tracking-widest text-gray-900 placeholder-gray-400 shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:border-transparent transition-shadow font-mono"
                        />
                      </div>

                      <div className="flex flex-col gap-1.5">
                        <label className="text-sm font-medium text-gray-700">
                          New 4-Digit PIN
                        </label>
                        <input
                          type="password"
                          maxLength={4}
                          value={newPin}
                          onChange={(e) =>
                            setNewPin(e.target.value.replace(/\D/g, ""))
                          }
                          required
                          className="w-full px-4 py-2.5 bg-white border border-gray-300 rounded-lg text-sm tracking-widest text-gray-900 placeholder-gray-400 shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:border-transparent transition-shadow font-mono"
                        />
                      </div>

                      <div className="flex flex-col gap-1.5 mb-2">
                        <label className="text-sm font-medium text-gray-700">
                          Confirm New PIN
                        </label>
                        <input
                          type="password"
                          maxLength={4}
                          value={confirmPin}
                          onChange={(e) =>
                            setConfirmPin(e.target.value.replace(/\D/g, ""))
                          }
                          required
                          className="w-full px-4 py-2.5 bg-white border border-gray-300 rounded-lg text-sm tracking-widest text-gray-900 placeholder-gray-400 shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:border-transparent transition-shadow font-mono"
                        />
                      </div>

                      <button
                        type="submit"
                        disabled={
                          isSavingPin ||
                          currentPin.length !== 4 ||
                          newPin.length !== 4 ||
                          confirmPin.length !== 4
                        }
                        className="relative w-fit flex items-center justify-center gap-2 px-5 py-2.5 bg-gray-900 text-white text-sm font-medium rounded-lg shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05),_inset_0px_1px_0px_0px_rgba(255,255,255,0.1)] ring-1 ring-inset ring-gray-950 hover:bg-gray-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-900 focus-visible:ring-offset-2 transition-all active:scale-[0.98] disabled:opacity-60 disabled:cursor-not-allowed disabled:active:scale-100"
                      >
                        {isSavingPin ? "Updating..." : "Update Archive PIN"}
                      </button>
                    </div>
                  </form>
                )}
              </div>
            </div>
          )}

          {/* Under Construction Fallback */}
          {activeTab !== "profile" && activeTab !== "account" && (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-300">
              <div className="flex flex-col items-center justify-center py-24 px-6 text-center bg-gray-50/50 border-2 border-dashed border-gray-200 rounded-2xl">
                <div className="flex items-center justify-center w-14 h-14 mb-5 bg-white border border-gray-200 rounded-xl shadow-sm ring-4 ring-gray-50">
                  <Palette
                    size={24}
                    weight="duotone"
                    className="text-gray-400"
                  />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-1">
                  {TABS.find((t) => t.id === activeTab)?.label || "Section"}
                </h3>
                <p className="text-sm text-gray-500 max-w-sm">
                  This section is currently under construction. Check back later
                  for updates.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
