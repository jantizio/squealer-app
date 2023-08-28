import Message from '@/components/Message';
import { squealRead_t } from '@/lib/types';
import useInfiniteScroll from '@/hooks/useInfiniteScroll';

type MessageScrollerProps = {
  fetchPage: (page: number) => Promise<squealRead_t[]>;
  filter?: string;
};

const MessageScroller = (props: MessageScrollerProps) => {
  const { data, error, isError, isFetchingNextPage, lastPostRef } =
    useInfiniteScroll({ ...props });

  const posts = data?.pages.flat();

  if (!posts || posts.length === 0) {
    return <p>È tristemente vuoto</p>;
  }
  const content = posts.map((post, i) => {
    const isLast = posts.length - 1 === i;
    return (
      <Message key={post._id} ref={isLast ? lastPostRef : undefined}>
        {post}
      </Message>
    );
  });

  return (
    <>
      <div className="container mt-14">{content}</div>
      {isFetchingNextPage && <p>Loading more posts...</p>}
      {isError && <p>Error: {error.message}</p>}
    </>
  );
};
export default MessageScroller;
