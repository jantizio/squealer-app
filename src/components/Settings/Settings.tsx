import LoggedHeader from '@/components/Header/LoggedHeader';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { H1 } from '@/components/ui/typography';
import { useUser } from '@/lib/auth';
import Account from './Account';
import SocialMediaManager from './SocialMediaManager';

type settingsPage = {
  category: string;
  component: JSX.Element;
  hasPermission: boolean;
};

const Settings = () => {
  const { data: authUser } = useUser();

  if (!authUser) return <div>Errore utente non definito</div>; //Should never happen

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
      hasPermission: authUser.type === 'professional',
      // hasPermission: true,
    },
  ];

  return (
    <>
      <LoggedHeader />

      <H1 className="mx-auto mb-4 w-[80vw] max-w-md pl-2">Impostazioni</H1>
      <Tabs
        defaultValue={settings[0]?.category}
        className="mx-auto w-[80vw] max-w-md"
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
        <div className="w-full p-1">
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
