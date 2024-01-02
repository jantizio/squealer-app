import { axios } from '@/lib/axios';
import { commentReadSchema } from '@/schema/shared-schema/commentValidators';
import type { commentRead_t, commentWrite_t } from '@/utils/types';
import { validate } from '@/utils/validators';

export const createComment = async (
  comment: commentWrite_t,
): Promise<commentRead_t> => {
  const response = await axios.post<unknown>(
    `/comments/${comment.reference}`,
    comment,
  );
  return validate(response.data, commentReadSchema);
};
