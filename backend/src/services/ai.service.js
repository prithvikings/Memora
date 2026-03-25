//backend/src/services/ai.service.js

import { GoogleGenAI, Type } from "@google/genai";
import { env } from "../config/env.js";

// Initialize the official Gemini SDK
const ai = new GoogleGenAI({ apiKey: env.GEMINI_API_KEY });

export class AiService {
  static async processContent(text) {
    // Truncate text if it's absurdly long to save tokens (e.g., limit to ~30k characters)
    const safeText = text.substring(0, 30000);

    const prompt = `
    Analyze the following webpage content. 
    1. Write a short 1-paragraph summary.
    2. Write a 5-bullet point summary.
    3. Extract the 3 most important key takeaways.
    4. Generate up to 5 highly relevant, lowercase tags for categorization.
    
    Content:
    ${safeText}
  `;

    try {
      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: prompt,
        config: {
          // Force Gemini to output perfect JSON matching this schema
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              short_summary: { type: Type.STRING },
              bullet_summary: {
                type: Type.ARRAY,
                items: { type: Type.STRING },
              },
              key_points: { type: Type.ARRAY, items: { type: Type.STRING } },
              tags: { type: Type.ARRAY, items: { type: Type.STRING } },
            },
            required: ["short_summary", "bullet_summary", "key_points", "tags"],
          },
        },
      });

      // Parse the JSON string returned by Gemini
      return JSON.parse(response.text);
    } catch (error) {
      console.error("Gemini Processing Error:", error);
      throw error;
    }
  }

  static async generateEmbedding(text) {
    try {
      const response = await ai.models.embedContent({
        model: "gemini-embedding-001",
        contents: text.substring(0, 10000),
        config: {
          outputDimensionality: 768, // Force Gemini to match your Elasticsearch index
        },
      });

      return response.embeddings[0].values;
    } catch (error) {
      console.error("Gemini Embedding Error:", error);
      throw error;
    }
  }
}
