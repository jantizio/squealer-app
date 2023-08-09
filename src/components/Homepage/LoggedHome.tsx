import { useState } from 'react';
import useAxios from '@/hooks/useAxios';
import { useDebounce } from 'usehooks-ts';
import { useNavigate } from 'react-router-dom';
import { Button } from '@ariakit/react';
import MessageScroller from '@/components/MessageScroller';
import HeaderLogo from '@/components/HeaderLogo';
import SearchBar from '@/components/SearchBar';
import ModeToggle from '@/components/ModeToggle';
import { post_t } from '@/lib/types';
import { ReactComponent as Pencil } from '@/assets/pencil.svg';
import { Settings } from 'lucide-react';

const LoggedHome = () => {
  const [filter, setFilter] = useState<string>('');
  const debouncedFilter = useDebounce<string>(filter, 500);
  const navigate = useNavigate();
  const privateBackendApi = useAxios();

  const fetchPostPage = async (page: number) => {
    type postResp = Omit<post_t, 'username'> & { userId: number };

    // TODO: use the `filter` to filter the posts from backend
    const postArray: postResp[] = await privateBackendApi
      .get(`https://jsonplaceholder.typicode.com/posts?_page=${page}`)
      .then((response) => response.data);

    const outArray: post_t[] = [];

    for (const post of postArray) {
      let { username } = await privateBackendApi
        .get(`https://jsonplaceholder.typicode.com/users/${post.userId}`)
        .then((response) => response.data);

      const { userId: _, ...result } = post;
      outArray.push({ username, ...result });
    }

    return outArray;
    //        ^?
  };

  return (
    <>
      <nav className="flex items-center justify-around">
        <HeaderLogo />
        <SearchBar setFilter={setFilter} />
        <Button onClick={() => navigate('/settings')}>
          <Settings className="stroke-primary" />
        </Button>
        <ModeToggle />
      </nav>
      <MessageScroller fetchPostPage={fetchPostPage} filter={debouncedFilter} />
      <Button
        className="fixed bottom-0 right-0"
        onClick={() => navigate('/create')}
      >
        <Pencil width={60} height={60} className="fill-amber-500" />
      </Button>
    </>
  );
};

export default LoggedHome;
