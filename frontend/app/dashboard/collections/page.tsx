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
  CircleNotch,
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
          <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-50 border border-emerald-100 mb-4 shadow-sm">
            <span className="text-xs font-semibold text-emerald-700 uppercase tracking-wider">
              Workspaces
            </span>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 tracking-tight mb-2">
            My Collections
          </h1>
          <p className="text-sm text-gray-500">
            Organize your intellectual assets into specialized, AI-enhanced
            workspaces for focused research.
          </p>
        </div>

        <button
          onClick={(e) => triggerModal(e, "create")}
          className="group flex shrink-0 items-center justify-center gap-2 px-5 py-2.5 bg-emerald-600 text-white text-sm font-medium rounded-lg shadow-[0px_1px_2px_0px_rgba(16,185,129,0.4),_inset_0px_1px_0px_0px_rgba(255,255,255,0.2)] ring-1 ring-inset ring-emerald-700 hover:bg-emerald-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-600 focus-visible:ring-offset-2 transition-all duration-200 active:scale-[0.98]"
        >
          <Plus
            size={16}
            weight="bold"
            className="transition-transform group-hover:rotate-90 duration-300"
          />
          New Collection
        </button>
      </div>

      {error && (
        <div className="mb-8 p-4 bg-red-50 border border-red-100 text-red-700 rounded-lg text-sm font-medium">
          {error}
        </div>
      )}

      {/* Grid Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Dynamic Collections */}
        {collections.map((collection) => (
          <div
            key={collection._id}
            onClick={() =>
              router.push(`/dashboard/collections/${collection._id}`)
            }
            className="group relative bg-white border border-gray-200 rounded-2xl p-6 sm:p-8 shadow-sm hover:shadow-md hover:border-emerald-300 transition-all duration-300 cursor-pointer flex flex-col min-h-[220px]"
          >
            {/* Kebab Menu */}
            <div className="absolute top-4 right-4 z-20 kebab-menu-container">
              <button
                onClick={(e) => openMenu(e, collection._id)}
                className="p-2 text-gray-400 group-hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-300"
              >
                <DotsThree size={24} weight="bold" />
              </button>

              {openMenuId === collection._id && (
                <div
                  onClick={(e) => e.stopPropagation()}
                  className="absolute right-0 top-full mt-1 w-40 bg-white border border-gray-200 shadow-lg rounded-xl overflow-hidden py-1.5 animate-in fade-in slide-in-from-top-2 duration-200 z-50"
                >
                  <button
                    onClick={(e) =>
                      triggerModal(e, "rename", collection._id, collection.name)
                    }
                    className="w-full flex items-center gap-2.5 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 hover:text-gray-900 transition-colors"
                  >
                    <PencilSimple size={16} /> Rename
                  </button>
                  <button
                    onClick={(e) => triggerModal(e, "delete", collection._id)}
                    className="w-full flex items-center gap-2.5 px-4 py-2 text-sm font-medium text-red-600 hover:bg-red-50 transition-colors"
                  >
                    <Trash size={16} /> Delete
                  </button>
                </div>
              )}
            </div>

            {/* Content */}
            <div className="relative z-10 flex flex-col h-full pointer-events-none">
              <div className="mb-6">
                <div className="inline-flex p-3 bg-gray-50 border border-gray-100 rounded-xl group-hover:bg-emerald-50 group-hover:border-emerald-100 transition-colors duration-300">
                  <FolderNotchIcon
                    size={28}
                    weight="fill"
                    className="text-gray-400 group-hover:text-emerald-500 transition-colors duration-300"
                  />
                </div>
              </div>

              <h3 className="text-lg font-semibold text-gray-900 mb-4 group-hover:text-emerald-700 transition-colors line-clamp-2">
                {collection.name}
              </h3>

              <div className="mt-auto pt-5 border-t border-gray-100 flex items-center justify-between text-gray-500 group-hover:border-emerald-100 transition-colors">
                <div className="flex items-center gap-3 text-xs font-medium uppercase tracking-wider">
                  <span className="flex items-center gap-1.5">
                    <BookmarkSimple
                      size={14}
                      weight="bold"
                      className="text-gray-400 group-hover:text-emerald-400"
                    />
                    {collection.count || 0}
                  </span>
                  <span className="w-1 h-1 rounded-full bg-gray-300"></span>
                  <span className="flex items-center gap-1.5 text-gray-400">
                    <ClockClockwise size={14} weight="bold" />
                    {getRelativeTime(collection.updated_at)}
                  </span>
                </div>
                <ArrowRight
                  size={16}
                  weight="bold"
                  className="text-gray-300 group-hover:text-emerald-600 transition-all opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0"
                />
              </div>
            </div>
          </div>
        ))}

        {/* Create Workspace CTA Card */}
        <div
          onClick={(e) => triggerModal(e, "create")}
          className="group flex flex-col items-center justify-center text-center p-8 border-2 border-dashed border-gray-200 rounded-2xl min-h-[220px] bg-gray-50/50 hover:bg-emerald-50/30 hover:border-emerald-300 transition-all duration-300 cursor-pointer"
        >
          <div className="flex items-center justify-center w-14 h-14 mb-4 bg-white border border-gray-200 rounded-xl shadow-sm ring-4 ring-gray-50 group-hover:ring-emerald-50 transition-all duration-300">
            <Plus
              size={24}
              weight="bold"
              className="text-gray-400 group-hover:text-emerald-600 transition-colors"
            />
          </div>
          <h3 className="text-base font-semibold text-gray-900 group-hover:text-emerald-700 transition-colors mb-1">
            New Workspace
          </h3>
          <p className="text-sm text-gray-500 max-w-[200px]">
            Create a specialized folder to capture and synthesize knowledge.
          </p>
        </div>
      </div>

      {/* Standardized Modal */}
      {modalState.type && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
          <div
            className="absolute inset-0 bg-gray-900/40 backdrop-blur-sm animate-in fade-in duration-200"
            onClick={closeModal}
          ></div>
          <div
            className="relative w-full max-w-sm bg-white rounded-2xl shadow-xl animate-in zoom-in-95 fade-in duration-200 overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {modalState.type === "delete" ? (
              <div className="p-6 text-center">
                <div className="flex items-center justify-center w-12 h-12 mx-auto rounded-full bg-red-50 text-red-600 border border-red-100 mb-4 shadow-sm">
                  <Warning size={24} weight="fill" />
                </div>
                <h2 className="text-lg font-semibold text-gray-900 mb-2">
                  Delete Workspace?
                </h2>
                <p className="text-sm text-gray-500 mb-6">
                  Are you sure you want to permanently delete this collection?
                  Bookmarks inside it will be moved to the root archive.
                </p>
                <div className="flex w-full gap-3">
                  <button
                    onClick={closeModal}
                    className="flex-1 px-4 py-2 bg-white border border-gray-200 text-gray-700 text-sm font-medium rounded-lg shadow-sm hover:bg-gray-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-200 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleAction}
                    disabled={isProcessing}
                    className="flex-1 flex items-center justify-center px-4 py-2 bg-red-600 hover:bg-red-700 text-white text-sm font-medium rounded-lg shadow-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2 transition-all disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    {isProcessing ? (
                      <CircleNotch size={16} className="animate-spin" />
                    ) : (
                      "Delete"
                    )}
                  </button>
                </div>
              </div>
            ) : (
              <>
                <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
                  <h2 className="text-base font-semibold text-gray-900">
                    {modalState.type === "create"
                      ? "Create New Collection"
                      : "Rename Collection"}
                  </h2>
                  <button
                    onClick={closeModal}
                    className="p-1.5 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-200"
                  >
                    <X size={18} weight="bold" />
                  </button>
                </div>
                <form onSubmit={handleAction} className="p-6">
                  <div className="mb-6 flex flex-col gap-1.5">
                    <label className="text-sm font-medium text-gray-700">
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
                      className="w-full px-4 py-2.5 bg-white border border-gray-300 rounded-lg text-sm text-gray-900 placeholder-gray-400 shadow-sm focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-shadow"
                      required
                    />
                  </div>

                  <div className="flex w-full gap-3">
                    <button
                      type="button"
                      onClick={closeModal}
                      className="flex-1 px-4 py-2 bg-white border border-gray-200 text-gray-700 text-sm font-medium rounded-lg shadow-sm hover:bg-gray-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-200 transition-colors"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={isProcessing}
                      className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-emerald-600 text-white text-sm font-medium rounded-lg shadow-[0px_1px_2px_0px_rgba(16,185,129,0.4),_inset_0px_1px_0px_0px_rgba(255,255,255,0.2)] ring-1 ring-inset ring-emerald-700 hover:bg-emerald-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-600 focus-visible:ring-offset-2 transition-all active:scale-[0.98] disabled:opacity-60 disabled:cursor-not-allowed disabled:active:scale-100"
                    >
                      {isProcessing ? (
                        <CircleNotch size={16} className="animate-spin" />
                      ) : modalState.type === "create" ? (
                        "Create"
                      ) : (
                        "Rename"
                      )}
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
