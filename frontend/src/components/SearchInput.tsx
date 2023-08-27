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

  // Filters
  const [selectedPositions, setSelectedPositions] = useState<number[]>([]);
  const handleSelectPositions = (selected: number[]) => {
    setSelectedPositions(selected);
    console.log(selected);
  };
  const [selectedAuthors, setSelectedAuthors] = useState<number[]>([]);
  const handleSelectAuthors = (authors: number[]) => {
    setSelectedAuthors(authors);
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
          selectedPositions={selectedPositions}
          handleSelectPositions={handleSelectPositions}
          selectedAuthors={selectedAuthors}
          handleSelectAuthors={handleSelectAuthors}
        />
      </form>
    </>
  );
};

export default SearchInput;
