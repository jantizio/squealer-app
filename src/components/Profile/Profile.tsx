import { useUserContext } from '@/components/CurrentUserContext';
import { LoggedHeader } from '@/components/Header';
import { Progress } from '@/components/ui/progress';
import { Separator } from '@/components/ui/separator';
import { H1, Large, Lead, Small } from '@/components/ui/typography';
import { run } from '@/utils';

export const Profile = () => {
  const authUser = useUserContext();

  if (!authUser) {
    throw new Error('CurrentUserContext: No value provided');
  }

  const {
    username,
    propic,
    email,
    firstname,
    lastname,
    type,
    SMM,
    verified,
    quota,
    subscriptions,
  } = authUser;

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

  return (
    <>
      <LoggedHeader />
      <main className="flex flex-col items-center justify-center md:mt-28 md:flex-row md:items-start">
        <img
          src={propic}
          alt={`${username} profile picture`}
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
      </main>
    </>
  );
};
