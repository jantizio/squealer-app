import { useState } from 'react';
import useAxios from '@/hooks/useAxios';
import { useDebounce } from 'usehooks-ts';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import MessageScroller from '@/components/MessageScroller';
import HeaderLogo from '@/components/HeaderLogo';
import SearchBar from '@/components/SearchBar';
import ModeToggle from '@/components/ModeToggle';
import { post_t } from '@/lib/types';
import { PenSquare, Settings } from 'lucide-react';

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
      <nav className="flex items-center justify-around my-3">
        <HeaderLogo />
        <SearchBar setFilter={setFilter} />
        <section>
          <Button
            onClick={() => navigate('/settings')}
            variant="outline"
            size="icon"
            className="mx-2"
          >
            <Settings className="h-icon-sm w-icon-sm" />
          </Button>
          <ModeToggle />
        </section>
      </nav>
      <MessageScroller fetchPostPage={fetchPostPage} filter={debouncedFilter} />
      <Button
        className="fixed bottom-3 right-3"
        variant="unstyled"
        size="icon"
        onClick={() => navigate('/create')}
      >
        <PenSquare className="h-icon-lg w-icon-lg" />
      </Button>
    </>
  );
};

export default LoggedHome;
