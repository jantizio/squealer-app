import { useRef } from 'react';
import { useInfiniteQuery } from '@tanstack/react-query';
// import { post_t } from '@/lib/types';

type options<T> = {
  fetchPage: (page: number) => Promise<T[]>;
  filter?: string;
};

export default function useInfinteScroll<T>({ fetchPage, filter }: options<T>) {
  const queryObj = useInfiniteQuery<T[], Error>(
    ['message', filter],
    ({ pageParam = 0 }) => fetchPage(pageParam),
    {
      getNextPageParam: (lastPage, allPages) => {
        return lastPage.length ? allPages.length : undefined;
      },
    }
  );

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
      }
    );
    if (post) intObserver.current.observe(post);
  };

  return { ...queryObj, lastPostRef };
}
