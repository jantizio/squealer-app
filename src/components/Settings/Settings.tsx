import HeaderLogo from '@/components/HeaderLogo';
import {
  Heading,
  HeadingLevel,
  useTabStore,
  TabList,
  Tab,
  TabPanel,
  Separator,
} from '@ariakit/react';
import Account from './Account';
import SocialMediaManager from './SocialMediaManager';
import ChannelList from '@/components/ChannelList';
import { backendApi } from '@/lib/utils';
import { channel_t } from '@/lib/types';
import { useAuthUser } from 'react-auth-kit';

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
  const authUser = useAuthUser()();
  if (!authUser) return <div>Errore utente non definito</div>; //Should never happen

  const settings: settingsPage[] = [
    {
      category: 'Account',
      component: <Account />,
      hasPermission: true,
    },
    {
      category: 'Canali',
      component: (
        <ChannelList fetchChannels={fetchFollowedChannels} removeButton />
      ),
      hasPermission: true,
      // aggiungere in qualche modo la possiblità di rimuovere i canali dai seguiti
    },
    {
      category: 'SMM',
      component: <SocialMediaManager />,
      hasPermission: authUser.type === 'professional',
    },
  ];

  const defaultSelectedId = 'default-selected-tab';
  const tab = useTabStore({ defaultSelectedId, orientation: 'vertical' });

  // console.log(tab.getState().selectedId);
  // provare ad attivare una tab solo se è selezionata

  return (
    <>
      <header className="flex items-center">
        <HeadingLevel>
          <HeaderLogo />
          <Heading>- Settings</Heading>
        </HeadingLevel>
      </header>
      <main className="flex h-full">
        <TabList store={tab} className="flex flex-col px-3">
          {settings.map((page, i) => {
            if (!page.hasPermission) return undefined;

            let idAttr = {};
            if (i == 0)
              idAttr = {
                id: defaultSelectedId,
              };

            return (
              <Tab
                key={i}
                {...idAttr}
                className="p-2 m-2 aria-selected:bg-amber-700 rounded"
              >
                {page.category}
              </Tab>
            );
          })}
        </TabList>
        <Separator
          orientation="vertical"
          className="mx-2 w-0 h-full border-l"
        />
        <div className="p-1 w-full">
          {settings.map((page, i) => {
            if (!page.hasPermission) return undefined;

            return (
              <TabPanel
                key={i}
                // tabId={i == 0 ? defaultSelectedId : undefined}
                store={tab}
              >
                {page.component}
              </TabPanel>
            );
          })}
        </div>
      </main>
    </>
  );
};

export default Settings;
