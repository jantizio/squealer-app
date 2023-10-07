import { privateApi } from '@/lib/axios';
import { channel_t, squealRead_t } from '@/utils/types';
import { run } from '@/lib/utils';
import { channelSchema } from '@/schema/shared-schema/channelValidator';
import { squealReadSchema } from '@/schema/shared-schema/squealValidators';
import { fromZodError } from 'zod-validation-error';

export const useFetchChannels = (path: string) => {
  return async (): Promise<channel_t[]> => {
    const response = await privateApi.get<channel_t[]>(path);

    const channelsArray = response.data.reduce<channel_t[]>(
      (filtered, channel) => {
        const channelValidation = channelSchema.safeParse(channel);
        if (channelValidation.success) {
          filtered.push(channelValidation.data);
        } else {
          console.log(`Squeal ${channel.name} failed validation`); //TODO: remove this log
          console.log(
            fromZodError(channelValidation.error, {
              unionSeparator: 'oppure',
              issueSeparator: '\n',
            }).message,
          ); //TODO: remove this log
        }
        return filtered;
      },
      [],
    );

    return channelsArray;
  };
};

export const useFetchSqueals = (path: string, filter?: string) => {
  const queryString = run(() => {
    if (!filter) return '';
    if (filter.startsWith('@')) return `&mention=${filter}`;
    else return `&query=${filter}`;
  });

  return async (page: number): Promise<squealRead_t[]> => {
    const response = await privateApi.get<squealRead_t[]>(
      `${path}?page=${page}${queryString}`,
    );

    const squealArray = response.data.reduce<squealRead_t[]>(
      (filtered, squeal) => {
        const squealValidation = squealReadSchema.safeParse(squeal);
        if (squealValidation.success) {
          filtered.push(squealValidation.data);
        } else {
          console.log(`Squeal ${squeal._id} failed validation`); //TODO: remove this log
          console.log(
            fromZodError(squealValidation.error, {
              unionSeparator: 'oppure',
              issueSeparator: '\n',
            }).message,
          ); //TODO: remove this log
        }
        return filtered;
      },
      [],
    );

    return squealArray;
  };
};
