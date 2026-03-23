//backend/src/workers/queue.manager.js
import { Queue } from "bullmq";
import { env } from "../config/env.js";

// Create a new queue instance backed by our Redis connection
export const bookmarkQueue = new Queue("bookmark-processing", {
  connection: {
    host: new URL(env.REDIS_URI).hostname,
    port: new URL(env.REDIS_URI).port || 6379,
    password: new URL(env.REDIS_URI).password || undefined,
  },
  defaultJobOptions: {
    attempts: 3,
    backoff: {
      type: "exponential",
      delay: 2000,
    },
    removeOnComplete: true, // Keep Redis memory clean
    removeOnFail: false, // Keep failed jobs for debugging
  },
});
