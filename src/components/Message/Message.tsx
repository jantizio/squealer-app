import { CommentList } from '@/components/CommentList';
import { MapComponent } from '@/components/MapComponent';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
import { Large, Muted, P } from '@/components/ui/typography';
import { useIsAuthenticated } from '@/hooks/useIsAuthenticated';
import { useUpdateSquealMutation } from '@/hooks/useSqueals';
import { formatDate, formatNumber } from '@/utils';
import type { squealRead_t } from '@/utils/types';
import { Eye, Frown, Smile } from 'lucide-react';
import { forwardRef, useEffect } from 'react';

type Props = Readonly<{
  children: squealRead_t;
}>;

export const Message = forwardRef<HTMLDivElement, Props>(
  ({ children }, ref) => {
    const {
      id,
      author,
      body,
      impressions,
      negative_reaction,
      positive_reaction,
      datetime,
      receivers,
      comments,
    } = children;
    const canReact = useIsAuthenticated();

    const { mutate: updateSqueal } = useUpdateSquealMutation();
    const reacted = false; //TODO: use real data

    useEffect(() => {
      // when the component is mounted count one view
      // updateSqueal({ id, operation: 'viewed' });
    }, []);

    const date = formatDate(datetime);

    //simbolo: •
    return (
      <article
        className="mx-auto mb-6 max-w-prose space-y-5 rounded border bg-card p-5 shadow shadow-secondary hover:border-muted-foreground [&>section]:min-w-full"
        ref={ref}
      >
        <section className="items-center justify-between gap-1 xl:flex xl:max-w-xs">
          <Large className="">{receivers.join(', ')}</Large>
          <Muted className="shrink-0">
            scritto da {author} • {date} •
            <Eye className="mx-1 inline h-[1em] w-[1em]" />
            {formatNumber(impressions)}
          </Muted>
        </section>
        <section className="break-words">
          {body.type === 'text' && <P>{body.content}</P>}
          {body.type === 'media' && <img src={body.content} alt="" />}
          {body.type === 'geo' && (
            <MapComponent
              data={body.content}
              center={body.content.center}
              zoom={body.content.zoom}
            />
          )}
        </section>
        <section className="flex justify-end">
          {/* Buttons are ghost if unused, if reaction then secondary and reacted becomes primary */}
          <Button
            className="mx-2"
            variant={reacted ? 'secondary' : 'ghost'}
            disabled={!canReact || reacted}
            onClick={() => updateSqueal({ id: id, operation: 'upvote' })}
          >
            <span className={reacted ? 'text-primary' : ''}>
              <Smile className="mr-2 inline h-[1.5em] w-[1.5em]" />
              {positive_reaction}
            </span>
          </Button>

          <Button
            className="mx-2"
            variant={reacted ? 'secondary' : 'ghost'}
            disabled={!canReact || reacted}
            onClick={() => updateSqueal({ id: id, operation: 'downvote' })}
          >
            <span className={reacted ? 'text-primary' : ''}>
              <Frown className="mr-2 inline h-[1.5em] w-[1.5em]" />
              {negative_reaction}
            </span>
          </Button>
        </section>
        {comments.length > 0 && (
          <Accordion type="single" collapsible>
            <AccordionItem value="comments" className="border-b-0 border-t">
              <AccordionTrigger>Commenti</AccordionTrigger>
              <AccordionContent asChild>
                <CommentList comments={comments} />
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        )}
      </article>
    );
  },
);
