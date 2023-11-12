import { Message } from '@/components/Message';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Skeleton } from '@/components/ui/skeleton';
import { useInfiniteScroll } from '@/hooks/useInfiniteScroll';
import { AlertCircle, Loader2, Frown } from 'lucide-react';
import { H1, Large } from '@/components/ui/typography';
import type { squealRead_t } from '@/utils/types';

type Props = Readonly<{
  filter?: string;
  author?: string;
  channelName?: string;
}>;

export const MessageScroller = ({ filter, author, channelName }: Props) => {
  const { data, error, isFetchingNextPage, lastPostRef } = useInfiniteScroll({
    filter,
    author,
    channelName,
  });

  const squealsList2 = data?.pages;

  if (squealsList2) {
    const squealsList = [...mockData, ...squealsList2];

    if (squealsList.length > 0)
      return (
        <div className="container mt-14">
          {squealsList.map((squeal, i) => {
            const isLast = squealsList.length - 1 === i;
            return (
              <Message key={squeal._id} ref={isLast ? lastPostRef : undefined}>
                {squeal}
              </Message>
            );
          })}
          {isFetchingNextPage && (
            <div className="my-6 text-center">
              <Loader2 className="mx-auto inline animate-spin" size={36} />
            </div>
          )}
        </div>
      );
    // empty list
    return (
      <div className="container mt-14">
        <H1 className="text-center">Nessun risultato</H1>
        <Large className="text-center">
          Non esiste niente del genere <Frown className="inline" />
        </Large>
      </div>
    );
  }

  if (error)
    return (
      <Alert variant="destructive" className="container mt-14 w-11/12 max-w-md">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Errore</AlertTitle>
        <AlertDescription>
          Non sono riuscito a caricare i tuoi squeal!
          {error && error instanceof Error ? ` Errore: ${error.message}` : ''}
        </AlertDescription>
      </Alert>
    );

  return (
    <div className="container mt-14">
      {Array.from({ length: 4 }, (_, i) => (
        <Skeleton
          key={i}
          className="mx-auto mb-6 h-52 max-w-prose rounded p-5"
        />
      ))}
    </div>
  );
};

// TODO: remove mock data
const mockData: squealRead_t[] = [
  {
    _id: '1',
    author: '@Giovanni',
    body: {
      type: 'geo',
      content: {
        type: 'FeatureCollection',
        features: [
          {
            type: 'Feature',
            properties: {
              title: 'Mapbox',
              popup: 'Washington, D.C.',
            },
            geometry: {
              type: 'Point',
              coordinates: [-77.032, 38.913],
            },
          },
        ],
        center: [12.492507, 41.890251],
      },
    },
    category: [],
    datetime: new Date(),
    impressions: 200000000,
    negative_reaction: 0,
    positive_reaction: 0,
    receivers: ['§animals', '@marco'],
  },
];
