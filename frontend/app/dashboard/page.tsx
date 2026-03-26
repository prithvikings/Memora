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
  Check,
  LinkSimpleIcon,
  ArrowUpRightIcon,
  Plus,
  Star,
  Archive as ArchiveIcon,
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
  is_starred?: boolean;
}

interface Collection {
  _id: string;
  name: string;
}

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

  const [newUrl, setNewUrl] = useState("");
  const [isSubmittingUrl, setIsSubmittingUrl] = useState(false);
  const [urlError, setUrlError] = useState("");

  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const [activeFolderMenu, setActiveFolderMenu] = useState<string | null>(null);

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
    Promise.all([
      api.get("/bookmarks?is_archived=false"),
      api.get("/collections"),
    ])
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
        const res = await api.get("/bookmarks?is_archived=false");
        setBookmarks(res.data.data);
      } catch (err) {
        console.error("Failed to poll for updates", err);
      }
    }, 3000);

    return () => clearInterval(interval);
  }, [bookmarks]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as Element;
      if (target && !document.contains(target)) return;

      if (!target.closest(".kebab-menu-container")) setActiveMenu(null);
      if (!target.closest(".folder-menu-container")) setActiveFolderMenu(null);
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleAddBookmark = async (e: React.FormEvent) => {
    e.preventDefault();
    setUrlError("");
    if (!newUrl.trim()) return;

    let formattedUrl = newUrl.trim();
    if (!/^https?:\/\//i.test(formattedUrl))
      formattedUrl = `https://${formattedUrl}`;

    setIsSubmittingUrl(true);
    try {
      const res = await api.post("/bookmarks", { url: formattedUrl });
      setBookmarks((prev) => [res.data.data, ...prev]);
      setNewUrl("");
    } catch (err: any) {
      setUrlError(err.response?.data?.message || "Failed to save bookmark.");
    } finally {
      setIsSubmittingUrl(false);
    }
  };

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
      setActiveFolderMenu(null);
    } catch (err) {
      alert("Failed to move bookmark");
    }
  };

  const handleToggleStar = async (
    bookmarkId: string,
    currentStatus: boolean,
  ) => {
    setBookmarks((prev) =>
      prev.map((b) =>
        b._id === bookmarkId ? { ...b, is_starred: !currentStatus } : b,
      ),
    );
    try {
      await api.patch(`/bookmarks/${bookmarkId}`, {
        is_starred: !currentStatus,
      });
    } catch (err) {
      setBookmarks((prev) =>
        prev.map((b) =>
          b._id === bookmarkId ? { ...b, is_starred: currentStatus } : b,
        ),
      );
      alert("Failed to update favorite status");
    }
  };

  const handleArchiveBookmark = async (bookmarkId: string) => {
    setBookmarks((prev) => prev.filter((b) => b._id !== bookmarkId));
    try {
      await api.patch(`/bookmarks/${bookmarkId}`, { is_archived: true });
    } catch (err) {
      alert("Failed to archive bookmark");
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
        "bg-amber-500 hover:bg-amber-600 text-white focus:ring-amber-500",
      iconStyle: "bg-amber-50 text-amber-600 border-amber-100",
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
      confirmStyle: "bg-red-600 hover:bg-red-700 text-white focus:ring-red-600",
      iconStyle: "bg-red-50 text-red-600 border-red-100",
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
      <div className="flex h-[60vh] flex-col items-center justify-center gap-3 text-gray-400">
        <CircleNotch size={28} className="animate-spin text-emerald-600" />
      </div>
    );

  return (
    <>
      <div className="max-w-[1300px] mx-auto pb-16 px-6">
        {/* Header Section */}
        <div className="mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-50 border border-emerald-100 mb-4 shadow-sm">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span className="text-xs font-semibold text-emerald-700 uppercase tracking-wider">
              Live Processing
            </span>
          </div>

          <h1 className="text-3xl font-bold text-gray-900 tracking-tight mb-2">
            Your Digital Archive
          </h1>
          <p className="text-sm text-gray-500">
            A curated collection of your intellectual assets, enhanced by AI.
          </p>
        </div>

        {/* Input Bar */}
        <div className="mb-12">
          <form
            onSubmit={handleAddBookmark}
            className="group relative max-w-4xl"
          >
            <div className="pointer-events-none absolute inset-y-0 left-4 flex items-center">
              <LinkIcon
                size={20}
                className="text-gray-400 transition-colors duration-200 group-focus-within:text-emerald-600"
              />
            </div>
            <input
              type="text"
              placeholder="Paste a URL here to save and analyze..."
              value={newUrl}
              onChange={(e) => setNewUrl(e.target.value)}
              disabled={isSubmittingUrl}
              className="w-full bg-white border border-gray-200 rounded-2xl py-4 pl-12 pr-32 text-sm text-gray-900 shadow-sm transition-all focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 placeholder:text-gray-400 disabled:bg-gray-50 disabled:text-gray-500"
            />
            <div className="absolute inset-y-2 right-2 flex items-center">
              <button
                type="submit"
                disabled={isSubmittingUrl || !newUrl.trim()}
                className="flex h-full items-center justify-center gap-2 px-6 bg-emerald-600 text-white text-sm font-medium rounded-xl shadow-[0px_1px_2px_0px_rgba(16,185,129,0.4),_inset_0px_1px_0px_0px_rgba(255,255,255,0.2)] ring-1 ring-inset ring-emerald-700 hover:bg-emerald-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-600 focus-visible:ring-offset-2 transition-all active:scale-[0.98] disabled:opacity-60 disabled:cursor-not-allowed disabled:active:scale-100"
              >
                {isSubmittingUrl ? (
                  <CircleNotch size={16} className="animate-spin text-white" />
                ) : (
                  <>
                    <Plus size={16} weight="bold" /> Save
                  </>
                )}
              </button>
            </div>
          </form>
          {urlError && (
            <p className="mt-2.5 px-4 text-sm font-medium text-red-600">
              {urlError}
            </p>
          )}
        </div>

        <div className="mb-6 border-b border-gray-200 pb-3">
          <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider">
            Recently Synced
          </h3>
        </div>

        {bookmarks.length === 0 ? (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-300">
            <div className="flex flex-col items-center justify-center py-24 px-6 text-center bg-gray-50/50 border-2 border-dashed border-gray-200 rounded-2xl">
              <div className="flex items-center justify-center w-14 h-14 mb-5 bg-white border border-gray-200 rounded-xl shadow-sm ring-4 ring-gray-50">
                <BookmarkSimple size={24} className="text-gray-400" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-1">
                Your archive is empty
              </h3>
              <p className="text-sm text-gray-500 max-w-sm">
                Save articles, research papers, and tools using the input bar
                above. The AI will automatically analyze and organize them for
                you.
              </p>
            </div>
          </div>
        ) : (
          <div className="flex flex-col gap-5">
            {bookmarks.map((bookmark) => {
              const activeCollection = collections.find(
                (c) => c._id === bookmark.collection_id,
              );
              const folderDisplayName = activeCollection
                ? activeCollection.name
                : "Root Archive";

              return (
                <div
                  key={bookmark._id}
                  className="bg-white border border-gray-200 rounded-2xl p-6 sm:p-8 shadow-sm hover:shadow-md hover:border-emerald-300 transition-all duration-200 flex flex-col group relative"
                >
                  {/* Card Header */}
                  <div className="flex justify-between items-start gap-8 mb-3">
                    <a
                      href={bookmark.url}
                      target="_blank"
                      rel="noreferrer"
                      className="font-semibold text-xl text-gray-900 leading-snug hover:text-emerald-600 transition-colors line-clamp-2"
                      title={bookmark.title}
                    >
                      {bookmark.title || "Untitled Document"}
                    </a>
                    <div className="flex items-center gap-2 shrink-0">
                      <span
                        className={`inline-flex items-center justify-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-semibold uppercase tracking-wider ${
                          bookmark.status === "processing"
                            ? "bg-emerald-50 text-emerald-700 border border-emerald-100"
                            : bookmark.status === "failed"
                              ? "bg-red-50 text-red-700 border border-red-100"
                              : "bg-emerald-50 text-emerald-600 border border-emerald-100"
                        }`}
                      >
                        {bookmark.status === "processing" && (
                          <CircleNotch size={12} className="animate-spin" />
                        )}
                        {bookmark.status === "failed" && (
                          <Warning size={12} weight="fill" />
                        )}
                        {bookmark.status}
                      </span>
                      <a
                        href={bookmark.url}
                        target="_blank"
                        rel="noreferrer"
                        className="p-1.5 rounded-lg text-gray-400 hover:text-emerald-600 hover:bg-emerald-50 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500"
                        title="Visit source website"
                      >
                        <ArrowUpRightIcon size={18} weight="bold" />
                      </a>
                    </div>
                  </div>

                  {/* Summary */}
                  <p className="text-sm text-gray-600 leading-relaxed mb-6 max-w-4xl">
                    {bookmark.summary?.short || (
                      <span
                        className={`flex items-center gap-2 italic ${
                          bookmark.status === "failed"
                            ? "text-red-400"
                            : "text-gray-400"
                        }`}
                      >
                        {bookmark.status === "processing" && (
                          <CircleNotch size={14} className="animate-spin" />
                        )}
                        {bookmark.status === "failed"
                          ? "Failed to extract content."
                          : "Analyzing content and generating abstract..."}
                      </span>
                    )}
                  </p>

                  {/* Footer & Actions */}
                  <div className="flex items-center justify-between mt-auto pt-4 border-t border-gray-100">
                    <div className="flex flex-wrap gap-1.5">
                      {bookmark.tags?.map((tag) => (
                        <span
                          key={tag}
                          className="px-2 py-1 bg-gray-50 border border-gray-200 text-gray-600 text-xs font-medium rounded-md uppercase tracking-wider"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    <div className="flex items-center gap-1">
                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          handleToggleStar(bookmark._id, !!bookmark.is_starred);
                        }}
                        className={`p-1.5 rounded-lg transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 ${
                          bookmark.is_starred
                            ? "text-amber-500 bg-amber-50 hover:bg-amber-100"
                            : "text-gray-400 hover:text-amber-500 hover:bg-amber-50"
                        }`}
                        title={bookmark.is_starred ? "Unstar" : "Star"}
                      >
                        <Star
                          size={18}
                          weight={bookmark.is_starred ? "fill" : "bold"}
                        />
                      </button>

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
                            setActiveMenu(null);
                          }}
                          className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium border rounded-lg transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-300 ${
                            activeFolderMenu === bookmark._id
                              ? "bg-white border-gray-300 text-gray-900 shadow-sm"
                              : "bg-gray-50 border-gray-200 text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                          }`}
                        >
                          <FolderOpen
                            size={14}
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

                        {activeFolderMenu === bookmark._id && (
                          <div
                            onClick={(e) => e.stopPropagation()}
                            className="absolute right-0 bottom-full mb-2 w-56 bg-white border border-gray-200 rounded-xl shadow-lg py-1.5 z-50 overflow-hidden animate-in fade-in slide-in-from-bottom-2 duration-200"
                          >
                            <div className="px-3 pb-1 mb-1 border-b border-gray-100">
                              <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
                                Move to...
                              </span>
                            </div>
                            <div className="max-h-[200px] overflow-y-auto">
                              <button
                                onClick={() =>
                                  handleMoveBookmark(bookmark._id, "")
                                }
                                className="w-full text-left px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 hover:text-gray-900 transition-colors flex items-center justify-between"
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
                                  className="w-full text-left px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 hover:text-gray-900 transition-colors flex items-center justify-between group"
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
                                      className="text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity shrink-0"
                                    />
                                  )}
                                </button>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>

                      <div className="relative kebab-menu-container">
                        <button
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            setActiveMenu(
                              activeMenu === bookmark._id ? null : bookmark._id,
                            );
                            setActiveFolderMenu(null);
                          }}
                          className={`p-1.5 rounded-lg transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-300 ${
                            activeMenu === bookmark._id
                              ? "bg-gray-100 text-gray-900"
                              : "text-gray-400 hover:text-gray-900 hover:bg-gray-100"
                          }`}
                        >
                          <DotsThree size={20} weight="bold" />
                        </button>

                        {activeMenu === bookmark._id && (
                          <div
                            onClick={(e) => e.stopPropagation()}
                            className="absolute right-0 top-full mt-1 w-48 py-1.5 bg-white border border-gray-200 rounded-xl shadow-lg z-50 overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200"
                          >
                            <button
                              onClick={() =>
                                handleArchiveBookmark(bookmark._id)
                              }
                              className="w-full text-left px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors flex items-center gap-2.5"
                            >
                              <ArchiveIcon size={16} /> Send to Archive
                            </button>

                            {bookmark.collection_id && (
                              <button
                                onClick={() =>
                                  promptRemoveFromFolder(bookmark._id)
                                }
                                className="w-full text-left px-4 py-2 text-sm font-medium text-gray-700 hover:bg-amber-50 hover:text-amber-700 transition-colors flex items-center gap-2.5 mt-1 border-t border-gray-100 pt-2"
                              >
                                <FolderMinus size={16} /> Remove from folder
                              </button>
                            )}
                            <button
                              onClick={() => promptDelete(bookmark._id)}
                              className={`w-full text-left px-4 py-2 text-sm font-medium text-red-600 hover:bg-red-50 transition-colors flex items-center gap-2.5 ${
                                !bookmark.collection_id
                                  ? "mt-1 border-t border-gray-100 pt-2"
                                  : ""
                              }`}
                            >
                              <Trash size={16} /> Delete
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

      {modal.isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
          <div
            className="absolute inset-0 bg-gray-900/40 backdrop-blur-sm animate-in fade-in duration-200"
            onClick={closeModal}
          ></div>
          <div className="relative w-full max-w-sm bg-white rounded-2xl p-6 shadow-xl animate-in zoom-in-95 fade-in duration-200">
            <div className="flex flex-col items-center text-center">
              <div
                className={`flex items-center justify-center w-12 h-12 rounded-full mb-4 shadow-sm border ${modal.iconStyle}`}
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
                  className={`flex-1 px-4 py-2 text-sm font-medium rounded-lg transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 ${modal.confirmStyle}`}
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
