import { FormControl, Input } from "@chakra-ui/react";
import { useState } from "react";

interface CollectionInterface {
  id_zbirka: number;
  zbirka: string;
}

interface Props {
  collections: CollectionInterface[];
  selected: string;
  onSelect: (selectedId: string) => void;
}

const Collections = ({ collections, selected, onSelect }: Props) => {
  const [inputValue, setInputValue] = useState("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
    onSelect(inputValue);
  };

  return (
    <FormControl>
      <Input
        type="text"
        list="collections"
        placeholder={selected}
        value={inputValue}
        onChange={(e) => handleInputChange(e)}
      />
      <datalist id="collections">
        {collections.map((collection) => (
          <option value={collection.zbirka} key={collection.id_zbirka} />
        ))}
      </datalist>
    </FormControl>
  );
};

export default Collections;
