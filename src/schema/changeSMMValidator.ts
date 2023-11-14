import { z } from 'zod';
import { standardString } from './shared-schema/utils/global';

export const changeSMMFormSchema = z.object({
  SMM: standardString,
});
export type changeSMMForm_t = z.infer<typeof changeSMMFormSchema>;
