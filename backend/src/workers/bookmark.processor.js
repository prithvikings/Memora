//backend/src/workers/bookmark.processor.js

import { Bookmark } from "../models/bookmark.model.js";
import { ScraperService } from "../services/scraper.service.js";
import { AiService } from "../services/ai.service.js";
import { SearchService } from "../services/search.service.js";
import { emitToUser } from "../socket/socket.manager.js";

export const processBookmarkJob = async (job) => {
  const { bookmarkId, url, userId } = job.data;
  console.log(`[Job ${job.id}] Starting processing for URL: ${url}`);

  try {
    // 1. Scrape the website
    console.log(`[Job ${job.id}] Scraping content...`);
    const scrapedData = await ScraperService.scrapeUrl(url);

    // 2. AI Summarization & Tagging
    console.log(`[Job ${job.id}] Generating AI summary...`);
    const aiData = await AiService.processContent(scrapedData.content);

    // 3. AI Vector Embedding (For Semantic Search later)
    console.log(`[Job ${job.id}] Generating embeddings...`);
    const embedding = await AiService.generateEmbedding(scrapedData.content);

    // 4. Update the database record
    console.log(`[Job ${job.id}] Saving to database...`);

    // Merge user tags (if any) with AI generated tags, ensuring uniqueness
    const bookmark = await Bookmark.findById(bookmarkId);
    const combinedTags = [
      ...new Set([...(bookmark.tags || []), ...aiData.tags]),
    ];

    await Bookmark.findByIdAndUpdate(bookmarkId, {
      title: scrapedData.title || bookmark.title,
      description: scrapedData.description,
      content: scrapedData.content,
      image: scrapedData.image,
      favicon: scrapedData.favicon,
      summary: {
        short: aiData.short_summary,
        bullet: aiData.bullet_summary,
        key_points: aiData.key_points,
      },
      tags: combinedTags,
      embedding: embedding,
      status: "completed",
    });

    // TODO: Socket.io emit to frontend to say "Bookmark processing complete!"
    // TODO: Send data to Elasticsearch for indexing
    await SearchService.indexBookmark({
      _id: bookmarkId,
      user_id: userId,
      title: scrapedData.title || bookmark.title,
      content: scrapedData.content,
      summary: { short: aiData.short_summary },
      tags: combinedTags,
      embedding: embedding,
    });

    console.log(
      `[Job ${job.id}] ✅ Successfully processed and indexed bookmark!`,
    );

    // Fetch the fully updated document to send to the frontend
    const updatedBookmark = await Bookmark.findById(bookmarkId);

    console.log(`[Job ${job.id}] Emitting socket event to user ${userId}...`);

    // Boom. The frontend's Zustand store can listen for 'bookmark_processed'
    // and instantly update the UI without the user refreshing the page.
    emitToUser(userId, "bookmark_processed", {
      bookmarkId: bookmarkId,
      status: "completed",
      data: updatedBookmark,
    });

    return { success: true };
  } catch (error) {
    console.error(
      `[Job ${job.id}] ❌ Failed to process bookmark:`,
      error.message,
    );

    // Mark as failed in DB so the UI can show an error state
    await Bookmark.findByIdAndUpdate(bookmarkId, {
      status: "failed",
    });

    throw error; // Let BullMQ handle retries
  }
};
