import type {
  ControllerRenderProps,
  FieldPath,
  FieldValues,
} from 'react-hook-form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  FormItem,
  FormControl,
  FormMessage,
  FormLabel,
  FormDescription,
} from '@/components/ui/form';
import { Plus } from 'lucide-react';

type Props<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> = Readonly<{
  field: ControllerRenderProps<TFieldValues, TName>;
  onClick: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}>;

export const ReceiverInput = <
  TFieldValues extends FieldValues,
  TName extends FieldPath<TFieldValues>,
>({
  field,
  onClick,
}: Props<TFieldValues, TName>) => {
  return (
    <FormItem>
      <FormLabel>Destinatari</FormLabel>
      <section className="flex items-center space-x-2">
        <FormControl>
          <Input {...field} />
        </FormControl>
        <Button
          type="button"
          onClick={onClick}
          variant="outline"
          size="icon"
          aria-label="aggiungi destinatario"
        >
          <Plus />
        </Button>
      </section>
      <FormDescription>Inserisci i destinatari del tuo Squeal</FormDescription>
      <FormMessage />
    </FormItem>
  );
};
