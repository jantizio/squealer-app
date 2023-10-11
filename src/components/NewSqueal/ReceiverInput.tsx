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

type ReceiverInputProp<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> = {
  field: ControllerRenderProps<TFieldValues, TName>;
  onClick: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
};

const ReceiverInput = <
  TFieldValues extends FieldValues,
  TName extends FieldPath<TFieldValues>,
>({
  field,
  onClick,
}: ReceiverInputProp<TFieldValues, TName>) => {
  return (
    <FormItem>
      <FormLabel>Destinatari</FormLabel>
      <section className="flex items-center space-x-2">
        <FormControl>
          <Input {...field} />
        </FormControl>
        <Button type="button" onClick={onClick} variant="outline">
          <Plus />
        </Button>
      </section>
      <FormDescription>Inserisci i destinatari del tuo Squeal</FormDescription>
      <FormMessage />
    </FormItem>
  );
};

export default ReceiverInput;
