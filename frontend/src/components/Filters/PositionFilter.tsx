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
  Checkbox,
  VStack,
} from "@chakra-ui/react";
import { PositionInterface } from "../BookAtributes/Positions.tsx";

interface Props {
  options: PositionInterface[];
  selectedOptions: number[];
  onSelect: (n: number[]) => void;
}

const PositionFilter = ({ options, selectedOptions, onSelect }: Props) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleCheckboxChange = (option: number) => {
    const updatedOptions = selectedOptions.includes(option)
      ? selectedOptions.filter((selected) => selected !== option)
      : [...selectedOptions, option];

    onSelect(updatedOptions);
  };

  return (
    <Popover
      isOpen={isOpen}
      onOpen={() => setIsOpen(true)}
      onClose={() => setIsOpen(false)}
    >
      <PopoverTrigger>
        <Button m={1}>Pozicije</Button>
      </PopoverTrigger>
      <PopoverContent>
        <PopoverArrow />
        <PopoverCloseButton />
        <PopoverHeader>Izberi pozicije</PopoverHeader>
        <PopoverBody>
          <VStack align="start" spacing={2}>
            {options.map((option) => (
              <Checkbox
                key={option.id_position}
                isChecked={selectedOptions.includes(option.id_position)}
                onChange={() => handleCheckboxChange(option.id_position)}
              >
                {option.position}
              </Checkbox>
            ))}
          </VStack>
        </PopoverBody>
      </PopoverContent>
    </Popover>
  );
};

export default PositionFilter;
