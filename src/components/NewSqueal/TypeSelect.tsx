import type {
  ControllerRenderProps,
  FieldPath,
  FieldValues,
} from 'react-hook-form';
import {
  FormItem,
  FormControl,
  FormMessage,
  FormLabel,
  FormDescription,
} from '@/components/ui/form';
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectValue,
  SelectItem,
} from '@/components/ui/select';

type receiverInputProp<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> = {
  field: ControllerRenderProps<TFieldValues, TName>;
};

export const TypeSelect = <
  TFieldValues extends FieldValues,
  TName extends FieldPath<TFieldValues>,
>({
  field,
}: receiverInputProp<TFieldValues, TName>) => {
  return (
    <FormItem>
      <FormLabel>Tipo</FormLabel>
      <Select onValueChange={field.onChange} defaultValue={field.value}>
        <FormControl>
          <SelectTrigger>
            <SelectValue placeholder="Scegli un tipo" />
          </SelectTrigger>
        </FormControl>
        <SelectContent>
          <SelectItem value="text">Testo</SelectItem>
          <SelectItem value="media">Immagine/Video</SelectItem>
          <SelectItem value="geolocation">Geolocazione</SelectItem>
        </SelectContent>
      </Select>
      <FormDescription>
        Scegli il tipo di Squeal che vuoi inviare
      </FormDescription>
      <FormMessage />
    </FormItem>
  );
};
