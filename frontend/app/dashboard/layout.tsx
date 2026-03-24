// src/app/dashboard/layout.tsx
"use client";

import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { api } from "@/lib/api";
import Link from "next/link";
import {
  MagnifyingGlass,
  SignOut,
  House,
  Folder,
  Plus,
  UserCircle,
} from "@phosphor-icons/react";

interface Collection {
  _id: string;
  name: string;
}

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, loading, logout } = useAuth();
  const router = useRouter();
  const [collections, setCollections] = useState<Collection[]>([]);

  const [isCreating, setIsCreating] = useState(false);
  const [newCollectionName, setNewCollectionName] = useState("");

  const handleCreateCollection = async (
    e: React.FormEvent<HTMLFormElement>,
  ) => {
    e.preventDefault();
    if (!newCollectionName.trim()) return;

    try {
      const res = await api.post("/collections", { name: newCollectionName });
      setCollections([...collections, res.data.data]);
      setNewCollectionName("");
      setIsCreating(false);
    } catch (err) {
      console.error("Failed to create collection", err);
    }
  };

  useEffect(() => {
    if (!loading && !user) {
      router.push("/login");
    }
  }, [user, loading, router]);

  useEffect(() => {
    if (user) {
      api
        .get("/collections")
        .then((res) => setCollections(res.data.data))
        .catch(console.error);
    }
  }, [user]);

  if (loading || !user)
    return (
      <div className="flex h-screen items-center justify-center bg-[#fcfcfc] text-gray-500 font-medium">
        Loading session...
      </div>
    );

  return (
    <div className="flex h-screen bg-[#fcfcfc] text-gray-900 font-sans">
      {/* Sidebar */}
      <div className="w-64 bg-white border-r border-gray-200 flex flex-col z-10 shadow-[2px_0_10px_-3px_rgba(0,0,0,0.02)]">
        <div className="h-16 flex items-center px-6 border-b border-gray-200 font-semibold text-xl tracking-tight text-gray-900">
          Memora
        </div>

        <nav className="flex-1 overflow-y-auto py-4 px-3 space-y-1">
          <Link
            href="/dashboard"
            className="flex items-center gap-2.5 px-3 py-2.5 rounded-lg hover:bg-gray-50 font-medium text-sm text-gray-700 transition-colors"
          >
            <House size={18} className="text-gray-400" />
            All Bookmarks
          </Link>

          <div className="pt-6 pb-2 px-3 flex justify-between items-center">
            <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">
              Collections
            </span>
            <button
              onClick={() => setIsCreating(!isCreating)}
              className="text-gray-400 hover:text-[#0a9a1a] p-1 rounded-md hover:bg-gray-50 transition-colors cursor-pointer"
              title="New Collection"
            >
              <Plus size={14} weight="bold" />
            </button>
          </div>

          {/* Creation Form */}
          {isCreating && (
            <form onSubmit={handleCreateCollection} className="px-2 mb-2">
              <input
                type="text"
                autoFocus
                value={newCollectionName}
                onChange={(e) => setNewCollectionName(e.target.value)}
                placeholder="Folder name..."
                className="w-full px-3 py-1.5 text-sm border border-gray-200 rounded-lg bg-white focus:outline-none focus:border-gray-400 focus:ring-1 focus:ring-gray-400 shadow-sm"
                onBlur={() => setIsCreating(false)}
              />
            </form>
          )}

          {collections.map((c) => (
            <Link
              key={c._id}
              href={`/dashboard/collections/${c._id}`}
              className="flex items-center gap-2.5 px-3 py-2 text-sm rounded-lg hover:bg-gray-50 text-gray-600 hover:text-gray-900 transition-colors"
            >
              <Folder size={16} weight="duotone" className="text-gray-400" />
              <span className="truncate">{c.name}</span>
            </Link>
          ))}
        </nav>

        <div className="p-4 border-t border-gray-200">
          <button
            onClick={logout}
            className="w-full flex items-center justify-center gap-2 px-3 py-2.5 text-sm font-medium text-gray-600 rounded-lg hover:bg-red-50 hover:text-red-600 transition-colors"
          >
            <SignOut size={16} />
            Logout
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Topbar */}
        <header className="h-16 bg-white border-b border-gray-200 flex items-center px-8 justify-between z-0">
          <div className="relative w-full max-w-lg">
            <MagnifyingGlass
              size={18}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            />
            <input
              type="text"
              placeholder="Semantic search (e.g., 'machine learning tools')..."
              className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg bg-gray-50 focus:bg-white focus:outline-none focus:border-gray-400 focus:ring-1 focus:ring-gray-400 transition-all text-sm placeholder:text-gray-400"
              onKeyDown={(e) => {
                const target = e.target as HTMLInputElement;
                if (e.key === "Enter" && target.value.trim() !== "") {
                  router.push(
                    `/dashboard/search?q=${encodeURIComponent(target.value)}`,
                  );
                }
              }}
            />
          </div>

          <div className="flex items-center gap-2 px-3 py-1.5 bg-gray-50 border border-gray-200 rounded-full">
            <UserCircle size={18} className="text-gray-500" />
            <span className="text-xs font-medium text-gray-600">
              {user.email}
            </span>
          </div>
        </header>

        {/* Dynamic Page Content */}
        <main className="flex-1 overflow-y-auto p-8">{children}</main>
      </div>
    </div>
  );
}
