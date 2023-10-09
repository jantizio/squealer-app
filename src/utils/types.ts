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
import { QueryFunctionContext, QueryKey } from '@tanstack/react-query';
import { channelsKey } from '@/hooks/useChannels';

type Prettify<T> = {
  [K in keyof T]: T[K];
} & {};

type errorMessages_t = {
  [key: number]: string;
  generic: string;
};

// type serverResponse_t<T> = // TODO

//     | {
//         status: 'success';
//         data: T;
//       }
//     | {
//         status: 'error';
//         message: string;
//       };

type QueryContextFromKeys<
  KeyFactory extends Record<string, QueryKey | ((...args: any[]) => QueryKey)>,
> = {
  [K in keyof KeyFactory]: KeyFactory[K] extends (...args: any[]) => QueryKey
    ? QueryFunctionContext<ReturnType<KeyFactory[K]>>
    : KeyFactory[K] extends QueryKey
    ? QueryFunctionContext<KeyFactory[K]>
    : never;
};

type ChannelsQueryContext = Prettify<QueryContextFromKeys<typeof channelsKey>>;

type filter_t = 'official' | 'subscribed' | 'direct' | 'public';

export type {
  quota_t,
  login_t,
  userRead_t,
  userWrite_t,
  channel_t,
  squealRead_t, //TODO: aggiungere il tipo per la geolocation
  squealWrite_t, //TODO: aggiungere il tipo per la geolocation
  log_t,
  userType_t,
  errorMessages_t,
  ChannelsQueryContext,
  filter_t,
};
