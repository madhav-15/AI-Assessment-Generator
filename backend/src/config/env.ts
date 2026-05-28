import dotenv from 'dotenv';
import { z } from 'zod';

dotenv.config();

const envSchema = z.object({
  PORT: z.string().default('4000'),
  MONGODB_URI: z.string().default('mongodb://localhost:27017/ai-assessment'),
  REDIS_URL: z.string().default('redis://localhost:6379'),
  AI_PROVIDER: z.enum(['auto', 'anthropic', 'groq', 'openai-compatible']).default('auto'),
  ANTHROPIC_API_KEY: z.string().optional(),
  GROQ_API_KEY: z.string().optional(),
  AI_MODEL: z.string().optional(),
  GROQ_BASE_URL: z.string().optional(),
  GROQ_MODEL: z.string().optional(),
  LLM_BASE_URL: z.string().optional(),
  LLM_API_KEY: z.string().optional(),
  LLM_MODEL: z.string().optional(),
  AI_ALLOW_MOCK: z.string().default('false')
});

const _env = envSchema.safeParse(process.env);

if (!_env.success) {
  console.error('❌ Invalid environment variables:', _env.error.format());
  process.exit(1);
}

export const env = _env.data;
