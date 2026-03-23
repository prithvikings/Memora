//backend/src/config/elasticsearch.js
import { Client } from "@elastic/elasticsearch";
import { env } from "./env.js";

export const esClient = new Client({
  node: env.ELASTIC_NODE,
  // If using Elastic Cloud, you'd use cloud ID and auth here instead:
  // auth: { apiKey: env.ELASTIC_API_KEY }
});

export const connectElasticsearch = async () => {
  try {
    const health = await esClient.cluster.health({});
    console.log(`✅ Elasticsearch Connected. Status: ${health.status}`);
  } catch (error) {
    console.error(`❌ Elasticsearch Connection Error: ${error.message}`);
    // We don't exit process here; if ES is down, core saving can still work
  }
};
