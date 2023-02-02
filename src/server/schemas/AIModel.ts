import z from 'zod';

export const AIModel = z.union([
  z.literal('text-davinci-003'),
  z.literal('text-curie-001'),
  z.literal('text-babbage-001'),
  z.literal('text-ada-001'),
]);