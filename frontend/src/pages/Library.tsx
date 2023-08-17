import { Box } from "@chakra-ui/react";
import BookList from "../components/BookList.tsx";
import SearchInput from "../components/SearchInput.tsx";
import { useState } from "react";
import { BookInterface } from "../components/Book.tsx";
import { AuthTokenInterface } from "../hooks/useToken.ts";
import NewBook from "../components/NewBook.tsx";

const Library = ({ authToken }: AuthTokenInterface) => {
  const [books, setBooks] = useState<BookInterface[]>([]);

  const handleBookSearch = (books: BookInterface[]) => {
    setBooks([...books]);
  };

  return (
    <section>
      <NewBook authToken={authToken} />
      <SearchInput authToken={authToken} onBookSearch={handleBookSearch} />
      <Box>
        <BookList books={books} authToken={authToken} />
      </Box>
    </section>
  );
};

export default Library;
