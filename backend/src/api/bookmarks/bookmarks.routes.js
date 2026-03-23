// src/api/bookmarks/bookmarks.routes.js
import { Router } from "express";
import {
  createBookmark,
  getBookmarks,
  deleteBookmark,
  updateBookmark,
} from "./bookmarks.controller.js";
import { requireAuth } from "../../middlewares/auth.middleware.js";
import validate from "../../middlewares/validate.middleware.js";
import {
  createBookmarkSchema,
  getBookmarksSchema,
  updateBookmarkSchema,
} from "./bookmarks.validation.js";

const router = Router();

// 1. Ensure user is logged in
router.use(requireAuth);

// 2. Validate payload, then pass to controller
router.post("/", validate(createBookmarkSchema), createBookmark);
router.get("/", validate(getBookmarksSchema), getBookmarks);
router.delete("/:id", deleteBookmark);
router.patch("/:id", validate(updateBookmarkSchema), updateBookmark);

export default router;
