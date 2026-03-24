// src/app/dashboard/page.tsx
"use client";

import { useEffect, useState } from "react";
import { api } from "@/lib/api";
import {
  Trash,
  FolderMinus,
  Link as LinkIcon,
  CircleNotch,
  BookmarkSimple,
  FolderOpen,
  DotsThree,
  Warning,
  CaretUpDown,
  Check,
  ArrowUpRight,
  LinkSimpleIcon, // <-- Added ArrowUpRight for an alternative, modern link feel
} from "@phosphor-icons/react";

interface Bookmark {
  _id: string;
  title?: string;
  url: string;
  summary?: {
    short: string;
  };
  tags?: string[];
  status: "processing" | "completed" | "failed";
  collection_id?: string | null;
}

interface Collection {
  _id: string;
  name: string;
}

// Defining the state structure for our custom modal
type ModalAction = "delete" | "remove_folder" | null;
interface ModalState {
  isOpen: boolean;
  action: ModalAction;
  bookmarkId: string | null;
  title: string;
  message: string;
  confirmText: string;
  confirmStyle: string;
  iconStyle: string;
}

export default function DashboardHome() {
  const [bookmarks, setBookmarks] = useState<Bookmark[]>([]);
  const [collections, setCollections] = useState<Collection[]>([]);
  const [loading, setLoading] = useState(true);

  // Track open menus
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const [activeFolderMenu, setActiveFolderMenu] = useState<string | null>(null);

  // Modal State
  const [modal, setModal] = useState<ModalState>({
    isOpen: false,
    action: null,
    bookmarkId: null,
    title: "",
    message: "",
    confirmText: "",
    confirmStyle: "",
    iconStyle: "",
  });

  useEffect(() => {
    Promise.all([api.get("/bookmarks"), api.get("/collections")])
      .then(([bookmarksRes, collectionsRes]) => {
        setBookmarks(bookmarksRes.data.data);
        setCollections(collectionsRes.data.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    const isProcessing = bookmarks.some((b) => b.status === "processing");
    if (!isProcessing) return;

    const interval = setInterval(async () => {
      try {
        const res = await api.get("/bookmarks");
        setBookmarks(res.data.data);
      } catch (err) {
        console.error("Failed to poll for updates", err);
      }
    }, 3000);

    return () => clearInterval(interval);
  }, [bookmarks]);

  // Unified click-outside listener
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as Element;
      if (target && !document.contains(target)) return;

      // Close kebab menu if clicked outside
      if (!target.closest(".kebab-menu-container")) {
        setActiveMenu(null);
      }

      // Close folder menu if clicked outside
      if (!target.closest(".folder-menu-container")) {
        setActiveFolderMenu(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleMoveBookmark = async (
    bookmarkId: string,
    newCollectionId: string,
  ) => {
    try {
      const targetId = newCollectionId === "" ? null : newCollectionId;
      await api.patch(`/bookmarks/${bookmarkId}`, { collection_id: targetId });
      setBookmarks(
        bookmarks.map((b) =>
          b._id === bookmarkId ? { ...b, collection_id: targetId } : b,
        ),
      );
      // Close the custom dropdown after selection
      setActiveFolderMenu(null);
    } catch (err) {
      alert("Failed to move bookmark");
      console.error(err);
    }
  };

  const promptRemoveFromFolder = (bookmarkId: string) => {
    setModal({
      isOpen: true,
      action: "remove_folder",
      bookmarkId,
      title: "Remove from Folder",
      message:
        "Are you sure you want to remove this bookmark from its current folder? It will remain in your root archive.",
      confirmText: "Remove",
      confirmStyle:
        "bg-amber-500 hover:bg-amber-600 focus:ring-amber-500/20 text-white",
      iconStyle: "bg-amber-100 text-amber-600",
    });
    setActiveMenu(null);
  };

  const promptDelete = (bookmarkId: string) => {
    setModal({
      isOpen: true,
      action: "delete",
      bookmarkId,
      title: "Delete Bookmark",
      message:
        "Are you sure you want to permanently delete this bookmark? This action cannot be undone.",
      confirmText: "Delete",
      confirmStyle:
        "bg-red-500 hover:bg-red-600 focus:ring-red-500/20 text-white",
      iconStyle: "bg-red-100 text-red-600",
    });
    setActiveMenu(null);
  };

  const closeModal = () => setModal((prev) => ({ ...prev, isOpen: false }));

  const confirmModalAction = async () => {
    if (!modal.bookmarkId || !modal.action) return;

    if (modal.action === "remove_folder") {
      await handleMoveBookmark(modal.bookmarkId, "");
    } else if (modal.action === "delete") {
      try {
        await api.delete(`/bookmarks/${modal.bookmarkId}`);
        setBookmarks(bookmarks.filter((b) => b._id !== modal.bookmarkId));
      } catch (err) {
        alert("Failed to delete");
      }
    }

    closeModal();
  };

  if (loading)
    return (
      <div className="flex h-full flex-col items-center justify-center gap-3 text-gray-400">
        <CircleNotch size={28} className="animate-spin text-[#00a870]" />
        <p className="text-sm font-medium animate-pulse">
          Loading your library...
        </p>
      </div>
    );

  return (
    <>
      <div className="max-w-5xl mx-auto pb-16">
        <div className="mb-10">
          <div className="bg-emerald-100 w-fit px-3 py-1 rounded-2xl mb-2 shadow-xs flex items-center justify-center">
            <p className="uppercase tracking-wide font-medium text-[11px] text-gray-400 font-poppins">
              Live processing
            </p>
          </div>
          <h1 className="text-[32px] font-semibold text-gray-900 tracking-tight mb-2">
            Your Digital Archive
          </h1>
          <p className="text-gray-500 text-[15px] font-medium">
            A curated collection of your intellectual assets, enhanced by AI.
          </p>
        </div>

        <div className="mb-4">
          <span className="text-[11px] font-semibold text-emerald-700 uppercase tracking-tight font-poppins">
            Recently Synced
          </span>
        </div>

        {bookmarks.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24 px-4 bg-white border border-gray-200 rounded-3xl text-center shadow-sm">
            <div className="bg-gray-50 p-5 rounded-full mb-5">
              <BookmarkSimple size={36} className="text-gray-400" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">
              Your archive is empty
            </h3>
            <p className="text-[15px] text-gray-500 max-w-md">
              Save articles, research papers, and tools. The AI will
              automatically analyze and organize them for you.
            </p>
          </div>
        ) : (
          <div className="flex flex-col gap-5">
            {bookmarks.map((bookmark) => {
              // Find the active collection name for display
              const activeCollection = collections.find(
                (c) => c._id === bookmark.collection_id,
              );
              const folderDisplayName = activeCollection
                ? activeCollection.name
                : "Root Archive";

              return (
                <div
                  key={bookmark._id}
                  className="bg-white border border-gray-100 rounded-3xl p-7 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.03)] hover:shadow-[0_4px_24px_-4px_rgba(0,0,0,0.08)] transition-shadow duration-300 flex flex-col group relative"
                >
                  {/* Card Top: Title & Right Actions */}
                  <div className="flex justify-between items-start gap-8 mb-4">
                    {/* CHANGED: Title is now an interactive anchor tag */}
                    <a
                      href={bookmark.url}
                      target="_blank"
                      rel="noreferrer"
                      className="font-semibold text-2xl text-gray-900 leading-snug hover:text-[#00a870] transition-colors cursor-pointer block line-clamp-2"
                      title={bookmark.title}
                    >
                      {bookmark.title || "Untitled Document"}
                    </a>

                    <div className="flex items-center gap-3 shrink-0">
                      <span
                        className={`flex items-center justify-center gap-1.5 px-3 py-1 rounded-full font-poppins text-[10px] font-semibold uppercase tracking-widest ${
                          bookmark.status === "processing"
                            ? "bg-emerald-100/50 text-emerald-700"
                            : "bg-emerald-50 text-[#00a870]"
                        }`}
                      >
                        {bookmark.status === "processing" && (
                          <CircleNotch size={12} className="animate-spin" />
                        )}
                        {bookmark.status}
                      </span>

                      {/* CHANGED: Replaced text URL with a larger, premium icon button */}
                      <a
                        href={bookmark.url}
                        target="_blank"
                        rel="noreferrer"
                        className="flex items-center justify-center p-2 rounded-full bg-emerald-50 text-emerald-600 hover:bg-emerald-100 hover:text-emerald-800 transition-colors"
                        title="Visit source website"
                      >
                        {/* Note: ArrowUpRight also looks extremely modern here instead of LinkIcon */}
                        <LinkSimpleIcon size={18} weight="bold" />
                      </a>
                    </div>
                  </div>

                  {/* Summary */}
                  <p className="text-sm text-gray-600 leading-relaxed mb-8 max-w-4xl font-poppins ">
                    {bookmark.summary?.short || (
                      <span className="flex items-center gap-2 text-gray-400 italic">
                        <CircleNotch size={14} className="animate-spin" />
                        Analyzing content and generating abstract...
                      </span>
                    )}
                  </p>

                  <div className="h-0.5 w-full bg-gray-200 rounded-full mb-4"></div>

                  {/* Card Footer: Tags & Controls */}
                  <div className="flex items-end justify-between mt-auto">
                    {/* Tags */}
                    <div className="flex flex-wrap gap-2">
                      {bookmark.tags?.map((tag) => (
                        <span
                          key={tag}
                          className="px-3 py-1.5 bg-[#f0f4f8] text-[#4a5f78] text-[10px] font-medium rounded-full uppercase tracking-tight font-poppins shadow-sm"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    {/* Controls */}
                    <div className="flex items-center gap-2 relative">
                      {/* CUSTOM FOLDER DROPDOWN */}
                      <div className="relative folder-menu-container">
                        <button
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            setActiveFolderMenu(
                              activeFolderMenu === bookmark._id
                                ? null
                                : bookmark._id,
                            );
                            setActiveMenu(null); // Close kebab if open
                          }}
                          className={`flex items-center gap-2 text-sm font-medium border px-3 py-2 rounded-xl transition-all ${
                            activeFolderMenu === bookmark._id
                              ? "bg-white border-gray-300 shadow-sm text-gray-900"
                              : "bg-gray-100 border-gray-100 text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                          }`}
                        >
                          <FolderOpen
                            size={16}
                            weight={bookmark.collection_id ? "fill" : "regular"}
                            className={
                              bookmark.collection_id
                                ? "text-emerald-500"
                                : "text-gray-400"
                            }
                          />
                          <span className="max-w-[120px] truncate">
                            {folderDisplayName}
                          </span>
                        </button>

                        {/* Folder Menu List */}
                        {activeFolderMenu === bookmark._id && (
                          <div
                            onClick={(e) => e.stopPropagation()}
                            className="absolute right-0 bottom-full mb-2 w-56 bg-white border border-gray-100 rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.12)] py-2 z-50 overflow-hidden font-poppins animate-in fade-in slide-in-from-bottom-2 duration-200"
                          >
                            <div className="px-3 pb-1 mb-1 border-b border-gray-50">
                              <span className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider">
                                Move to...
                              </span>
                            </div>

                            <div className="max-h-[200px] overflow-y-auto scrollbar-hide">
                              <button
                                onClick={() =>
                                  handleMoveBookmark(bookmark._id, "")
                                }
                                className="w-full text-left px-4 py-2.5 text-[13px] font-medium text-gray-600 hover:bg-gray-50 hover:text-gray-900 transition-colors flex items-center justify-between"
                              >
                                <span>Root Archive</span>
                                {!bookmark.collection_id && (
                                  <Check
                                    size={14}
                                    weight="bold"
                                    className="text-emerald-600"
                                  />
                                )}
                              </button>

                              {collections.map((c) => (
                                <button
                                  key={c._id}
                                  onClick={() =>
                                    handleMoveBookmark(bookmark._id, c._id)
                                  }
                                  className="w-full text-left px-4 py-2.5 text-[13px] font-medium text-gray-600 hover:bg-gray-50 hover:text-gray-900 transition-colors flex items-center justify-between group"
                                >
                                  <span className="truncate pr-4">
                                    {c.name}
                                  </span>
                                  {bookmark.collection_id === c._id ? (
                                    <Check
                                      size={14}
                                      weight="bold"
                                      className="text-emerald-600 shrink-0"
                                    />
                                  ) : (
                                    <FolderOpen
                                      size={14}
                                      className="text-gray-300 opacity-0 group-hover:opacity-100 transition-opacity shrink-0"
                                    />
                                  )}
                                </button>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>

                      {/* Kebab Menu Trigger */}
                      <div className="relative kebab-menu-container">
                        <button
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            setActiveMenu(
                              activeMenu === bookmark._id ? null : bookmark._id,
                            );
                            setActiveFolderMenu(null); // Close folder menu if open
                          }}
                          className={`p-2 rounded-xl transition-all relative z-10 ${
                            activeMenu === bookmark._id
                              ? "bg-gray-100 text-gray-900"
                              : "text-gray-600 bg-gray-100 hover:text-gray-900 hover:bg-gray-100"
                          }`}
                          aria-label="More options"
                        >
                          <DotsThree size={24} weight="bold" />
                        </button>

                        {/* Dropdown Menu */}
                        {activeMenu === bookmark._id && (
                          <div
                            onClick={(e) => e.stopPropagation()}
                            className="absolute right-0 top-full mt-1 w-56 px-2 py-4 bg-white border border-gray-100 rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.12)] z-50 overflow-hidden font-poppins origin-top-right animate-in fade-in slide-in-from-top-2 duration-200"
                          >
                            {bookmark.collection_id && (
                              <button
                                onClick={() =>
                                  promptRemoveFromFolder(bookmark._id)
                                }
                                className="w-full text-left px-4 py-2.5 text-[13px] font-medium text-gray-600 hover:bg-amber-50 hover:text-amber-700 transition-colors flex items-center gap-2.5 hover:rounded-full"
                              >
                                <FolderMinus size={16} weight="bold" />
                                Remove from folder
                              </button>
                            )}
                            <button
                              onClick={() => promptDelete(bookmark._id)}
                              className="w-full text-left px-4 py-2.5 text-[13px] font-medium text-gray-600 hover:bg-red-50 hover:text-red-700 transition-colors flex items-center gap-2.5 hover:rounded-full"
                            >
                              <Trash size={16} weight="bold" />
                              Delete permanently
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* --- CUSTOM GLOBAL MODAL --- */}
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
                  className={`flex-1 px-4 py-2.5 rounded-xl text-[14px] font-semibold transition-all focus:outline-none focus:ring-4 ${modal.confirmStyle}`}
                >
                  {modal.confirmText}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
