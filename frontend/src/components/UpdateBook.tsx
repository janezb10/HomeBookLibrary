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
import Podpodrocja from "./BookAtributes/Podpodrocja.tsx";
import Positions, { PositionInterface } from "./BookAtributes/Positions.tsx";
import { BookInterface } from "./Book.tsx";
import Languages, { LanguageInterface } from "./BookAtributes/Languages.tsx";
import Collections, {
  CollectionInterface,
} from "./BookAtributes/Collections.tsx";
import Country from "./BookAtributes/Country.tsx";
import Year from "./BookAtributes/Year.tsx";
import Notes from "./BookAtributes/Notes.tsx";

interface Props {
  book: BookInterface;
  authToken: string;
  onClose: () => void;
  bookAttributes: {
    authors: AuthorInterface[];
    podrocja: PodrocjeInterface[];
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
  const { authors, podrocja, positions, languages, collections } =
    bookAttributes;

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
          onSelect={(e) => console.log(e)}
        />
        <Podpodrocja
          selected={0}
          onSelect={(e) => console.log(e)}
          podpodrocja={[
            {
              id_podpodrocje: 1,
              id_podrocje: 2,
              podpodrocje: "NE VEM",
            },
            {
              id_podpodrocje: 2,
              id_podrocje: 2,
              podpodrocje: "detektivka",
            },
            {
              id_podpodrocje: 3,
              id_podrocje: 2,
              podpodrocje: "vojni",
            },
          ]}
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
