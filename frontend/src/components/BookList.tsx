import { Accordion } from "@chakra-ui/react";
import Book, { BookInterface } from "./Book.tsx";

interface BookListInterface {
  books: BookInterface[];
}

const BookList = ({ books }: BookListInterface) => {
  return (
    <Accordion defaultIndex={[1]} allowMultiple>
      {books.map((book) => {
        return (
          <Book
            key={book.id}
            id={book.id}
            naslov={book.naslov}
            avtor={book.avtor}
            podrocje={book.podrocje}
            podpodrocje={book.podpodrocje}
            pozicija={book.pozicija}
            jezik={book.jezik}
            zbirka={book.zbirka}
            drzava={book.drzava}
            leto={book.leto}
            opombe={book.opombe}
          />
        );
      })}
    </Accordion>
  );
};

export default BookList;
