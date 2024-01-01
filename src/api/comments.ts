import { axios } from '@/lib/axios';
import { commentReadSchema } from '@/schema/shared-schema/commentValidators';
import type { commentRead_t, commentWrite_t } from '@/utils/types';
import { validate } from '@/utils/validators';

export const createComment = async ({
  comment,
  referenceID,
}: {
  comment: commentWrite_t;
  referenceID: string;
}): Promise<commentRead_t> => {
  const response = await axios.post<unknown>(
    `/comments/${referenceID}`,
    comment,
  );
  return validate(response.data, commentReadSchema);
};
