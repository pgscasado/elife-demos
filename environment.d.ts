declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NODE_ENV: 'development' | 'production' | 'test';
      PUBLIC_URL: string;
      OPENAI_API_KEY: `sk-`;
      AI_MODEL: 'text-davinci-003' | 'text-curie-001' | 'text-babbage-001' | 'text-ada-001';
      AI_MAX_TOKENS: `${number}`;
    }
  }
}

export { }