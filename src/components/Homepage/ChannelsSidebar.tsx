import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { ChannelList } from '@/components/ChannelList';
import { cn } from '@/utils';

type Props = Readonly<{
  className?: string;
}>;

export const ChannelsSidebar = ({ className }: Props) => {
  return (
    <Accordion
      type="multiple"
      defaultValue={['official', 'subscribed', 'direct']}
      className={cn('mx-2', className)}
    >
      <AccordionItem value="official">
        <AccordionTrigger>Canali Ufficiali</AccordionTrigger>
        <AccordionContent>
          <ChannelList filter="official" />
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="subscribed">
        <AccordionTrigger>Canali a cui sei iscritto</AccordionTrigger>
        <AccordionContent>
          <ChannelList filter="subscribed" />
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="direct">
        <AccordionTrigger>Messaggi Diretti</AccordionTrigger>
        <AccordionContent>
          <ChannelList filter="direct" />
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};
