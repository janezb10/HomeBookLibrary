import { Box, Text } from "@chakra-ui/react";
import { BookAttributesInterface } from "../hooks/useBookAttributes.ts";
import { useState } from "react";
import PositionFilter from "./Filters/PositionFilter.tsx";

interface Props {
  bookAttributes: BookAttributesInterface;
}

const SearchFilters = ({ bookAttributes: { positions } }: Props) => {
  const [selectedOptions, setSelectedOptions] = useState<number[]>([]);

  const handleSelect = (selected: number[]) => {
    setSelectedOptions(selected);
    console.log(selected);
  };

  return (
    <Box m={1}>
      <Text>Filtri:</Text>
      <PositionFilter
        options={positions}
        selectedOptions={selectedOptions}
        onSelect={handleSelect}
      />
    </Box>
  );
};

export default SearchFilters;
