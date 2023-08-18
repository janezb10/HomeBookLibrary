import {
  Alert,
  AlertIcon,
  Button,
  Flex,
  PopoverArrow,
  PopoverCloseButton,
  PopoverContent,
  Stack,
} from "@chakra-ui/react";
import Title from "./BookAtributes/Title.tsx";
import Authors, { AuthorInterface } from "./BookAtributes/Authors.tsx";
import Podrocja, { PodrocjeInterface } from "./BookAtributes/Podrocja.tsx";
import Podpodrocja, {
  PodpodrocjeInterface,
} from "./BookAtributes/Podpodrocja.tsx";
import Positions, { PositionInterface } from "./BookAtributes/Positions.tsx";
import { BookInterface } from "./Book.tsx";
import Languages, { LanguageInterface } from "./BookAtributes/Languages.tsx";
import Collections, {
  CollectionInterface,
} from "./BookAtributes/Collections.tsx";
import Country from "./BookAtributes/Country.tsx";
import Year from "./BookAtributes/Year.tsx";
import Notes from "./BookAtributes/Notes.tsx";
import { useState } from "react";
import apiClient from "../services/api-client.ts";

interface Props {
  book: BookInterface;
  authToken: string;
  onClose: () => void;
  bookAttributes: {
    authors: AuthorInterface[];
    podrocja: PodrocjeInterface[];
    podpodrocja: PodpodrocjeInterface[];
    positions: PositionInterface[];
    languages: LanguageInterface[];
    collections: CollectionInterface[];
  };
}

const UpdateBook = ({
  book,
  // authToken,
  onClose,
  bookAttributes,
}: Props) => {
  const { authors, podrocja, podpodrocja, positions, languages, collections } =
    bookAttributes;
  const [moznaPodpodrocja, setMoznaPodpodrocja] = useState<
    PodpodrocjeInterface[]
  >(podpodrocja.filter((p) => p.id_podrocje === book.id_podrocje));

  const [noviNaslov, setNoviNaslov] = useState(book.naslov);
  const [noviAvtor, setNoviAvtor] = useState(book.id_avtor);
  const [novoPodrocje, setNovoPodrocje] = useState(book.id_podrocje);
  const [novoPodpodrocje, setNovoPodpodrocje] = useState(book.id_podpodrocje);
  const [novaPozicija, setNovaPozicija] = useState(book.id_pozicija);
  const [novJezik, setNovJezik] = useState(book.id_jezik);
  const [novaZbirka, setNovaZbirka] = useState(book.id_zbirka);
  const [novaDrzava, setNovaDrzava] = useState(book.drzava);
  const [novoLeto, setNovoLeto] = useState(book.leto);
  const [noveOpombe, setNoveOpombe] = useState(book.opombe);

  const [errorUpdating, setErrorUpdating] = useState(false);
  const [successUpdating, setSuccesUpdating] = useState(false);

  const update = async () => {
    const updatedBook = {
      id: book.id,
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
    // console.log(JSON.stringify(updatedBook));

    apiClient
      .put(`/api/v1/books/${updatedBook.id}`, updatedBook)
      .then((res) => {
        console.log("Book updated successfully", res.data);
        setSuccesUpdating(true);
        setErrorUpdating(false);
      })
      .catch((err) => {
        setErrorUpdating(true);
        setSuccesUpdating(false);
        console.log("Error updating book", err);
      });
  };

  return (
    <PopoverContent p={5}>
      <PopoverArrow />
      <PopoverCloseButton />
      <Stack spacing={4}>
        <Title
          currentTitle={book.naslov}
          onChange={(e) => {
            setNoviNaslov(e);
            console.log("Naslov:", e);
          }}
        />
        <Authors
          authors={authors}
          selected={book.id_avtor}
          onSelect={(e) => {
            setNoviAvtor(e);
            console.log("Avror:", e);
          }}
        />
        <Podrocja
          podrocja={podrocja}
          selected={book.id_podrocje}
          onSelect={(e) => {
            console.log("Podrocje:", e);
            setMoznaPodpodrocja(podpodrocja.filter((p) => p.id_podrocje === e));
            setNovoPodrocje(e);
          }}
        />
        <Podpodrocja
          podpodrocja={moznaPodpodrocja}
          selected={book.id_podpodrocje}
          onSelect={(e) => {
            setNovoPodpodrocje(e);
            console.log("Podpodrocje: ", e);
          }}
        />
        <Positions
          positions={positions}
          selected={book.id_pozicija}
          onSelect={(e) => {
            setNovaPozicija(e);
            console.log("Pozicija:", e);
          }}
        />
        <Languages
          languages={languages}
          selected={book.id_jezik}
          onSelect={(e) => {
            setNovJezik(e);
            console.log("Jezik", e);
          }}
        />
        <Collections
          collections={collections}
          selected={book.id_zbirka}
          onSelect={(e) => {
            setNovaZbirka(e);
            console.log("Zbirka:", e);
          }}
        />
        <Country
          currentCountry={book.drzava}
          onChange={(e) => {
            setNovaDrzava(e);
            console.log("Drzava:", e);
          }}
        />
        <Year
          year={book.leto}
          onChange={(e) => {
            setNovoLeto(e);
            console.log("Leto:", e);
          }}
        />
        <Notes
          note={book.opombe}
          onChange={(e) => {
            setNoveOpombe(e);
            console.log("Opombe", e);
          }}
        />
        {errorUpdating && (
          <Alert status="error">
            <AlertIcon />
            Error updating book
          </Alert>
        )}
        {successUpdating && (
          <Alert status="success">
            <AlertIcon />
            Book updated successfully
          </Alert>
        )}
        <Flex justifyContent="space-around">
          <Button onClick={update}>Update</Button>
          <Button onClick={onClose}>Close</Button>
        </Flex>
      </Stack>
    </PopoverContent>
  );
};

export default UpdateBook;
