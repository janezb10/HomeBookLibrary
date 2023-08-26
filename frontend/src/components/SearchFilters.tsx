import { Box, Text } from "@chakra-ui/react";
import { BookAttributesInterface } from "../hooks/useBookAttributes.ts";
import PositionFilter from "./Filters/PositionFilter.tsx";
import AuthorFilter from "./Filters/AuthorFilter.tsx";
import { useState } from "react";

interface Props {
  bookAttributes: BookAttributesInterface;
  selectedPosition: number[];
  handleSelectPosition: (n: number[]) => void;
}

const SearchFilters = ({
  bookAttributes: { positions, authors, authorsMap },
  selectedPosition,
  handleSelectPosition,
}: Props) => {
  const [selectedAuthors, setSelectedAuthors] = useState<number[]>([]);
  const handleSelectAuthor = (authors: number[]) => {
    setSelectedAuthors(authors);
    // console.log(selectedAuthors);
  };

  return (
    <Box m={1}>
      <Text>Filtri:</Text>
      <PositionFilter
        options={positions}
        selectedOptions={selectedPosition}
        onSelect={handleSelectPosition}
      />
      <AuthorFilter
        options={authors}
        selectedOptions={selectedAuthors}
        onSelect={handleSelectAuthor}
        authorsMap={authorsMap}
      />
    </Box>
  );
};

export default SearchFilters;
