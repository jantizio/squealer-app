import { useNavigate, useParams } from 'react-router-dom';
import HeaderLogo from '@/components/HeaderLogo';
import MessageScroller from '@/components/MessageScroller';
import { post_t } from '@/lib/types';
import { H1 } from '@/components/ui/typography';
import { Button } from '@/components/ui/button';
import useAxios from '@/hooks/useAxios';
import { Settings } from 'lucide-react';

const Channel = () => {
  let { channelName } = useParams<{ channelName: string }>();
  const privateBackendApi = useAxios();
  const navigate = useNavigate();

  //TODO: probabilmente il layout ora presente non va bene, lascio così per non fare modifiche inutili
  // ma servirebbe un layout a 3 colonne. Le due laterali fisse e quella centrare con la scrollbar centrale

  const fetchChannelSqueal = async (page: number): Promise<post_t[]> => {
    return [
      {
        id: 0,
        title: 'Prova',
        body: 'YOOOOOOOO',
        username: 'Jimmy',
      },
    ];
  };

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
        <HeaderLogo />
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
        <main className="w-full order-2 overflow-auto md:w-4/6 lg:w-1/2">
          <section className="container flex flex-wrap items-center justify-between space-x-1">
            <H1 className="break-all">{channelName}</H1>
            <Button variant="default" size="sm">
              Iscriviti
            </Button>
            {/* //TODO: check if user already subscribed, button is primary if unsub, but secondary if subbed */}
          </section>

          <MessageScroller fetchPostPage={fetchPostPage} />
        </main>

        {/* Left sidebar */}
        <aside className="w-full hidden order-1 overflow-auto md:block md:w-2/6 lg:w-1/4"></aside>

        {/* Right sidebar */}
        <aside className="w-full hidden order-3 overflow-hidden lg:block lg:w-1/4"></aside>
      </div>
      <footer className="w-full order-last p-4"></footer>
    </>
  );
};

export default Channel;