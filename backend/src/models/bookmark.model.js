//backend/src/models/bookmark.model.js

import mongoose from "mongoose";

const bookmarkSchema = new mongoose.Schema(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    collection_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Collection",
      default: null,
    },
    url: {
      type: String,
      required: true,
    },
    title: { type: String, default: "" },
    description: { type: String, default: "" },
    content: { type: String, default: "" }, // Full extracted text
    summary: {
      short: { type: String, default: "" },
      bullet: { type: [String], default: [] },
      key_points: { type: [String], default: [] },
    },
    image: { type: String, default: "" },
    favicon: { type: String, default: "" },
    tags: [{ type: String }],
    embedding: { type: [Number], default: [] }, // Vector for semantic search
    click_count: { type: Number, default: 0 },
    last_accessed: { type: Date, default: Date.now },
    status: {
      type: String,
      enum: ["processing", "completed", "failed"],
      default: "processing",
    },
    deleted_at: { type: Date, default: null },
    is_starred: { type: Boolean, default: false },
    is_archived: { type: Boolean, default: false },
  },
  {
    timestamps: { createdAt: "created_at", updatedAt: "updated_at" },
  },
);

// Compound index to prevent exact duplicate URLs for the same user
bookmarkSchema.index({ user_id: 1, url: 1 }, { unique: true });

export const Bookmark = mongoose.model("Bookmark", bookmarkSchema);
