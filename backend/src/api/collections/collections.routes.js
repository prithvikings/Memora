// src/api/collections/collections.routes.js
import { Router } from "express";
import {
  createCollection,
  getTree,
  removeCollection,
} from "./collections.controller.js";
import { requireAuth } from "../../middlewares/auth.middleware.js";
import validate from "../../middlewares/validate.middleware.js";
import { createCollectionSchema } from "./collections.validation.js";

const router = Router();

router.use(requireAuth);

router.post("/", validate(createCollectionSchema), createCollection);
router.get("/", getTree);
router.delete("/:id", removeCollection);

export default router;
