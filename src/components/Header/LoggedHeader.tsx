import { HeaderLogo } from '@/components/HeaderLogo';
import { ChannelsSidebar } from '@/components/Homepage/ChannelsSidebar';
import { SearchBar } from '@/components/SearchBar';
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
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { P } from '@/components/ui/typography';
import { useLogout } from '@/hooks/useLogout';
import { useNotificationsQuery } from '@/hooks/useSqueals';
import { useUser } from '@/lib/auth';
import { formatDate } from '@/utils';
import { Bell, BellDot, LogOut, Menu, Settings, User } from 'lucide-react';
import type { Dispatch, SetStateAction } from 'react';
import { Link } from 'react-router-dom';

type Props = Readonly<{
  isHome?: boolean;
  setFilter?: Dispatch<SetStateAction<string>>;
}>;

export const LoggedHeader = ({ isHome, setFilter }: Props) => {
  const { data: authUser } = useUser();
  const { logoutUser } = useLogout();
  const { data: notifications } = useNotificationsQuery();

  return (
    <header className="order-first mx-auto my-3 flex w-4/5 flex-wrap items-center justify-between md:w-10/12 lg:justify-around">
      <section className="flex items-center space-x-2 md:order-first">
        {isHome && (
          // Hamburger menu for mobile
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" className="md:hidden">
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
        )}
        <HeaderLogo responsive={isHome} />
      </section>

      <section className="flex md:order-last">
        {isHome && (
          <Popover>
            <PopoverTrigger>
              <Button variant="outline" size="icon" className="md:ml-3">
                {notifications === undefined ? <Bell /> : <BellDot />}
              </Button>
            </PopoverTrigger>
            <PopoverContent>
              {notifications === undefined ? (
                <P>Non hai notifiche!</P>
              ) : (
                notifications.map((n) => {
                  return (
                    <div
                      key={n.id}
                      className="flex items-center justify-between"
                    >
                      <span>{n.author}</span>
                      <span>{formatDate(n.datetime)}</span>
                    </div>
                  );
                })
              )}
            </PopoverContent>
          </Popover>
        )}

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <section className="flex items-center">
              <Button variant="link" size="sm">
                {authUser?.username}
              </Button>
              <Avatar>
                <AvatarImage src={authUser?.propic} alt="user icon" />
                <AvatarFallback>User</AvatarFallback>
              </Avatar>
            </section>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel>Il mio Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <Link to="/profile">
                <User className="mr-2 h-4 w-4" />
                <span>Profilo</span>
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link to="/settings">
                <Settings className="mr-2 h-4 w-4" />
                <span>Impostazioni</span>
              </Link>
            </DropdownMenuItem>
            {authUser?.type === 'professional' && (
              <DropdownMenuItem asChild>
                <Link to="/smm" reloadDocument>
                  <Settings className="mr-2 h-4 w-4" />
                  <span>Social Media Manager App</span>
                </Link>
              </DropdownMenuItem>
            )}
            {authUser?.type === 'moderator' && (
              <DropdownMenuItem asChild>
                <Link to="/mod" reloadDocument>
                  <Settings className="mr-2 h-4 w-4" />
                  <span>Moderator App</span>
                </Link>
              </DropdownMenuItem>
            )}
            <DropdownMenuItem onClick={() => logoutUser({})}>
              <LogOut className="mr-2 h-4 w-4" />
              <span>Esci</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </section>
      {isHome && setFilter && (
        <SearchBar
          setFilter={setFilter}
          className="w-full grow md:order-2 md:w-auto md:max-w-md"
        />
      )}
    </header>
  );
};
