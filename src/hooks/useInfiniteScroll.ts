import { useRef } from 'react';
import { useInfiniteQuery } from '@tanstack/react-query';
// import { post_t } from '@/globals/types';

type options<T> = {
  fetchPage: (page: number) => Promise<T[]>;
  filter: string;
};

export default function useInfinteScroll<T>({ fetchPage, filter }: options<T>) {
  const {
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    data,
    isError,
    error,
  } = useInfiniteQuery(
    ['message', filter],
    ({ pageParam = 1 }) => fetchPage(pageParam),
    {
      getNextPageParam: (lastPage, allPages) => {
        return lastPage.length ? allPages.length + 1 : undefined;
      },
    }
  );

  const intObserver = useRef<IntersectionObserver | null>(null);
  const lastPostRef = (post: HTMLDivElement) => {
    if (isFetchingNextPage) return;

    if (intObserver.current) intObserver.current.disconnect();

    intObserver.current = new IntersectionObserver(
      (posts: IntersectionObserverEntry[]) => {
        if (posts[0]?.isIntersecting && hasNextPage) {
          console.log("vicini all'ultimo post");
          fetchNextPage();
        }
      }
    );
    if (post) intObserver.current.observe(post);
  };

  return { data, isError, error, isFetchingNextPage, lastPostRef };
}
