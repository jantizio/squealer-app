import { z } from 'zod';

const squealSchemaBase = z.object({
  receiver: z
    .string()
    .regex(/^$|^((@|#|§).+)$/, {
      message: 'Il destinatario non è valido, deve iniziare con @, # o §',
    })
    .optional(),
  receivers: z
    .array(z.string())
    .nonempty({
      message: 'Devi inserire almeno un destinatario',
    })
    .refine((items) => new Set(items).size === items.length, {
      message: 'Non puoi inserire destinatari duplicati',
    }),
});

export const squealFormSchema = z.discriminatedUnion('bodyType', [
  z
    .object({
      bodyType: z.literal('text'),
      txt: z.string().min(1),
    })
    .merge(squealSchemaBase),
  z
    .object({
      bodyType: z.literal('media'),
      media: z.instanceof(File, {
        message: "Devi caricare un'immagine o un video",
      }), //TODO: aggiungere validazione sul tipo di file
    })
    .merge(squealSchemaBase),
  z
    .object({
      bodyType: z.literal('geolocation'),
      geo: z.object({
        //TODO: definire meglio lo schema
        latitude: z.number(),
        longitude: z.number(),
      }),
    })
    .merge(squealSchemaBase),
]);
export type squealSchema_t = z.infer<typeof squealFormSchema>;
