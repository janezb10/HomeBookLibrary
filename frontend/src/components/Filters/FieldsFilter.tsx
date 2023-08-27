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
import { FieldInterface } from "../BookAtributes/Fields.tsx";

interface Props {
  options: FieldInterface[];
  selectedOptions: number[];
  onSelect: (n: number[]) => void;
  fieldsMap: Map<number, string>;
}

const FieldsFilter = ({
  options,
  selectedOptions,
  onSelect,
  fieldsMap,
}: Props) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleSelectAuthor = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedFieldId = event.target.value;
    if (!selectedOptions.includes(+selectedFieldId)) {
      onSelect([...selectedOptions, +selectedFieldId]);
    }
    // console.log(authorId);
  };

  const handleClickRemove = (n: number) => {
    onSelect(selectedOptions.filter((fi) => fi !== n));
  };

  return (
    <Popover
      isOpen={isOpen}
      onOpen={() => setIsOpen(true)}
      onClose={() => setIsOpen(false)}
    >
      <PopoverTrigger>
        <Button m={1}>Področja</Button>
      </PopoverTrigger>
      <PopoverContent>
        <PopoverArrow />
        <PopoverCloseButton />
        <PopoverHeader>Izberi Področja</PopoverHeader>
        <PopoverBody>
          {selectedOptions.map((sf) => (
            <Badge m={1} key={sf} colorScheme="teal" fontSize="1rem">
              {fieldsMap.get(sf)}
              <Icon
                as={TiDelete}
                fontSize="1.3rem"
                onClick={() => handleClickRemove(sf)}
              />
            </Badge>
          ))}
          <Divider />
          <Select onChange={handleSelectAuthor}>
            {options.map((field) => (
              <option key={field.id_field} value={field.id_field}>
                {field.field}
              </option>
            ))}
          </Select>
        </PopoverBody>
      </PopoverContent>
    </Popover>
  );
};

export default FieldsFilter;
