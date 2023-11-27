import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import { useDeleteUserMutation } from '@/hooks/useUsers';
import { useUserContext } from '@/components/CurrentUserContext';
import { Loader2 } from 'lucide-react';
import { useState } from 'react';

const DeleteAccountDialog = () => {
  const authUser = useUserContext();
  const { mutateAsync: deleteUser, isPending } = useDeleteUserMutation();
  const [open, setOpen] = useState(false);

  if (!authUser) {
    throw new Error('CurrentUserContext: No value provided');
  }

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild>
        <Button>Elimina Account</Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Sei assolutamente sicuro?</AlertDialogTitle>
          <AlertDialogDescription>
            Questa azione non può essere annullata. Ciò eliminerà
            definitivamente il tuo account e rimuoverà i tuoi dati dai nostri
            server.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Annulla</AlertDialogCancel>
          <AlertDialogAction
            variant="destructive"
            onClick={async (event) => {
              event.preventDefault();
              await deleteUser(authUser.username).catch();
              setOpen(false);
            }}
            disabled={isPending}
          >
            {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Continua
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeleteAccountDialog;
