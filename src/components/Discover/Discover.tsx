import HeaderLogo from '@/components/HeaderLogo';
import ChannelList from '@/components/ChannelList';
import { channel_t } from '@/lib/types';
import useAxios from '@/hooks/useAxios';

const Discover = () => {
  const privateAPI = useAxios();
  const fetchEveryChannel = async () => {
    const channelsApi: string = 'https://jsonplaceholder.typicode.com/albums';
    const res = await privateAPI.get<channel_t[]>(channelsApi);
    // const channels = await privateAPI.get<channel_t[]>('/channels/');
    return res.data;
  };

  return (
    <>
      <header className="w-full order-first flex items-center justify-around my-3">
        <HeaderLogo />
      </header>

      <div className="flex overflow-hidden">
        {/* Main content */}
        <main className="w-full order-2 overflow-auto md:w-4/6 lg:w-1/2">
          <ChannelList fetchChannels={fetchEveryChannel} />
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

export default Discover;
