import { useUserContext } from '@/components/CurrentUserContext';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { H2, H3 } from '@/components/ui/typography';
import { useLogout } from '@/hooks/useLogout';
import { Loader2 } from 'lucide-react';
import { ChangePswDialog } from './ChangePswDialog';
import DeleteAccountDialog from './DeleteAccountDialog';

export const Account = () => {
  const authUser = useUserContext();
  const { logoutUser, isPending: isLogoutLoading } = useLogout();

  if (!authUser) {
    throw new Error('CurrentUserContext: No value provided');
  }

  return (
    <>
      <H2>Gestisci il tuo account</H2>
      <section className="mt-6 space-y-7">
        <section className="flex flex-wrap items-center gap-3">
          <H3>Cambio password</H3>
          <ChangePswDialog />
        </section>
        <Separator className="mt-4" />

        <section className="flex flex-wrap items-center gap-3">
          <H3>Logout</H3>
          <Button onClick={() => logoutUser({})} disabled={isLogoutLoading}>
            {isLogoutLoading && (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            )}
            Logout
          </Button>
        </section>
        <Separator className="mt-4" />

        <section className="flex flex-wrap items-center gap-3">
          <H3>Elimina Account</H3>
          <DeleteAccountDialog />
        </section>
      </section>
    </>
  );
};
