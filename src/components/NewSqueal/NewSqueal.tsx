import { Button } from '@/components/ui/button';
import { Form, FormField, FormItem, FormMessage } from '@/components/ui/form';

import { privateApi } from '@/lib/axios';
import useSquealerQuota from '@/hooks/useSquealerQuota';
import { useToast } from '@/hooks/useToast';
import { squealWriteSchema } from '@/schema/shared-schema/squealValidators';
import { receiverString } from '@/schema/shared-schema/utils/global';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import BodyTextArea from './BodyTextArea';
import MediaInput from './MediaInput';
import ReceiverInput from './ReceiverInput';
import ReceiversCheckbox from './ReceiversCheckbox';
import TypeSelect from './TypeSelect';
import UrlInput from './UrlInput';
import useAuth from '@/hooks/auth/useAuth';

const NewSqueal = () => {
  const {
    state: { authUser },
  } = useAuth();
  const { toast } = useToast();
  const { quota, updatedsquealSchema } = useSquealerQuota();

  type updatedSquealSchema_t = z.infer<typeof updatedsquealSchema>;

  const squealform = useForm<updatedSquealSchema_t>({
    mode: 'onChange',
    resolver: zodResolver(updatedsquealSchema),
    defaultValues: {
      receiver: '',
      receivers: [],
      author: authUser?.username,
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

  const createSqueal = squealform.handleSubmit(async (values) => {
    console.log('result', values);

    if (values.body.type === 'media' && values.body.file !== undefined) {
      // upload the file and get the url
      // then set the url as the content
      const formData = new FormData();
      formData.append('media', values.body.file);

      // TODO: try catch
      const fileurlResp = await privateApi.post<string>('/media', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      values.body.content = fileurlResp.data;
    }

    const newSqueal = squealWriteSchema.safeParse(values);
    if (newSqueal.success) {
      console.log('newSqueal', newSqueal.data);
      privateApi.post('/squeals/', newSqueal.data);
    } else {
      const errorsMessage = newSqueal.error.issues
        .map((issue) => issue.message)
        .toString();

      console.log('error', errorsMessage);
      toast({
        variant: 'destructive',
        title: 'Uh oh! qualcosa è andato storto.',
        description: errorsMessage,
      });
    }
  });

  const currType = squealform.watch('body.type');
  const currContent = squealform.watch('body.content');
  const currMedia = squealform.watch('body.file');
  const form = squealform.watch();

  return (
    <>
      <Form {...squealform}>
        <form onSubmit={createSqueal} className="container grid w-full gap-2">
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

export default NewSqueal;
