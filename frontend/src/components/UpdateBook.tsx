import {
  Button,
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

  return (
    <PopoverContent p={5}>
      <PopoverArrow />
      <PopoverCloseButton />
      <Stack spacing={4}>
        <Title currentTitle={book.naslov} onChange={(e) => console.log(e)} />
        <Authors
          authors={authors}
          selected={book.id_avtor}
          onSelect={(e) => console.log(e)}
        />
        <Podrocja
          podrocja={podrocja}
          selected={book.id_podrocje}
          onSelect={(e) => {
            console.log(e);
            setMoznaPodpodrocja(podpodrocja.filter((p) => p.id_podrocje === e));
          }}
        />
        <Podpodrocja
          podpodrocja={moznaPodpodrocja}
          selected={book.id_podpodrocje}
          onSelect={(e) => console.log(e)}
        />
        <Positions
          positions={positions}
          selected={book.id_pozicija}
          onSelect={(e) => console.log(e)}
        />
        <Languages
          languages={languages}
          selected={book.id_jezik}
          onSelect={(e) => console.log(e)}
        />
        <Collections
          collections={collections}
          selected={book.id_zbirka}
          onSelect={(e) => console.log(e)}
        />
        <Country
          currentCountry={book.drzava}
          onChange={(e) => console.log(e)}
        />
        <Year year={book.leto} onChange={(e) => console.log(e)} />
        <Notes note={book.opombe} onChange={(e) => console.log(e)} />
        <Button onClick={onClose}>Close</Button>
      </Stack>
    </PopoverContent>
  );
};

export default UpdateBook;

// Trapping Focus within Popover#
// na strani
