"use client";

import React, { useState, useEffect } from "react";
import { api } from "@/lib/api";
import {
  Trash,
  ArrowCounterClockwise,
  Warning,
  Clock,
  CheckCircle,
  CircleNotch,
} from "@phosphor-icons/react";

interface TrashedBookmark {
  _id: string;
  title?: string;
  url: string;
  deleted_at: string;
}

type ModalAction = "delete_single" | "empty_trash" | null;
interface ModalState {
  isOpen: boolean;
  action: ModalAction;
  targetId: string | null;
  title: string;
  message: string;
  confirmText: string;
  confirmStyle: string;
  iconStyle: string;
}

export default function TrashPage() {
  const [trashItems, setTrashItems] = useState<TrashedBookmark[]>([]);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);

  const [modal, setModal] = useState<ModalState>({
    isOpen: false,
    action: null,
    targetId: null,
    title: "",
    message: "",
    confirmText: "",
    confirmStyle: "",
    iconStyle: "",
  });

  useEffect(() => {
    fetchTrash();
  }, []);

  const fetchTrash = async () => {
    try {
      const res = await api.get("/bookmarks/trash");
      setTrashItems(res.data.data);
    } catch (error) {
      console.error("Failed to load trash", error);
    } finally {
      setLoading(false);
    }
  };

  const getDomain = (url: string) => {
    try {
      return new URL(url).hostname.replace("www.", "");
    } catch {
      return url;
    }
  };

  const getExpiryInfo = (deletedAt: string) => {
    const deletedDate = new Date(deletedAt);
    const expiryDate = new Date(deletedDate);
    expiryDate.setDate(expiryDate.getDate() + 30); // 30 day retention

    const now = new Date();
    const diffTime = expiryDate.getTime() - now.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays <= 0) return { text: "Expired", isUrgent: true };
    return { text: `${diffDays} days`, isUrgent: diffDays <= 3 };
  };

  const handleRestore = async (id: string) => {
    try {
      await api.post(`/bookmarks/${id}/restore`);
      setTrashItems((prev) => prev.filter((item) => item._id !== id));
    } catch (error) {
      alert("Failed to restore bookmark");
    }
  };

  const promptDeleteSingle = (id: string) => {
    setModal({
      isOpen: true,
      action: "delete_single",
      targetId: id,
      title: "Delete Permanently",
      message:
        "Are you sure you want to permanently delete this item? It cannot be recovered once destroyed.",
      confirmText: "Delete Forever",
      confirmStyle:
        "bg-red-600 hover:bg-red-700 text-white shadow-sm focus:ring-red-600",
      iconStyle: "bg-red-50 text-red-600 border border-red-100",
    });
  };

  const promptEmptyTrash = () => {
    setModal({
      isOpen: true,
      action: "empty_trash",
      targetId: null,
      title: "Empty Trash",
      message: `Are you sure you want to permanently delete all ${trashItems.length} items? This action is irreversible.`,
      confirmText: "Empty Trash",
      confirmStyle:
        "bg-red-600 hover:bg-red-700 text-white shadow-sm focus:ring-red-600",
      iconStyle: "bg-red-50 text-red-600 border border-red-100",
    });
  };

  const closeModal = () => setModal((prev) => ({ ...prev, isOpen: false }));

  const confirmModalAction = async () => {
    setActionLoading(true);
    try {
      if (modal.action === "delete_single" && modal.targetId) {
        await api.delete(`/bookmarks/${modal.targetId}/hard`);
        setTrashItems((prev) =>
          prev.filter((item) => item._id !== modal.targetId),
        );
      } else if (modal.action === "empty_trash") {
        await api.delete("/bookmarks/trash/empty");
        setTrashItems([]);
      }
    } catch (error) {
      alert("Action failed. Please try again.");
    } finally {
      setActionLoading(false);
      closeModal();
    }
  };

  if (loading) {
    return (
      <div className="flex h-[60vh] flex-col items-center justify-center gap-3 text-gray-400">
        <CircleNotch size={28} className="animate-spin text-emerald-600" />
      </div>
    );
  }

  return (
    <div className="max-w-[1300px] mx-auto pb-16 px-6">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8 py-6 border-b border-gray-200">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-gray-100 border border-gray-200 mb-4 shadow-sm">
            <Trash size={14} weight="bold" className="text-gray-500" />
            <span className="text-xs font-semibold text-gray-700 uppercase tracking-wider">
              System Trash
            </span>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 tracking-tight mb-2">
            Trash
          </h1>
          <p className="text-sm text-gray-500">
            Items in the trash are automatically deleted forever after 30 days.
          </p>
        </div>

        {trashItems.length > 0 && (
          <button
            onClick={promptEmptyTrash}
            className="flex items-center justify-center gap-2 px-4 py-2 bg-white border border-red-200 text-red-600 text-sm font-medium rounded-lg shadow-sm hover:bg-red-50 hover:text-red-700 hover:border-red-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2 transition-all active:scale-[0.98] shrink-0"
          >
            <Trash size={16} weight="bold" /> Empty Trash
          </button>
        )}
      </div>

      {/* Content Section */}
      {trashItems.length === 0 ? (
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-300">
          <div className="flex flex-col items-center justify-center py-24 px-6 text-center bg-gray-50/50 border-2 border-dashed border-gray-200 rounded-2xl">
            <div className="flex items-center justify-center w-14 h-14 mb-5 bg-white border border-gray-200 rounded-xl shadow-sm ring-4 ring-gray-50">
              <CheckCircle
                size={24}
                weight="fill"
                className="text-emerald-500"
              />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-1">
              Your trash is empty
            </h3>
            <p className="text-sm text-gray-500 max-w-sm">
              Nothing to see here. All clean and tidy.
            </p>
          </div>
        </div>
      ) : (
        <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm">
          {/* Table Header */}
          <div className="grid grid-cols-12 gap-4 px-6 py-3 bg-gray-50 border-b border-gray-200 text-xs font-semibold text-gray-500 uppercase tracking-wider">
            <div className="col-span-12 sm:col-span-6">Resource</div>
            <div className="hidden sm:block col-span-2">Deleted</div>
            <div className="hidden sm:block col-span-2">Time Remaining</div>
            <div className="hidden sm:block col-span-2 text-right">Actions</div>
          </div>

          {/* Table Body */}
          <div className="flex flex-col divide-y divide-gray-100">
            {trashItems.map((item) => {
              const expiry = getExpiryInfo(item.deleted_at);
              return (
                <div
                  key={item._id}
                  className="group grid grid-cols-12 gap-4 px-6 py-4 items-center hover:bg-gray-50 transition-colors duration-200"
                >
                  {/* Resource Column */}
                  <div className="col-span-12 sm:col-span-6 pr-4 min-w-0">
                    <span className="block font-medium text-sm text-gray-900 truncate mb-0.5 line-through opacity-70">
                      {item.title || item.url}
                    </span>
                    <p className="text-xs text-gray-500 truncate">
                      {getDomain(item.url)}
                    </p>
                  </div>

                  {/* Deleted Date Column */}
                  <div className="hidden sm:flex col-span-2 items-center text-sm text-gray-500">
                    {new Date(item.deleted_at).toLocaleDateString()}
                  </div>

                  {/* Time Remaining Column */}
                  <div className="hidden sm:flex col-span-2 items-center">
                    <span
                      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium ${
                        expiry.isUrgent
                          ? "bg-red-50 text-red-700 border border-red-100"
                          : "bg-gray-100 text-gray-600"
                      }`}
                    >
                      <Clock size={14} weight="bold" /> {expiry.text}
                    </span>
                  </div>

                  {/* Actions Column */}
                  <div className="hidden sm:flex col-span-2 items-center justify-end gap-2 opacity-0 group-hover:opacity-100 focus-within:opacity-100 transition-opacity">
                    <button
                      onClick={() => handleRestore(item._id)}
                      className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-gray-600 hover:text-emerald-700 hover:bg-emerald-50 rounded-lg transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500"
                      title="Restore to Archive"
                    >
                      <ArrowCounterClockwise size={14} weight="bold" /> Restore
                    </button>

                    <button
                      onClick={() => promptDeleteSingle(item._id)}
                      className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500"
                      title="Delete Permanently"
                    >
                      <Trash size={16} weight="bold" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Standardized Modal */}
      {modal.isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
          <div
            className="absolute inset-0 bg-gray-900/40 backdrop-blur-sm animate-in fade-in duration-200"
            onClick={closeModal}
          ></div>
          <div className="relative w-full max-w-sm bg-white rounded-2xl p-6 shadow-xl animate-in zoom-in-95 fade-in duration-200">
            <div className="flex flex-col items-center text-center">
              <div
                className={`flex items-center justify-center w-12 h-12 rounded-full mb-4 shadow-sm ${modal.iconStyle}`}
              >
                <Warning size={24} weight="fill" />
              </div>
              <h2 className="text-lg font-semibold text-gray-900 mb-2">
                {modal.title}
              </h2>
              <p className="text-sm text-gray-500 mb-6">{modal.message}</p>
              <div className="flex w-full gap-3">
                <button
                  onClick={closeModal}
                  className="flex-1 px-4 py-2 bg-white border border-gray-200 text-gray-700 text-sm font-medium rounded-lg shadow-sm hover:bg-gray-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-200 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={confirmModalAction}
                  disabled={actionLoading}
                  className={`flex-1 flex items-center justify-center px-4 py-2 text-sm font-medium rounded-lg transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-60 disabled:cursor-not-allowed ${modal.confirmStyle}`}
                >
                  {actionLoading ? (
                    <CircleNotch size={16} className="animate-spin" />
                  ) : (
                    modal.confirmText
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
