import type {
  ControllerRenderProps,
  FieldPath,
  FieldValues,
} from 'react-hook-form';
import { Input } from '@/components/ui/input';
import {
  FormItem,
  FormControl,
  FormMessage,
  FormLabel,
  FormDescription,
} from '@/components/ui/form';

type Props<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> = Readonly<{
  field: ControllerRenderProps<TFieldValues, TName>;
  disabled?: boolean;
}>;

export const UrlInput = <
  TFieldValues extends FieldValues,
  TName extends FieldPath<TFieldValues>,
>({
  field,
  disabled,
}: Props<TFieldValues, TName>) => {
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
