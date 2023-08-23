import { Box, Button, useDisclosure, useToast } from "@chakra-ui/react";
import BookList from "../components/BookList.tsx";
import SearchInput from "../components/SearchInput.tsx";
import { useState } from "react";
import { BookInterface } from "../components/Book.tsx";
import { AuthTokenInterface } from "../hooks/useToken.ts";
import { NavLink } from "react-router-dom";
import useBookAttributes from "../hooks/useBookAttributes.ts";
import DeleteBook from "../components/DeleteBook.tsx";
import BookForm from "../components/BookForm.tsx";

const Library = ({ authToken, setAuthToken }: AuthTokenInterface) => {
  const [books, setBooks] = useState<BookInterface[]>([]);
  const bookAttributes = useBookAttributes(authToken);

  const handleBookSearch = (books: BookInterface[]) => {
    setBooks([...books]);
  };

  // deleting book
  const toast = useToast();
  const [selectedBook, setSelectedBook] = useState<BookInterface | null>(null);

  const {
    isOpen: isOpenDeletingBook,
    onOpen: onOpenDeletingBook,
    onClose: onCloseDeletingBook,
  } = useDisclosure();
  const handleDelete = (book: BookInterface) => {
    setSelectedBook(book);
    onOpenDeletingBook();
  };
  const bookDeleted = (book: BookInterface) => {
    toast({
      title: "Book Deleted!",
      description: `${book.title} is deleted`,
      status: "success",
      duration: 9000,
      isClosable: true,
    });
    setBooks(books.filter((b) => b.id !== book.id));
  };
  // /deleting book
  // new/update book
  // TODO updateBook initializes at start of the app and sets the states. need to
  // maybe I can change selectedBook Directly
  const {
    isOpen: isOpenBookForm,
    onOpen: onOpenBookForm,
    onClose: onCloseBookForm,
  } = useDisclosure();

  const handleBookUpdate = (book: BookInterface) => {
    setSelectedBook(book);
    // console.log(selectedBook);
    // console.log(book);
    onOpenBookForm();
  };

  const bookSaved = (book: BookInterface) => {
    toast({
      title: "Book Saved",
      description: `${book.title} is saved`,
      status: "success",
      duration: 9000,
      isClosable: true,
    });
    //TODO setBooks() update books on frontend
  };
  // /new/update book

  return (
    <section>
      {/*<NewBook authToken={authToken} />*/}
      <BookForm
        isOpen={isOpenBookForm}
        onClose={onCloseBookForm}
        book={selectedBook}
        setSelectedBook={setSelectedBook}
        bookAttributes={bookAttributes}
        bookSaved={bookSaved}
      />

      {/*Alert dialog for delleting a book*/}
      <DeleteBook
        isOpen={isOpenDeletingBook}
        onClose={onCloseDeletingBook}
        selectedBook={selectedBook}
        setSelectedBook={setSelectedBook}
        bookAttributes={bookAttributes}
        bookDeleted={bookDeleted}
      />
      {/*end alert dialog for delleting a book*/}
      <Button
        onClick={() => {
          onOpenBookForm();
        }}
      >
        New Book
      </Button>
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
          onUpdate={handleBookUpdate}
          onDelete={handleDelete}
        />
      </Box>
    </section>
  );
};

export default Library;
