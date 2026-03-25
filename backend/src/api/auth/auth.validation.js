// backend/src/api/auth/auth.validation.js
import { z } from "zod";

export const registerSchema = z.object({
  body: z.object({
    name: z.string().min(1, "Name is required").max(100, "Name is too long"),
    email: z.string().email("Invalid email address format"),
    password: z.string().min(8, "Password must be at least 8 characters long"),
  }),
});

export const loginSchema = z.object({
  body: z.object({
    email: z.string().email("Invalid email address format"),
    password: z.string().min(1, "Password is required"),
  }),
});

export const googleAuthSchema = z.object({
  body: z.object({
    idToken: z.string().min(1, "Google ID token is required"),
  }),
});

export const updatePasswordSchema = z.object({
  body: z.object({
    currentPassword: z.string().min(1, "Current password is required"),
    newPassword: z
      .string()
      .min(8, "New password must be at least 8 characters long"),
  }),
});

export const updateProfileSchema = z.object({
  body: z.object({
    name: z
      .string()
      .min(1, "Name cannot be empty")
      .max(100, "Name is too long")
      .optional(),
    avatar: z.string().optional(),
  }),
});

export const archivePinSchema = z.object({
  body: z.object({
    pin: z
      .string()
      .length(4, "PIN must be exactly 4 digits")
      .regex(/^\d+$/, "PIN must contain only numbers"),
  }),
});

export const updateArchivePinSchema = z.object({
  body: z.object({
    currentPin: z
      .string()
      .length(4, "Current PIN must be exactly 4 digits")
      .regex(/^\d+$/, "PIN must contain only numbers"),
    newPin: z
      .string()
      .length(4, "New PIN must be exactly 4 digits")
      .regex(/^\d+$/, "PIN must contain only numbers"),
  }),
});
