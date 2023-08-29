import useAxios from '@/hooks/useAxios';
import { channel_t, squealRead_t } from '@/lib/types';
import { channelSchema } from '@/schema/shared-schema/channelValidator';
import { fromZodError } from 'zod-validation-error';
import { squealReadSchema } from '@/schema/shared-schema/squealValidators';

export const useFetchChannels = (path: string) => {
  const backendApi = useAxios();

  return async (): Promise<channel_t[]> => {
    const response = await backendApi.get<channel_t[]>(path);

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

export const useFetchSqueals = (path: string) => {
  const backendApi = useAxios();

  return async (page: number): Promise<squealRead_t[]> => {
    const response = await backendApi.get<squealRead_t[]>(
      `${path}?page=${page}`,
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
