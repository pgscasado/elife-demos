import z from 'zod';

export const envsSchema = z.object({
  NODE_ENV: z.union([z.literal('development'), z.literal('production'), z.literal('test')]).optional(),
  OPENAI_API_KEY: z.string().regex(/^sk-/),
  PUBLIC_URL: z.string().optional(),
  AI_MODEL: z.union([
    z.literal('text-davinci-003'),
    z.literal('text-curie-001'),
    z.literal('text-babbage-001'),
    z.literal('text-ada-001'),
  ]).optional(),
  AI_MAX_TOKENS: z.string().regex(/^\d+$/).optional(),
});