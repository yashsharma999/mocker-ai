import { z } from 'zod';

export const dataSchema = z.object({
  tables: z
    .array(
      z.object({
        name: z.string().describe('The name of the table'),
        columns: z
          .array(
            z.object({
              name: z.string().describe('The name of the column'),
              type: z.string().describe('The type of the column'),
              description: z
                .string()
                .optional()
                .describe('The description of the column'),
              isPrimaryKey: z
                .boolean()
                .optional()
                .describe('Indicates if the column is a primary key'),
            })
          )
          .describe('The columns of the table'),
        description: z
          .string()
          .optional()
          .describe('The description of the table'),
      })
    )
    .describe('The tables in the schema'),
});
