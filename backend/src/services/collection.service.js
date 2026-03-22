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
    // Fetches all collections for a user and returns them
    // (In the frontend, you will reconstruct the nested tree using parent_id)
    return await Collection.find({ user_id: userId }).lean();
  }

  static async deleteCollection(userId, collectionId) {
    // TODO: In a production app, you'd also need to decide whether to
    // delete child collections or move their bookmarks to the root.
    return await Collection.findOneAndDelete({
      _id: collectionId,
      user_id: userId,
    });
  }
}
