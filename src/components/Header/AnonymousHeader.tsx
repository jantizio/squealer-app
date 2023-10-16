import ChannelList from '@/components/ChannelList';
import HeaderLogo from '@/components/HeaderLogo';
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
import { Menu } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

type HeaderProps = {
  isHome?: boolean;
};
function AnonymousHeader({ isHome }: HeaderProps) {
  const navigate = useNavigate();

  return (
    <header className="order-first my-3 flex w-full items-center justify-around">
      <section className="flex items-center space-x-2">
        {isHome ? (
          /* Hamburger menu for mobile */
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
        ) : (
          // div for spacing
          <div></div>
        )}
        <HeaderLogo responsive={isHome} />
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
}

export default AnonymousHeader;
