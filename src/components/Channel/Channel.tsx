import { useParams } from 'react-router-dom';
import HeaderLogo from '@/components/HeaderLogo';
import MessageScroller from '@/components/MessageScroller';
import { post_t } from '@/lib/types';

const Channel = () => {
  let { channelName } = useParams<{ channelName: string }>();

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

  return (
    <>
      <header className="w-full order-first flex items-center justify-around my-3">
        <HeaderLogo />
      </header>

      <div className="flex overflow-hidden">
        {/* Main content */}
        <main className="w-full order-2 overflow-auto md:w-4/6 lg:w-1/2">
          <h1>Canale {channelName}</h1>
          <MessageScroller fetchPostPage={fetchChannelSqueal} />
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
