// src/api/collections/collections.controller.js
import { CollectionService } from "../../services/collection.service.js";
import { Collection } from "../../models/collection.model.js";

export const createCollection = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const { name, parent_id } = req.body;

    const collection = await CollectionService.createCollection(
      userId,
      name,
      parent_id,
    );

    res.status(201).json({
      success: true,
      message: "Collection created",
      data: collection,
    });
  } catch (error) {
    next(error);
  }
};

export const getTree = async (req, res, next) => {
  try {
    const userId = req.user.id;

    // Gets all collections for this user
    const collections = await CollectionService.getUserTree(userId);

    res.status(200).json({
      success: true,
      data: collections,
    });
  } catch (error) {
    next(error);
  }
};

export const removeCollection = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const collectionId = req.params.id;

    await CollectionService.deleteCollection(userId, collectionId);

    res.status(200).json({
      success: true,
      message: "Collection deleted",
    });
  } catch (error) {
    next(error);
  }
};

export const updateCollection = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const collectionId = req.params.id;
    const { name } = req.body;

    const updatedCollection = await Collection.findOneAndUpdate(
      { _id: collectionId, user_id: userId },
      { name },
      { new: true }, // Return the updated document
    );

    if (!updatedCollection) {
      return res
        .status(404)
        .json({ success: false, message: "Collection not found" });
    }

    res.status(200).json({ success: true, data: updatedCollection });
  } catch (error) {
    next(error);
  }
};
