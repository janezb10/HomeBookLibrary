import { Accordion } from "@chakra-ui/react";
import Book, { BookInterface } from "./Book.tsx";
import { BookAttributesInterface } from "../hooks/useBookAttributes.ts";

interface BookListInterface {
  bookAttributes: BookAttributesInterface;
  books: BookInterface[];
}

const BookList = ({ books, bookAttributes }: BookListInterface) => {
  return (
    <Accordion defaultIndex={[-1]} allowMultiple>
      {books.map((book) => {
        return (
          <Book bookAttributes={bookAttributes} book={book} key={book.id} />
        );
      })}
    </Accordion>
  );
};

export default BookList;
