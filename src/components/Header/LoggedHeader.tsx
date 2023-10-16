import HeaderLogo from '@/components/HeaderLogo';
import ChannelsSidebar from '@/components/Homepage/ChannelsSidebar';
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
import { useLogout, useUser } from '@/lib/auth';
import { LogOut, Menu, Settings, User } from 'lucide-react';
import type { Dispatch, SetStateAction } from 'react';
import { useNavigate } from 'react-router-dom';

type HeaderProps = {
  isHome?: boolean;
  setFilter?: Dispatch<SetStateAction<string>>;
};

function LoggedHeader({ isHome, setFilter }: HeaderProps) {
  const { data: authUser } = useUser();
  const navigate = useNavigate();
  const { mutate: logoutUser } = useLogout();

  return (
    <header className="order-first mx-auto my-3 flex w-4/5 flex-wrap items-center justify-between md:w-10/12 lg:justify-around">
      <section className="flex items-center space-x-2 md:order-first">
        {isHome && (
          // Hamburger menu for mobile
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
        )}
        <HeaderLogo responsive={isHome} />
      </section>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <section className="flex items-center md:order-last">
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
          <DropdownMenuItem onClick={() => logoutUser({})}>
            <LogOut className="mr-2 h-4 w-4" />
            <span>Esci</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      {isHome && setFilter && (
        <SearchBar
          setFilter={setFilter}
          className="w-full grow md:order-2 md:w-auto md:max-w-md"
        />
      )}
    </header>
  );
}

export default LoggedHeader;
