// src/api/bookmarks/bookmarks.controller.js
import { BookmarkService } from "../../services/bookmark.service.js";

export const createBookmark = async (req, res, next) => {
  try {
    const userId = req.user.id; // Injected by requireAuth
    const bookmarkData = req.body;

    const bookmark = await BookmarkService.createBookmark(userId, bookmarkData);

    res.status(202).json({
      success: true,
      message: "Bookmark saved and queued for AI processing",
      data: bookmark,
    });
  } catch (error) {
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

export const deleteBookmark = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const bookmarkId = req.params.id;

    await BookmarkService.deleteBookmark(userId, bookmarkId);

    res.status(200).json({
      success: true,
      message: "Bookmark deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};

export const updateBookmark = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const bookmarkId = req.params.id;

    const updatedBookmark = await BookmarkService.updateBookmark(
      userId,
      bookmarkId,
      req.body,
    );

    res.status(200).json({
      success: true,
      message: "Bookmark updated",
      data: updatedBookmark,
    });
  } catch (error) {
    next(error);
  }
};

export const getTrash = async (req, res, next) => {
  try {
    const trash = await BookmarkService.getTrash(req.user.id);
    res.status(200).json({ success: true, data: trash });
  } catch (error) {
    next(error);
  }
};

export const restoreBookmark = async (req, res, next) => {
  try {
    const restored = await BookmarkService.restoreBookmark(
      req.user.id,
      req.params.id,
    );
    res.status(200).json({ success: true, data: restored });
  } catch (error) {
    next(error);
  }
};

export const hardDeleteBookmark = async (req, res, next) => {
  try {
    await BookmarkService.hardDeleteBookmark(req.user.id, req.params.id);
    res.status(200).json({ success: true, message: "Permanently deleted" });
  } catch (error) {
    next(error);
  }
};

export const emptyTrash = async (req, res, next) => {
  try {
    await BookmarkService.emptyTrash(req.user.id);
    res.status(200).json({ success: true, message: "Trash emptied" });
  } catch (error) {
    next(error);
  }
};
