import { Comment } from '@/components/Comment';
import type { commentRead_t } from '@/utils/types';

type Props = Readonly<{
  comments: commentRead_t[];
}>;

export const CommentList = ({ comments }: Props) => {
  if (comments.length <= 0) return null;

  return (
    <div className="space-y-6">
      {comments.map((comment) => (
        <Comment key={comment.id}>{comment}</Comment>
      ))}
    </div>
  );
};
