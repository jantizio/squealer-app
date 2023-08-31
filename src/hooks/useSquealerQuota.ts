import { quota_t, userRead_t } from '@/lib/types';
import { useQuery } from '@tanstack/react-query';
import useAxios from './useAxios';
import { useAuthUser } from 'react-auth-kit';
import { squealFormSchema } from '@/schema/squealValidator';

const nonTextQuota = 80;

export default function useSquealerQuota() {
  const privateApi = useAxios();
  const user = useAuthUser();

  const defaultData: quota_t = {
    actualD: 0,
    actualW: 0,
    actualM: 0,
    maxD: 0,
    maxW: 0,
    maxM: 0,
  };

  const { data, isSuccess } = useQuery<quota_t, Error>({
    queryKey: ['dailyQuota'],
    queryFn: async () => {
      // TODO: get the quota from the server
      new Promise((resolve) => setTimeout(resolve, 2000));
      const response = await privateApi.get<userRead_t>(
        `/users/${user()?.username}`,
      );

      return response.data.quota;
    },
    placeholderData: defaultData,
  });

  let quota = defaultData;

  if (isSuccess) quota = data;

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
    );
  // TODO: refine per le geolocazioni
  // .refine(
  //   (data) => {
  //     if (data.body.type === 'geolocation') {
  //       return nonTextQuota <= quota.maxD - quota.actualD;
  //     }
  //     return true;
  //   },
  //   {
  //     message: `Per la geolocalizzazione hai bisogno di ${nonTextQuota} caratteri di quota`,
  //     path: ['body.content'],
  //   },
  // );

  return { quota, updatedsquealSchema };
}
