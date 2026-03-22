const { Worker } = require('bullmq');
const redis = require('../config/redis');
const logger = require('../utils/logger');
const aiService = require('../services/ai.service');

const worker = new Worker('ai-processing', async (job) => {
  const { content, bookmarkId } = job.data;
  logger.info(`Generating summary/tags for bookmark: ${bookmarkId}`);
  
  // Logic to call Gemini API
  const aiData = await aiService.generateMetadata(content);
  // Update bookmark in DB...
}, { connection: redis });

module.exports = worker;
