import { openai } from '@ai-sdk/openai';
import Sandbox from '@e2b/code-interpreter';
import { generateObject, streamText } from 'ai';
import { z } from 'zod';

import { put } from '@vercel/blob';
import { dataSchema } from '../generate_schema/schema';
import { prisma } from '@/lib/prisma';
import { auth } from '@clerk/nextjs/server';

// Allow streaming responses up to 30 seconds
export const maxDuration = 30;

export async function POST(req: Request) {
  const { messages } = await req.json();
  const { userId: clerkId } = await auth();

  const user = await prisma.user.findUnique({
    where: { clerkId: clerkId || '' },
    select: { id: true },
  });
  const userId = user?.id;

  if (!userId) {
    return new Response('Unauthorized', { status: 401 });
  }

  //check credits
  const credits = await prisma.credits.findUnique({
    where: { userId: userId },
    select: { amount: true },
  });
  if (!credits || credits.amount <= 0) {
    return new Response('Insufficient credits, please contact support.', {
      status: 402,
    });
  }

  const result = streamText({
    model: openai('gpt-4o-mini'),
    system: SystemPrompt,
    messages,
    tools: {
      generateSchema: {
        description: 'Generate a data schema for the given user input',
        parameters: z.object({
          userContext: z
            .string()
            .describe('The business context that the user gave.'),
        }),
        execute: async ({ userContext }) => {
          const { object } = await generateObject({
            model: openai('gpt-4o-mini'),
            schema: dataSchema,
            prompt:
              `Generate data schema for the following user requirement: ` +
              userContext,
            maxTokens: 1000,
          });
          return object;
        },
      },
      runCode: {
        description:
          'Execute python code in a Jupyter notebook cell and return result',
        parameters: z.object({
          code: z
            .string()
            .describe('The python code to execute in a single cell'),
        }),
        execute: async ({ code }) => {
          try {
            console.log('Running code:', code);
            const sandbox = await Sandbox.create({
              metadata: {
                userId: userId as string,
              },
              timeoutMs: 120_000, // 2 minutes in ms
            });

            await sandbox.commands.run('pip install faker'); // This will install the faker package
            await sandbox.commands.run('pip install openpyxl'); // This will install the openpyxl package

            const { text, results, logs, error } = await sandbox.runCode(code);

            return {
              text,
              results,
              logs,
              error,
            };
          } catch (error) {
            console.error('Error running code:', error);
            throw new Error('Failed to run code');
          }
        },
      },
      uploadToStorage: {
        description:
          'Upload a given file to Vercel Blob storage and return the file path and content',
        parameters: z.object({
          filePath: z.string().describe('The path of the file to upload'),
        }),
        execute: async ({ filePath }) => {
          const runningSandboxes = await Sandbox.list();

          const sbxId = runningSandboxes.find((sandbox) => {
            return sandbox.metadata.userId === userId;
          })?.sandboxId;

          if (sbxId) {
            try {
              const sandbox = await Sandbox.connect(sbxId);

              const file = await sandbox.files.read(filePath, {
                format: 'bytes',
              });

              const fileName = filePath.split('/').pop() || 'DataFile';

              // Mock upload to S3 or any other storage
              const blob = await put(fileName, Buffer.from(file), {
                access: 'public',
                addRandomSuffix: true,
              });

              await prisma.dataSource.create({
                data: {
                  name: fileName,
                  type: filePath.split('.').pop() || 'csv',
                  url: blob.downloadUrl,
                  userId: userId as string,
                },
              });

              return {
                filePath: blob.downloadUrl,
              };
            } catch (error) {
              console.error('Error uploading file:', error);
              throw new Error('Failed to upload file');
            }
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
Your task is to generate a data schema and then generate python code to mock data for the given user input.
The data generated should be as realistic as possible, use the Fake data library to generate the data.

## CRITICAL : Do not show the generated schema to the user.

Ask the user for confirmation on the generated schema before proceeding to generate the code.
Also, ask the user to confirm the type of file they want to store the generated data in (CSV or Excel).

If the user confirms, generate and execute the code block to mock data and store the generated data in the given file formats.
### IMPORTANT: Upload all the files to Vercel Blob storage and return the respective download URLs
`;
