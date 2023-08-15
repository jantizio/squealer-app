import { useState } from 'react';
import useAxios from '@/hooks/useAxios';
import { useDebounce } from 'usehooks-ts';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import MessageScroller from '@/components/MessageScroller';
import HeaderLogo from '@/components/HeaderLogo';
import SearchBar from '@/components/SearchBar';
import { post_t, channel_t } from '@/lib/types';
import { Menu, PenSquare, Settings } from 'lucide-react';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { backendApi } from '@/lib/utils';
import ChannelList from '@/components/ChannelList';

const fetchChannels = async () => {
  // const channelsApi: string = `/channels/?category=public`;

  const channelsApi: string = 'https://jsonplaceholder.typicode.com/albums';
  const res = await backendApi.get<channel_t[]>(channelsApi);
  return res.data;
};

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
      <header className="w-full order-first flex items-center justify-around my-3">
        <section className="flex items-center space-x-2">
          {/* Hamburger menu for mobile */}
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" className="md:hidden">
                <Menu />
              </Button>
            </SheetTrigger>
            <SheetContent side="left">
              <SheetHeader>
                <SheetTitle>
                  <HeaderLogo />
                </SheetTitle>
                <SheetDescription>
                  Lista dei tuoi canali Squealer
                </SheetDescription>
              </SheetHeader>
              <ChannelList
                fetchChannels={fetchChannels}
                className="h-[83vh] overflow-auto"
              />
            </SheetContent>
          </Sheet>
          <HeaderLogo responsive />
        </section>

        <SearchBar setFilter={setFilter} />

        <Button
          onClick={() => navigate('/settings')}
          variant="outline"
          size="icon"
          className="mx-2"
        >
          <Settings className="h-icon-sm w-icon-sm" />
        </Button>
      </header>

      <div className="flex overflow-hidden">
        {/* Main content */}
        <main className="w-full order-2 overflow-auto overflow-x-hidden md:w-4/6 lg:w-1/2">
          <MessageScroller
            fetchPostPage={fetchPostPage}
            filter={debouncedFilter}
          />
        </main>

        {/* Left sidebar */}
        <aside className="w-full hidden order-1 overflow-auto md:block md:w-2/6 lg:w-1/4">
          <ChannelList fetchChannels={fetchChannels} />
        </aside>

        {/* Right sidebar */}
        <aside className="w-full hidden order-3 overflow-hidden lg:block lg:w-1/4"></aside>
      </div>
      <Button
        className="fixed bottom-3 right-3"
        variant="unstyled"
        size="icon"
        onClick={() => navigate('/create')}
      >
        <PenSquare className="h-icon-lg w-icon-lg" />
      </Button>
      <footer className="w-full order-last p-4"></footer>
    </>
  );
};

export default LoggedHome;
