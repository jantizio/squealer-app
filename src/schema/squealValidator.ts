import { z } from 'zod';
import { squealWriteSchema } from './shared-schema/squealValidators';
import { featureCollectionSchema } from './shared-schema/utils/geojson';
import { receiverString, receiversArray } from './shared-schema/utils/global';
import { geoBody, mediaBody, textBody } from './shared-schema/utils/squealBody';
import { commentWriteSchema } from './shared-schema/commentValidators';

const newBody = z.discriminatedUnion('type', [
  textBody,
  mediaBody.extend({
    content: mediaBody.shape.content.or(z.literal('')),
    file: z
      .instanceof(File, {
        message: "Devi caricare un'immagine o un video",
      })
      .optional(),
  }),
  geoBody.extend({
    content: z.literal(''),
    geo: featureCollectionSchema,
  }),
]);

export const squealFormSchema = squealWriteSchema
  .extend({
    receiver: z.union([receiverString, z.literal('')]),
    body: newBody,
  })
  .superRefine((data, ctx) => {
    if (
      data.body.type === 'media' &&
      data.body.content === '' &&
      data.body.file === undefined
    ) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Devi inserire un URL o caricare un file',
        path: ['body.content'],
      });
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Devi inserire un URL o caricare un file',
        path: ['body.file'],
      });
    }
  });

export type squealSchema_t = z.infer<typeof squealFormSchema>;

export const commentFormSchema = commentWriteSchema
  .extend({
    body: newBody,
  })
  .superRefine((data, ctx) => {
    if (
      data.body.type === 'media' &&
      data.body.content === '' &&
      data.body.file === undefined
    ) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Devi inserire un URL o caricare un file',
        path: ['body.content'],
      });
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Devi inserire un URL o caricare un file',
        path: ['body.file'],
      });
    }
  });

export type commentSchema_t = z.infer<typeof commentFormSchema>;

export const temporizedSquealFormSchema = z.object({
  coords: z.object({
    latitude: z.number(),
    longitude: z.number(),
  }),
  receivers: receiversArray,
  receiver: z.union([receiverString, z.literal('')]),
  intervalTime: z.preprocess(
    (val) => Number(val),
    z.number().int().positive().min(1, { message: 'Il minimo è 1 minuto' }),
  ),
  endtime: z.string().refine(
    (val) => {
      const date = new Date(val);
      return date > new Date();
    },
    { message: 'Questa data è già passata' },
  ),
  referenceID: z.string().optional(),
});

export type temporizedSquealSchema_t = z.infer<
  typeof temporizedSquealFormSchema
>;
