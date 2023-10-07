import { Sheet, Menu } from 'lucide-react';
import ChannelList from '@/components/ChannelList';
import HeaderLogo from '@/components/HeaderLogo';
import ModeToggle from '@/components/ModeToggle';
import { Button } from '@/components/ui/button';
import {
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from '@/components/ui/sheet';
import { useFetchChannels } from '@/hooks/useFetch';
import { useNavigate } from 'react-router-dom';

const Header = () => {
  const navigate = useNavigate();
  const fetchOfficialChannels = useFetchChannels('/channels/?official=true');

  return (
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
              fetchChannels={fetchOfficialChannels}
              className="h-[83vh] overflow-auto"
              type="official"
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
  );
};

export default Header;
