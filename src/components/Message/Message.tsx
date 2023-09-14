import { Button } from '@/components/ui/button';
import useAxios from '@/hooks/useAxios';
import { squealRead_t } from '@/lib/types';
import { ArrowDownCircle, ArrowUpCircle } from 'lucide-react';
import { forwardRef, useEffect } from 'react';
import { run } from '@/lib/utils';
import { Large, Muted } from '@/components/ui/typography';
import useIsAuthenticated from '@/hooks/auth/useIsAuthenticated';

type messageProps = {
  children: squealRead_t;
};

type op = 'viewed' | 'upvote' | 'downvote';

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
    const isAuthenticated = useIsAuthenticated();
    const privateApi = useAxios();

    const updateSqueal = (operation: op, id: string) => {
      switch (operation) {
        case 'downvote':
          console.log('downvote');

          break;
        case 'upvote':
          console.log('upvote');

          break;

        case 'viewed':
          console.log('plus one views');
          break;
      }
      // TODO: response and error handling
      // privateApi.patch(`/squeals/${id}`, { op: operation });
    };

    useEffect(() => {
      // when the component is mounted count one view
      updateSqueal('viewed', _id);
    }, []);

    // let bodyContent: JSX.Element;

    // if (typeof body == 'string') bodyContent = <p>{body}</p>;
    // // else if (body instanceof File) bodyContent = <p>{body.name}</p>;
    // else bodyContent = <p>Errore</p>;

    const date = `${datetime.getHours()}:${datetime.getMinutes()} ${datetime.getDay()}/${datetime.getDate()}/${datetime.getFullYear()}`;

    const bodyContent = run(() => {
      if (body.type === 'text') return <p>{body.content}</p>;
      else if (body.type === 'media')
        return <img src={body.content} alt="post-image" />;
      else return <p>Errore</p>;
    });

    return (
      <article
        className="prose prose-custom mx-auto mb-6 rounded border bg-card p-5 md:prose-lg lg:prose-xl"
        ref={ref}
      >
        <section className="flex items-baseline space-x-4">
          <Large>
            {receivers.map((recv, i) => {
              if (i === receivers.length - 1) return recv;
              return `${recv}, `;
            })}
          </Large>
          <Muted>scritto da {author}</Muted>
        </section>
        visualizzazioni: {impressions}
        {bodyContent}
        {/* <p>{body.content}</p> */}
        <Button
          className="mx-2"
          size="icon"
          onClick={() => updateSqueal('upvote', _id)}
          disabled={!isAuthenticated}
        >
          <ArrowUpCircle />
        </Button>
        <span className="pl-1">{positive_reaction}</span>
        <Button
          className="mx-2"
          size="icon"
          onClick={() => updateSqueal('downvote', _id)}
          disabled={!isAuthenticated}
        >
          <ArrowDownCircle />
        </Button>
        <span className="pl-1">{negative_reaction}</span>
      </article>
    );
  },
);

export default Message;
