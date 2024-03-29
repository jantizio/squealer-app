import { Form, FormControl, FormField, FormItem } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { cn } from '@/utils';
import { Search } from 'lucide-react';
import { type SetStateAction } from 'react';
import { useForm } from 'react-hook-form';

type Props = Readonly<{
  setFilter: React.Dispatch<SetStateAction<string>>;
  className?: string;
}>;

export const SearchBar = ({ setFilter, className }: Props) => {
  const searchForm = useForm<{ search: string }>({
    defaultValues: { search: '' },
  });

  return (
    <Form {...searchForm}>
      <form
        onSubmit={searchForm.handleSubmit(() => {})}
        className={cn('-ml-6', className)}
      >
        <FormField
          name="search"
          control={searchForm.control}
          render={({ field }) => {
            return (
              <FormItem className="flex w-full items-center space-y-0">
                <Search className="pointer-events-none relative left-10 z-10 h-icon-md w-icon-md " />
                <FormControl>
                  <Input
                    {...field}
                    type="search"
                    placeholder="Cerca..."
                    onChange={(e) => {
                      setFilter(e.target.value);
                      field.onChange(e.target.value);
                    }}
                    className="w-full text-center text-lg"
                  />
                </FormControl>
              </FormItem>
            );
          }}
        ></FormField>
      </form>
    </Form>
  );
};
