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
import { squealReadSchema } from '@/schema/shared-schema/squealValidators';
import { channelSchema } from '@/schema/shared-schema/channelValidator';
import { fromZodError } from 'zod-validation-error';

const fetchPublicSquealsPage = async (
  page: number,
): Promise<squealRead_t[]> => {
  const response = await backendApi.get<squealRead_t[]>(
    `/squeals/?page=${page}`,
  );

  const squealArray = response.data.reduce<squealRead_t[]>(
    (filtered, squeal) => {
      const squealValidation = squealReadSchema.safeParse(squeal);
      if (squealValidation.success) {
        // console.log(`Squeal ${squeal._id} passed validation`);
        // console.log('data: ', squealValidation.data);

        filtered.push(squealValidation.data);
      } else {
        console.log(`Squeal ${squeal._id} failed validation`); //TODO: remove this log
        console.log(
          fromZodError(squealValidation.error, {
            unionSeparator: 'oppure',
            issueSeparator: '\n',
          }).message,
        ); //TODO: remove this log
      }
      return filtered;
    },
    [],
  );

  return squealArray;
  //     ^?
};

const fetchPublicChannels = async (): Promise<channel_t[]> => {
  const response = await backendApi.get<channel_t[]>(
    `/channels/?type=public&official=true`,
  );
  // TODO: handle zod validation

  const channelsArray = response.data.reduce<channel_t[]>(
    (filtered, channel) => {
      const channelValidation = channelSchema.safeParse(channel);
      if (channelValidation.success) {
        filtered.push(channelValidation.data);
      } else {
        console.log(`Squeal ${channel.name} failed validation`); //TODO: remove this log
        console.log(channelValidation.error.message); //TODO: remove this log
      }
      return filtered;
    },
    [],
  );

  return channelsArray;
};

const AnonymousHome = () => {
  const navigate = useNavigate();
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
        <main className="order-2 w-full overflow-auto md:w-4/6 lg:w-1/2">
          <MessageScroller fetchPage={fetchPublicSquealsPage} />
        </main>

        {/* Left sidebar */}
        <aside className="order-1 hidden w-full overflow-auto md:block md:w-2/6 lg:w-1/4">
          <ChannelList fetchChannels={fetchPublicChannels} />
        </aside>

        {/* Right sidebar */}
        <aside className="order-3 hidden w-full overflow-hidden lg:block lg:w-1/4"></aside>
      </div>
      <footer className="order-last w-full p-4"></footer>
    </>
  );
};

export default AnonymousHome;
