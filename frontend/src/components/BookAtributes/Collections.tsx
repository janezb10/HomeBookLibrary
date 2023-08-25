import { FormControl, FormLabel, Input, Text } from "@chakra-ui/react";

export interface CollectionInterface {
  id_collection: number;
  collection: string;
}

interface Props {
  collections: CollectionInterface[];
  selected?: string;
  onSelect: (collection: string) => void;
  collectionIsListed: boolean;
  setCollectionIsListed: (b: boolean) => void;
}

const Collections = ({
  collections,
  selected,
  onSelect,
  collectionIsListed,
  setCollectionIsListed,
}: Props) => {
  const handleChange = (s: string) => {
    if (collections.find((e) => e.collection === s) || s == "") {
      setCollectionIsListed(true);
    } else {
      setCollectionIsListed(false);
    }
    onSelect(s);
  };

  return (
    <FormControl>
      <FormLabel>Zbirka:</FormLabel>
      <Input
        bgColor={collectionIsListed ? "white" : "yellow.100"}
        defaultValue={selected}
        type="text"
        list="collectionList"
        placeholder="Zbirke..."
        onChange={(e) => handleChange(e.target.value)}
      />
      <datalist id="collectionList">
        {collections.map((collection) => {
          return (
            <option key={collection.id_collection}>
              {collection.collection}
            </option>
          );
        })}
      </datalist>
      {!collectionIsListed && (
        <Text color="orange.500">Dodana bo nova zbirka</Text>
      )}
    </FormControl>
  );
};

export default Collections;
