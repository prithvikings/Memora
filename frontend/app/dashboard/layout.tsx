// src/app/dashboard/layout.tsx
"use client";

import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { api } from "@/lib/api";
import Link from "next/link";

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

  // Inside your DashboardLayout component, add this state and function:
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

  // 1. Kick out unauthenticated users
  useEffect(() => {
    if (!loading && !user) {
      router.push("/login");
    }
  }, [user, loading, router]);

  // 2. Fetch sidebar data
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
      <div className="flex h-screen items-center justify-center">
        Loading session...
      </div>
    );

  return (
    <div className="flex h-screen bg-gray-50 text-gray-900">
      {/* Sidebar */}
      <div className="w-64 bg-white border-r flex flex-col">
        <div className="p-5 border-b font-bold text-xl tracking-tight">
          Memora
        </div>
        <nav className="flex-1 overflow-y-auto p-4 space-y-1">
          <Link
            href="/dashboard"
            className="block px-3 py-2 rounded-md hover:bg-gray-100 font-medium"
          >
            All Bookmarks
          </Link>
          <div className="pt-6 pb-2 px-3 flex justify-between items-center text-xs font-bold text-gray-400 uppercase tracking-wider">
            <span>Collections</span>
            <button
              onClick={() => setIsCreating(!isCreating)}
              className="hover:text-blue-600 text-lg leading-none cursor-pointer"
            >
              +
            </button>
          </div>
          {/* Creation Form */}
          {isCreating && (
            <form onSubmit={handleCreateCollection} className="px-3 mb-2">
              <input
                type="text"
                autoFocus
                value={newCollectionName}
                onChange={(e) => setNewCollectionName(e.target.value)}
                placeholder="Folder name..."
                className="w-full px-2 py-1 text-sm border rounded bg-gray-50 focus:outline-none focus:ring-1 focus:ring-blue-500"
                onBlur={() => setIsCreating(false)}
              />
            </form>
          )}

          {collections.map((c) => (
            <Link
              key={c._id}
              href={`/dashboard/collections/${c._id}`}
              className="block px-3 py-2 text-sm rounded-md hover:bg-gray-100 text-gray-700"
            >
              {c.name}
            </Link>
          ))}
        </nav>
        <div className="p-4 border-t">
          <button
            onClick={logout}
            className="w-full text-left px-3 py-2 text-sm font-medium text-red-600 rounded-md hover:bg-red-50"
          >
            Logout
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Topbar */}
        <header className="h-16 bg-white border-b flex items-center px-8 justify-between">
          <input
            type="text"
            placeholder="Semantic search (e.g., 'machine learning tools')..."
            className="w-120 px-4 py-2 border rounded-md bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all text-sm"
            onKeyDown={(e) => {
              const target = e.target as HTMLInputElement;
              if (e.key === "Enter" && target.value.trim() !== "") {
                router.push(
                  `/dashboard/search?q=${encodeURIComponent(target.value)}`,
                );
              }
            }}
          />
          <div className="text-sm font-medium text-gray-600">{user.email}</div>
        </header>

        {/* Dynamic Page Content */}
        <main className="flex-1 overflow-y-auto p-8">{children}</main>
      </div>
    </div>
  );
}
