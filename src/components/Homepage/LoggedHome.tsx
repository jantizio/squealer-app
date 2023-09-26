import HeaderLogo from '@/components/HeaderLogo';
import MessageScroller from '@/components/MessageScroller';
import SearchBar from '@/components/SearchBar';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { useFetchSqueals } from '@/hooks/useFetch';
import { LogOut, Menu, PenSquare, Settings, User } from 'lucide-react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDebounce } from 'usehooks-ts';
import ChannelsSidebar from './ChannelsSidebar';
import useAuth from '@/hooks/auth/useAuth';
import useLogout from '@/hooks/auth/useLogout';

const LoggedHome = () => {
  const [filter, setFilter] = useState('');
  const debouncedFilter = useDebounce(filter, 500);
  const navigate = useNavigate();

  const fetchSquealsPage = useFetchSqueals('/squeals/', filter);

  const { auth } = useAuth();
  const logout = useLogout();

  if (!auth) return <div>Errore utente non definito</div>; //Should never happen

  return (
    <>
      <header className="order-first mx-auto my-3 flex w-4/5 flex-wrap items-center justify-between md:w-10/12 lg:justify-around">
        <section className="flex items-center space-x-2 md:order-first">
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
              <ChannelsSidebar className="m-auto h-[83vh] overflow-auto pr-3" />
            </SheetContent>
          </Sheet>
          <HeaderLogo responsive />
        </section>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <section className="flex items-center md:order-last">
              <Button variant="link" size="sm">
                {auth.authState.username}
              </Button>
              <Avatar>
                <AvatarImage src={auth.authState.propic} alt="user icon" />
                <AvatarFallback>User</AvatarFallback>
              </Avatar>
            </section>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel>Il mio Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <User className="mr-2 h-4 w-4" />
              <span>Profilo</span>
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => {
                navigate('/settings');
              }}
            >
              <Settings className="mr-2 h-4 w-4" />
              <span>Impostazioni</span>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={logout}>
              <LogOut className="mr-2 h-4 w-4" />
              <span>Esci</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <SearchBar
          setFilter={setFilter}
          className="w-full grow md:order-2 md:w-auto md:max-w-md"
        />
      </header>

      <div className="flex overflow-hidden">
        {/* Main content */}
        <main className="order-2 w-full overflow-auto overflow-x-hidden md:w-4/6 lg:w-1/2">
          <MessageScroller
            fetchPage={fetchSquealsPage}
            filter={debouncedFilter}
          />
        </main>

        {/* Left sidebar */}
        <aside className="order-1 hidden w-full overflow-auto overflow-x-hidden md:block md:w-2/6 lg:w-1/4">
          <ChannelsSidebar />
        </aside>

        {/* Right sidebar */}
        <aside className="order-3 hidden w-full overflow-hidden lg:block lg:w-1/4"></aside>
      </div>
      <Button
        className="fixed bottom-3 right-3"
        variant="unstyled"
        size="icon"
        onClick={() => navigate('/create')}
      >
        <PenSquare className="h-icon-lg w-icon-lg" />
      </Button>
      <footer className="order-last w-full p-4"></footer>
    </>
  );
};

export default LoggedHome;
