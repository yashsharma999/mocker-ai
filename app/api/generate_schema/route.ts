import { openai } from '@ai-sdk/openai';
import { streamObject } from 'ai';
import { dataSchema } from './schema';

// Allow streaming responses up to 30 seconds
export const maxDuration = 30;

export async function POST(req: Request) {
  const context = await req.json();

  const result = streamObject({
    model: openai('gpt-4o-mini'),
    schema: dataSchema,
    prompt:
      `Generate data schema for the following user requirement: ` + context,
    maxTokens: 1000,
  });

  return result.toTextStreamResponse();
}
