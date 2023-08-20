import { Accordion } from "@chakra-ui/react";
import Book, { BookInterface } from "./Book.tsx";
import { BookAttributesInterface } from "../hooks/useBookAttributes.ts";

interface Props {
  books: BookInterface[];
  bookAttributes: BookAttributesInterface;
}

const BookList = ({ books, bookAttributes }: Props) => {
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
