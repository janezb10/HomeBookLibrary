import { Badge, Box, Icon, Text } from "@chakra-ui/react";
import { BookAttributesInterface } from "../hooks/useBookAttributes.ts";
import PositionFilter from "./Filters/PositionFilter.tsx";
import AuthorFilter from "./Filters/AuthorFilter.tsx";
import { TiDelete } from "react-icons/ti";
import LanguageFilter from "./Filters/LanguageFilter.tsx";
import CollectionFilter from "./Filters/CollectionFilter.tsx";

interface Props {
  bookAttributes: BookAttributesInterface;
  selectedPositions: number[];
  handleSelectPositions: (n: number[]) => void;
  selectedAuthors: number[];
  handleSelectAuthors: (n: number[]) => void;
  selectedLanguages: number[];
  hancleSelectLanguages: (n: number[]) => void;
  selectedCollections: number[];
  handleSelectCollections: (n: number[]) => void;
}

const SearchFilters = ({
  bookAttributes: {
    positions,
    authors,
    authorsMap,
    positionsMap,
    languages,
    languagesMap,
    collections,
    collectionsMap,
  },
  selectedPositions,
  handleSelectPositions,
  selectedAuthors,
  handleSelectAuthors,
  selectedLanguages,
  hancleSelectLanguages,
  selectedCollections,
  handleSelectCollections,
}: Props) => {
  return (
    <Box m={1}>
      <Text overflow="hidden">
        Filtri:
        {selectedPositions.map((sp) => (
          <Badge colorScheme="green" fontSize="1rem" m={1} key={`p${sp}`}>
            {positionsMap.get(sp)}
            <Icon
              as={TiDelete}
              fontSize="1.3rem"
              onClick={() =>
                handleSelectPositions(selectedPositions.filter((p) => p !== sp))
              }
            />
          </Badge>
        ))}
        {selectedAuthors.map((sa) => (
          <Badge colorScheme="purple" fontSize="1rem" m={1} key={`a${sa}`}>
            {authorsMap.get(sa)}
            <Icon
              as={TiDelete}
              fontSize="1.3rem"
              onClick={() =>
                handleSelectAuthors(selectedAuthors.filter((a) => a !== sa))
              }
            />
          </Badge>
        ))}
        {selectedLanguages.map((sl) => (
          <Badge colorScheme="yellow" fontSize="1rem" m={1} key={`l${sl}`}>
            {languagesMap.get(sl)}
            <Icon
              as={TiDelete}
              fontSize="1.3rem"
              onClick={() =>
                hancleSelectLanguages(selectedLanguages.filter((l) => l !== sl))
              }
            />
          </Badge>
        ))}
        {selectedCollections.map((sc) => (
          <Badge colorScheme="orange" fontSize="1rem" m={1} key={`c${sc}`}>
            {collectionsMap.get(sc)}
            <Icon
              as={TiDelete}
              fontSize="1.3rem"
              onClick={() =>
                handleSelectCollections(
                  selectedCollections.filter((c) => c !== sc),
                )
              }
            />
          </Badge>
        ))}
      </Text>
      <PositionFilter
        options={positions}
        selectedOptions={selectedPositions}
        onSelect={handleSelectPositions}
      />
      <AuthorFilter
        options={authors}
        selectedOptions={selectedAuthors}
        onSelect={handleSelectAuthors}
        authorsMap={authorsMap}
      />
      <LanguageFilter
        options={languages}
        selectedOptions={selectedLanguages}
        onSelect={hancleSelectLanguages}
      />
      <CollectionFilter
        options={collections}
        selectedOptions={selectedCollections}
        onSelect={handleSelectCollections}
        collectionMap={collectionsMap}
      />
    </Box>
  );
};

export default SearchFilters;
