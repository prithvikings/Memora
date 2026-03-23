//backend/src/models/collection.model.js
import mongoose from "mongoose";

const collectionSchema = new mongoose.Schema(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
    parent_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Collection",
      default: null, // If null, it's a root collection
    },
  },
  { timestamps: { createdAt: "created_at", updatedAt: "updated_at" } },
);

// Prevent duplicate folder names at the same hierarchy level for a user
collectionSchema.index({ user_id: 1, name: 1, parent_id: 1 }, { unique: true });

export const Collection = mongoose.model("Collection", collectionSchema);
