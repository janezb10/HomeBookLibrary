import { Accordion } from "@chakra-ui/react";
import Book, { BookInterface } from "./Book.tsx";
import useBookAttributes from "../hooks/useBookAttributes.ts";

interface BookListInterface {
  books: BookInterface[];
  authToken: string;
}

const BookList = ({ books, authToken }: BookListInterface) => {
  const bookAttributes = useBookAttributes(authToken);

  return (
    <Accordion defaultIndex={[-1]} allowMultiple>
      {books.map((book) => {
        return (
          <Book
            bookAttributes={bookAttributes}
            authToken={authToken}
            book={book}
            key={book.id}
          />
        );
      })}
    </Accordion>
  );
};

export default BookList;
