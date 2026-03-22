import { Router } from "express";
import { createBookmark, getBookmarks } from "./bookmarks.controller.js";
import { requireAuth } from "../../middlewares/auth.middleware.js";

const router = Router();

// Apply auth middleware to all bookmark routes
router.use(requireAuth);

router.post("/", createBookmark);
router.get("/", getBookmarks);

export default router;
