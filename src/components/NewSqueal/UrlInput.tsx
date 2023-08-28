import { ControllerRenderProps, FieldPath, FieldValues } from 'react-hook-form';
import { Input } from '@/components/ui/input';
import {
  FormItem,
  FormControl,
  FormMessage,
  FormLabel,
  FormDescription,
} from '@/components/ui/form';

type UrlInputProp<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> = {
  field: ControllerRenderProps<TFieldValues, TName>;
  disabled?: boolean;
};

const UrlInput = <
  TFieldValues extends FieldValues,
  TName extends FieldPath<TFieldValues>,
>({
  field,
  disabled,
}: UrlInputProp<TFieldValues, TName>) => {
  return (
    <FormItem>
      <FormLabel>Inserisci link</FormLabel>
      <FormControl>
        <Input {...field} disabled={disabled} />
      </FormControl>
      <FormDescription>
        Inserisci il link di un'immagine o di un video
      </FormDescription>
      <FormMessage />
    </FormItem>
  );
};

export default UrlInput;
