import { z } from 'zod';
import {
  squealWriteSchema,
  mediaBody,
  textBody,
  geoBody,
} from './shared-schema/squealValidators';
import { receiverString } from './shared-schema/utils/global';
import { featureCollectionSchema } from './shared-schema/utils/geojson';

export const squealFormSchema = squealWriteSchema
  .extend({
    receiver: z.union([receiverString, z.literal('')]),
    body: z.discriminatedUnion('type', [
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
    ]),
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
