import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Form, FormField, FormItem, FormMessage } from '@/components/ui/form';
import useAxios from '@/hooks/useAxios';
import { squealIn_t } from '@/lib/types';
import {
  receiversSchema,
  receiversSchema_t,
  squealSchema,
  squealSchema_t,
} from '@/schema/squealForm';
import { useQuery } from '@tanstack/react-query';
import { useAuthUser } from 'react-auth-kit';
import ReceiverInput from './ReceiverInput';
import TypeSelect from './TypeSelect';
import BodyTextArea from './BodyTextArea';
import MediaInput from './MediaInput';
import ReceiversCheckbox from './ReceiversCheckbox';

type receiver_t = `@${string}` | `#${string}` | `§${string}`;

const nonTextQuota = 1000;

const NewSqueal = () => {
  const privateApi = useAxios();
  const user = useAuthUser();
  const { data } = useQuery(['dailyQuota'], async () => {
    // TODO: get the quota from the server
    // const response = await privateApi.get<user_t>(`/users/${user()?.username}`);
    // if (response.data === undefined) return 0;
    // return response.data.quota;
    await new Promise((resolve) => setTimeout(resolve, 10 * 1000));
    const day = 1000,
      week = 7 * day - 5,
      month = 4 * week - 5;
    return { day, week, month };
  });

  // Set the quota to 0 while loading
  const quota = {
    day: data?.day ?? 0,
    week: data?.week ?? 0,
    month: data?.month ?? 0,
  };

  // modify the schema to check the quota
  const updatedsquealSchema = squealSchema
    .refine(
      (data) => {
        if (data.bodyType === 'text') {
          return data.txt.length <= quota.day;
        }
        return true;
      },
      {
        message: 'Hai superato la quota giornaliera',
        path: ['txt'],
      }
    )
    .refine(
      (data) => {
        if (data.bodyType === 'media') {
          return nonTextQuota <= quota.day;
        }
        return true;
      },
      {
        message:
          'Per le immagini o i video hai bisogno di 1000 caratteri di quota',
        path: ['media'],
      }
    )
    .refine(
      (data) => {
        if (data.bodyType === 'geolocation') {
          return nonTextQuota <= quota.day;
        }
        return true;
      },
      {
        message:
          'Per la geolocalizzazione hai bisogno di 1000 caratteri di quota',
        path: ['geolocation'],
      }
    );

  type updatedSquealSchema_t = z.infer<typeof updatedsquealSchema>;

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

    let body: squealIn_t['body'];
    if (values.bodyType === 'text') {
      body = values.txt;
    } else if (values.bodyType === 'media') {
      body = values.media;
    } else if (values.bodyType === 'geolocation') {
      // body = values.geo;
      body = 'TODO: geolocation';
    } else {
      throw new Error('Invalid body type');
    }

    // TODO: create the squeal
    const newSqueal: squealIn_t = {
      body,
      receivers: values.receivers,
      author: user()?.username,
      automatic_receiver: [''],
      category: [''],
    };

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
            render={({ field }) => <ReceiverInput field={field} />}
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
                      render={({ field }) => (
                        <ReceiversCheckbox field={field} receiver={receiver} />
                      )}
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
            render={({ field }) => <TypeSelect field={field} />}
          />

          {currType === 'text' && (
            <FormField
              control={squealform.control}
              shouldUnregister={true}
              name="txt"
              render={({ field }) => (
                <BodyTextArea field={field} quota={quota} />
              )}
            />
          )}

          {currType === 'media' && (
            <FormField
              name="media"
              control={squealform.control}
              shouldUnregister={true}
              render={({ field }) => <MediaInput field={field} />}
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
