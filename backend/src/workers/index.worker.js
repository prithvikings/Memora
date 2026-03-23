//backend/src/workers/index.worker.js
import { Worker } from "bullmq";
import redis from "../config/redis.js";
import logger from "../utils/logger.js";
import searchService from "../services/search.service.js";

const worker = new Worker(
  "indexing",
  async (job) => {
    const { bookmarkId, content } = job.data;
    logger.info(`Indexing bookmark to Elasticsearch: ${bookmarkId}`);

    // Logic to index in ES
    await searchService.indexBookmark(bookmarkId, content);
  },
  { connection: redis },
);

export default worker;
