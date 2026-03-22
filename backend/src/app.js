import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import { env } from "./config/env.js";
import bookmarkRoutes from "./api/bookmarks/bookmarks.routes.js";
import collectionRoutes from "./api/collections/collections.routes.js";
import authRoutes from "./api/auth/auth.routes.js";

const app = express();

// Global Middlewares
app.use(helmet()); // Security headers
app.use(cors({ origin: "*" })); // Configure properly for production later
app.use(express.json()); // Parse JSON bodies
app.use(express.urlencoded({ extended: true }));

if (env.NODE_ENV === "development") {
  app.use(morgan("dev")); // HTTP request logger
}

// Health check route
app.get("/health", (req, res) => {
  res.status(200).json({ status: "ok", message: "API is running" });
});

// API Routes
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/bookmarks", bookmarkRoutes);
app.use("/api/v1/collections", collectionRoutes);

// Basic 404 Handler
app.use((req, res, next) => {
  res.status(404).json({ error: "Endpoint not found" });
});

// Global Error Handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).json({
    error: err.message || "Internal Server Error",
    ...(env.NODE_ENV === "development" && { stack: err.stack }),
  });
});

export default app;
