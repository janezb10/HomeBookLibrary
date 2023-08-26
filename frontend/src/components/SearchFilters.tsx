import { Box, Text } from "@chakra-ui/react";
import { BookAttributesInterface } from "../hooks/useBookAttributes.ts";
import PositionFilter from "./Filters/PositionFilter.tsx";

interface Props {
  bookAttributes: BookAttributesInterface;
  selectedPosition: number[];
  handleSelectPosition: (n: number[]) => void;
}

const SearchFilters = ({
  bookAttributes: { positions },
  selectedPosition,
  handleSelectPosition,
}: Props) => {
  return (
    <Box m={1}>
      <Text>Filtri:</Text>
      <PositionFilter
        options={positions}
        selectedOptions={selectedPosition}
        onSelect={handleSelectPosition}
      />
    </Box>
  );
};

export default SearchFilters;
