import z from 'zod';
import { Configuration, OpenAIApi } from 'openai';
import { router, procedure } from '@server/trpc';
import { inspect } from 'util';
import { envsSchema } from '../schemas/zod/env';
import { AIModel } from '../schemas/AIModel';

// stop process if envs are not valid
try {
  envsSchema.parse(process.env);
} catch (error) {
  console.error('Invalid envs', error);
}


const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);


type OpenAIUsage = Awaited<ReturnType<typeof openai.createCompletion>>['data']['usage'];

const cost1KTokens = {
  'text-davinci-003': 0.00200,
  'text-curie-001': 0.00020,
  'text-babbage-001': 0.00005,
  'text-ada-001': 0.00002,
};

const costs = (usedTokens: OpenAIUsage) => {
  if (!usedTokens?.completion_tokens) return -1
  if (!usedTokens?.prompt_tokens) return -1
  if (!usedTokens?.total_tokens) return -1
  const { completion_tokens, prompt_tokens, total_tokens } = usedTokens;
  const model = process.env.AI_MODEL || 'text-davinci-003';
  const cost1Token = cost1KTokens[model] / 1000;
  const totalCost = cost1Token * total_tokens;
  const promptCost = cost1Token * prompt_tokens;
  const completionCost = cost1Token * completion_tokens;
  return { totalCost, promptCost, completionCost };
};

export const appRouter = router({
  generateEmail: procedure
    .input(z.object({ text: z.string() }))
    .query(async ({ input }) => {
      const result = await openai.createCompletion({
        model: process.env.AI_MODEL || 'text-davinci-003',
        prompt: `Gerar um modelo de e-mail para resolver: ${input.text}`,
        top_p: 1,
        frequency_penalty: 1,
        best_of: 1,
        temperature: 0.6,
        max_tokens: +(process.env.AI_MAX_TOKENS || 700),
      });
      console.log(inspect(costs(result.data.usage), false, null, true /* enable colors */));
      return result.data.choices[0].text;
    }),
  generateReply: procedure
    .input(z.object({ email: z.string() }))
    .query(async ({ input }) => {
      const result = await openai.createCompletion({
        model: process.env.AI_MODEL || 'text-davinci-003',
        prompt: `Gerar uma resposta para o e-mail: ${input.email}`,
        top_p: 1,
        frequency_penalty: 1,
        best_of: 1,
        temperature: 0.6,
        max_tokens: +(process.env.AI_MAX_TOKENS || 700),
      });
      console.log(inspect(costs(result.data.usage), false, null, true /* enable colors */));
      return result.data.choices[0].text;
    }),
  setAIModel: procedure
    .input(z.union([
      z.literal('text-davinci-003'),
      z.literal('text-curie-001'),
      z.literal('text-babbage-001'),
      z.literal('text-ada-001'),
    ]))
    .mutation(async ({ input }) => {
      process.env.AI_MODEL = input;
      console.log(`Changed AI model to ${input}`);
      return true;
    }),
  getAIModel: procedure
    .query(async () => {
      return process.env.AI_MODEL;
    }),
});

export type AppRouter = typeof appRouter;
