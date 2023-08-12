import { ControllerRenderProps, FieldPath, FieldValues } from 'react-hook-form';
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

type receiverInputProp<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
> = {
  field: ControllerRenderProps<TFieldValues, TName>;
};

const ReceiverInput = <
TFieldValues extends FieldValues,
TName extends FieldPath<TFieldValues>
>({ field }: receiverInputProp<TFieldValues, TName>) => {
  return (
    <FormItem>
      <FormLabel>Destinatari</FormLabel>
      <div className="flex space-x-2">
        <FormControl>
          <Input {...field} />
        </FormControl>
        <Button type="submit">
          <Plus />
        </Button>
      </div>
      <FormDescription>Inserisci i destinatari del tuo Squeal</FormDescription>
      <FormMessage />
    </FormItem>
  );
};

export default ReceiverInput;
