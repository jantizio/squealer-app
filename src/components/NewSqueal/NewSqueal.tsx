import { addMedia } from '@/api/media';
import { useUserContext } from '@/components/CurrentUserContext';
import { LoggedHeader } from '@/components/Header/LoggedHeader';
import { MapComponent } from '@/components/MapComponent';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form';
import { useSquealerQuota } from '@/hooks/useSquealerQuota';
import { useCreateSquealMutation } from '@/hooks/useSqueals';
import { squealWriteSchema } from '@/schema/shared-schema/squealValidators';
import { receiverString } from '@/schema/shared-schema/utils/global';
import { validate } from '@/utils/validators';
import { zodResolver } from '@hookform/resolvers/zod';
import { useGeolocated } from 'react-geolocated';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';
import { BodyTextArea } from './BodyTextArea';
import { MediaInput } from './MediaInput';
import { ReceiverInput } from './ReceiverInput';
import { ReceiversCheckbox } from './ReceiversCheckbox';
import { TypeSelect } from './TypeSelect';
import { UrlInput } from './UrlInput';
import type { featureCollection_t } from '@/schema/shared-schema/utils/geojson';
import { Input } from '../ui/input';

export const NewSqueal = () => {
  const authUser = useUserContext();
  if (!authUser) {
    throw new Error('CurrentUserContext: No value provided');
  }
  const { mutate: createSqueal } = useCreateSquealMutation();
  const { quota, updatedsquealSchema } = useSquealerQuota();

  type updatedSquealSchema_t = z.infer<typeof updatedsquealSchema>;

  const squealform = useForm<updatedSquealSchema_t>({
    mode: 'onChange',
    resolver: zodResolver(updatedsquealSchema),
    defaultValues: {
      receiver: '',
      receivers: [],
      author: authUser.username,
      body: { type: 'text', content: '' },
      category: [],
    },
  });

  const { coords, isGeolocationAvailable, isGeolocationEnabled, getPosition } =
    useGeolocated({
      positionOptions: {
        enableHighAccuracy: true,
      },
      watchPosition: true,
      isOptimisticGeolocationEnabled: false,
    });

  function addReceiver() {
    const recv = squealform.getValues('receiver');

    if (recv === undefined) return;
    const result = receiverString.safeParse(recv);
    if (result.success === false) {
      squealform.trigger('receiver');
      return;
    }

    squealform.resetField('receiver');
    squealform.setValue('receivers', [
      ...squealform.getValues('receivers'),
      result.data,
    ]);

    squealform.trigger('receivers');
  }

  const createSquealHandler = squealform.handleSubmit(
    async (values) => {
      console.log('result', values); //TODO: remove log

      if (values.body.type === 'media' && values.body.file instanceof File) {
        // upload the file and get the url
        // then set the url as the content

        const url = await addMedia(values.body.file).catch((err) => {
          console.log('err', err);
          return null;
        });

        if (url === null) {
          return toast.error("Errore durante l'upload del file");
        } else {
          values.body.content = url;
        }
      }
      if (values.body.type === 'geo') {
        values.body.content = values.body.geo;
      }

      createSqueal(validate(values, squealWriteSchema));
    },
    (err) => console.log('err', err),
  );

  const currType = squealform.getValues('body.type');
  const currContent = squealform.getValues('body.content');
  const currMedia = squealform.getValues('body.file');
  const currGeo = squealform.getValues('body.geo');
  const form = squealform.watch();

  return (
    <>
      <LoggedHeader />
      <Form {...squealform}>
        <form
          onSubmit={createSquealHandler}
          className="container grid w-full gap-2"
        >
          <FormField
            control={squealform.control}
            name="receiver"
            render={({ field }) => (
              <ReceiverInput field={field} onClick={addReceiver} />
            )}
          />

          <FormField
            control={squealform.control}
            name="receivers"
            render={({ field }) => {
              return (
                <FormItem>
                  {field.value.map((receiver) => (
                    <FormField
                      key={receiver}
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
            name="body.type"
            render={({ field }) => <TypeSelect field={field} />}
          />

          {currType === 'text' && (
            <FormField
              control={squealform.control}
              shouldUnregister={true}
              name="body.content"
              render={({ field }) => (
                <BodyTextArea field={field} quota={quota} />
              )}
            />
          )}

          {currType === 'media' && (
            <>
              {
                <FormField
                  name="body.content"
                  control={squealform.control}
                  shouldUnregister={true}
                  render={({ field }) => (
                    <UrlInput
                      field={field}
                      disabled={currMedia !== undefined}
                    />
                  )}
                />
              }
              <FormField
                name="body.file"
                control={squealform.control}
                shouldUnregister={true}
                render={({ field }) => (
                  <MediaInput
                    field={field}
                    disabled={currContent !== ''}
                    reset={() => {
                      squealform.resetField('body.file');
                    }}
                  />
                )}
              />
            </>
          )}

          {currType === 'geo' && (
            // https://www.npmjs.com/package/react-geocode

            <FormField
              name="body.content"
              control={squealform.control}
              shouldUnregister={true}
              render={({ field }) => {
                return (
                  <FormItem>
                    <FormControl>
                      <Input type="hidden" {...field} />
                    </FormControl>
                    <Button
                      type="button"
                      disabled={
                        !isGeolocationAvailable || !isGeolocationEnabled
                      }
                      onClick={() => {
                        getPosition();
                        const newGeo: featureCollection_t = {
                          type: 'FeatureCollection',
                          features: [
                            {
                              type: 'Feature',
                              properties: {
                                popup: 'Sei qui',
                              },
                              geometry: {
                                type: 'Point',
                                coordinates: [
                                  coords?.longitude ?? 0,
                                  coords?.latitude ?? 0,
                                ],
                              },
                            },
                          ],
                          center: [
                            coords?.latitude ?? 0,
                            coords?.longitude ?? 0,
                          ],
                        };

                        squealform.setValue(
                          'body.content',
                          JSON.stringify(newGeo),
                        );
                        squealform.setValue('body.geo', newGeo);
                      }}
                    >
                      Salva
                    </Button>
                    {!!currGeo && (
                      <MapComponent center={currGeo.center} data={currGeo} />
                    )}
                    <FormMessage />
                  </FormItem>
                );
              }}
            />
          )}

          <Button type="submit">Invia</Button>
        </form>
      </Form>
      <pre>{JSON.stringify(form, null, 2)}</pre>
    </>
  );
};
