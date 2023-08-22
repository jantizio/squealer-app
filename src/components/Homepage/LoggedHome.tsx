import HeaderLogo from '@/components/HeaderLogo';
import MessageScroller from '@/components/MessageScroller';
import SearchBar from '@/components/SearchBar';
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
import useAxios from '@/hooks/useAxios';
import { channel_t, squealRead_t } from '@/lib/types';
import { LogOut, Menu, PenSquare, Settings, User } from 'lucide-react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDebounce } from 'usehooks-ts';
import ChannelList from '@/components/ChannelList';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { userCheck } from '@/lib/utils';
import { useAuthUser, useSignOut } from 'react-auth-kit';

const LoggedHome = () => {
  const [filter, setFilter] = useState<string>('');
  const debouncedFilter = useDebounce<string>(filter, 500);
  const navigate = useNavigate();
  const privateBackendApi = useAxios();

  const user = useAuthUser()();
  const logout = useSignOut();

  if (!userCheck(user)) return <div>Errore utente non definito</div>; //Should never happen

  const fetchChannels = async () => {
    const res = await privateBackendApi.get<channel_t[]>(
      `/channels/?category=public`
    );
    // TODO: handle zod validation
    return res.data;
  };

  const fetchSquealsPage = async (page: number): Promise<squealRead_t[]> => {
    const response = await privateBackendApi.get<squealRead_t[]>(
      `/squeals/?page=${page}`
    );
    // TODO: handle zod validation
    return response.data;
  };

  return (
    <>
      <header className="order-first flex items-center flex-wrap justify-between w-4/5 mx-auto md:w-10/12 lg:justify-around my-3">
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
              <ChannelList
                fetchChannels={fetchChannels}
                className="h-[83vh] overflow-auto"
              />
            </SheetContent>
          </Sheet>
          <HeaderLogo responsive />
        </section>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <section className="flex items-center md:order-last">
              <Button variant="link" size="sm">
                {user.username}
              </Button>
              <Avatar>
                <AvatarImage
                  src="https://github.com/shadcn.png" // TODO: implementare l'immagine dell'utente
                  alt="user icon"
                />
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
          className="w-full grow md:w-auto md:order-2 md:max-w-md"
        />
      </header>

      <div className="flex overflow-hidden">
        {/* Main content */}
        <main className="w-full order-2 overflow-auto overflow-x-hidden md:w-4/6 lg:w-1/2">
          <MessageScroller
            fetchPage={fetchSquealsPage}
            filter={debouncedFilter}
          />
        </main>

        {/* Left sidebar */}
        <aside className="w-full hidden order-1 overflow-auto md:block md:w-2/6 lg:w-1/4">
          <ChannelList fetchChannels={fetchChannels} />
        </aside>

        {/* Right sidebar */}
        <aside className="w-full hidden order-3 overflow-hidden lg:block lg:w-1/4"></aside>
      </div>
      <Button
        className="fixed bottom-3 right-3"
        variant="unstyled"
        size="icon"
        onClick={() => navigate('/create')}
      >
        <PenSquare className="h-icon-lg w-icon-lg" />
      </Button>
      <footer className="w-full order-last p-4"></footer>
    </>
  );
};

export default LoggedHome;
