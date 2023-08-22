import { Button } from '@/components/ui/button';
import useAxios from '@/hooks/useAxios';
import { squealRead_t } from '@/lib/types';
import { ArrowDownCircle, ArrowUpCircle } from 'lucide-react';
import { forwardRef, useEffect } from 'react';
import { useIsAuthenticated } from 'react-auth-kit';

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
      privateApi.patch(`/squeals/${id}`, { op: operation });
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

    return (
      <article
        className="prose prose-custom md:prose-lg lg:prose-xl border rounded p-5 mb-6 mx-auto bg-card"
        ref={ref}
      >
        <p>
          {author} - {date}
        </p>
        {impressions}
        {/* {bodyContent} */}
        <p>{body}</p>

        <Button
          className="mx-2"
          size="icon"
          onClick={() => updateSqueal('upvote', _id)}
          disabled={!isAuthenticated()}
        >
          <ArrowUpCircle />
          {positive_reaction}
        </Button>
        <Button
          className="mx-2"
          size="icon"
          onClick={() => updateSqueal('downvote', _id)}
          disabled={!isAuthenticated()}
        >
          <ArrowDownCircle />
          {negative_reaction}
        </Button>
      </article>
    );
  }
);

export default Message;
