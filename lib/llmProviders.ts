import { createOpenAI } from '@ai-sdk/openai';
import { BYOK_API_KEY } from './constants';

export const openai = createOpenAI({
  // custom settings, e.g.
  compatibility: 'strict', // strict mode, enable when using the OpenAI API
  apiKey: localStorage.getItem(BYOK_API_KEY) || process.env.OPENAI_API_KEY,
});
