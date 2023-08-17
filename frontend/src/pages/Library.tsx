import { Box } from "@chakra-ui/react";
import BookList from "../components/BookList.tsx";
import SearchInput, { SearchResponse } from "../components/SearchInput.tsx";
import { useState } from "react";
import { BookInterface } from "../components/Book.tsx";
import { AuthTokenInterface } from "../hooks/useToken.ts";
import PaginationList from "../components/PaginationList.tsx";

const Library = ({ authToken }: AuthTokenInterface) => {
  const [books, setBooks] = useState<BookInterface[]>([]);
  const [numberOfPages, setNumberOfPages] = useState(0);

  const handleBookSearch = ({ books, numberOfPages }: SearchResponse) => {
    setBooks([...books]);
    setNumberOfPages(numberOfPages);
  };

  return (
    <section>
      <SearchInput authToken={authToken} onBookSearch={handleBookSearch} />
      <Box>
        <BookList books={books} authToken={authToken} />
      </Box>
      {numberOfPages > 0 && <PaginationList numberOfPages={numberOfPages} />}
    </section>
  );
};

export default Library;
