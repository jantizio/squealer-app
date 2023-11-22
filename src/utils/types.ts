import { channelsKey } from '@/hooks/useChannels';
import { squealsKey } from '@/hooks/useSqueals';
import type { channel_t } from '@/schema/shared-schema/channelValidator';
import type { log_t } from '@/schema/shared-schema/logValidator';
import type { login_t } from '@/schema/shared-schema/loginValidator';
import type { quota_t } from '@/schema/shared-schema/quotaValidator';
import type {
  squealRead_t,
  squealWrite_t,
} from '@/schema/shared-schema/squealValidators';
import type {
  userRead_t,
  userWrite_t,
} from '@/schema/shared-schema/userValidators';
import type { userType_t } from '@/schema/shared-schema/utils/global';
import type { QueryFunctionContext, QueryKey } from '@tanstack/react-query';

type Prettify<T> = {
  [K in keyof T]: T[K];
} & {};

type errorMessages_t = {
  [key: number]: string;
  generic: string;
};

type QueryContextFromKeys<
  KeyFactory extends Record<string, QueryKey | ((...args: any[]) => QueryKey)>,
  TPageParam = never,
> = {
  [K in keyof KeyFactory]: KeyFactory[K] extends (...args: any[]) => QueryKey
    ? QueryFunctionContext<ReturnType<KeyFactory[K]>, TPageParam>
    : KeyFactory[K] extends QueryKey
    ? QueryFunctionContext<KeyFactory[K], TPageParam>
    : never;
};

type ChannelsQueryContext = Prettify<QueryContextFromKeys<typeof channelsKey>>;

type SquealsQueryContext<TPageParam = never> = Prettify<
  QueryContextFromKeys<typeof squealsKey, TPageParam>
>;

type filter_t = 'official' | 'subscribed' | 'direct' | 'public' | '';

type squealOperation_t = 'viewed' | 'upvote' | 'downvote';

export type {
  ChannelsQueryContext,
  SquealsQueryContext,
  channel_t,
  errorMessages_t,
  filter_t,
  log_t,
  login_t,
  quota_t,
  squealRead_t,
  squealWrite_t,
  userRead_t,
  userType_t,
  userWrite_t,
  squealOperation_t,
};
