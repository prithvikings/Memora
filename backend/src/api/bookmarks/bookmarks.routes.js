import { Router } from "express";
import {
  createBookmark,
  getBookmarks,
  deleteBookmark,
  updateBookmark,
  getTrash,
  restoreBookmark,
  hardDeleteBookmark,
  emptyTrash, // <--- Import the new controllers
} from "./bookmarks.controller.js";
import { requireAuth } from "../../middlewares/auth.middleware.js";
import validate from "../../middlewares/validate.middleware.js";
import {
  createBookmarkSchema,
  getBookmarksSchema,
  updateBookmarkSchema,
} from "./bookmarks.validation.js";

const router = Router();

router.use(requireAuth);

router.post("/", validate(createBookmarkSchema), createBookmark);
router.get("/", validate(getBookmarksSchema), getBookmarks);

// --- TRASH ROUTES (Must be before /:id) ---
router.get("/trash", getTrash);
router.delete("/trash/empty", emptyTrash);

// --- SPECIFIC ID ROUTES ---
router.post("/:id/restore", restoreBookmark);
router.delete("/:id/hard", hardDeleteBookmark);
router.delete("/:id", deleteBookmark); // Soft delete
router.patch("/:id", validate(updateBookmarkSchema), updateBookmark);

export default router;
