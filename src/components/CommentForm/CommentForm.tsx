import { addMedia } from '@/api/media';
import { MapComponent } from '@/components/MapComponent';
import { BodyTextArea } from '@/components/NewSqueal/BodyTextArea';
import { MediaInput } from '@/components/NewSqueal/MediaInput';
import { TypeSelect } from '@/components/NewSqueal/TypeSelect';
import { UrlInput } from '@/components/NewSqueal/UrlInput';
import { Button } from '@/components/ui/button';
import { Form, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { useCreateCommentMutation } from '@/hooks/useComment';
import { useSquealerQuota } from '@/hooks/useSquealerQuota';
import { useUser } from '@/lib/auth';
import { commentWriteSchema } from '@/schema/shared-schema/commentValidators';
import type { featureCollection_t } from '@/schema/shared-schema/utils/geojson';
import {
  commentFormSchema,
  type commentSchema_t,
} from '@/schema/squealValidator';
import { validate } from '@/utils/validators';
import { zodResolver } from '@hookform/resolvers/zod';
import { Loader2 } from 'lucide-react';
import { useGeolocated } from 'react-geolocated';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';

type Props = Readonly<{
  referenceID: string;
  onSuccessfulComment?: () => void;
}>;

export const CommentForm = ({ referenceID, onSuccessfulComment }: Props) => {
  const currentUserQuery = useUser();
  const { mutate, isPending } = useCreateCommentMutation();

  const { quota, updatedsquealSchema } = useSquealerQuota(commentFormSchema);
  const commentForm = useForm<commentSchema_t>({
    resolver: zodResolver(updatedsquealSchema),
    defaultValues: {
      body: { type: 'text', content: '' },
      reference: referenceID,
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

  const commentSquealHandler = commentForm.handleSubmit(async (values) => {
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

    const newComment: object = {
      ...values,
      body: {
        type: values.body.type,
        content:
          values.body.type === 'geo' ? values.body.geo : values.body.content,
      },
    };

    mutate(validate(newComment, commentWriteSchema), {
      onSuccess: () => {
        onSuccessfulComment?.();
      },
    });
  });

  const currType = commentForm.getValues('body.type');
  const currContent = commentForm.getValues('body.content');
  const currMedia = commentForm.getValues('body.file');
  const currGeo = commentForm.getValues('body.geo');

  return (
    <Form {...commentForm}>
      <form onSubmit={commentSquealHandler}>
        <FormField
          control={commentForm.control}
          name="body.type"
          render={({ field }) => <TypeSelect field={field} />}
        />

        {currType === 'text' && (
          <FormField
            control={commentForm.control}
            shouldUnregister={true}
            name="body.content"
            render={({ field }) => <BodyTextArea field={field} quota={quota} />}
          />
        )}

        {currType === 'media' && (
          <>
            {
              <FormField
                name="body.content"
                control={commentForm.control}
                shouldUnregister={true}
                render={({ field }) => (
                  <UrlInput field={field} disabled={currMedia !== undefined} />
                )}
              />
            }
            <FormField
              name="body.file"
              control={commentForm.control}
              shouldUnregister={true}
              render={({ field }) => (
                <MediaInput
                  field={field}
                  disabled={currContent !== ''}
                  reset={() => {
                    commentForm.resetField('body.file');
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
            control={commentForm.control}
            shouldUnregister={true}
            render={() => {
              return (
                <FormItem>
                  <Button
                    type="button"
                    disabled={!isGeolocationAvailable || !isGeolocationEnabled}
                    onClick={() => {
                      getPosition();
                      const newGeo: featureCollection_t = {
                        type: 'FeatureCollection',
                        features: [
                          {
                            type: 'Feature',
                            properties: {
                              popup: `posizione di ${currentUserQuery.data?.username}`,
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
                        center: [coords?.latitude ?? 0, coords?.longitude ?? 0],
                      };

                      commentForm.setValue('body.geo', newGeo);
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

        <Button type="submit" disabled={isPending}>
          {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          Commenta
        </Button>
      </form>
    </Form>
  );
};
