import { Select } from "@chakra-ui/react";

export interface CollectionInterface {
  id_zbirka: number;
  zbirka: string;
}

interface Props {
  collections: CollectionInterface[];
  selected: number | null;
  onSelect: (selectedId: number) => void;
}

const Collections = ({ collections, selected, onSelect }: Props) => {
  return (
    <Select
      placeholder="Zbirke.."
      defaultValue={selected || 0}
      onChange={(e) => onSelect(+e.target.value)}
    >
      {collections.map((collection) => {
        return (
          <option value={collection.id_zbirka} key={collection.id_zbirka}>
            {collection.zbirka}
          </option>
        );
      })}
    </Select>
  );
};

export default Collections;
