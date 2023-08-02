import { Accordion } from "@chakra-ui/react";
import Book from "./Book.tsx";

const BookList = () => {
  return (
    <Accordion defaultIndex={[0]} allowMultiple>
      <Book />
    </Accordion>
  );
};

export default BookList;
