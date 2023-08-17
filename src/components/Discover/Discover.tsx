import HeaderLogo from '@/components/HeaderLogo';
import ChannelList from '@/components/ChannelList';
import { channel_t } from '@/lib/types';
import useAxios from '@/hooks/useAxios';
import { useNavigate } from 'react-router-dom';
import { Settings } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Discover = () => {
  const privateAPI = useAxios();
  const navigate = useNavigate();

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
