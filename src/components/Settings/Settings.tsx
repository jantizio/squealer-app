import HeaderLogo from '@/components/HeaderLogo';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { H1 } from '@/components/ui/typography';
import { channel_t } from '@/lib/types';
import { backendApi, userCheck } from '@/lib/utils';
import { useAuthUser } from 'react-auth-kit';
import Account from './Account';
import SocialMediaManager from './SocialMediaManager';

type settingsPage = {
  category: string;
  component: JSX.Element;
  hasPermission: boolean;
};

const fetchFollowedChannels = async () => {
  // const channelsApi: string = `/channels/?followed=${currentUser}`;

  const channelsApi: string =
    'https://jsonplaceholder.typicode.com/albums?_page=1';
  const res = await backendApi.get<channel_t[]>(channelsApi);
  return res.data;
};

const Settings = () => {
  const user = useAuthUser()();

  if (!userCheck(user)) return <div>Errore utente non definito</div>; //Should never happen

  const settings: settingsPage[] = [
    {
      category: 'Account',
      component: <Account />,
      hasPermission: true,
    },
    // {
    //   category: 'Canali',
    //   // component: (
    //   //   <ChannelList fetchChannels={fetchFollowedChannels} removeButton />
    //   // ),
    //   component: <div>Canali</div>,
    //   hasPermission: true,
    //   // TODO: aggiungere in qualche modo la possiblità di rimuovere i canali dai seguiti
    // },
    {
      category: 'SMM',
      component: <SocialMediaManager />,
      hasPermission: user.type === 'professional',
      // hasPermission: true,
    },
  ];

  return (
    <>
      <header className="w-full order-first flex items-center justify-around my-3">
        <HeaderLogo />
      </header>

      <H1 className="pl-2 mb-4 w-[80vw] max-w-md mx-auto">Impostazioni</H1>
      <Tabs
        defaultValue={settings[0]?.category}
        className="w-[80vw] max-w-md mx-auto"
      >
        <TabsList className="w-full">
          {settings.map((page, i) => {
            if (!page.hasPermission) return undefined;

            return (
              <TabsTrigger key={i} value={page.category} className="grow">
                {page.category}
              </TabsTrigger>
            );
          })}
        </TabsList>
        <div className="p-1 w-full">
          {settings.map((page, i) => {
            if (!page.hasPermission) return undefined;

            return (
              <TabsContent key={i} value={page.category}>
                {page.component}
              </TabsContent>
            );
          })}
        </div>
      </Tabs>
    </>
  );
};

export default Settings;
