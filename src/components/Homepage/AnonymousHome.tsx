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
import { useFetchChannels, useFetchSqueals } from '@/hooks/useFetch';
import { Menu } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const AnonymousHome = () => {
  const navigate = useNavigate();
  const fetchPublicSquealsPage = useFetchSqueals('/squeals/');
  const fetchOfficialChannels = useFetchChannels('/channels/?official=true');

  return (
    <>
      <header className="order-first my-3 flex w-full items-center justify-around">
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
                className="h-[83vh] overflow-auto"
                filter="official"
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
        <main className="order-2 w-full overflow-auto md:w-4/6 lg:w-1/2">
          <MessageScroller fetchPage={fetchPublicSquealsPage} />
        </main>

        {/* Left sidebar */}
        <aside className="order-1 hidden w-full overflow-auto md:block md:w-2/6 lg:w-1/4">
          <ChannelList filter="official" />
        </aside>

        {/* Right sidebar */}
        <aside className="order-3 hidden w-full overflow-hidden lg:block lg:w-1/4"></aside>
      </div>
      <footer className="order-last w-full p-4"></footer>
    </>
  );
};

export default AnonymousHome;
