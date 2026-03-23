// src/workers/queue.manager.js
import { Queue } from "bullmq";
import { env } from "../config/env.js";

const redisUrl = new URL(env.REDIS_URI);

export const bookmarkQueue = new Queue("bookmark-processing", {
  connection: {
    host: redisUrl.hostname,
    port: parseInt(redisUrl.port, 10) || 6379,
    username: redisUrl.username || undefined,
    password: redisUrl.password || undefined,
  },
  defaultJobOptions: {
    attempts: 3,
    backoff: {
      type: "exponential",
      delay: 2000,
    },
    removeOnComplete: true,
    removeOnFail: false, // Keep failed jobs in Redis for debugging
  },
});
