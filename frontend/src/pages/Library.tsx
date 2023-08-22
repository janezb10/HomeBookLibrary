import { Box, Button, useDisclosure } from "@chakra-ui/react";
import BookList from "../components/BookList.tsx";
import SearchInput from "../components/SearchInput.tsx";
import { useState } from "react";
import { BookInterface } from "../components/Book.tsx";
import { AuthTokenInterface } from "../hooks/useToken.ts";
import { NavLink } from "react-router-dom";
import useBookAttributes from "../hooks/useBookAttributes.ts";
import DeleteBook from "../components/DeleteBook.tsx";

const Library = ({ authToken, setAuthToken }: AuthTokenInterface) => {
  const [books, setBooks] = useState<BookInterface[]>([]);
  const bookAttributes = useBookAttributes(authToken);

  const handleBookSearch = (books: BookInterface[]) => {
    setBooks([...books]);
  };
  //
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [selectedBookId, setSelectedBookId] = useState<number | null>(null);
  const handleDelete = (id: number) => {
    setSelectedBookId(id);
    onOpen();
  };
  //

  return (
    <section>
      {/*<NewBook authToken={authToken} />*/}
      <DeleteBook
        isOpen={isOpen}
        onClose={onClose}
        selectedBookId={selectedBookId}
        setSelectedBookId={setSelectedBookId}
      />
      <Button onClick={() => handleDelete(3)}>asdf</Button>
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
          onDelete={handleDelete}
        />
      </Box>
    </section>
  );
};

export default Library;
