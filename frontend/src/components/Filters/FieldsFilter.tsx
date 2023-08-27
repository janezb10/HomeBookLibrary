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
import { AllFieldsInterface } from "../BookAtributes/Fields.tsx";

interface Props {
  options: AllFieldsInterface[];
  selectedOptions: number[][];
  onSelect: (t: number[][]) => void;
  fieldsMap: Map<number, string>;
}

const FieldsFilter = ({
  options,
  selectedOptions,
  onSelect,
  fieldsMap,
}: Props) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleSelectFields = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value;
    const selectedFieldsId: number[] = value.split(",").map((e) => +e);
    const found = selectedOptions.find(
      (e) => e[0] === selectedFieldsId[0] && e[1] === selectedFieldsId[1],
    );
    if (!found) {
      onSelect([...selectedOptions, selectedFieldsId]);
    }
  };

  const handleClickRemove = (n: number[]) => {
    console.log(n);
    // todo check if includes same tuple and remove
    // onSelect(selectedOptions.filter((au) => au !== n));
  };

  return (
    <Popover
      isOpen={isOpen}
      onOpen={() => setIsOpen(true)}
      onClose={() => setIsOpen(false)}
    >
      <PopoverTrigger>
        <Button m={1}>Podrocja</Button>
      </PopoverTrigger>
      <PopoverContent>
        <PopoverArrow />
        <PopoverCloseButton />
        <PopoverHeader>Izberi Podrocja</PopoverHeader>
        <PopoverBody>
          {selectedOptions.map((sf) => (
            <Badge
              m={1}
              key={`${sf[0]}${sf[1]}`}
              colorScheme="teal"
              fontSize="1rem"
            >
              {fieldsMap.get(sf[0])}-
              {options.find((f) => f.id_field === sf[0])?.subfield || ""}
              <Icon
                as={TiDelete}
                fontSize="1.3rem"
                onClick={() => handleClickRemove(sf)}
              />
            </Badge>
          ))}
          <Divider />
          <Select onChange={handleSelectFields}>
            {options.map((f) => (
              <option
                key={`${f.id_field}${f.id_subfield}`}
                value={`${f.id_field},${f.id_subfield}`}
              >
                {f.field}-{f.subfield}
              </option>
            ))}
          </Select>
        </PopoverBody>
      </PopoverContent>
    </Popover>
  );
};

export default FieldsFilter;
