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

## Contact

If you have any questions, feel free to reach out to zero-one#8699 on Discord.