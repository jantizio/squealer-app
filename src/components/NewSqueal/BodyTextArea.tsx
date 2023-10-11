import {
  type ControllerRenderProps,
  type FieldPath,
  type FieldValues,
} from 'react-hook-form';
import {
  FormItem,
  FormControl,
  FormMessage,
  FormLabel,
  FormDescription,
} from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';
import { type quota_t } from '@/utils/types';

type BodyTextAreaProp<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> = {
  field: ControllerRenderProps<TFieldValues, TName>;
  quota: quota_t;
};

const BodyTextArea = <
  TFieldValues extends FieldValues,
  TName extends FieldPath<TFieldValues>,
>({
  field,
  quota,
}: BodyTextAreaProp<TFieldValues, TName>) => {
  const { actualD, maxD } = quota;
  return (
    <FormItem>
      <FormLabel>Squeal</FormLabel>
      <FormControl>
        <Textarea placeholder="Hello world!" {...field} />
      </FormControl>
      <FormDescription>
        Hai a disposizione {maxD - (actualD + field.value.length)}/{maxD}{' '}
        caratteri per il tuo Squeal
      </FormDescription>
      <FormMessage />
    </FormItem>
  );
};

export default BodyTextArea;
