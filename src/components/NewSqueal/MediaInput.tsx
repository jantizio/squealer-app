import { ControllerRenderProps, FieldPath, FieldValues } from 'react-hook-form';
import { Input } from '@/components/ui/input';
import {
  FormItem,
  FormControl,
  FormMessage,
  FormLabel,
  FormDescription,
} from '@/components/ui/form';

type receiverInputProp<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
> = {
  field: ControllerRenderProps<TFieldValues, TName>;
};

const ReceiverInput = <
  TFieldValues extends FieldValues,
  TName extends FieldPath<TFieldValues>
>({
  field,
}: receiverInputProp<TFieldValues, TName>) => {
  const { value, onChange, ...rest } = field;
  return (
    <FormItem>
      <FormLabel>Immagine/Video</FormLabel>
      <FormControl>
        <Input
          type="file"
          accept="image/*,video/*"
          {...rest}
          onChange={(e) => field.onChange(e.target.files?.[0])}
        />
      </FormControl>
      <FormDescription>
        Carica un'immagine o un video per il tuo Squeal
      </FormDescription>
      <FormMessage />
    </FormItem>
  );
};

export default ReceiverInput;
