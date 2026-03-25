import mongoose from "mongoose";
import { Collection } from "../models/collection.model.js";

export class CollectionService {
  static async createCollection(userId, name, parentId = null) {
    const existing = await Collection.findOne({
      user_id: userId,
      name,
      parent_id: parentId,
    });
    if (existing) {
      const err = new Error("A collection with this name already exists here");
      err.status = 409;
      throw err;
    }
    return await Collection.create({
      user_id: userId,
      name,
      parent_id: parentId,
    });
  }

  static async getUserTree(userId) {
    // We must use an aggregation pipeline to count the bookmarks inside each collection
    return await Collection.aggregate([
      { $match: { user_id: new mongoose.Types.ObjectId(userId) } },
      {
        $lookup: {
          from: "bookmarks", // MongoDB automatically lowercases and pluralizes model names
          localField: "_id",
          foreignField: "collection_id",
          as: "bookmarks",
        },
      },
      {
        $addFields: {
          count: { $size: "$bookmarks" },
        },
      },
      {
        $project: {
          bookmarks: 0, // Strip out the heavy array, we only need the count
        },
      },
      { $sort: { updated_at: -1 } },
    ]);
  }

  static async deleteCollection(userId, collectionId) {
    return await Collection.findOneAndDelete({
      _id: collectionId,
      user_id: userId,
    });
  }
}
