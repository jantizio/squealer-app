import { forwardRef, useEffect } from 'react';
import { post_t } from '@/lib/types';
import { useIsAuthenticated } from 'react-auth-kit';
import useAxios from '@/hooks/useAxios';
import { Button } from '@/components/ui/button';
import { ArrowUpCircle, ArrowDownCircle } from 'lucide-react';

type messageProps = {
  children: post_t;
};

type op = 'viewed' | 'upvote' | 'downvote';

const Message = forwardRef<HTMLDivElement, messageProps>(
  ({ children }, ref) => {
    const { id, title, body, username } = children;
    const isAuthenticated = useIsAuthenticated();
    const privateApi = useAxios();

    const updateSqueal = (operation: op, id: number) => {
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
      updateSqueal('viewed', id);
    }, []);

    return (
      <article
        className="prose prose-custom md:prose-lg lg:prose-xl border rounded p-5 mb-6 mx-auto bg-card"
        ref={ref}
      >
        <h2>
          {title} - [{username}]
        </h2>
        <p>{body}</p>
        {isAuthenticated() && (
          <>
            <Button
              className="mx-2"
              size="icon"
              onClick={() => updateSqueal('upvote', id)}
            >
              <ArrowUpCircle />
            </Button>
            <Button
              className="mx-2"
              size="icon"
              onClick={() => updateSqueal('downvote', id)}
            >
              <ArrowDownCircle />
            </Button>
          </>
        )}
      </article>
    );
  }
);

export default Message;
