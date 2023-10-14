import Message from '@/components/Message';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Skeleton } from '@/components/ui/skeleton';
import useInfiniteScroll from '@/hooks/useInfiniteScroll';
import { AlertCircle, Loader2 } from 'lucide-react';

type MessageScrollerProps = {
  filter?: string;
  author?: string;
  channelName?: string;
};

const MessageScroller = ({
  filter,
  author,
  channelName,
}: MessageScrollerProps) => {
  const { data, error, isFetchingNextPage, lastPostRef } = useInfiniteScroll({
    filter,
    author,
    channelName,
  });

  const squealsList = data?.pages;

  if (squealsList)
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
      {Array.from({ length: 10 }, (_, i) => (
        <Skeleton
          key={i}
          className="mx-auto mb-6 h-52 max-w-prose rounded p-5"
        />
      ))}
    </div>
  );
};
export default MessageScroller;
