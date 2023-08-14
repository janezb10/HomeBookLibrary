import {
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Button,
  Popover,
  // PopoverArrow,
  // PopoverCloseButton,
  // PopoverContent,
  PopoverTrigger,
  Table,
  TableContainer,
  Tbody,
  Td,
  Tfoot,
  Th,
  Tr,
  useDisclosure,
} from "@chakra-ui/react";
import UpdateBook from "./UpdateBook.tsx";
import { AuthorInterface } from "./BookAtributes/Authors.tsx";
import { PodrocjeInterface } from "./BookAtributes/Podrocja.tsx";
import { PositionInterface } from "./BookAtributes/Positions.tsx";
import { LanguageInterface } from "./BookAtributes/Languages.tsx";
import { CollectionInterface } from "./BookAtributes/Collections.tsx";

export interface BookInterface {
  id: number;
  naslov: string;
  avtor: string;
  id_avtor: number;
  podrocje: string;
  id_podrocje: number;
  podpodrocje: string;
  id_podpodrocje: number;
  pozicija: string;
  id_pozicija: number;
  jezik: string;
  id_jezik: number;
  zbirka: string | null;
  id_zbirka: number;
  drzava: string | null;
  leto: string | null;
  opombe: string | null;
}

interface Props {
  book: BookInterface;
  authToken: string;
  bookAttributes: {
    authors: AuthorInterface[];
    podrocja: PodrocjeInterface[];
    positions: PositionInterface[];
    languages: LanguageInterface[];
    collections: CollectionInterface[];
  };
}

const Book = ({ authToken, book, bookAttributes }: Props) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  // const handleUpdateClick = () => {
  //   onOpen();
  // };
  // const handleCancel = () => {
  //   onClose();
  // };
  // const handleSave = () => {
  //   //TODO Update logic here
  //   onClose();
  // };

  return (
    <AccordionItem>
      <h2>
        <AccordionButton>
          <Box as="span" flex="1" textAlign="left">
            <h3>
              <span>ID: {book.id} </span> - <span>{book.naslov}</span> -
              <span> avtor: {book.avtor}</span>
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
                <Td>{book.naslov}</Td>
              </Tr>
              <Tr>
                <Td>Avtor</Td>
                <Td>{book.avtor}</Td>
              </Tr>
              <Tr>
                <Td>podrocje</Td>
                <Td>{book.podrocje}</Td>
              </Tr>
              <Tr>
                <Td>podpodrocje</Td>
                <Td>{book.podpodrocje}</Td>
              </Tr>
              <Tr>
                <Td>pozicija</Td>
                <Td>{book.pozicija}</Td>
              </Tr>
              <Tr>
                <Td>jezik</Td>
                <Td>{book.jezik}</Td>
              </Tr>
              <Tr>
                <Td>zbirka</Td>
                <Td>{book.zbirka}</Td>
              </Tr>
              <Tr>
                <Td>drzava</Td>
                <Td>{book.drzava}</Td>
              </Tr>
              <Tr>
                <Td>leto</Td>
                <Td>{book.leto}</Td>
              </Tr>
              <Tr>
                <Td>opombe</Td>
                <Td>{book.opombe}</Td>
              </Tr>
            </Tbody>
            <Tfoot>
              <Tr>
                <Th>
                  <Button>Delete book</Button>
                </Th>
                <Th>
                  <Popover
                    isOpen={isOpen}
                    onOpen={onOpen}
                    onClose={onClose}
                    placement="right"
                    closeOnBlur={false}
                  >
                    <PopoverTrigger>
                      <Button>Update</Button>
                    </PopoverTrigger>

                    <UpdateBook
                      bookAttributes={bookAttributes}
                      book={book}
                      authToken={authToken}
                      onClose={onClose}
                    />
                  </Popover>
                </Th>
              </Tr>
            </Tfoot>
          </Table>
        </TableContainer>
      </AccordionPanel>
    </AccordionItem>
  );
};

export default Book;
