import { Accordion } from "@chakra-ui/react";
import Book, { BookInterface } from "./Book.tsx";

interface BookListInterface {
  books: BookInterface[];
  authToken: string;
}

const BookList = ({ books, authToken }: BookListInterface) => {
  return (
    <Accordion defaultIndex={[-1]} allowMultiple>
      {books.map((book) => {
        return <Book authToken={authToken} book={book} key={book.id} />;
      })}
    </Accordion>
  );
};

export default BookList;
