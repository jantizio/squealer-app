import { Button } from '@/components/ui/button';
import { Large, Muted, P } from '@/components/ui/typography';
import { useUpdateSquealMutation } from '@/hooks/useSqueals';
import { useUser } from '@/lib/auth';
import { formatNumber } from '@/utils';
import type { squealRead_t } from '@/utils/types';
import { formatDistanceToNowStrict } from 'date-fns';
import { it } from 'date-fns/locale';
import { Eye, Frown, Smile } from 'lucide-react';
import { forwardRef, useEffect } from 'react';

type messageProps = {
  children: squealRead_t;
};

const Message = forwardRef<HTMLDivElement, messageProps>(
  ({ children }, ref) => {
    const {
      _id,
      author,
      body,
      impressions,
      negative_reaction,
      positive_reaction,
      datetime,
      receivers,
    } = children;
    const { data: authUser } = useUser();
    const isAuthenticated = !!authUser;

    const { mutate: updateSqueal } = useUpdateSquealMutation();
    const reacted = false; //TODO: use real data

    useEffect(() => {
      // when the component is mounted count one view
      updateSqueal({ id: _id, operation: 'viewed' });
    }, []);

    const date = formatDistanceToNowStrict(datetime, {
      addSuffix: true,
      locale: it,
    });

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
        <section>
          {body.type === 'text' && <P>{body.content}</P>}
          {body.type === 'media' && <img src={body.content} alt="post-image" />}
        </section>
        <section className="flex justify-end">
          {/* Buttons are ghost if unused, if reaction then secondary and reacted becomes primary */}
          <Button
            className="mx-2"
            variant={reacted ? 'secondary' : 'ghost'}
            disabled={!isAuthenticated || reacted}
            onClick={() => updateSqueal({ id: _id, operation: 'upvote' })}
          >
            <span className={reacted ? 'text-primary' : ''}>
              <Smile className="mr-2 inline h-[1.5em] w-[1.5em]" />
              {positive_reaction}
            </span>
          </Button>

          <Button
            className="mx-2"
            variant={reacted ? 'secondary' : 'ghost'}
            disabled={!isAuthenticated || reacted}
            onClick={() => updateSqueal({ id: _id, operation: 'downvote' })}
          >
            <span className={reacted ? 'text-primary' : ''}>
              <Frown className="mr-2 inline h-[1.5em] w-[1.5em]" />
              {negative_reaction}
            </span>
          </Button>
        </section>
      </article>
    );
  },
);

export default Message;
