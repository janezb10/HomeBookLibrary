import { Box } from "@chakra-ui/react";
import BookList from "../components/BookList.tsx";
import SearchInput from "../components/SearchInput.tsx";
import { useState } from "react";
import { BookInterface } from "../components/Book.tsx";
import { AuthTokenInterface } from "../hooks/useToken.ts";
import NewBook from "../components/NewBook.tsx";
import { NavLink } from "react-router-dom";

// interface Props {
//   authToken: AuthTokenInterface;
//   setAuthToken: (token: string) => void;
// }

const Library = ({ authToken, setAuthToken }: AuthTokenInterface) => {
  const [books, setBooks] = useState<BookInterface[]>([]);

  const handleBookSearch = (books: BookInterface[]) => {
    setBooks([...books]);
  };

  return (
    <section>
      <NewBook authToken={authToken} />
      <NavLink
        onClick={() => {
          sessionStorage.removeItem("authToken");
          if (setAuthToken) {
            setAuthToken("");
          }
        }}
        to="/"
      >
        Log out
      </NavLink>
      <SearchInput authToken={authToken} onBookSearch={handleBookSearch} />
      <Box>
        <BookList books={books} authToken={authToken} />
      </Box>
    </section>
  );
};

export default Library;
