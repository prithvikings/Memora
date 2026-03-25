// backend/src/api/auth/auth.routes.js
import { Router } from "express";
import {
  register,
  login,
  logout,
  getMe,
  googleLogin,
  updateProfile,
  updatePassword,
  setupArchivePin,
  verifyArchivePin,
  updateArchivePin,
} from "./auth.controller.js";
import validate from "../../middlewares/validate.middleware.js";
import {
  registerSchema,
  loginSchema,
  googleAuthSchema,
  updateProfileSchema,
  updatePasswordSchema,
  archivePinSchema,
  updateArchivePinSchema,
} from "./auth.validation.js";
import { requireAuth } from "../../middlewares/auth.middleware.js";

const router = Router();

router.post("/register", validate(registerSchema), register);
router.post("/login", validate(loginSchema), login);
router.post("/google", validate(googleAuthSchema), googleLogin);
router.post("/logout", logout);
router.get("/me", requireAuth, getMe);
router.patch("/me", requireAuth, validate(updateProfileSchema), updateProfile);
router.patch(
  "/password",
  requireAuth,
  validate(updatePasswordSchema),
  updatePassword,
);

router.post(
  "/archive-pin",
  requireAuth,
  validate(archivePinSchema),
  setupArchivePin,
);
router.post(
  "/archive-pin/verify",
  requireAuth,
  validate(archivePinSchema),
  verifyArchivePin,
);
router.patch(
  "/archive-pin",
  requireAuth,
  validate(updateArchivePinSchema),
  updateArchivePin,
);

export default router;
