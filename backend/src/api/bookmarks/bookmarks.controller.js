//backend/src/api/bookmarks/bookmarks.controller.js
import { BookmarkService } from "../../services/bookmark.service.js";
import { createBookmarkSchema } from "./bookmarks.validation.js";
import { bookmarkQueue } from "../../workers/queue.manager.js";
import { Bookmark } from "../../models/bookmark.model.js";

export const bulkSyncBookmarks = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const { bookmarks } = req.body; // Array of { url, title, etc }

    if (!Array.isArray(bookmarks) || bookmarks.length === 0) {
      return res.status(400).json({ error: "Provide an array of bookmarks" });
    }

    // 1. Bulk insert the "shell" records into MongoDB to get IDs
    const docsToInsert = bookmarks.map((b) => ({
      user_id: userId,
      url: b.url,
      title: b.title || "Imported Bookmark",
      status: "processing",
    }));

    // Ignore duplicates automatically using unordered bulk operation
    const inserted = await Bookmark.insertMany(docsToInsert, {
      ordered: false,
    }).catch((e) => e.insertedDocs || []);

    // 2. Add them all to the BullMQ queue in one go
    const jobs = inserted.map((doc) => ({
      name: "process-url",
      data: { bookmarkId: doc._id, url: doc.url, userId: userId },
    }));

    await bookmarkQueue.addBulk(jobs);

    res.status(202).json({
      success: true,
      message: `Queued ${inserted.length} bookmarks for processing.`,
    });
  } catch (error) {
    next(error);
  }
};

export const createBookmark = async (req, res, next) => {
  try {
    const validatedData = createBookmarkSchema.parse({ body: req.body });
    const userId = req.user.id; // Injected by requireAuth middleware

    const bookmark = await BookmarkService.createBookmark(
      userId,
      validatedData.body,
    );

    res.status(202).json({
      success: true,
      message: "Bookmark saved and queued for AI processing",
      data: bookmark,
    });
  } catch (error) {
    if (error.name === "ZodError") {
      return res.status(400).json({ success: false, errors: error.errors });
    }
    next(error);
  }
};

export const getBookmarks = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const bookmarks = await BookmarkService.getUserBookmarks(userId, req.query);

    res.status(200).json({
      success: true,
      data: bookmarks,
    });
  } catch (error) {
    next(error);
  }
};
