import { useUserContext } from '@/components/CurrentUserContext';
import { LoggedHeader } from '@/components/Header';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Separator } from '@/components/ui/separator';
import { Slider } from '@/components/ui/slider';
import { H1, H2, Large, Lead, P, Small } from '@/components/ui/typography';
import { buyQuotaMutation } from '@/hooks/useUsers';
import { run } from '@/utils';
import { useState } from 'react';

function calcNewQuota(quota: number, increment: number) {
  return quota + Math.floor(increment);
}

export const Profile = () => {
  const authUser = useUserContext();

  if (!authUser) {
    throw new Error('CurrentUserContext: No value provided');
  }

  const { username, propic, email, firstname, lastname, type, SMM, quota } =
    authUser;

  const { mutate: buyQuota } = buyQuotaMutation();

  const [quotaIncrement, setQuotaIncrement] = useState(0);
  const multiplier = quotaIncrement / quota.maxD;

  const actualD = quota.maxD - quota.actualD;
  const actualW = quota.maxW - quota.actualW;
  const actualM = quota.maxM - quota.actualM;

  const typeString = run(() => {
    switch (type) {
      case 'professional':
        return 'Professionista';
      case 'moderator':
        return 'Moderatore';
      default:
        return 'Utente';
    }
  });

  const ret = {
    maxD: calcNewQuota(quota.maxD, quota.maxD * multiplier),
    maxW: calcNewQuota(quota.maxW, quota.maxW * multiplier),
    maxM: calcNewQuota(quota.maxM, quota.maxM * multiplier),
  };


  return (
    <>
      <LoggedHeader />
      <main className="container">
        <div className="flex flex-col items-center justify-center md:mt-28 md:flex-row md:items-start">
          <img
            src={propic}
            alt={`${username}`}
            className="h-32 w-32 rounded-full object-cover md:mr-8"
          />
          <div className="text-center md:text-left">
            <H1 className="mt-4">{`${firstname} ${lastname}`}</H1>
            <Large className="mt-1">{username}</Large>
            <Lead className="mt-2 ">{typeString}</Lead>
            <Lead className="mt-2 ">{email}</Lead>

            <Separator className="mt-4" />
            <Small className="mt-2">
              Social Media Manager: {SMM ?? 'Nessuno'}
            </Small>

            <Small className="mt-2">
              Quota Giornaliera: {actualD}/{quota.maxD}
            </Small>
            <Progress className="mt-1" value={(actualD / quota.maxD) * 100} />

            <Small className="mt-2">
              Quota Settimanale: {actualW}/{quota.maxW}
            </Small>
            <Progress className="mt-1" value={(actualW / quota.maxW) * 100} />

            <Small className="mt-2">
              Quota Mensile: {actualM}/{quota.maxM}
            </Small>
            <Progress className="mt-1" value={(actualM / quota.maxM) * 100} />
          </div>
        </div>
        <Separator className="mx-auto my-5 max-w-md" />
        <div className="mx-auto flex max-w-md flex-col">
          <H2 className="border-none">Compra la quota</H2>
          <Slider
            defaultValue={[0]}
            max={1000}
            value={[quotaIncrement]}
            onValueChange={(value) => setQuotaIncrement(value[0] ?? 0)}
          />
          <P>Anteprima: </P>
          {/* Quota giornaliera */}
          <Small className="mt-2">
            Quota Giornaliera: {calcNewQuota(actualD, quota.maxD * multiplier)}/
            {calcNewQuota(quota.maxD, quota.maxD * multiplier)}
          </Small>
          <Progress
            className="mt-1"
            value={
              (calcNewQuota(actualD, quota.maxD * multiplier) /
                calcNewQuota(quota.maxD, quota.maxD * multiplier)) *
              100
            }
          />
          {/* Quota settimanale */}
          <Small className="mt-2">
            Quota Settimanale: {calcNewQuota(actualW, quota.maxW * multiplier)}/
            {calcNewQuota(quota.maxW, quota.maxW * multiplier)}
          </Small>
          <Progress
            className="mt-1"
            value={
              (calcNewQuota(actualW, quota.maxW * multiplier) /
                calcNewQuota(quota.maxW, quota.maxW * multiplier)) *
              100
            }
          />
          {/* Quota Mensile */}
          <Small className="mt-2">
            Quota Mensile: {calcNewQuota(actualM, quota.maxM * multiplier)}/
            {calcNewQuota(quota.maxM, quota.maxM * multiplier)}
          </Small>
          <Progress
            className="mt-1"
            value={
              (calcNewQuota(actualM, quota.maxM * multiplier) /
                calcNewQuota(quota.maxM, quota.maxM * multiplier)) *
              100
            }
          />
          <Button className="mt-5" onClick={() => buyQuota(ret)}>
            Compra la quota
          </Button>
        </div>
      </main>
    </>
  );
};
