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
          <h1 className="text-[36px] font-bold text-gray-950 tracking-tighter mb-2">
            Settings
          </h1>
          <p className="text-gray-500 text-[16px] font-medium max-w-xl leading-relaxed">
            Manage your account preferences, integrations, and billing.
          </p>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-10">
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

              <div className="bg-white border border-gray-100/70 rounded-[28px] p-8 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.02)] mb-8">
                <h2 className="text-xl font-bold text-gray-950 mb-1">
                  Personal Info
                </h2>
                <p className="text-[14px] text-gray-500 font-medium mb-8">
                  Update your avatar and personal details here.
                </p>

                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 mb-8 pb-8 border-b border-gray-100">
                  <div className="relative shrink-0">
                    <div className="w-24 h-24 rounded-full bg-emerald-50 border-4 border-white shadow-md flex items-center justify-center overflow-hidden">
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
                    <div className="flex items-center gap-3 mb-2">
                      <button
                        onClick={handleGenerateAvatar}
                        className="flex items-center gap-2 px-4 py-2 bg-gray-900 hover:bg-gray-800 text-white text-[13px] font-semibold rounded-xl transition-colors shadow-sm"
                      >
                        <ArrowsClockwise size={16} weight="bold" /> Generate
                        Avatar
                      </button>
                      <button
                        onClick={() => setAvatar("")}
                        className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 hover:bg-red-50 hover:text-red-600 hover:border-red-200 text-gray-600 text-[13px] font-semibold rounded-xl transition-colors"
                      >
                        <Trash size={16} /> Clear
                      </button>
                    </div>
                    <p className="text-[12px] font-medium text-gray-400">
                      Generated uniquely using DiceBear's Lorelei style.
                    </p>
                  </div>
                </div>

                <div className="flex flex-col gap-2 mb-6">
                  <label className="text-[13px] font-bold text-gray-700">
                    Full Name
                  </label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-4 py-3 bg-gray-50/50 border border-gray-200 hover:border-gray-300 focus:border-emerald-500 focus:bg-white focus:ring-4 focus:ring-emerald-500/10 rounded-xl text-[14px] font-medium text-gray-900 outline-none transition-all"
                  />
                </div>

                <div className="flex flex-col gap-2 mb-8">
                  <label className="text-[13px] font-bold text-gray-700">
                    Email Address (Read-only)
                  </label>
                  <div className="relative">
                    <input
                      type="email"
                      value={user?.email || ""}
                      disabled
                      className="w-full px-4 py-3 bg-gray-100 border border-gray-200 rounded-xl text-[14px] font-medium text-gray-500 outline-none cursor-not-allowed pr-12"
                    />
                    <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none">
                      <ShieldCheck
                        size={20}
                        className="text-gray-400"
                        weight="fill"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-end gap-3 pt-4">
                <button
                  onClick={() => {
                    setName(user?.name || "");
                    setAvatar(user?.avatar || "");
                  }}
                  className="px-5 py-2.5 bg-white border border-gray-200 hover:bg-gray-50 text-gray-700 text-[14px] font-semibold rounded-xl transition-colors"
                >
                  Discard Changes
                </button>
                <button
                  onClick={handleSaveProfile}
                  disabled={isSaving}
                  className="w-[140px] flex items-center justify-center gap-2 px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white text-[14px] font-semibold rounded-xl transition-all shadow-md shadow-emerald-600/20 active:scale-95 disabled:opacity-70 disabled:pointer-events-none"
                >
                  {isSaving ? (
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  ) : (
                    <>
                      <Check size={18} weight="bold" /> Save Changes
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
              <div className="bg-white border border-gray-100/70 rounded-[28px] p-8 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.02)]">
                <h2 className="text-xl font-bold text-gray-950 mb-1">
                  Login Password
                </h2>
                <p className="text-[14px] text-gray-500 font-medium mb-8">
                  Manage your account authentication method.
                </p>

                {user?.auth_provider === "google" ? (
                  <div className="p-5 bg-blue-50 border border-blue-100 rounded-xl flex items-start gap-4">
                    <ShieldCheck
                      size={24}
                      weight="fill"
                      className="text-blue-500 shrink-0 mt-0.5"
                    />
                    <div>
                      <h3 className="text-[14px] font-bold text-blue-900 mb-1">
                        Managed by Google
                      </h3>
                      <p className="text-[13px] text-blue-700">
                        You signed up using your Google account. Your
                        authentication is secured by Google, so you do not need
                        a local password.
                      </p>
                    </div>
                  </div>
                ) : (
                  <form onSubmit={handlePasswordUpdate}>
                    {securityError && (
                      <div className="mb-4 p-3 bg-red-50 text-red-600 rounded-lg text-sm font-medium">
                        {securityError}
                      </div>
                    )}
                    {securitySuccess && (
                      <div className="mb-4 p-3 bg-emerald-50 text-emerald-600 rounded-lg text-sm font-medium">
                        {securitySuccess}
                      </div>
                    )}

                    <div className="flex flex-col gap-4 max-w-md">
                      <div className="flex flex-col gap-2">
                        <label className="text-[13px] font-bold text-gray-700">
                          Current Password
                        </label>
                        <input
                          type="password"
                          value={currentPassword}
                          onChange={(e) => setCurrentPassword(e.target.value)}
                          required
                          className="w-full px-4 py-3 bg-gray-50/50 border border-gray-200 focus:border-emerald-500 focus:bg-white focus:ring-4 focus:ring-emerald-500/10 rounded-xl text-[14px] font-medium text-gray-900 outline-none transition-all"
                        />
                      </div>
                      <div className="flex flex-col gap-2">
                        <label className="text-[13px] font-bold text-gray-700">
                          New Password
                        </label>
                        <input
                          type="password"
                          value={newPassword}
                          onChange={(e) => setNewPassword(e.target.value)}
                          required
                          minLength={8}
                          className="w-full px-4 py-3 bg-gray-50/50 border border-gray-200 focus:border-emerald-500 focus:bg-white focus:ring-4 focus:ring-emerald-500/10 rounded-xl text-[14px] font-medium text-gray-900 outline-none transition-all"
                        />
                      </div>
                      <div className="flex flex-col gap-2 mb-4">
                        <label className="text-[13px] font-bold text-gray-700">
                          Confirm New Password
                        </label>
                        <input
                          type="password"
                          value={confirmPassword}
                          onChange={(e) => setConfirmPassword(e.target.value)}
                          required
                          minLength={8}
                          className="w-full px-4 py-3 bg-gray-50/50 border border-gray-200 focus:border-emerald-500 focus:bg-white focus:ring-4 focus:ring-emerald-500/10 rounded-xl text-[14px] font-medium text-gray-900 outline-none transition-all"
                        />
                      </div>
                      <button
                        type="submit"
                        disabled={isSavingSecurity}
                        className="w-fit flex items-center justify-center gap-2 px-6 py-2.5 bg-gray-900 hover:bg-gray-800 text-white text-[14px] font-semibold rounded-xl transition-all shadow-sm disabled:opacity-70"
                      >
                        {isSavingSecurity ? "Updating..." : "Update Password"}
                      </button>
                    </div>
                  </form>
                )}
              </div>

              {/* Archive Security Section */}
              <div className="bg-white border border-gray-100/70 rounded-[28px] p-8 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.02)]">
                <div className="flex items-center gap-3 mb-1">
                  <Archive
                    size={24}
                    weight="duotone"
                    className="text-emerald-500"
                  />
                  <h2 className="text-xl font-bold text-gray-950">
                    Archive Security
                  </h2>
                </div>
                <p className="text-[14px] text-gray-500 font-medium mb-8">
                  Change the 4-digit PIN required to access your root archive.
                </p>

                {!user?.has_archive_pin ? (
                  <div className="p-5 bg-amber-50 border border-amber-100 rounded-xl flex items-start gap-4">
                    <LockKey
                      size={24}
                      weight="fill"
                      className="text-amber-500 shrink-0 mt-0.5"
                    />
                    <div>
                      <h3 className="text-[14px] font-bold text-amber-900 mb-1">
                        Archive is Unlocked
                      </h3>
                      <p className="text-[13px] text-amber-700">
                        You have not set up a PIN for your archive yet. Navigate
                        to the Archive page to secure it.
                      </p>
                    </div>
                  </div>
                ) : (
                  <form onSubmit={handlePinUpdate}>
                    {pinError && (
                      <div className="mb-4 p-3 bg-red-50 text-red-600 rounded-lg text-sm font-medium">
                        {pinError}
                      </div>
                    )}
                    {pinSuccess && (
                      <div className="mb-4 p-3 bg-emerald-50 text-emerald-600 rounded-lg text-sm font-medium">
                        {pinSuccess}
                      </div>
                    )}

                    <div className="flex flex-col gap-4 max-w-md">
                      <div className="flex flex-col gap-2">
                        <label className="text-[13px] font-bold text-gray-700">
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
                          className="w-full px-4 py-3 bg-gray-50/50 border border-gray-200 focus:border-emerald-500 focus:bg-white focus:ring-4 focus:ring-emerald-500/10 rounded-xl text-[14px] tracking-widest font-medium text-gray-900 outline-none transition-all"
                        />
                      </div>
                      <div className="flex flex-col gap-2">
                        <label className="text-[13px] font-bold text-gray-700">
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
                          className="w-full px-4 py-3 bg-gray-50/50 border border-gray-200 focus:border-emerald-500 focus:bg-white focus:ring-4 focus:ring-emerald-500/10 rounded-xl text-[14px] tracking-widest font-medium text-gray-900 outline-none transition-all"
                        />
                      </div>
                      <div className="flex flex-col gap-2 mb-4">
                        <label className="text-[13px] font-bold text-gray-700">
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
                          className="w-full px-4 py-3 bg-gray-50/50 border border-gray-200 focus:border-emerald-500 focus:bg-white focus:ring-4 focus:ring-emerald-500/10 rounded-xl text-[14px] tracking-widest font-medium text-gray-900 outline-none transition-all"
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
                        className="w-fit flex items-center justify-center gap-2 px-6 py-2.5 bg-gray-900 hover:bg-gray-800 text-white text-[14px] font-semibold rounded-xl transition-all shadow-sm disabled:opacity-70"
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
