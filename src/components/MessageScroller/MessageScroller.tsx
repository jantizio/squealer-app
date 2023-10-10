import Message from '@/components/Message';
import useInfiniteScroll from '@/hooks/useInfiniteScroll';

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
  const { data, error, isError, isFetchingNextPage, lastPostRef } =
    useInfiniteScroll({ filter, author, channelName });

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

  // TODO: migliorare la presentazione
  return (
    <>
      <div className="container mt-14">{content}</div>
      {isFetchingNextPage && <p>Loading more posts...</p>}
      {isError && <p>Error: {error instanceof Error && error.message}</p>}
    </>
  );
};
export default MessageScroller;
