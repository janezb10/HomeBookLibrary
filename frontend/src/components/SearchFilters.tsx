import { Box } from "@chakra-ui/react";
// import { useState } from "react";
import { BookAttributesInterface } from "../hooks/useBookAttributes.ts";
import AuthorFilter from "./Filters/AuthorFilter.tsx";
import { useState } from "react";

interface Props {
  bookAttributes: BookAttributesInterface;
}

const SearchFilters = ({ bookAttributes: { authors } }: Props) => {
  const [selectedAuthors, setSelectedAuthors] = useState<number[]>([]);
  // const options = ["Option 1", "Option 2", "Option 3"];
  // const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
  //
  const handleSelect = (selection: number[]) => {
    setSelectedAuthors(selection);
    console.log(selection);
  };
  return (
    <Box>
      <AuthorFilter
        options={authors}
        selectedOptions={selectedAuthors}
        onSelect={handleSelect}
      />
      {/*<FieldsFilter*/}
      {/*  // options={}*/}
      {/*  fieldsMap={fieldsMap}*/}
      {/*  selectedOptions={selectedFields}*/}
      {/*  onSelect={(selection) => {*/}
      {/*    setSelectedFields(selection);*/}
      {/*  }}*/}
      {/*/>*/}
      {/*<DropdownCheckbox*/}
      {/*  options={options}*/}
      {/*  selectedOptions={selectedOptions}*/}
      {/*  onSelect={handleSelect}*/}
      {/*/>*/}
    </Box>
  );
};

export default SearchFilters;
