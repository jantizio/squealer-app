import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import ChannelList from '@/components/ChannelList';
import { useFetchChannels } from '@/hooks/useFetch';
import { cn } from '@/lib/utils';

type ChannelsSidebarProps = {
  className?: string;
};

const ChannelsSidebar = ({ className }: ChannelsSidebarProps) => {
  const fetchSubscribedChannels = useFetchChannels(
    '/channels/?type=public&official=false',
  );
  const fetchOfficialChannels = useFetchChannels('/channels/?official=true');
  const fetchDirectChannels = useFetchChannels('/channels/?type=public');
  return (
    <Accordion
      type="multiple"
      defaultValue={['official', 'subscribed', 'direct']}
      className={cn('mx-2', className)}
    >
      <AccordionItem value="official">
        <AccordionTrigger>Canali Ufficiali</AccordionTrigger>
        <AccordionContent>
          <ChannelList fetchChannels={fetchOfficialChannels} type="official" />
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="subscribed">
        <AccordionTrigger>Canali a cui sei iscritto</AccordionTrigger>
        <AccordionContent>
          <ChannelList
            fetchChannels={fetchSubscribedChannels}
            type="subscribed"
          />
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="direct">
        <AccordionTrigger>Messaggi Diretti</AccordionTrigger>
        <AccordionContent>
          <ChannelList fetchChannels={fetchDirectChannels} type="direct" />
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};

export default ChannelsSidebar;
