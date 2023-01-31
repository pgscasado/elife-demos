This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app). It uses [Pico.css](https://picocss.com/) for styling, [OpenAI's GPT-3 API](https://beta.openai.com/) for generating text and [tRPC](https://trpc.io/) for API routing.

## Getting Started

First, get an OpenAI API key from [https://beta.openai.com/](https://beta.openai.com/).

Then, create a `.env.local` file in the root of the project and add your OpenAI API key:

```bash
touch .env.local
```

```bash
# .env.local
OPENAI_API_KEY=sk_...
```

Finally, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.tsx`. The page auto-updates as you edit the file.

[API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/hello). This endpoint can be edited in `pages/api/hello.ts`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Contact

If you have any questions, feel free to reach out to zero-one#8699 on Discord.