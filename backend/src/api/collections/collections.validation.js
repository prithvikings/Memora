// src/api/collections/collections.validation.js
import { z } from "zod";

export const createCollectionSchema = z.object({
  body: z.object({
    name: z
      .string()
      .min(1, "Collection name cannot be empty")
      .max(50, "Name too long"),
    parent_id: z.string().optional().nullable(), // Null means it's a root folder
  }),
});

export const updateCollectionSchema = z.object({
  body: z.object({
    name: z
      .string()
      .min(1, "Collection name cannot be empty")
      .max(50, "Name too long"),
  }),
});
