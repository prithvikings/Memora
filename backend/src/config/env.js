import dotenv from "dotenv";
import { z } from "zod";

dotenv.config();

const envSchema = z.object({
  PORT: z.string().default("3000"),
  NODE_ENV: z
    .enum(["development", "production", "test"])
    .default("development"),
  MONGO_URI: z.string().url(),
  REDIS_URI: z.string().url(),
  ELASTIC_NODE: z.string().url(),
  GEMINI_API_KEY: z.string().min(1),
  JWT_SECRET: z.string().min(10),
});

const _env = envSchema.safeParse(process.env);

if (!_env.success) {
  console.error("❌ Invalid environment variables:\n", _env.error.format());
  process.exit(1);
}

export const env = _env.data;
