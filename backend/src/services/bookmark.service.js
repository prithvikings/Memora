//backend/src/services/bookmark.service.js

import { Bookmark } from "../models/bookmark.model.js";
import { bookmarkQueue } from "../workers/queue.manager.js";

export class BookmarkService {
  static async createBookmark(userId, bookmarkData) {
    // 1. Check for exact URL duplicate for this user
    const existingBookmark = await Bookmark.findOne({
      user_id: userId,
      url: bookmarkData.url,
    });

    if (existingBookmark) {
      const error = new Error("Bookmark already exists");
      error.status = 409;
      throw error;
    }

    // 2. Create the initial "shell" record
    const bookmark = await Bookmark.create({
      user_id: userId,
      url: bookmarkData.url,
      collection_id: bookmarkData.collection_id,
      title: bookmarkData.title || "Processing...",
      tags: bookmarkData.tags || [],
      status: "processing",
    });

    // 3. Dispatch the background job to BullMQ
    // We pass the bookmark ID so the worker knows which record to update
    await bookmarkQueue.add("process-url", {
      bookmarkId: bookmark._id,
      url: bookmark.url,
      userId: userId,
    });

    return bookmark;
  }

  static async getUserBookmarks(userId, query = {}) {
    // Basic retrieval logic (will be expanded later with pagination/filtering)
    return await Bookmark.find({ user_id: userId })
      .sort({ created_at: -1 })
      .limit(50);
  }
}
