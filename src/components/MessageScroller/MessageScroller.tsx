import Message from '@/components/Message';
import { post_t } from '@/lib/types';
import { errorCheck } from '@/lib/utils';
import useInfiniteScroll from '@/hooks/useInfiniteScroll';

type MessageScrollerProps = {
  fetchPostPage: (page: number) => Promise<post_t[]>;
  filter?: string;
};

const MessageScroller = ({ fetchPostPage, filter }: MessageScrollerProps) => {
  const { data, error, isError, isFetchingNextPage, lastPostRef } =
    useInfiniteScroll({ fetchPage: fetchPostPage, filter });

  const posts = data?.pages.flat();
  const content = posts?.map((post, i) => {
    const isLast = posts.length - 1 === i;
    return (
      <Message key={post.id} ref={isLast ? lastPostRef : undefined}>
        {post}
      </Message>
    );
  });

  return (
    <>
      <div className="container">{content}</div>
      {isFetchingNextPage && <p>Loading more posts...</p>}
      {isError && errorCheck(error) && <p>Error: {error.message}</p>}
    </>
  );
};
export default MessageScroller;
