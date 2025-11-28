import { Input } from "../../components/ui/Input";
import { useEffect, useMemo } from "react";
import { SearchIcon } from "lucide-react";
import debounce from "lodash/debounce";

type SearchRecipientsProps = {
  onSearch: (query: string) => void;
};

export const SearchRecipients = ({ onSearch }: SearchRecipientsProps) => {
  const debouncedSearch = useMemo(
    () =>
      debounce((e: React.ChangeEvent<HTMLInputElement>) => {
        onSearch(e.target.value);
      }, 300),
    [onSearch]
  );

  useEffect(() => {
    return () => {
      debouncedSearch.cancel();
    };
  }, [debouncedSearch]);

  return (
    <Input
      placeholder="Search recipients"
      leftIcon={<SearchIcon className="size-4 text-gray-500" />}
      onChange={debouncedSearch}
    />
  );
};
