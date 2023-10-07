import ChannelList from '@/components/ChannelList';
import HeaderLogo from '@/components/HeaderLogo';
import { Button } from '@/components/ui/button';
import useIsAuthenticated from '@/hooks/useIsAuthenticated';
import { useFetchChannels } from '@/hooks/useFetch';
import { run } from '@/lib/utils';
import { Settings } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Discover = () => {
  const navigate = useNavigate();
  const isAuthenticated = useIsAuthenticated();

  const queryString = run(() => {
    if (isAuthenticated) return '/channels/?type=public';
    else return '/channels/?official=true';
  });
  const fetchEveryChannel = useFetchChannels(queryString);

  return (
    <>
      <header className="order-first my-3 flex w-full items-center justify-around">
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
        <main className="order-2 w-full overflow-auto md:w-4/6 lg:w-1/2">
          <ChannelList fetchChannels={fetchEveryChannel} type="public" />
        </main>

        {/* Left sidebar */}
        <aside className="order-1 hidden w-full overflow-auto md:block md:w-2/6 lg:w-1/4"></aside>

        {/* Right sidebar */}
        <aside className="order-3 hidden w-full overflow-hidden lg:block lg:w-1/4"></aside>
      </div>
      <footer className="order-last w-full p-4"></footer>
    </>
  );
};

export default Discover;
