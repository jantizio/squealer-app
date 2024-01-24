import { z } from 'zod';

const literalSchema = z.union([z.string(), z.number(), z.boolean(), z.null()]);

type Literal = z.infer<typeof literalSchema>;

type Json = Literal | { [key: string]: Json } | Json[];

const jsonSchema: z.ZodType<Json> = z.lazy(() =>
  z.union([literalSchema, z.array(jsonSchema), z.record(jsonSchema)]),
);

const stringToJSONSchema = z
  .string()
  .transform((str, ctx): z.infer<typeof jsonSchema> => {
    try {
      return JSON.parse(str) as Json;
    } catch (e) {
      ctx.addIssue({ code: 'custom', message: 'Invalid JSON' });
      return z.NEVER;
    }
  });

const datelikeToDate = z
  .union([z.number(), z.string(), z.date()])
  .pipe(z.coerce.date());

const cookieSchema = z.object({
  referenceID: z.string(),
  endTime: datelikeToDate,
  interval: z.number().int().positive(),
});

export const cookieValidator = stringToJSONSchema.pipe(z.array(cookieSchema));

export type cookieSchema_t = z.infer<typeof cookieSchema>;
