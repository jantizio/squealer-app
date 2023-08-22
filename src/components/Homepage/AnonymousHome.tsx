import ChannelList from '@/components/ChannelList';
import HeaderLogo from '@/components/HeaderLogo';
import MessageScroller from '@/components/MessageScroller';
import ModeToggle from '@/components/ModeToggle';
import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { channel_t, squealRead_t } from '@/lib/types';
import { backendApi } from '@/lib/utils';
import { Menu } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import z from 'zod';

const fetchPublicSquealsPage = async (page: number) => {
  const squealArray = await backendApi.get<squealRead_t[]>(
    `/squeals/?page=${page}`
  );

  // TODO: handle zod validation and remove this workaround
  return squealArray.data.map((squeal) => {
    squeal.datetime = new Date(squeal.datetime);
    return squeal;
  });
};

const fetchPublicChannels = async () => {
  const res = await backendApi.get<channel_t[]>(`/channels/?type=public`);
  // TODO: handle zod validation
  return res.data;
};

const AnonymousHome = () => {
  const navigate = useNavigate();
  return (
    <>
      <header className="w-full order-first flex items-center justify-around my-3">
        <section className="flex items-center space-x-2">
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
                  Lista dei canali pubblici di Squealer
                </SheetDescription>
              </SheetHeader>
              <ChannelList
                fetchChannels={fetchPublicChannels}
                className="h-[83vh] overflow-auto"
              />
            </SheetContent>
          </Sheet>
          <HeaderLogo responsive />
        </section>

        <div className="flex items-center space-x-2">
          <nav className="flex items-center space-x-2">
            <Button onClick={() => navigate('/login')}>Accedi</Button>
            <Button onClick={() => navigate('/signup')} variant="secondary">
              Iscriviti
            </Button>
          </nav>
          <ModeToggle />
        </div>
      </header>

      <div className="flex overflow-hidden">
        {/* Main content */}
        <main className="w-full order-2 overflow-auto md:w-4/6 lg:w-1/2">
          <MessageScroller fetchPage={fetchPublicSquealsPage} />
        </main>

        {/* Left sidebar */}
        <aside className="w-full hidden order-1 overflow-auto md:block md:w-2/6 lg:w-1/4">
          <ChannelList fetchChannels={fetchPublicChannels} />
        </aside>

        {/* Right sidebar */}
        <aside className="w-full hidden order-3 overflow-hidden lg:block lg:w-1/4"></aside>
      </div>
      <footer className="w-full order-last p-4"></footer>
    </>
  );
};

export default AnonymousHome;
