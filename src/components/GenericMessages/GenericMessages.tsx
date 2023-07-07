import Message from '@/components/Message';
import { post_t } from '@/globals/types';
import { errorCheck } from '@/globals/utility';
import useInfiniteScroll from '@/hooks/useInfiniteScroll';
import axios from 'axios';

const fetchPostPage = async (page: number) => {
  const postArray: post_t[] = await axios
    .get(`https://jsonplaceholder.typicode.com/posts?_page=${page}`)
    .then((response) => response.data);

  return postArray;
};

const GenericMessages = () => {
  const { data, error, isError, isFetchingNextPage, lastPostRef } =
    useInfiniteScroll({ fetchPage: fetchPostPage });

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
export default GenericMessages;
