import { useRef } from 'react';
import { useSquealsQuery } from './useSqueals';

type options = {
  filter?: string;
  author?: string;
  channelName?: string;
};

export default function useInfiniteScroll({
  filter,
  author,
  channelName,
}: options) {
  const queryObj = useSquealsQuery(filter, author, channelName);

  const intObserver = useRef<IntersectionObserver | null>(null);
  const lastPostRef = (post: HTMLDivElement) => {
    if (queryObj.isFetchingNextPage) return;

    if (intObserver.current) intObserver.current.disconnect();

    intObserver.current = new IntersectionObserver(
      (posts: IntersectionObserverEntry[]) => {
        if (posts[0]?.isIntersecting && queryObj.hasNextPage) {
          console.log("vicini all'ultimo post");
          queryObj.fetchNextPage();
        }
      },
    );
    if (post) intObserver.current.observe(post);
  };

  return { ...queryObj, lastPostRef };
}
