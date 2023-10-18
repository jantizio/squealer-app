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
import { Button } from '@/components/ui/button';
import { X } from 'lucide-react';

type MediaInputProp<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> = {
  field: ControllerRenderProps<TFieldValues, TName>;
  disabled?: boolean;
  reset: () => void;
};

export const MediaInput = <
  TFieldValues extends FieldValues,
  TName extends FieldPath<TFieldValues>,
>({
  field,
  disabled,
  reset,
}: MediaInputProp<TFieldValues, TName>) => {
  const { value, onChange, ...rest } = field;
  return (
    <FormItem>
      <FormLabel>Immagine/Video</FormLabel>
      <FormControl>
        <section className="flex items-center space-x-2">
          <Input
            type="file"
            accept="image/*,video/*"
            {...rest}
            onChange={(e) => {
              field.onChange(e.target.files?.[0]);
            }}
            disabled={disabled}
          />
          <Button onClick={reset} variant="outline">
            <X />
          </Button>
        </section>
      </FormControl>

      <FormDescription>
        Carica un'immagine o un video per il tuo Squeal
      </FormDescription>
      <FormMessage />
    </FormItem>
  );
};
