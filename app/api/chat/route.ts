import { openai } from '@ai-sdk/openai';
import Sandbox from '@e2b/code-interpreter';
import { streamText } from 'ai';
import { z } from 'zod';
import { put } from '@vercel/blob';

// Allow streaming responses up to 30 seconds
export const maxDuration = 30;

export async function POST(req: Request) {
  const { messages } = await req.json();
  const userID = 'yashsharma@22#';

  const result = streamText({
    model: openai('gpt-4o-mini'),
    system: SystemPrompt,
    messages,
    tools: {
      runCode: {
        description:
          'Execute python code in a Jupyter notebook cell and return result',
        parameters: z.object({
          code: z
            .string()
            .describe('The python code to execute in a single cell'),
        }),
        execute: async ({ code }) => {
          // Create a sandbox, execute LLM-generated code, and return the result
          console.log('Executing code', code);
          const sandbox = await Sandbox.create({
            metadata: {
              userID,
            },
            timeoutMs: 60_000, // 1 minute in ms
          });

          const { text, results, logs, error } = await sandbox.runCode(code);
          console.log(text, results, logs, error);

          return {
            text,
            results,
            logs,
            error,
          };
        },
      },
      uploadTos3: {
        description:
          'Upload a given file to Vercel Blob storage and return the file path and content',
        parameters: z.object({
          filePath: z.string().describe('The path of the file to upload'),
        }),
        execute: async ({ filePath }) => {
          const runningSandboxes = await Sandbox.list();

          const sbxId = runningSandboxes.find((sandbox) => {
            return sandbox.metadata.userID === userID;
          })?.sandboxId;

          if (sbxId) {
            const sandbox = await Sandbox.connect(sbxId);

            const file = await sandbox.files.read(filePath);
            const fileName = filePath.split('/').pop() || 'DataFile';

            // Mock upload to S3 or any other storage
            const blob = await put(fileName, file, {
              access: 'public',
            });

            return {
              filePath: blob.downloadUrl,
            };
          } else {
            throw new Error('Sandbox not found');
          }
        },
      },
    },
  });

  return result.toDataStreamResponse();
}

const SystemPrompt = `
You are an expert data mocking assistant.
Generate Python code to mock data for the given user input.
Before generating the code, ask the user for the following:
1. Confirm the columns and data types for the mock data.
2. Confirm the number of rows of data to generate.
3. Confirm the format of the data file if already not provided (CSV, Excel, etc.).

Generate additional code to create the requested data file
in the system and return the file path.

So, if the user asks for a CSV file,
generate the code to create a CSV file and return the file path.

If the user asks for an Excel file,
generate the code to create an Excel file and return the file path.

Now, this file path will be used to upload the file to S3.

Final result should be the s3 file path.
`;
