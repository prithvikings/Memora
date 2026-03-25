"use client";

import React, { useState, useEffect } from "react";
import { api } from "@/lib/api";
import {
  FolderNotchIcon,
  DotsThree,
  BookmarkSimple,
  Plus,
  ArrowRight,
  ClockClockwise,
  Trash,
  PencilSimple,
  Warning,
  X,
} from "@phosphor-icons/react";
import { useRouter } from "next/navigation";

interface Collection {
  _id: string;
  name: string;
  count: number;
  updated_at: string;
}

const getRelativeTime = (dateString: string) => {
  const date = new Date(dateString);
  const now = new Date();
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

  if (diffInSeconds < 60) return "Just now";
  const diffInMinutes = Math.floor(diffInSeconds / 60);
  if (diffInMinutes < 60) return `${diffInMinutes} mins ago`;
  const diffInHours = Math.floor(diffInMinutes / 60);
  if (diffInHours < 24) return `${diffInHours} hrs ago`;
  const diffInDays = Math.floor(diffInHours / 24);
  if (diffInDays < 30) return `${diffInDays} days ago`;
  const diffInMonths = Math.floor(diffInDays / 30);
  return `${diffInMonths} months ago`;
};

type ModalType = "create" | "rename" | "delete" | null;

export default function CollectionsPage() {
  const [collections, setCollections] = useState<Collection[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const router = useRouter();

  // Unified Modal State
  const [modalState, setModalState] = useState<{
    type: ModalType;
    collectionId: string | null;
    inputValue: string;
  }>({ type: null, collectionId: null, inputValue: "" });

  const [isProcessing, setIsProcessing] = useState(false);
  const [openMenuId, setOpenMenuId] = useState<string | null>(null);

  const fetchCollections = async () => {
    try {
      const res = await api.get("/collections");
      setCollections(res.data.data);
    } catch (err: any) {
      setError("Failed to load collections.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchCollections();
  }, []);

  // CRITICAL FIX: Use mousedown and check for the container class
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as Element;
      if (target && target.closest(".kebab-menu-container")) return;
      setOpenMenuId(null);
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const closeModal = () => {
    setModalState({ type: null, collectionId: null, inputValue: "" });
  };

  const handleAction = async (e: React.FormEvent | React.MouseEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    try {
      if (modalState.type === "create") {
        if (!modalState.inputValue.trim()) return;
        await api.post("/collections", { name: modalState.inputValue });
        await fetchCollections();
      } else if (modalState.type === "rename" && modalState.collectionId) {
        if (!modalState.inputValue.trim()) return;
        await api.patch(`/collections/${modalState.collectionId}`, {
          name: modalState.inputValue,
        });

        setCollections((prev) =>
          prev.map((c) =>
            c._id === modalState.collectionId
              ? { ...c, name: modalState.inputValue }
              : c,
          ),
        );
      } else if (modalState.type === "delete" && modalState.collectionId) {
        await api.delete(`/collections/${modalState.collectionId}`);
        setCollections((prev) =>
          prev.filter((c) => c._id !== modalState.collectionId),
        );
      }
      closeModal();
    } catch (err: any) {
      alert(
        err.response?.data?.message ||
          `Failed to ${modalState.type} collection`,
      );
    } finally {
      setIsProcessing(false);
    }
  };

  const openMenu = (e: React.MouseEvent, id: string) => {
    e.preventDefault();
    e.stopPropagation();
    setOpenMenuId(openMenuId === id ? null : id);
  };

  const triggerModal = (
    e: React.MouseEvent,
    type: ModalType,
    id: string | null = null,
    initialName: string = "",
  ) => {
    e.preventDefault();
    e.stopPropagation();
    setOpenMenuId(null);
    setModalState({ type, collectionId: id, inputValue: initialName });
  };

  if (isLoading) {
    return (
      <div className="max-w-[1300px] mx-auto pb-16 pt-10 px-6 animate-pulse bg-gray-50/50 h-screen rounded-xl"></div>
    );
  }

  return (
    <div className="max-w-[1300px] mx-auto pb-16 font-poppins px-6 relative">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 py-6 border-b border-gray-100">
        <div>
          <div className="bg-emerald-50 text-emerald-700 w-fit px-3 py-1 rounded-full mb-3 flex items-center justify-center border border-emerald-100">
            <p className="uppercase tracking-widest font-bold text-[10px]">
              Workspaces
            </p>
          </div>
          <h1 className="text-[36px] font-bold text-gray-950 tracking-tighter mb-2">
            My Collections
          </h1>
          <p className="text-gray-500 text-[16px] font-medium max-w-xl leading-relaxed">
            Organize your intellectual assets into specialized, AI-enhanced
            workspaces for focused research.
          </p>
        </div>

        <button
          onClick={(e) => triggerModal(e, "create")}
          className="flex items-center gap-2.5 bg-gray-950 hover:bg-gray-800 text-white px-6 py-3 rounded-xl text-[14px] font-semibold transition-all shadow-lg hover:shadow-gray-950/20 hover:-translate-y-0.5 active:scale-95 shrink-0"
        >
          <Plus size={18} weight="bold" />
          New Collection
        </button>
      </div>

      {error && (
        <div className="mb-6 p-4 bg-red-50 text-red-600 rounded-xl text-sm font-medium">
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {collections.map((collection) => (
          <div
            key={collection._id}
            onClick={() =>
              router.push(`/dashboard/collections/${collection._id}`)
            }
            className="group relative bg-white border border-gray-100/70 rounded-[28px] p-8 shadow-[0_2px_12px_rgba(0,0,0,0.02)] hover:shadow-[0_20px_60px_-10px_rgba(0,0,0,0.1)] hover:-translate-y-1.5 transition-all duration-300 cursor-pointer flex flex-col overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-emerald-50/50 to-white opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-0"></div>

            {/* CRITICAL FIX: Added kebab-menu-container class here */}
            <div className="absolute top-6 right-6 z-20 kebab-menu-container">
              <button
                onClick={(e) => openMenu(e, collection._id)}
                className="p-2 text-gray-300 group-hover:text-gray-950 hover:bg-gray-100/80 rounded-full transition-all duration-300 opacity-100 lg:opacity-0 group-hover:opacity-100"
              >
                <DotsThree size={24} weight="bold" />
              </button>

              {openMenuId === collection._id && (
                <div
                  onClick={(e) => e.stopPropagation()}
                  className="absolute right-0 mt-2 w-40 bg-white border border-gray-100 shadow-xl rounded-xl overflow-hidden py-1 animate-in fade-in zoom-in-95 duration-200 origin-top-right"
                >
                  <button
                    onClick={(e) =>
                      triggerModal(e, "rename", collection._id, collection.name)
                    }
                    className="w-full flex items-center gap-2.5 px-4 py-2.5 text-sm font-medium text-gray-600 hover:bg-gray-50 hover:text-gray-900 transition-colors"
                  >
                    <PencilSimple size={16} /> Rename
                  </button>
                  <button
                    onClick={(e) => triggerModal(e, "delete", collection._id)}
                    className="w-full flex items-center gap-2.5 px-4 py-2.5 text-sm font-medium text-red-600 hover:bg-red-50 hover:text-red-700 transition-colors"
                  >
                    <Trash size={16} /> Delete
                  </button>
                </div>
              )}
            </div>

            <div className="relative z-10 flex flex-col h-full pointer-events-none">
              <div className="flex items-center gap-4 mb-10">
                <div className="relative">
                  <div className="absolute -bottom-1 -right-1 w-full h-full rounded-2xl bg-gray-100 group-hover:bg-emerald-200 transition-colors"></div>
                  <div className="relative p-4 bg-gray-50 rounded-2xl group-hover:bg-emerald-50 transition-colors duration-300">
                    <FolderNotchIcon
                      size={32}
                      weight="fill"
                      className="text-gray-300 group-hover:text-emerald-500 transition-colors duration-300"
                    />
                  </div>
                </div>
              </div>

              <h3 className="font-semibold text-[21px] text-gray-950 mb-4 group-hover:text-emerald-800 transition-colors leading-tight">
                {collection.name}
              </h3>

              <div className="mt-auto pt-6 border-t border-gray-100/70 flex items-center justify-between text-gray-400 group-hover:border-emerald-100 transition-colors">
                <div className="flex items-center gap-4">
                  <span className="flex items-center gap-1.5 text-[12px] font-bold uppercase tracking-wider">
                    <BookmarkSimple
                      size={15}
                      weight="bold"
                      className="text-gray-300"
                    />
                    {collection.count || 0} Items
                  </span>
                  <span className="w-1 h-1 rounded-full bg-gray-200"></span>
                  <span className="flex items-center gap-1.5 text-[12px] font-bold uppercase tracking-wider">
                    <ClockClockwise
                      size={15}
                      weight="bold"
                      className="text-gray-300"
                    />
                    {getRelativeTime(collection.updated_at)}
                  </span>
                </div>
                <ArrowRight
                  size={18}
                  weight="bold"
                  className="text-gray-300 group-hover:text-emerald-600 transition-all opacity-0 group-hover:opacity-100 translate-x-3 group-hover:translate-x-0"
                />
              </div>
            </div>
          </div>
        ))}

        <div
          onClick={(e) => triggerModal(e, "create")}
          className="group border-[2px] border-dashed border-gray-200 hover:border-emerald-300 rounded-[28px] p-8 flex flex-col items-center justify-center text-center min-h-[260px] hover:bg-emerald-50/50 transition-all duration-300 cursor-pointer shadow-[0_2px_12px_rgba(0,0,0,0.01)] hover:shadow-[0_20px_50px_-10px_rgba(0,0,0,0.04)]"
        >
          <div className="p-4 bg-gray-50 rounded-full mb-4 group-hover:bg-emerald-100 transition-colors duration-300 shadow-inner">
            <Plus
              size={28}
              weight="bold"
              className="text-gray-400 group-hover:text-emerald-600 transition-colors duration-300"
            />
          </div>
          <h3 className="font-semibold text-[16px] text-gray-700 group-hover:text-emerald-800 transition-colors mb-1">
            New Workspace
          </h3>
          <p className="text-[13px] text-gray-400 font-medium px-4 leading-relaxed group-hover:text-emerald-600/80">
            Create a specialized folder to capture and synthesize knowledge.
          </p>
        </div>
      </div>

      {modalState.type && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-950/20 backdrop-blur-sm p-4 animate-in fade-in duration-200">
          <div
            className="bg-white rounded-[24px] w-full max-w-md shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            {modalState.type === "delete" ? (
              <div className="p-6 text-center">
                <div className="p-4 rounded-full bg-red-100 text-red-600 w-fit mx-auto mb-4">
                  <Warning size={32} weight="fill" />
                </div>
                <h2 className="text-xl font-bold text-gray-900 mb-2 tracking-tight">
                  Delete Workspace?
                </h2>
                <p className="text-[14px] text-gray-500 leading-relaxed mb-8">
                  Are you sure you want to permanently delete this collection?
                  Bookmarks inside it will be moved to the root archive.
                </p>
                <div className="flex w-full gap-3">
                  <button
                    onClick={closeModal}
                    className="flex-1 px-4 py-2.5 rounded-xl text-[14px] font-semibold text-gray-600 bg-gray-50 hover:bg-gray-100 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleAction}
                    disabled={isProcessing}
                    className="flex-1 px-4 py-2.5 rounded-xl text-[14px] font-semibold text-white bg-red-600 hover:bg-red-700 transition-all disabled:opacity-70"
                  >
                    {isProcessing ? "Deleting..." : "Delete"}
                  </button>
                </div>
              </div>
            ) : (
              <>
                <div className="flex items-center justify-between p-6 border-b border-gray-100">
                  <h2 className="text-lg font-bold text-gray-950">
                    {modalState.type === "create"
                      ? "Create New Collection"
                      : "Rename Collection"}
                  </h2>
                  <button
                    onClick={closeModal}
                    className="p-2 text-gray-400 hover:bg-gray-100 rounded-full transition-colors"
                  >
                    <X size={20} weight="bold" />
                  </button>
                </div>
                <form onSubmit={handleAction} className="p-6">
                  <div className="flex flex-col gap-2 mb-8">
                    <label className="text-[13px] font-bold text-gray-700">
                      Collection Name
                    </label>
                    <input
                      type="text"
                      autoFocus
                      placeholder="e.g. AI Research"
                      value={modalState.inputValue}
                      onChange={(e) =>
                        setModalState({
                          ...modalState,
                          inputValue: e.target.value,
                        })
                      }
                      className="w-full px-4 py-3 bg-gray-50/50 border border-gray-200 focus:border-emerald-500 focus:bg-white focus:ring-4 focus:ring-emerald-500/10 rounded-xl text-[14px] font-medium text-gray-900 outline-none transition-all"
                      required
                    />
                  </div>
                  <div className="flex items-center justify-end gap-3">
                    <button
                      type="button"
                      onClick={closeModal}
                      className="px-5 py-2.5 bg-white border border-gray-200 hover:bg-gray-50 text-gray-700 text-[14px] font-semibold rounded-xl transition-colors"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={isProcessing}
                      className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white text-[14px] font-semibold rounded-xl transition-all shadow-md shadow-emerald-600/20 active:scale-95 disabled:opacity-70"
                    >
                      {isProcessing
                        ? "Saving..."
                        : modalState.type === "create"
                          ? "Create Workspace"
                          : "Rename Workspace"}
                    </button>
                  </div>
                </form>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
