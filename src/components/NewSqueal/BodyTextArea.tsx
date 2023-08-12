import { ControllerRenderProps, FieldPath, FieldValues } from 'react-hook-form';
import {
  FormItem,
  FormControl,
  FormMessage,
  FormLabel,
  FormDescription,
} from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';
import { quota_t } from '@/lib/types';

type receiverInputProp<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
> = {
  field: ControllerRenderProps<TFieldValues, TName>;
  quota: quota_t;
};

const ReceiverInput = <
  TFieldValues extends FieldValues,
  TName extends FieldPath<TFieldValues>
>({
  field,
  quota,
}: receiverInputProp<TFieldValues, TName>) => {
  return (
    <FormItem>
      <FormLabel>Squeal</FormLabel>
      <FormControl>
        <Textarea placeholder="Hello world!" {...field} />
      </FormControl>
      <FormDescription>
        Hai a disposizione {quota.day} caratteri per il tuo Squeal
      </FormDescription>
      <FormMessage />
    </FormItem>
  );
};

export default ReceiverInput;
