// src/api/search/search.routes.js
import { Router } from "express";
import { searchBookmarks } from "./search.controller.js";
import { requireAuth } from "../../middlewares/auth.middleware.js";
import validate from "../../middlewares/validate.middleware.js";
import { searchSchema } from "./search.validation.js";

const router = Router();

router.use(requireAuth);

router.get("/", validate(searchSchema), searchBookmarks);

export default router;
