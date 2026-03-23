// src/app.js
import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import { env } from "./config/env.js";
import bookmarkRoutes from "./api/bookmarks/bookmarks.routes.js";
import collectionRoutes from "./api/collections/collections.routes.js";
import authRoutes from "./api/auth/auth.routes.js";
import {
  errorConverter,
  errorHandler,
} from "./middlewares/error.middleware.js";
import ApiError from "./utils/api-error.js";
import cookieParser from "cookie-parser";

const app = express();

// Global Middlewares
app.use(helmet());
app.use(cors({ origin: "*" }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

if (env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

// Health check route
app.get("/health", (req, res) => {
  res.status(200).json({ status: "ok", message: "API is running" });
});

// API Routes
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/bookmarks", bookmarkRoutes);
app.use("/api/v1/collections", collectionRoutes);

// Basic 404 Handler - Passes to your custom error pipeline
app.use((req, res, next) => {
  next(new ApiError(404, "Endpoint not found"));
});

// Global Error Handler Middleware
app.use(errorConverter);
app.use(errorHandler);

export default app;
