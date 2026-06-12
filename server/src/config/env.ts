import 'dotenv/config'
import { z } from 'zod'

const envSchema = z.object({
  DATABASE_URL: z.string().min(1),
  PORT: z.coerce.number().default(3001),
  NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
  ADMIN_API_KEY: z.string().min(8),
  CORS_ORIGIN: z.string().default('http://localhost:5173'),
  CRON_ENABLED: z
    .string()
    .transform((v) => v === 'true')
    .default('true'),
  JWT_SECRET: z.string().min(16).default('haruka-dev-jwt-secret-change-me'),
})

export const env = envSchema.parse(process.env)
