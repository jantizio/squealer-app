import type { quota_t } from '@/utils/types';
import { squealFormSchema } from '@/schema/squealValidator';
import { useUser } from '@/lib/auth';
import { nonTextQuota } from '@/config';

export const useSquealerQuota = () => {
  const { data: authUser } = useUser();

  const defaultData: quota_t = {
    actualD: 0,
    actualW: 0,
    actualM: 0,
    maxD: 0,
    maxW: 0,
    maxM: 0,
  };

  // const { data, isSuccess } = useQuery<quota_t, Error>({
  //   queryKey: ['dailyQuota'],
  //   queryFn: async () => {
  //     const response = await privateApi.get<quota_t>(
  //       `/users/${auth?.authState.username}/quota`,
  //     );

  //     return response.data;
  //   },
  //   placeholderData: defaultData,
  // });

  let quota = defaultData;

  if (authUser) quota = authUser.quota;

  // modify the schema to check the quota
  const updatedsquealSchema = squealFormSchema
    .refine(
      (data) => {
        if (data.body.type === 'text')
          return data.body.content.length <= quota.maxD - quota.actualD;
        return true;
      },
      {
        message: 'Hai superato la quota giornaliera',
        path: ['body.content'],
      },
    )
    .refine(
      (data) => {
        if (data.body.type === 'media') {
          return nonTextQuota <= quota.maxD - quota.actualD;
        }
        return true;
      },
      {
        message: `Per le immagini o i video hai bisogno di ${nonTextQuota} caratteri di quota`,
        path: ['body.content'],
      },
    )
  // TODO: refine per le geolocazioni
  .refine(
    (data) => {
      if (data.body.type === 'geo') {
        return nonTextQuota <= quota.maxD - quota.actualD;
      }
      return true;
    },
    {
      message: `Per la geolocalizzazione hai bisogno di ${nonTextQuota} caratteri di quota`,
      path: ['body.content'],
    },
  );

  return { quota, updatedsquealSchema };
};
