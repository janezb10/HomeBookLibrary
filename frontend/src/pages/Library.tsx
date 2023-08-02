import { Box } from "@chakra-ui/react";
import BookList from "../components/BookList.tsx";
import SearchInput from "../components/SearchInput.tsx";
import { useState } from "react";
import { BookInterface } from "../components/Book.tsx";
import { AuthTokenInterface } from "../hooks/useToken.ts";

const Library = ({ authToken }: AuthTokenInterface) => {
  const [books, setBooks] = useState<BookInterface[]>([]);

  const handleBookSearch = (books: BookInterface[]) => {
    setBooks([...books]);
  };

  return (
    <section>
      <SearchInput authToken={authToken} onBookSearch={handleBookSearch} />
      <Box>
        <BookList books={books} />
      </Box>
    </section>
  );
};

export default Library;
