// src/services/bookmark.service.js
import { Bookmark } from "../models/bookmark.model.js";
import { bookmarkQueue } from "../workers/queue.manager.js";
import ApiError from "../utils/api-error.js";
import { SearchService } from "./search.service.js";

export class BookmarkService {
  static async createBookmark(userId, bookmarkData) {
    // Prevent exact duplicates
    const existingBookmark = await Bookmark.findOne({
      user_id: userId,
      url: bookmarkData.url,
    });

    if (existingBookmark) {
      throw new ApiError(409, "You have already bookmarked this URL.");
    }

    // Create the "shell" record
    const bookmark = await Bookmark.create({
      user_id: userId,
      url: bookmarkData.url,
      collection_id: bookmarkData.collection_id,
      title: bookmarkData.title || "Processing...",
      tags: bookmarkData.tags || [],
      status: "processing",
    });

    // Push job to Redis queue
    await bookmarkQueue.add("process-url", {
      bookmarkId: bookmark._id,
      url: bookmark.url,
      userId: userId,
    });

    return bookmark;
  }

  static async getUserBookmarks(userId, queryParams = {}) {
    const filter = { user_id: userId, deleted_at: null };

    if (queryParams.collection_id) {
      filter.collection_id = queryParams.collection_id;
    } else if (queryParams.root === "true") {
      filter.collection_id = null;
    }

    // ADD THIS BLOCK
    if (queryParams.is_starred === "true") {
      filter.is_starred = true;
    }
    if (queryParams.is_archived === "true") {
      filter.is_archived = true;
    }
    return await Bookmark.find(filter).sort({ created_at: -1 }).limit(50);
  }

  // 1. Soft Delete (Moves to Trash)
  static async deleteBookmark(userId, bookmarkId) {
    const bookmark = await Bookmark.findOneAndUpdate(
      { _id: bookmarkId, user_id: userId, deleted_at: null },
      { $set: { deleted_at: new Date() } },
      { new: true },
    );

    if (!bookmark) throw new ApiError(404, "Bookmark not found");

    // Remove from Elasticsearch so it doesn't show up in global searches
    await SearchService.deleteBookmark(bookmarkId);

    return bookmark;
  }

  // 2. Fetch Trash
  static async getTrash(userId) {
    // Return items where deleted_at is NOT null
    return await Bookmark.find({
      user_id: userId,
      deleted_at: { $ne: null },
    }).sort({ deleted_at: -1 });
  }

  // 3. Restore from Trash
  static async restoreBookmark(userId, bookmarkId) {
    const bookmark = await Bookmark.findOneAndUpdate(
      { _id: bookmarkId, user_id: userId },
      { $set: { deleted_at: null } },
      { new: true },
    );

    if (!bookmark) throw new ApiError(404, "Bookmark not found");

    // Put it back in Elasticsearch
    await SearchService.indexBookmark(bookmark);

    return bookmark;
  }

  // 4. Hard Delete (Permanent)
  static async hardDeleteBookmark(userId, bookmarkId) {
    const bookmark = await Bookmark.findOneAndDelete({
      _id: bookmarkId,
      user_id: userId,
    });
    if (!bookmark) throw new ApiError(404, "Bookmark not found");
    return bookmark;
  }

  // 5. Empty Trash
  static async emptyTrash(userId) {
    return await Bookmark.deleteMany({
      user_id: userId,
      deleted_at: { $ne: null },
    });
  }

  static async updateBookmark(userId, bookmarkId, updateData) {
    const bookmark = await Bookmark.findOneAndUpdate(
      { _id: bookmarkId, user_id: userId },
      { $set: updateData },
      { new: true }, // Returns the updated document
    );

    if (!bookmark) {
      throw new ApiError(404, "Bookmark not found");
    }

    // Keep the search index in sync
    await SearchService.updateBookmark(bookmarkId, updateData);

    return bookmark;
  }
}
