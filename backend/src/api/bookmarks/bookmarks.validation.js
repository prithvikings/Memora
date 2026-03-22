import { z } from "zod";

export const createBookmarkSchema = z.object({
  body: z.object({
    url: z.string().url("Must be a valid URL"),
    collection_id: z.string().optional(),
    title: z.string().optional(), // Client might send page title immediately
    tags: z.array(z.string()).optional(), // User-defined tags
  }),
});
