import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Plus } from 'lucide-react';
import { Checkbox } from '@/components/ui/checkbox';
import useAxios from '@/hooks/useAxios';
import { useAuthUser } from 'react-auth-kit';
import { useQuery } from '@tanstack/react-query';

const squealSchemaBase = z.object({
  receivers: z
    .array(z.string())
    .nonempty({
      message: 'Devi inserire almeno un destinatario',
    })
    .refine((items) => new Set(items).size === items.length, {
      message: 'Non puoi inserire destinatari duplicati',
    }),
});

const squealSchema = z.discriminatedUnion('bodyType', [
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
// TODO: provare ad usare transform per modificare i 3 campi diversi in body

type receiver_t = `@${string}` | `#${string}` | `§${string}`;

const receiversSchema = z.object({
  receiver: z.string().regex(/^(@|#|§).+$/, {
    message: 'Il destinatario non è valido, deve iniziare con @, # o §',
  }),
});

type squealSchema_t = z.infer<typeof squealSchema>;

type receiversSchema_t = z.infer<typeof receiversSchema>;

const NewSqueal = () => {
  const privateApi = useAxios();
  const user = useAuthUser();
  const { data: quota } = useQuery(['dailyQuota'], async () => {
    // const response = await privateApi.get<user_t>(`/users/${user()?.username}`);
    // if (response.data === undefined) return 0;
    // return response.data.quota;
    await new Promise((resolve) => setTimeout(resolve, 10* 1000));
    const day = 1000, week = (7*day)-5, month = (4*week)-5;
    return {day, week, month};
  });

  const aQuota = {
    day: quota?.day ?? 0,
    week: quota?.week ?? 0,
    month: quota?.month ?? 0,
  }

  // const updatedsquealSchema = z.intersection(
  //   squealSchema,
  //   z.object({ body: z.string().max(data ?? 0) })
  // );
  // type updatedSquealSchema_t = z.infer<typeof updatedsquealSchema>;

  const updatedsquealSchema = squealSchema.refine(
    (data) => {
      if (data.bodyType === 'text') {
        return data.txt.length <= (aQuota.day);
      }
    },
    {
      message: 'Hai superato la quota giornaliera',
      path: ['txt'],
    }
  ).refine((data) => {
    if (data.bodyType === 'media') {
      return 1000 <= (aQuota.day);
    }
    return true;
  },
  {
    message: 'Per le immagini o i video hai bisogno di 1000 caratteri di quota',
    path: ['media'],
  }
  ).refine((data) => {
    if (data.bodyType === 'geolocation') {
      return 1000 <= (aQuota.day);
    }
    return true;
  }
  ,
    {
      message: 'Per la geolocalizzazione hai bisogno di 1000 caratteri di quota',
      path: ['geolocation'],
    }
  );

  type updatedSquealSchema_t = z.infer<typeof updatedsquealSchema>;

  // console.log(updatedsquealSchema.safeParse({
  //   bodyType: 'text',
  //   txt: 'ciaoasda',
  //   receivers: ['@pippo'],
  // }))

  const receiversform = useForm<receiversSchema_t>({
    resolver: zodResolver(receiversSchema),
    defaultValues: { receiver: '' },
  });

  const squealform = useForm<updatedSquealSchema_t>({
    resolver: zodResolver(updatedsquealSchema),
    defaultValues: {
      txt: '',
      bodyType: 'text',
      receivers: [],
    },
  });

  function addReceiver(values: receiversSchema_t) {
    receiversform.reset();
    squealform.setValue('receivers', [
      ...squealform.getValues('receivers'),
      values.receiver,
    ]);

    squealform.trigger('receivers');
  }
  function createSqueal(values: squealSchema_t) {
    console.log('result', values);

    // TODO: create the squeal

    const newSqueal = {};

    // privateApi.post('/squeals/', newSqueal);
  }

  const currType = squealform.watch('bodyType');

  return (
    <>
      <Form {...receiversform}>
        <form
          onSubmit={receiversform.handleSubmit(addReceiver)}
          className="container grid w-full gap-2"
        >
          <FormField
            control={receiversform.control}
            name="receiver"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Destinatari</FormLabel>
                <div className="flex space-x-2">
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <Button type="submit">
                    <Plus />
                  </Button>
                </div>
                <FormDescription>
                  Inserisci i destinatari del tuo Squeal
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </form>
      </Form>

      <Form {...squealform}>
        <form
          onSubmit={squealform.handleSubmit(createSqueal)}
          className="container grid w-full gap-2"
        >
          <FormField
            control={squealform.control}
            name="receivers"
            render={({ field }) => {
              return (
                <FormItem>
                  {field.value.map((receiver, id) => (
                    <FormField
                      key={id}
                      control={squealform.control}
                      name="receivers"
                      render={({ field }) => {
                        return (
                          <FormItem
                            key={id}
                            className="flex flex-row items-center space-x-3 space-y-0"
                          >
                            <FormControl>
                              <Checkbox
                                checked={field.value?.includes(receiver)}
                                onCheckedChange={(checked) => {
                                  return checked
                                    ? field.onChange([...field.value, receiver])
                                    : field.onChange(
                                        ((arr) => {
                                          arr.splice(id, 1);
                                          return arr;
                                        })(field.value)
                                      );
                                }}
                              />
                            </FormControl>
                            <FormLabel className="font-normal">
                              {receiver}
                            </FormLabel>
                          </FormItem>
                        );
                      }}
                    />
                  ))}
                  <FormMessage />
                </FormItem>
              );
            }}
          />

          <FormField
            control={squealform.control}
            name="bodyType"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Tipo</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Scegli un tipo" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="text">Testo</SelectItem>
                    <SelectItem value="media">Immagine/Video</SelectItem>
                    <SelectItem value="geolocation">Geolocazione</SelectItem>
                  </SelectContent>
                </Select>
                <FormDescription>
                  Scegli il tipo di Squeal che vuoi inviare
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          {currType === 'text' && (
            <FormField
              control={squealform.control}
              shouldUnregister={true}
              name="txt"
              render={({ field }) => {
                // console.log(field);

                const { value, ...rest } = field;
                return (
                  <FormItem>
                    <FormLabel>Squeal</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Hello world!"
                        {...field}
                        // value={value as string}
                      />
                    </FormControl>
                    <FormDescription>
                      Hai a disposizione {aQuota.day} caratteri per il tuo
                      Squeal
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                );
              }}
            />
          )}

          {currType === 'media' && (
            <FormField
              name="media"
              control={squealform.control}
              shouldUnregister={true}
              render={({ field }) => {
                const { value, onChange, ...rest } = field;
                return (
                  <FormItem>
                    <FormLabel>Immagine/Video</FormLabel>
                    <FormControl>
                      <Input
                        type="file"
                        accept="image/*,video/*"
                        {...rest}
                        onChange={(e) => field.onChange(e.target.files?.[0])}
                      />
                    </FormControl>
                    <FormDescription>
                      Carica un'immagine o un video per il tuo Squeal
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                );
              }}
            />
          )}

          {currType === 'geolocation' && <div>Geolocazione</div>}

          <Button type="submit">Invia</Button>
        </form>
      </Form>
      <pre>{JSON.stringify(squealform.watch(), null, 2)}</pre>
    </>
  );
};

export default NewSqueal;
