import { useRef } from 'react';
import { useInfiniteQuery } from '@tanstack/react-query';
import { post_t } from '@/globals/types';

type options = {
  fetchPage: (page: number) => Promise<post_t[]>;
};

export default function ({ fetchPage }: options) {
  const {
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    data,
    isError,
    error,
  } = useInfiniteQuery(
    ['message'],
    ({ pageParam = 1 }) => fetchPage(pageParam),
    {
      getNextPageParam: (lastPage, allPages) => {
        return lastPage.length ? allPages.length + 1 : undefined;
      },
    }
  );

  const intObserver = useRef<IntersectionObserver>();
  const lastPostRef = (post: HTMLDivElement) => {
    if (isFetchingNextPage) return;

    if (intObserver.current) intObserver.current.disconnect();

    intObserver.current = new IntersectionObserver(
      (posts: IntersectionObserverEntry[]) => {
        if (posts[0].isIntersecting && hasNextPage) {
          console.log("vicini all'ultimo post");
          fetchNextPage();
        }
      }
    );
    if (post) intObserver.current.observe(post);
  };

  return { data, isError, error, isFetchingNextPage, lastPostRef };
}
