//backend/src/services/search.service.js
import { esClient } from "../config/elasticsearch.js";

const INDEX_NAME = "bookmarks";

export class SearchService {
  // Run this once on deployment or server startup to ensure the index exists
  static async setupIndex() {
    const indexExists = await esClient.indices.exists({ index: INDEX_NAME });

    if (!indexExists) {
      await esClient.indices.create({
        index: INDEX_NAME,
        body: {
          mappings: {
            properties: {
              user_id: { type: "keyword" },
              title: { type: "text" },
              content: { type: "text" },
              tags: { type: "keyword" },
              summary: { type: "text" },
              // This is the magic for Semantic Search (Vector Embeddings)
              // Adjust 'dims' based on Gemini's text-embedding-004 output (typically 768)
              embedding: {
                type: "dense_vector",
                dims: 768,
                index: true,
                similarity: "cosine",
              },
            },
          },
        },
      });
      console.log(`Created Elasticsearch index: ${INDEX_NAME}`);
    }
  }

  // Called by our background worker
  static async indexBookmark(bookmark) {
    await esClient.index({
      index: INDEX_NAME,
      id: bookmark._id.toString(),
      document: {
        user_id: bookmark.user_id.toString(),
        title: bookmark.title,
        content: bookmark.content,
        summary: bookmark.summary?.short || "",
        tags: bookmark.tags || [],
        embedding: bookmark.embedding,
      },
    });
  }

  // The actual search function used by the API
  static async search(userId, queryText, queryVector = null) {
    const searchBody = {
      query: {
        bool: {
          must: [
            { term: { user_id: userId } }, // Strictly isolate data by user
          ],
          should: [
            // Standard Full-Text Search
            {
              multi_match: {
                query: queryText,
                fields: ["title^3", "tags^2", "summary", "content"], // Boost title and tags
                fuzziness: "AUTO", // Handles typos
              },
            },
          ],
        },
      },
    };

    // If we have a vector (semantic search), add it to the query
    if (queryVector) {
      searchBody.knn = {
        field: "embedding",
        query_vector: queryVector,
        k: 10,
        num_candidates: 100,
        filter: { term: { user_id: userId } },
        boost: 0.5, // Balance between vector match and keyword match
      };
    }

    const result = await esClient.search({
      index: INDEX_NAME,
      body: searchBody,
    });

    // Return just the matching Document IDs and their scores
    return result.hits.hits.map((hit) => ({
      id: hit._id,
      score: hit._score,
    }));
  }

  static async deleteBookmark(bookmarkId) {
    try {
      await esClient.delete({
        index: INDEX_NAME,
        id: bookmarkId.toString(),
      });
    } catch (error) {
      // If it's a 404, it was already missing from ES, which is fine
      if (error.meta && error.meta.statusCode !== 404) {
        console.error(`Failed to delete from Elasticsearch: ${error.message}`);
      }
    }
  }

  static async updateBookmark(bookmarkId, updateData) {
    try {
      await esClient.update({
        index: INDEX_NAME,
        id: bookmarkId.toString(),
        doc: {
          title: updateData.title,
          tags: updateData.tags,
          // Only update the fields that are actually provided
        },
      });
    } catch (error) {
      console.error(`Failed to update Elasticsearch: ${error.message}`);
    }
  }
}
