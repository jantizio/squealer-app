import { Button, Heading, HeadingLevel } from '@ariakit/react';
import { forwardRef } from 'react';
import { post_t } from '@/lib/types';
import { useIsAuthenticated } from 'react-auth-kit';
import { ReactComponent as ArrowDown } from '@/assets/arrow-down.svg';
import { ReactComponent as ArrowUp } from '@/assets/arrow-up.svg';
import useAxios from '@/hooks/useAxios';

type messageProps = {
  children: post_t;
};

type op = 'viewed' | 'upvote' | 'downvote';

const Message = forwardRef<HTMLDivElement, messageProps>(
  ({ children }, ref) => {
    const { id, title, body, username } = children;
    const isAuthenticated = useIsAuthenticated();
    const buttonSide = 40;
    const privateApi = useAxios();

    const updateSqueal = (operation: op, id: number) => {
      // TODO: response and error handling
      privateApi.patch(`/squeals/${id}`, { op: operation });
    };

    return (
      <article
        className={
          'prose dark:prose-invert p-5 my-6 w-11/12 mx-auto border border-solid rounded border-neutral-500 shadow-md shadow-neutral-900 hover:shadow-xl'
        }
        ref={ref}
      >
        <HeadingLevel>
          <Heading>
            {title} - [{username}]
          </Heading>
          <p>{body}</p>
          {isAuthenticated() && (
            <>
              <Button
                className="m-2"
                onClick={() => updateSqueal('upvote', id)}
              >
                <ArrowUp width={buttonSide} height={buttonSide} />
              </Button>
              <Button
                className="m-2"
                onClick={() => updateSqueal('downvote', id)}
              >
                <ArrowDown width={buttonSide} height={buttonSide} />
              </Button>
            </>
          )}
        </HeadingLevel>
      </article>
    );
  }
);

export default Message;
