import { addMedia } from '@/api/media';
import { useUserContext } from '@/components/CurrentUserContext';
import { LoggedHeader } from '@/components/Header/LoggedHeader';
import { Button } from '@/components/ui/button';
import { Form, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { useSquealerQuota } from '@/hooks/useSquealerQuota';
import { useCreateSquealMutation } from '@/hooks/useSqueals';
import { squealWriteSchema } from '@/schema/shared-schema/squealValidators';
import { receiverString } from '@/schema/shared-schema/utils/global';
import { validate } from '@/utils/validators';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';
import { BodyTextArea } from './BodyTextArea';
import { MediaInput } from './MediaInput';
import { ReceiverInput } from './ReceiverInput';
import { ReceiversCheckbox } from './ReceiversCheckbox';
import { TypeSelect } from './TypeSelect';
import { UrlInput } from './UrlInput';

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

      createSqueal(validate(values, squealWriteSchema));
    },
    (err) => console.log('err', err),
  );

  const currType = squealform.watch('body.type');
  const currContent = squealform.watch('body.content');
  const currMedia = squealform.watch('body.file');
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

          {/* {currType === 'geolocation' && <div>Geolocazione</div>} */}

          <Button type="submit">Invia</Button>
        </form>
      </Form>
      <pre>{JSON.stringify(form, null, 2)}</pre>
    </>
  );
};
