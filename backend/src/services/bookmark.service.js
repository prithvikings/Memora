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
    const filter = { user_id: userId };

    // If a specific collection is requested
    if (queryParams.collection_id) {
      filter.collection_id = queryParams.collection_id;
    }
    // If the frontend explicitly wants bookmarks NOT in any collection
    else if (queryParams.root === "true") {
      filter.collection_id = null;
    }

    // Return the results, sorted newest first
    return await Bookmark.find(filter).sort({ created_at: -1 }).limit(50);
  }

  static async deleteBookmark(userId, bookmarkId) {
    const bookmark = await Bookmark.findOneAndDelete({
      _id: bookmarkId,
      user_id: userId,
    });

    if (!bookmark) {
      throw new ApiError(
        404,
        "Bookmark not found or you do not have permission to delete it",
      );
    }

    // Remove from Elasticsearch
    await SearchService.deleteBookmark(bookmarkId);

    return bookmark;
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
