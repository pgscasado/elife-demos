import { httpBatchLink  } from '@trpc/client';
import { createTRPCNext } from '@trpc/next';
import type { AppRouter } from '@server/routers/_app';

function getBaseUrl() {
  if (typeof window !== 'undefined') {
    return '';
  }
  if (process.env.NODE_ENV === 'production') {
    return process.env.PUBLIC_URL || 'https://staging.pedro-demo.elife.com.br';
  }
  return `http://localhost:${process.env.PORT || 3000}`;
}

export const trpc = createTRPCNext<AppRouter>({
  config({ ctx }) {
    return {
      ctx,
      links: [
        httpBatchLink({
          url: `${getBaseUrl()}/api/trpc`,
        }),
      ],
    };
  },
  ssr: false,
});