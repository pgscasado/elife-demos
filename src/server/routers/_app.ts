import z from 'zod';
import { Configuration, OpenAIApi } from 'openai';
import { router, procedure } from '@server/trpc';
import { inspect } from 'util';

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

export const appRouter = router({
  generateEmail: procedure
    .input(z.object({ text: z.string() }))
    .query(async ({ input }) => {
      const result = await openai.createCompletion({
        model: 'text-davinci-003',
        prompt: `Gerar um modelo de e-mail para resolver: ${input.text}`,
        top_p: 1,
        frequency_penalty: 1,
        best_of: 1,
        temperature: 0.6,
        max_tokens: 700,
      });
      console.log(inspect(result.data.usage, false, null, true /* enable colors */));
      return result.data.choices[0].text;
    }),
});

export type AppRouter = typeof appRouter;
