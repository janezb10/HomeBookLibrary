import { Input, InputGroup, InputLeftElement } from "@chakra-ui/react";
import { BsSearch } from "react-icons/bs";
import { useRef } from "react";
import { BookInterface } from "./Book.tsx";
import { CanceledError } from "axios";
import apiClient from "../services/api-client.ts";

export interface SearchResponse {
  books: BookInterface[];
  numberOfPages: number;
}

interface SearchInputProps {
  onBookSearch: ({ books, numberOfPages }: SearchResponse) => void;
  authToken: string;
}

const SearchInput = ({ onBookSearch, authToken }: SearchInputProps) => {
  const ref = useRef<HTMLInputElement>(null);

  const handleBookSearch = (searcString: string) => {
    const controller = new AbortController();
    apiClient.defaults.headers.common["Authorization"] = `Bearer ${authToken}`;

    apiClient
      .get(`/api/v1/search/${searcString}`, {
        signal: controller.signal,
      })
      .then((res) => {
        onBookSearch({
          books: res.data.books,
          numberOfPages: res.data.numberOfPages,
        });
      })
      .catch((err) => {
        if (err instanceof CanceledError) return;
        console.log(err);
      });
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        if (ref.current) handleBookSearch(ref.current.value);
      }}
    >
      <InputGroup>
        <InputLeftElement children={<BsSearch />} />
        <Input
          ref={ref}
          borderRadius={20}
          placeholder="Search books..."
          variant="filled"
        />
      </InputGroup>
    </form>
  );
};

export default SearchInput;
