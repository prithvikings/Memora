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
        "bg-red-500 hover:bg-red-600 focus:ring-red-500/20 text-white",
      iconStyle: "bg-red-100 text-red-600",
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
        "bg-red-500 hover:bg-red-600 focus:ring-red-500/20 text-white",
      iconStyle: "bg-red-100 text-red-600",
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
        <CircleNotch size={28} className="animate-spin text-gray-400" />
      </div>
    );
  }

  return (
    <div className="max-w-[1300px] mx-auto pb-16 font-poppins px-6">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8 py-6 border-b border-gray-100">
        <div>
          <div className="bg-gray-100 text-gray-600 w-fit px-3 py-1 rounded-full mb-3 flex items-center justify-center border border-gray-200">
            <p className="uppercase tracking-widest font-bold text-[10px] flex items-center gap-1.5">
              <Trash size={12} weight="bold" />
              System Trash
            </p>
          </div>
          <h1 className="text-[36px] font-bold text-gray-950 tracking-tighter mb-2">
            Trash
          </h1>
          <p className="text-gray-500 text-[16px] font-medium max-w-xl leading-relaxed">
            Items in the trash are automatically deleted forever after 30 days.
          </p>
        </div>

        {trashItems.length > 0 && (
          <button
            onClick={promptEmptyTrash}
            className="flex items-center gap-2 px-5 py-2.5 bg-white border border-red-200 text-red-600 hover:bg-red-50 rounded-xl text-[14px] font-semibold transition-all shadow-sm shrink-0"
          >
            <Trash size={18} weight="bold" /> Empty Trash
          </button>
        )}
      </div>

      {trashItems.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-32 px-4 bg-white border border-gray-100/70 rounded-[28px] text-center shadow-[0_4px_20px_-4px_rgba(0,0,0,0.02)]">
          <div className="relative mb-6">
            <div className="absolute inset-0 bg-emerald-100 rounded-full blur-xl opacity-50"></div>
            <div className="relative p-6 bg-emerald-50 rounded-full border border-emerald-100">
              <CheckCircle
                size={48}
                weight="fill"
                className="text-emerald-500"
              />
            </div>
          </div>
          <h3 className="text-2xl font-bold text-gray-950 mb-2 tracking-tight">
            Your trash is empty
          </h3>
          <p className="text-[15px] text-gray-500 max-w-md font-medium">
            Nothing to see here. All clean and tidy.
          </p>
        </div>
      ) : (
        <div className="bg-white border border-gray-100/70 rounded-[28px] overflow-hidden shadow-[0_4px_20px_-4px_rgba(0,0,0,0.02)]">
          <div className="grid grid-cols-12 gap-4 p-4 bg-gray-50/50 border-b border-gray-100 text-[11px] font-bold text-gray-400 uppercase tracking-widest">
            <div className="col-span-12 sm:col-span-6 pl-4">Resource</div>
            <div className="hidden sm:block col-span-2">Deleted</div>
            <div className="hidden sm:block col-span-2">Time Remaining</div>
            <div className="hidden sm:block col-span-2 text-right pr-4">
              Actions
            </div>
          </div>

          <div className="flex flex-col divide-y divide-gray-100/70">
            {trashItems.map((item) => {
              const expiry = getExpiryInfo(item.deleted_at);
              return (
                <div
                  key={item._id}
                  className="group grid grid-cols-12 gap-4 p-4 items-center hover:bg-gray-50/80 transition-colors duration-200"
                >
                  <div className="col-span-12 sm:col-span-6 pl-4 pr-4">
                    <span className="block font-semibold text-[15px] text-gray-900 truncate mb-1 line-through opacity-70">
                      {item.title || item.url}
                    </span>
                    <p className="text-[12px] text-gray-400 font-medium flex items-center gap-1">
                      {getDomain(item.url)}
                    </p>
                  </div>

                  <div className="hidden sm:flex col-span-2 items-center text-[13px] font-medium text-gray-400">
                    {new Date(item.deleted_at).toLocaleDateString()}
                  </div>

                  <div className="hidden sm:flex col-span-2 items-center">
                    <span
                      className={`flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[11px] font-bold uppercase tracking-wider ${
                        expiry.isUrgent
                          ? "bg-red-50 text-red-600 border border-red-100"
                          : "bg-gray-100 text-gray-500"
                      }`}
                    >
                      <Clock size={14} weight="bold" /> {expiry.text}
                    </span>
                  </div>

                  <div className="hidden sm:flex col-span-2 items-center justify-end gap-2 pr-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button
                      onClick={() => handleRestore(item._id)}
                      className="flex items-center gap-1.5 px-3 py-2 text-[12px] font-bold text-gray-500 hover:text-emerald-700 hover:bg-emerald-50 rounded-xl transition-all"
                      title="Restore to Archive"
                    >
                      <ArrowCounterClockwise size={16} weight="bold" /> Restore
                    </button>

                    <button
                      onClick={() => promptDeleteSingle(item._id)}
                      className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-xl transition-all"
                      title="Delete Permanently"
                    >
                      <Trash size={18} weight="bold" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {modal.isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-gray-900/30 backdrop-blur-sm animate-in fade-in duration-200"
            onClick={closeModal}
          ></div>
          <div className="relative bg-white w-full max-w-sm rounded-[24px] p-6 shadow-2xl animate-in zoom-in-95 fade-in duration-200 font-poppins">
            <div className="flex flex-col items-center text-center">
              <div className={`p-4 rounded-full mb-4 ${modal.iconStyle}`}>
                <Warning size={32} weight="fill" />
              </div>
              <h2 className="text-xl font-bold text-gray-900 mb-2 tracking-tight">
                {modal.title}
              </h2>
              <p className="text-[14px] text-gray-500 leading-relaxed mb-8">
                {modal.message}
              </p>
              <div className="flex w-full gap-3">
                <button
                  onClick={closeModal}
                  className="flex-1 px-4 py-2.5 rounded-xl text-[14px] font-semibold text-gray-600 bg-gray-50 hover:bg-gray-100 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={confirmModalAction}
                  disabled={actionLoading}
                  className={`flex-1 flex items-center justify-center px-4 py-2.5 rounded-xl text-[14px] font-semibold transition-all focus:outline-none disabled:opacity-70 ${modal.confirmStyle}`}
                >
                  {actionLoading ? (
                    <CircleNotch size={18} className="animate-spin" />
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
