const { Worker } = require('bullmq');
const redis = require('../config/redis');
const logger = require('../utils/logger');
const searchService = require('../services/search.service');

const worker = new Worker('indexing', async (job) => {
  const { bookmarkId, content } = job.data;
  logger.info(`Indexing bookmark to Elasticsearch: ${bookmarkId}`);
  
  // Logic to index in ES
  await searchService.indexBookmark(bookmarkId, content);
}, { connection: redis });

module.exports = worker;
