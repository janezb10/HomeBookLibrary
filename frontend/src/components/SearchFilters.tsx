import { Badge, Box, Icon, Text } from "@chakra-ui/react";
import { BookAttributesInterface } from "../hooks/useBookAttributes.ts";
import PositionFilter from "./Filters/PositionFilter.tsx";
import AuthorFilter from "./Filters/AuthorFilter.tsx";
import { TiDelete } from "react-icons/ti";

interface Props {
  bookAttributes: BookAttributesInterface;
  selectedPositions: number[];
  handleSelectPositions: (n: number[]) => void;
  selectedAuthors: number[];
  handleSelectAuthors: (n: number[]) => void;
}

const SearchFilters = ({
  bookAttributes: { positions, authors, authorsMap, positionsMap },
  selectedPositions,
  handleSelectPositions,
  selectedAuthors,
  handleSelectAuthors,
}: Props) => {
  return (
    <Box m={1}>
      <Text>
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
    </Box>
  );
};

export default SearchFilters;
