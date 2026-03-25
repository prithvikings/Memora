// src/api/bookmarks/bookmarks.validation.js
import { z } from "zod";

export const createBookmarkSchema = z.object({
  body: z.object({
    url: z.string().url("Must be a valid URL"),
    collection_id: z.string().nullable().optional(),
    title: z.string().optional(),
    tags: z.array(z.string()).optional(),
  }),
});

export const getBookmarksSchema = z.object({
  query: z.object({
    collection_id: z.string().optional(),
    root: z.enum(["true", "false"]).optional(),
    is_starred: z.enum(["true", "false"]).optional(),
    is_archived: z.enum(["true", "false"]).optional(),
  }),
});

export const updateBookmarkSchema = z.object({
  body: z.object({
    title: z.string().optional(),
    description: z.string().optional(),
    collection_id: z.string().nullable().optional(), // Null allows moving it back to the root folder
    tags: z.array(z.string()).optional(),
    is_starred: z.boolean().optional(),
    is_archived: z.boolean().optional(),
  }),
});
