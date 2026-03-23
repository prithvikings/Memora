//backend/src/workers/ai.worker.js
import { Worker } from "bullmq";
import redis from "../config/redis.js";
import logger from "../utils/logger.js";
import aiService from "../services/ai.service.js";

const worker = new Worker(
  "ai-processing",
  async (job) => {
    const { content, bookmarkId } = job.data;
    logger.info(`Generating summary/tags for bookmark: ${bookmarkId}`);

    // Logic to call Gemini API
    const aiData = await aiService.generateMetadata(content);
    // Update bookmark in DB...
  },
  { connection: redis },
);

export default worker;
