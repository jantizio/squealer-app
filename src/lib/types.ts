import { quota_t } from '@/schema/shared-schema/quotaValidator';
import { userRead_t, userWrite_t } from '@/schema/shared-schema/userValidators';
import { channel_t } from '@/schema/shared-schema/channelValidator';
import {
  squealRead_t,
  squealWrite_t,
} from '@/schema/shared-schema/squealValidators';
import { login_t } from '@/schema/shared-schema/loginValidator';
import { log_t } from '@/schema/shared-schema/logValidator';
import { userType_t } from '@/schema/shared-schema/utils/global';

type Prettify<T> = {
  [K in keyof T]: T[K];
} & {};

type authState_t = {
  token: string;
  expiresIn: number;
  tokenType: string;
  authState: Prettify<Omit<userRead_t, 'quota'>>;
};

type token_payload_t = {
  username: `@${string}`;
  type: userType_t;
  exp: number;
  iat: number;
};

export type {
  quota_t,
  login_t,
  userRead_t,
  userWrite_t,
  channel_t,
  squealRead_t, //TODO: aggiungere il tipo per la geolocation
  squealWrite_t, //TODO: aggiungere il tipo per la geolocation
  log_t,
  authState_t,
  userType_t,
  token_payload_t,
};
