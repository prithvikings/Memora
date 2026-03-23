// src/api/auth/auth.routes.js
import { Router } from "express";
import { register, login, logout, getMe } from "./auth.controller.js";
import validate from "../../middlewares/validate.middleware.js";
import { registerSchema, loginSchema } from "./auth.validation.js";
import { requireAuth } from "../../middlewares/auth.middleware.js";

const router = Router();

// Validate the request BEFORE it ever hits the controller
router.post("/register", validate(registerSchema), register);
router.post("/login", validate(loginSchema), login);
router.post("/logout", logout);
router.get("/me", requireAuth, getMe);

export default router;
