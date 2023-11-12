import type {
  ControllerRenderProps,
  FieldPath,
  FieldValues,
} from 'react-hook-form';
import { Checkbox } from '@/components/ui/checkbox';
import { FormItem, FormControl, FormLabel } from '@/components/ui/form';

function removeFirstOccurence(arr: string[], value: string) {
  // remove the first occurrence of the value in the array
  const index = arr.indexOf(value);
  if (index > -1) {
    arr.splice(index, 1);
  }
  return arr;
}

type Props<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> = Readonly<{
  field: ControllerRenderProps<TFieldValues, TName>;
  receiver: string;
}>;

export const ReceiversCheckbox = <
  TFieldValues extends FieldValues,
  TName extends FieldPath<TFieldValues>,
>({
  field,
  receiver,
}: Props<TFieldValues, TName>) => {
  return (
    <FormItem className="flex flex-row items-center space-x-3 space-y-0">
      <FormControl>
        <Checkbox
          checked={field.value?.includes(receiver)}
          onCheckedChange={(checked) => {
            return checked
              ? field.onChange([...field.value, receiver])
              : field.onChange(removeFirstOccurence(field.value, receiver));
          }}
        />
      </FormControl>
      <FormLabel>{receiver}</FormLabel>
    </FormItem>
  );
};
