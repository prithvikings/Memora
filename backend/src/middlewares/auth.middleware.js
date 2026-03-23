// src/middlewares/auth.middleware.js
import jwt from "jsonwebtoken";
import { env } from "../config/env.js";
import ApiError from "../utils/api-error.js";

export const requireAuth = (req, res, next) => {
  try {
    // Look for the token in cookies first, fallback to Auth header if needed
    let token = req.cookies?.token;

    if (!token && req.headers.authorization?.startsWith("Bearer ")) {
      token = req.headers.authorization.split(" ")[1];
    }

    if (!token) {
      throw new ApiError(401, "Authentication required. No token provided.");
    }

    const decoded = jwt.verify(token, env.JWT_SECRET);
    req.user = { id: decoded.userId };

    next();
  } catch (error) {
    next(new ApiError(401, "Invalid or expired token"));
  }
};
