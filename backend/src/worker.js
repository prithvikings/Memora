import { Worker } from "bullmq";
import IORedis from "ioredis";
import { env } from "./config/env.js";
import { connectDB } from "./config/database.js";
import { connectElasticsearch } from "./config/elasticsearch.js";
import { processBookmarkJob } from "./workers/bookmark.processor.js"; // Import the new logic

const startWorker = async () => {
  await connectDB();
  await connectElasticsearch();

  const connection = new IORedis(env.REDIS_URI, { maxRetriesPerRequest: null });

  console.log("👷 Worker process started. Listening for background jobs...");

  // Hook up the queue to our processor function
  const bookmarkWorker = new Worker("bookmark-processing", processBookmarkJob, {
    connection,
    concurrency: 5, // Process up to 5 bookmarks simultaneously
  });

  bookmarkWorker.on("completed", (job) => {
    // Clean up or log success
  });

  bookmarkWorker.on("failed", (job, err) => {
    // Log failure, maybe send an alert if it fails after all retries
  });
};

startWorker();
