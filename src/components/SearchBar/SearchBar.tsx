import { Button, Form, FormInput, useFormStore } from '@ariakit/react';
import { SetStateAction } from 'react';

type SearchBarProps = {
  setFilter: React.Dispatch<SetStateAction<string>>;
};

const SearchBar = ({ setFilter }: SearchBarProps) => {
  const searchForm = useFormStore({ defaultValues: { search: '' } });

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilter(e.target.value);
  };

  return (
    <Form store={searchForm} resetOnSubmit={false}>
      <FormInput
        name={searchForm.names.search}
        type="search"
        placeholder="Cerca..."
        onChange={handleSearch}
      />
      <Button>Search</Button>
      {/* TODO: cambiare con un icona */}
    </Form>
  );
};

export default SearchBar;
