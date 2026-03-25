// backend/src/models/user.model.js
import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
      index: true,
    },
    password_hash: {
      type: String,
      required: function () {
        // Password is only required if they are using local email/password auth
        return this.auth_provider === "local";
      },
    },
    auth_provider: {
      type: String,
      enum: ["local", "google"],
      default: "local",
    },
    google_id: {
      type: String,
      sparse: true, // Allows multiple null values for local users
      unique: true,
    },
    plan: {
      type: String,
      enum: ["free", "pro"],
      default: "free",
    },
    avatar: {
      type: String,
      default: "", // Will hold a URL or Base64 string
    },
    archive_pin: {
      type: String,
      default: null, // Null means they haven't set it up yet
    },
  },
  {
    timestamps: { createdAt: "created_at", updatedAt: false },
  },
);

export const User = mongoose.model("User", userSchema);
