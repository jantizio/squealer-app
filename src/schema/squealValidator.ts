import { z } from 'zod';
import { squealWriteSchema } from './shared-schema/squealValidators';
import { featureCollectionSchema } from './shared-schema/utils/geojson';
import { receiverString } from './shared-schema/utils/global';
import { geoBody, mediaBody, textBody } from './shared-schema/utils/squealBody';

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
