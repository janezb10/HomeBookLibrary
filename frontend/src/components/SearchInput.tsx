import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Input,
  InputGroup,
  InputLeftElement,
} from "@chakra-ui/react";
import { BsSearch } from "react-icons/bs";
import { useRef, useState } from "react";
import { BookInterface } from "./Book.tsx";
import { AxiosResponse, CanceledError } from "axios";
import apiClient from "../services/api-client.ts";
import PaginationList from "./PaginationList.tsx";

interface SearchResponse {
  books: BookInterface[];
  numberOfPages: number;
  currentPage: number;
}

interface SearchInputProps {
  onBookSearch: (books: BookInterface[]) => void;
  authToken: string;
}

const SearchInput = ({ onBookSearch, authToken }: SearchInputProps) => {
  const ref = useRef<HTMLInputElement>(null);
  const [numberOfPages, setNumberOfPages] = useState(-1);
  const [latestSearch, setLatestSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const handleBookSearch = (searcString: string, page?: number) => {
    const controller = new AbortController();
    apiClient.defaults.headers.common["Authorization"] = `Bearer ${authToken}`;

    apiClient
      .get(`/api/v1/search/${searcString}${page ? "?page=" + page : ""}`, {
        signal: controller.signal,
      })
      .then((res: AxiosResponse<SearchResponse>) => {
        setNumberOfPages(res.data.numberOfPages);
        onBookSearch(res.data.books);
        setCurrentPage(res.data.currentPage);
      })
      .catch((err) => {
        if (err instanceof CanceledError) return;
        console.log(err);
      });
  };

  return (
    <>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          if (ref.current) {
            setLatestSearch(ref.current.value);
            handleBookSearch(ref.current.value);
          }
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
      {numberOfPages > 0 && (
        <PaginationList
          numberOfPages={numberOfPages}
          currentPage={currentPage}
          onSelectPage={(pageNumber) =>
            handleBookSearch(latestSearch, pageNumber)
          }
        />
      )}
      {numberOfPages === 0 && (
        <Alert status="warning">
          <AlertIcon />
          <AlertTitle>Nothing was found</AlertTitle>
          <AlertDescription>Try different search keyword.</AlertDescription>
        </Alert>
      )}
    </>
  );
};

export default SearchInput;
