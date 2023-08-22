import {
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Button,
  Table,
  TableContainer,
  Tbody,
  Td,
  Tfoot,
  Th,
  Tr,
} from "@chakra-ui/react";
import { BookAttributesInterface } from "../hooks/useBookAttributes.ts";
// import DeleteBook from "./DeleteBook.tsx";

export interface BookInterface {
  id: number;
  title: string;
  id_author: number;
  id_field: number;
  id_subfield: number;
  id_position: number;
  id_language: number;
  id_collection: number;
  country: string | null;
  year: string | null;
  notes: string | null;
}

interface Props {
  book: BookInterface;
  bookAttributes: BookAttributesInterface;
  // onDeleteBook: (id: number) => void;
  onDelete: (book: BookInterface) => void;
}

const Book = ({
  book,
  bookAttributes: {
    authorsMap,
    positionsMap,
    collectionsMap,
    languagesMap,
    fieldsMap,
    fields,
  },
  onDelete,
}: Props) => {
  return (
    <AccordionItem>
      <h2>
        <AccordionButton>
          <Box as="span" flex="1" textAlign="left">
            <h3>
              <span>ID: {book.id} </span> - <span>{book.title}</span> -
              <span> avtor: {authorsMap.get(book.id_author)}</span>
            </h3>
          </Box>
          <AccordionIcon />
        </AccordionButton>
      </h2>
      <AccordionPanel pb={4}>
        <TableContainer>
          <Table variant="simple" size="sm">
            <Tbody>
              <Tr>
                <Td>ID:</Td>
                <Td>{book.id}</Td>
              </Tr>
              <Tr>
                <Td>Naslov:</Td>
                <Td>{book.title}</Td>
              </Tr>
              <Tr>
                <Td>Avtor</Td>
                <Td>{authorsMap.get(book.id_author)}</Td>
              </Tr>
              <Tr>
                <Td>podrocje</Td>
                <Td>{fieldsMap.get(book.id_field)}</Td>
              </Tr>
              <Tr>
                <Td>podpodrocje</Td>
                <Td>
                  {fields.find(
                    (f) =>
                      f.id_field === book.id_field &&
                      f.id_subfield === book.id_subfield,
                  )?.subfield || ""}
                </Td>
              </Tr>
              <Tr>
                <Td>pozicija</Td>
                <Td>{positionsMap.get(book.id_position)}</Td>
              </Tr>
              <Tr>
                <Td>jezik</Td>
                <Td>{languagesMap.get(book.id_language)}</Td>
              </Tr>
              <Tr>
                <Td>zbirka</Td>
                <Td>{collectionsMap.get(book.id_collection)}</Td>
              </Tr>
              <Tr>
                <Td>drzava</Td>
                <Td>{book.country}</Td>
              </Tr>
              <Tr>
                <Td>leto</Td>
                <Td>{book.year}</Td>
              </Tr>
              <Tr>
                <Td>opombe</Td>
                <Td>{book.notes}</Td>
              </Tr>
            </Tbody>
            <Tfoot>
              <Tr>
                <Th>
                  <Button onClick={() => onDelete(book)}>Delete Book</Button>
                </Th>
                <Th></Th>
              </Tr>
            </Tfoot>
          </Table>
        </TableContainer>
      </AccordionPanel>
    </AccordionItem>
  );
};

export default Book;
