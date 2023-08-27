import { useState } from "react";
import {
  Button,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverArrow,
  PopoverCloseButton,
  PopoverHeader,
  PopoverBody,
  Divider,
  Select,
  Icon,
  Badge,
} from "@chakra-ui/react";
import { TiDelete } from "react-icons/ti";
import { CollectionInterface } from "../BookAtributes/Collections.tsx";

interface Props {
  options: CollectionInterface[];
  selectedOptions: number[];
  onSelect: (n: number[]) => void;
  collectionMap: Map<number, string>;
}

const CollectionFilter = ({
  options,
  selectedOptions,
  onSelect,
  collectionMap,
}: Props) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleSelectAuthor = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedCollectionId = event.target.value;
    if (!selectedOptions.includes(+selectedCollectionId)) {
      onSelect([...selectedOptions, +selectedCollectionId]);
    }
  };

  const handleClickRemove = (n: number) => {
    onSelect(selectedOptions.filter((cf) => cf !== n));
  };

  return (
    <Popover
      isOpen={isOpen}
      onOpen={() => setIsOpen(true)}
      onClose={() => setIsOpen(false)}
    >
      <PopoverTrigger>
        <Button m={1}>Zbirke</Button>
      </PopoverTrigger>
      <PopoverContent>
        <PopoverArrow />
        <PopoverCloseButton />
        <PopoverHeader>Izberi zbirke</PopoverHeader>
        <PopoverBody>
          {selectedOptions.map((sc) => (
            <Badge m={1} key={sc} colorScheme="orange" fontSize="1rem">
              {collectionMap.get(sc)}
              <Icon
                as={TiDelete}
                fontSize="1.3rem"
                onClick={() => handleClickRemove(sc)}
              />
            </Badge>
          ))}
          <Divider />
          <Select onChange={handleSelectAuthor}>
            {options.map((collection) => (
              <option
                key={collection.id_collection}
                value={collection.id_collection}
              >
                {collection.collection}
              </option>
            ))}
          </Select>
        </PopoverBody>
      </PopoverContent>
    </Popover>
  );
};

export default CollectionFilter;
