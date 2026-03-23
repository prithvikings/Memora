// src/worker.js
import { Worker } from "bullmq";
import IORedis from "ioredis";
import { env } from "./config/env.js";
import { connectDB } from "./config/database.js";
import { connectElasticsearch } from "./config/elasticsearch.js";
import { SearchService } from "./services/search.service.js";
import { processBookmarkJob } from "./workers/bookmark.processor.js";

const startWorker = async () => {
  // 1. Establish connections
  await connectDB();
  await connectElasticsearch();

  // 2. CRITICAL: Ensure the Elasticsearch index has the correct vector mappings
  await SearchService.setupIndex();

  // 3. Connect to Redis Queue
  const connection = new IORedis(env.REDIS_URI, { maxRetriesPerRequest: null });

  console.log("👷 Worker process started. Listening for background jobs...");

  // 4. Start processing
  const bookmarkWorker = new Worker("bookmark-processing", processBookmarkJob, {
    connection,
    concurrency: 5,
  });

  bookmarkWorker.on("completed", (job) => {
    console.log(`✅ Job ${job.id} completed successfully.`);
  });

  bookmarkWorker.on("failed", (job, err) => {
    console.error(`❌ Job ${job.id} failed:`, err.message);
  });
};

startWorker();
