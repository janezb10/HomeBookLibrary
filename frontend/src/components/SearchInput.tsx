import { Button, Input, InputGroup, InputRightElement } from "@chakra-ui/react";
import { BsSearch } from "react-icons/bs";
import { useRef, useState } from "react";
import { BookInterface } from "./Book.tsx";
import { paginationInterface } from "../hooks/usePagination.ts";
import SearchFilters from "./SearchFilters.tsx";
import { BookAttributesInterface } from "../hooks/useBookAttributes.ts";

export interface SearchResponse {
  books: BookInterface[];
  numberOfPages: number;
  currentPage: number;
}
interface SearchInputProps {
  onBookSearch: (searcString: string, page?: number) => void;
  pagination: paginationInterface;
  bookAttributes: BookAttributesInterface;
}

const SearchInput = ({
  bookAttributes,
  onBookSearch,
  pagination: { setLatestSearch },
}: SearchInputProps) => {
  const ref = useRef<HTMLInputElement>(null);

  const handleSubmit = (e?: React.FormEvent<HTMLFormElement>) => {
    e?.preventDefault();
    if (ref.current) {
      setLatestSearch(ref.current.value);
      onBookSearch(ref.current.value);
    }
  };
  const handleSearchClick = () => {
    if (ref.current) {
      setLatestSearch(ref.current.value);
      onBookSearch(ref.current.value);
    }
  };

  //
  const [selectedPosition, setSelectedPosition] = useState<number[]>([]);

  const handleSelectPosition = (selected: number[]) => {
    setSelectedPosition(selected);
    console.log(selected);
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <InputGroup>
          <Input
            ref={ref}
            borderRadius={20}
            placeholder="Search books..."
            variant="filled"
          />
          <InputRightElement
            children={
              <Button
                p={0}
                onClick={handleSearchClick}
                borderRadius={20}
                size="sm"
              >
                <BsSearch />
              </Button>
            }
          />
        </InputGroup>
        <SearchFilters
          bookAttributes={bookAttributes}
          selectedPosition={selectedPosition}
          handleSelectPosition={handleSelectPosition}
        />
      </form>
    </>
  );
};

export default SearchInput;
