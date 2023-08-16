import { Accordion } from "@chakra-ui/react";
import Book, { BookInterface } from "./Book.tsx";
import useBookAttributes from "../hooks/useBookAttributes.ts";
import PaginationList from "./PaginationList.tsx";

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
      {books.length > 1 && <PaginationList />}
    </Accordion>
  );
};

export default BookList;
