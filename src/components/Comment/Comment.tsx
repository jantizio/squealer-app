import { CommentList } from '@/components/CommentList';
import { MapComponent } from '@/components/MapComponent';
import { Button } from '@/components/ui/button';
import { ButtonLine } from '@/components/ui/button-line';
import { Muted, P } from '@/components/ui/typography';
import { cn, formatDate } from '@/utils';
import type { commentRead_t } from '@/utils/types';
import { MessageSquare } from 'lucide-react';
import { useState } from 'react';

type Props = Readonly<{
  children: commentRead_t;
  className?: string;
}>;

export const Comment = ({ children, className }: Props) => {
  const { author, body, comments, datetime } = children;
  const [isHidden, setIsHidden] = useState(false);

  const date = formatDate(datetime);

  return (
    <div className="flex">
      <ButtonLine
        aria-label="nascondi commenti"
        onClick={() => setIsHidden((p) => !p)}
      />
      <article
        className={cn(
          'max-w-prose space-y-2 pl-4 [&>section]:min-w-full',
          className,
        )}
      >
        <section className="items-center justify-between gap-1 xl:flex xl:max-w-xs">
          <Muted className="shrink-0">
            scritto da {author} • {date}
          </Muted>
        </section>
        {!isHidden && (
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
        )}
        {!isHidden && (
          <section>
            <Button variant="ghost" size="icon">
              <MessageSquare />
            </Button>
          </section>
        )}
        {!isHidden && <CommentList comments={comments} />}
      </article>
    </div>
  );
};
