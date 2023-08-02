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

interface BookInterface {
  id: number;
  naslov: string;
  avtor: string;
  podrocje: string;
  podpodrocje: string;
  pozicija: string;
  jezik: string;
  zbirka: string;
  drzava: string;
  leto: string;
  opombe: string;
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
                  <Button>Update book</Button>
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
