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
import emptyBook from "../helper/emptyBook.ts";

const Library = ({ authToken, setAuthToken }: AuthTokenInterface) => {
  const [books, setBooks] = useState<BookInterface[]>([]);
  const bookAttributes = useBookAttributes(authToken);
  const toast = useToast();

  const handleBookSearch = (books: BookInterface[]) => {
    setBooks([...books]);
  };

  // deleting book
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
  const [newBook, setNewBook] = useState<BookInterface>(emptyBook);
  const {
    isOpen: isOpenBookForm,
    onOpen: onOpenBookForm,
    onClose: onCloseBookForm,
  } = useDisclosure();

  const handleBookUpdate = (book: BookInterface) => {
    setNewBook({ ...book });
    onOpenBookForm();
  };
  const bookSaved = (book: BookInterface) => {
    const index = books.findIndex((b) => b.id === book.id);
    if (index < 0) {
      setBooks([book]);
    } else {
      const arr = [...books];
      arr[index] = book;
      setBooks(arr);
    }

    toast({
      title: "Book Saved",
      description: `${book.title} is saved`,
      status: "success",
      duration: 9000,
      isClosable: true,
    });
    setNewBook(emptyBook);
  };

  return (
    <section>
      <BookForm
        isOpen={isOpenBookForm}
        onClose={onCloseBookForm}
        bookAttributes={bookAttributes}
        bookSaved={bookSaved}
        newBook={newBook}
      />
      <DeleteBook
        isOpen={isOpenDeletingBook}
        onClose={onCloseDeletingBook}
        selectedBook={selectedBook}
        setSelectedBook={setSelectedBook}
        bookAttributes={bookAttributes}
        bookDeleted={bookDeleted}
      />
      <Button
        onClick={() => {
          setNewBook({
            title: "",
            id_author: 0,
            id_field: 0,
            id_subfield: 0,
            id_position: 0,
            id_language: 0,
            id_collection: 0,
            country: null,
            year: null,
            notes: null,
          });
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
