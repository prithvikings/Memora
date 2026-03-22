const { Worker } = require('bullmq');
const redis = require('../config/redis');
const logger = require('../utils/logger');
const scraperService = require('../services/scraper.service');

const worker = new Worker('extraction', async (job) => {
  const { url, bookmarkId } = job.data;
  logger.info(`Extracting metadata for: ${url}`);
  
  // Logic to scrape and update bookmark
  const metadata = await scraperService.extractMetadata(url);
  // Update bookmark in DB...
}, { connection: redis });

worker.on('completed', (job) => {
  logger.info(`Job ${job.id} completed!`);
});

worker.on('failed', (job, err) => {
  logger.error(`Job ${job.id} failed: ${err.message}`);
});

module.exports = worker;
