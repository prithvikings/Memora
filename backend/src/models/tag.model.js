import mongoose from "mongoose";

const tagSchema = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
    index: true,
  },
  name: { type: String, required: true, trim: true, lowercase: true },
  usage_count: { type: Number, default: 0 },
});

tagSchema.index({ user_id: 1, name: 1 }, { unique: true });

export const Tag = mongoose.model("Tag", tagSchema);
