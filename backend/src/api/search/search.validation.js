// src/api/search/search.validation.js
import { z } from "zod";

export const searchSchema = z.object({
  query: z.object({
    q: z.string().min(1, "Search query (q) cannot be empty"),
    type: z.enum(["keyword", "hybrid"]).default("hybrid"),
  }),
});
