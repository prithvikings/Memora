// src/api/search/search.controller.js
import { SearchService } from "../../services/search.service.js";
import { AiService } from "../../services/ai.service.js";
import { Bookmark } from "../../models/bookmark.model.js";

export const searchBookmarks = async (req, res, next) => {
  try {
    const userId = req.user.id;
    // req.query is already validated and assigned default values by Zod
    const { q, type } = req.query;

    let queryVector = null;

    if (type === "hybrid") {
      queryVector = await AiService.generateEmbedding(q);
    }

    const searchResults = await SearchService.search(userId, q, queryVector);

    if (searchResults.length === 0) {
      return res.status(200).json({ success: true, data: [] });
    }

    const bookmarkIds = searchResults.map((res) => res.id);
    const bookmarks = await Bookmark.find({ _id: { $in: bookmarkIds } });

    // Sort to match Elasticsearch ranking
    const sortedBookmarks = bookmarkIds
      .map((id) => bookmarks.find((b) => b._id.toString() === id))
      .filter(Boolean);

    res.status(200).json({ success: true, data: sortedBookmarks });
  } catch (error) {
    next(error);
  }
};
