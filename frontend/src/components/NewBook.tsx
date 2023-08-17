import {
  Button,
  Flex,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Stack,
  useDisclosure,
} from "@chakra-ui/react";
import Title from "./BookAtributes/Title.tsx";
import Authors from "./BookAtributes/Authors.tsx";
import Podrocja from "./BookAtributes/Podrocja.tsx";
import Podpodrocja, {
  PodpodrocjeInterface,
} from "./BookAtributes/Podpodrocja.tsx";
import Positions from "./BookAtributes/Positions.tsx";
import Languages from "./BookAtributes/Languages.tsx";
import Collections from "./BookAtributes/Collections.tsx";
import Country from "./BookAtributes/Country.tsx";
import Year from "./BookAtributes/Year.tsx";
import Notes from "./BookAtributes/Notes.tsx";
import { useState } from "react";
import useBookAttributes from "../hooks/useBookAttributes.ts";

interface Props {
  authToken: string;
}

const NewBook = ({ authToken }: Props) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  // TODO PRINESI BOOKATTRIBUTES DO SM
  const { authors, podrocja, podpodrocja, positions, languages, collections } =
    useBookAttributes(authToken);

  const [moznaPodpodrocja, setMoznaPodpodrocja] = useState<
    PodpodrocjeInterface[]
  >(podpodrocja.filter((p) => p.id_podrocje === 0));

  const [noviNaslov, setNoviNaslov] = useState("");
  const [noviAvtor, setNoviAvtor] = useState(0);
  const [novoPodrocje, setNovoPodrocje] = useState(0);
  const [novoPodpodrocje, setNovoPodpodrocje] = useState(0);
  const [novaPozicija, setNovaPozicija] = useState(0);
  const [novJezik, setNovJezik] = useState(0);
  const [novaZbirka, setNovaZbirka] = useState(0);
  const [novaDrzava, setNovaDrzava] = useState("");
  const [novoLeto, setNovoLeto] = useState<string | null>(null);
  const [noveOpombe, setNoveOpombe] = useState("");

  const saveBook = () => {
    const newBook = {
      naslov: noviNaslov,
      id_avtor: noviAvtor,
      id_podrocje: novoPodrocje,
      id_podpodrocje: novoPodpodrocje,
      id_pozicija: novaPozicija,
      id_jezik: novJezik,
      id_zbirka: novaZbirka,
      drzava: novaDrzava,
      leto: novoLeto,
      opombe: noveOpombe,
    };
    console.log(JSON.stringify(newBook));
  };

  return (
    <>
      <Button onClick={onOpen}>New Book</Button>

      <Modal onClose={onClose} isOpen={isOpen} isCentered>
        <ModalOverlay
          bg="blackAlpha.300"
          backdropFilter="blur(10px) hue-rotate(90deg)"
        />
        <ModalContent>
          <ModalHeader>New Book</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Stack spacing={4}>
              <Title
                onChange={(e) => {
                  setNoviNaslov(e);
                  console.log("Naslov:", e);
                }}
              />
              <Authors
                authors={authors}
                onSelect={(e) => {
                  setNoviAvtor(e);
                  console.log("Avror:", e);
                }}
              />
              <Podrocja
                podrocja={podrocja}
                onSelect={(e) => {
                  console.log("Podrocje:", e);
                  setMoznaPodpodrocja(
                    podpodrocja.filter((p) => p.id_podrocje === e),
                  );
                  setNovoPodrocje(e);
                }}
              />
              <Podpodrocja
                podpodrocja={moznaPodpodrocja}
                onSelect={(e) => {
                  setNovoPodpodrocje(e);
                  console.log("Podpodrocje: ", e);
                }}
              />
              <Positions
                positions={positions}
                onSelect={(e) => {
                  setNovaPozicija(e);
                  console.log("Pozicija:", e);
                }}
              />
              <Languages
                languages={languages}
                onSelect={(e) => {
                  setNovJezik(e);
                  console.log("Jezik", e);
                }}
              />
              <Collections
                collections={collections}
                onSelect={(e) => {
                  setNovaZbirka(e);
                  console.log("Zbirka:", e);
                }}
              />
              <Country
                onChange={(e) => {
                  setNovaDrzava(e);
                  console.log("Drzava:", e);
                }}
              />
              <Year
                onChange={(e) => {
                  setNovoLeto(e);
                  console.log("Leto:", e);
                }}
              />
              <Notes
                onChange={(e) => {
                  setNoveOpombe(e);
                  console.log("Opombe", e);
                }}
              />
            </Stack>
          </ModalBody>
          <ModalFooter>
            <Flex>
              <Button onClick={onClose}>Close</Button>
              <Button onClick={saveBook}>Save Book</Button>
            </Flex>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default NewBook;
