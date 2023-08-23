import { Accordion } from "@chakra-ui/react";
import Book, { BookInterface } from "./Book.tsx";
import { BookAttributesInterface } from "../hooks/useBookAttributes.ts";

interface Props {
  books: BookInterface[];
  bookAttributes: BookAttributesInterface;
  onUpdate: (book: BookInterface) => void;
  onDelete: (book: BookInterface) => void;
}

const BookList = ({ books, bookAttributes, onUpdate, onDelete }: Props) => {
  return (
    <Accordion defaultIndex={[-1]} allowMultiple>
      {books.map((book) => {
        return (
          <Book
            bookAttributes={bookAttributes}
            book={book}
            key={book.id}
            onUpdate={onUpdate}
            onDelete={onDelete}
          />
        );
      })}
    </Accordion>
  );
};

export default BookList;
