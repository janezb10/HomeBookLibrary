import {
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Button,
  Popover,
  PopoverArrow,
  PopoverCloseButton,
  PopoverContent,
  PopoverTrigger,
  Stack,
  Table,
  TableContainer,
  Tbody,
  Td,
  Tfoot,
  Th,
  Tr,
  useDisclosure,
} from "@chakra-ui/react";
import Title from "./BookAtributes/Title.tsx";
import Authors from "./BookAtributes/Authors.tsx";
import Podrocja from "./BookAtributes/Podrocja.tsx";

export interface BookInterface {
  id: number;
  naslov: string;
  avtor: string;
  podrocje: string;
  podpodrocje: string;
  pozicija: string;
  jezik: string;
  zbirka: string | null;
  drzava: string | null;
  leto: string | null;
  opombe: string | null;
}

const Book = ({
  id,
  naslov,
  avtor,
  podrocje,
  podpodrocje,
  pozicija,
  jezik,
  zbirka,
  drzava,
  leto,
  opombe,
}: BookInterface) => {
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
              <span>ID: {id} </span> - <span>{naslov}</span> -
              <span> avtor: {avtor}</span>
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
                <Td>{id}</Td>
              </Tr>
              <Tr>
                <Td>Naslov:</Td>
                <Td>{naslov}</Td>
              </Tr>
              <Tr>
                <Td>Avtor</Td>
                <Td>{avtor}</Td>
              </Tr>
              <Tr>
                <Td>podrocje</Td>
                <Td>{podrocje}</Td>
              </Tr>
              <Tr>
                <Td>podpodrocje</Td>
                <Td>{podpodrocje}</Td>
              </Tr>
              <Tr>
                <Td>pozicija</Td>
                <Td>{pozicija}</Td>
              </Tr>
              <Tr>
                <Td>jezik</Td>
                <Td>{jezik}</Td>
              </Tr>
              <Tr>
                <Td>zbirka</Td>
                <Td>{zbirka}</Td>
              </Tr>
              <Tr>
                <Td>drzava</Td>
                <Td>{drzava}</Td>
              </Tr>
              <Tr>
                <Td>leto</Td>
                <Td>{leto}</Td>
              </Tr>
              <Tr>
                <Td>opombe</Td>
                <Td>{opombe}</Td>
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
                    <PopoverContent p={5}>
                      <PopoverArrow />
                      <PopoverCloseButton />
                      <Stack spacing={4}>
                        <Title
                          currentTitle={naslov}
                          onChange={(e) => console.log(e)}
                        />
                        <Authors
                          authors={[
                            { id_avtor: 0, avtor: "aaaa" },
                            { id_avtor: 1, avtor: "bbb" },
                          ]}
                          selected={1}
                          onSelect={(e) => console.log(e)}
                        />
                        <Podrocja
                          podrocja={[
                            { id_podrocje: 0, podrocje: "aaa" },
                            { id_podrocje: 1, podrocje: "bbb" },
                          ]}
                          onSelect={(e) => console.log(e)}
                          selected={1}
                        />
                        <Button onClick={onClose}>Close</Button>
                      </Stack>
                    </PopoverContent>
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

// moram dodati v api id avtorja oz idje
// prvo spet backend lepo
// [
//   {
//     "id": 55,
//     "naslov": "SLIKANJE NA KERAMIKO",
//     "avtor": "VEČ",
//     "podrocje": "dom",
//     "podpodrocje": "ročna dela",
//     "pozicija": "dnevna",
//     "jezik": "slovenščina",
//     "zbirka": "PREPOROSTE TEHNIKE",
//     "drzava": null,
//     "leto": null,
//     "opombe": null
//   }
// ]
