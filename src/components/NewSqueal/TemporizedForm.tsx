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
import { Input } from '@/components/ui/input';
import { cookieOptions, tempSquealCookieKey } from '@/config';
import {
  useCreateSquealMutation,
  useUpdateGeoPointMutation,
} from '@/hooks/useSqueals';
import { cookieValidator, type cookieSchema_t } from '@/schema/cookieValidator';
import { squealWriteSchema } from '@/schema/shared-schema/squealValidators';
import { receiverString } from '@/schema/shared-schema/utils/global';
import {
  temporizedSquealFormSchema,
  type temporizedSquealSchema_t,
} from '@/schema/squealValidator';
import type { squealWrite_t } from '@/utils/types';
import { validate } from '@/utils/validators';
import { zodResolver } from '@hookform/resolvers/zod';
import Cookies from 'js-cookie';
import { Loader2 } from 'lucide-react';
import { useGeolocated } from 'react-geolocated';
import { useForm } from 'react-hook-form';
import { ReceiverInput } from './ReceiverInput';
import { ReceiversCheckbox } from './ReceiversCheckbox';

export const TemporizedForm = () => {
  const { coords, isGeolocationAvailable, isGeolocationEnabled, getPosition } =
    useGeolocated({
      positionOptions: {
        enableHighAccuracy: true,
      },
      watchPosition: true,
      isOptimisticGeolocationEnabled: false,
    });

  const { mutate: updateGeoPoint } = useUpdateGeoPointMutation();

  const temporizedSquealForm = useForm<temporizedSquealSchema_t>({
    mode: 'onChange',
    resolver: zodResolver(temporizedSquealFormSchema),
    defaultValues: {
      intervalTime: 0,
      receiver: '',
      receivers: [],
      coords: { latitude: 0, longitude: 0 },
      referenceID: '',
      endtime: '',
    },
  });

  const { mutate, isPending } = useCreateSquealMutation();

  function addReceiver() {
    const recv = temporizedSquealForm.getValues('receiver');

    if (recv === undefined) return;
    const result = receiverString.safeParse(recv);
    if (result.success === false) {
      temporizedSquealForm.trigger('receiver');
      return;
    }

    temporizedSquealForm.resetField('receiver');
    temporizedSquealForm.setValue('receivers', [
      ...temporizedSquealForm.getValues('receivers'),
      result.data,
    ]);

    temporizedSquealForm.trigger('receivers');
  }

  const createSquealHandler = temporizedSquealForm.handleSubmit(
    (values) => {
      getPosition();
      values.coords = {
        latitude: coords?.latitude ?? 0,
        longitude: coords?.longitude ?? 0,
      };
      values.referenceID = undefined;

      const newSqueal: squealWrite_t = {
        receivers: values.receivers,
        body: {
          type: 'geo',
          content: {
            type: 'FeatureCollection',
            features: [
              {
                type: 'Feature',
                properties: {
                  popup: `posizione`,
                },
                geometry: {
                  type: 'Point',
                  coordinates: [
                    values.coords.longitude,
                    values.coords.latitude,
                  ],
                },
              },
            ],
            center: [values.coords.latitude, values.coords.longitude],
          },
        },
      };
      mutate(validate(newSqueal, squealWriteSchema), {
        onSuccess(data) {
          // save a cookie with info for the temporized squeal
          // nei cookie devo salvare un array con id dello squeal creato e un timestamp della fine dell'intervallo e ogni quanto mandare lo squeal
          const newTempSquealCookie: cookieSchema_t = {
            referenceID: data.id,
            endTime: new Date(values.endtime),
            interval: values.intervalTime,
          };
          const cookieData = cookieValidator.safeParse(
            Cookies.get(tempSquealCookieKey),
          );
          Cookies.set(
            tempSquealCookieKey,
            JSON.stringify(
              cookieData.success
                ? [...cookieData.data, newTempSquealCookie]
                : [newTempSquealCookie],
            ),
            cookieOptions,
          );

          const thisInterval = setInterval(
            () => {
              if (new Date() > newTempSquealCookie.endTime) {
                clearInterval(thisInterval);
                return;
              }

              navigator.geolocation.getCurrentPosition(
                (pos) => {
                  updateGeoPoint({
                    id: newTempSquealCookie.referenceID,
                    coords: {
                      latitude: pos.coords.latitude,
                      longitude: pos.coords.longitude,
                    },
                  });
                },
                (err) => console.log(err),
              );
            },
            newTempSquealCookie.interval * 60 * 1000,
          );
        },
      });
    },
    (err) => console.log('err', err),
  );

  if (!isGeolocationAvailable || !isGeolocationEnabled)
    return (
      <div className="flex flex-col items-center justify-center">
        <p className="text-2xl">La geolocalizzazione non è attiva</p>
        <p className="text-2xl">Per favore acconsenti</p>
        <Button onClick={getPosition}>Riprova</Button>
      </div>
    );

  return (
    <Form {...temporizedSquealForm}>
      <form
        onSubmit={createSquealHandler}
        className="container grid w-full max-w-2xl gap-2"
      >
        <FormField
          control={temporizedSquealForm.control}
          name="receiver"
          render={({ field }) => (
            <ReceiverInput field={field} onClick={addReceiver} />
          )}
        />

        <FormField
          control={temporizedSquealForm.control}
          name="receivers"
          render={({ field }) => {
            return (
              <FormItem>
                {field.value.map((receiver) => (
                  <FormField
                    key={receiver}
                    control={temporizedSquealForm.control}
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
          control={temporizedSquealForm.control}
          name="intervalTime"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Intervallo di tempo</FormLabel>
              <FormControl>
                <Input {...field} type="number" />
              </FormControl>
              <FormDescription>
                Inserisci il tempo di intervallo tra uno squeal e l'altro in
                minuti
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={temporizedSquealForm.control}
          name="endtime"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Fine del tempo</FormLabel>
              <FormControl>
                <Input {...field} type="datetime-local" />
              </FormControl>
              <FormDescription>
                Inserisci il tempo di intervallo tra uno squeal e l'altro in
                minuti
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" disabled={isPending}>
          {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          Invia la tua posizione
        </Button>
      </form>
    </Form>
  );
};
