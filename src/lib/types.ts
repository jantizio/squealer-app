import { quota_t } from '@/schema/shared-schema/quotaValidator';
import { userRead_t, userWrite_t } from '@/schema/shared-schema/userValidators';
import { channel_t } from '@/schema/shared-schema/channelValidator';
import {
  squealRead_t,
  squealWrite_t,
} from '@/schema/shared-schema/squealValidators';
import { log_t } from '@/schema/shared-schema/logValidator';

export type {
  quota_t,
  userRead_t,
  userWrite_t,
  channel_t,
  squealRead_t, //TODO: aggiungere il tipo per la geolocation
  squealWrite_t, //TODO: aggiungere il tipo per la geolocation
  log_t,
};

export type authUser_t = {
  username: string;
  SMM: string | null;
  type: 'standard' | 'professional' | 'moderator';
};
