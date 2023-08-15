import { SetStateAction } from 'react';
import { useForm } from 'react-hook-form';
import { Form, FormControl, FormField, FormItem } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';

type SearchBarProps = {
  setFilter: React.Dispatch<SetStateAction<string>>;
};

const SearchBar = ({ setFilter }: SearchBarProps) => {
  const searchForm = useForm<{ search: string }>({
    defaultValues: { search: '' },
  });

  return (
    <Form {...searchForm}>
      <form onSubmit={searchForm.handleSubmit(() => {})} className="relative">
        <FormField
          name="search"
          control={searchForm.control}
          render={({ field }) => {
            return (
              <FormItem>
                <FormControl>
                  <section className="flex items-center justify-center w-full">
                    <Search className="h-icon-md w-icon-md absolute right-[13rem]" />

                    <Input
                      {...field}
                      type="search"
                      placeholder="Cerca..."
                      onChange={(e) => {
                        setFilter(e.target.value);
                        field.onChange(e.target.value);
                      }}
                      className="w-full ml-2 text-center text-lg"
                    />
                  </section>
                </FormControl>
              </FormItem>
            );
          }}
        ></FormField>
      </form>
    </Form>
  );
};

export default SearchBar;
