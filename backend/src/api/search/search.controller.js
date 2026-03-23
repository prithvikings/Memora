//backend/src/api/search/search.controller.js
import { SearchService } from "../../services/search.service.js";
import { AiService } from "../../services/ai.service.js";
import { Bookmark } from "../../models/bookmark.model.js";

export const searchBookmarks = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const { q, type = "hybrid" } = req.query; // type can be 'keyword' or 'hybrid'

    if (!q) {
      return res
        .status(400)
        .json({ success: false, error: "Search query (q) is required" });
    }

    let queryVector = null;

    // If semantic search is requested, we need to turn the user's search query
    // (e.g., "How to build AI") into an embedding first!
    if (type === "hybrid") {
      queryVector = await AiService.generateEmbedding(q);
    }

    // Hit Elasticsearch to get the matching IDs
    const searchResults = await SearchService.search(userId, q, queryVector);

    if (searchResults.length === 0) {
      return res.status(200).json({ success: true, data: [] });
    }

    // Extract just the IDs
    const bookmarkIds = searchResults.map((res) => res.id);

    // Fetch the actual full documents from MongoDB, maintaining the Elastic sort order
    const bookmarks = await Bookmark.find({ _id: { $in: bookmarkIds } });

    // Sort MongoDB results to match the Elasticsearch ranking score
    const sortedBookmarks = bookmarkIds
      .map((id) => bookmarks.find((b) => b._id.toString() === id))
      .filter(Boolean);

    res.status(200).json({
      success: true,
      data: sortedBookmarks,
    });
  } catch (error) {
    next(error);
  }
};
