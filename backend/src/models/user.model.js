import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
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
      required: true,
    },
    plan: {
      type: String,
      enum: ["free", "pro"],
      default: "free",
    },
  },
  {
    timestamps: { createdAt: "created_at", updatedAt: false }, // Matches your masterplan
  },
);

export const User = mongoose.model("User", userSchema);
