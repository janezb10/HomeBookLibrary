import { Box } from "@chakra-ui/react";
import BookList from "../components/BookList.tsx";
import SearchInput from "../components/SearchInput.tsx";
import { useState } from "react";
import { BookInterface } from "../components/Book.tsx";
import { AuthTokenInterface } from "../hooks/useToken.ts";
import { NavLink } from "react-router-dom";
import useBookAttributes from "../hooks/useBookAttributes.ts";
import useDeleteBookLogic from "../hooks/useDeleteBookLogic.ts";

const Library = ({ authToken, setAuthToken }: AuthTokenInterface) => {
  const [books, setBooks] = useState<BookInterface[]>([]);
  const { deleteBook } = useDeleteBookLogic();
  const bookAttributes = useBookAttributes(authToken);

  const handleBookSearch = (books: BookInterface[]) => {
    setBooks([...books]);
  };
  const handleDeleteBook = (id: number) => {
    deleteBook(
      id,
      () => console.log("sucessss"),
      () => console.log("faill"),
    );
  };

  return (
    <section>
      {/*<NewBook authToken={authToken} />*/}
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
        <BookList
          bookAttributes={bookAttributes}
          books={books}
          onDeleteBook={handleDeleteBook}
        />
      </Box>
    </section>
  );
};

export default Library;
