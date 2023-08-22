import { Accordion } from "@chakra-ui/react";
import Book, { BookInterface } from "./Book.tsx";
import { BookAttributesInterface } from "../hooks/useBookAttributes.ts";

interface Props {
  books: BookInterface[];
  bookAttributes: BookAttributesInterface;
  onDelete: (book: BookInterface) => void;
}

const BookList = ({ books, bookAttributes, onDelete }: Props) => {
  return (
    <Accordion defaultIndex={[-1]} allowMultiple>
      {books.map((book) => {
        return (
          <Book
            bookAttributes={bookAttributes}
            book={book}
            key={book.id}
            onDelete={onDelete}
          />
        );
      })}
    </Accordion>
  );
};

export default BookList;
