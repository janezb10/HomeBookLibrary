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
import { LanguageInterface } from "../BookAtributes/Languages.tsx";

interface Props {
  options: LanguageInterface[];
  selectedOptions: number[];
  onSelect: (n: number[]) => void;
}

const LanguageFilter = ({ options, selectedOptions, onSelect }: Props) => {
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
        <Button m={1}>Jeziki</Button>
      </PopoverTrigger>
      <PopoverContent>
        <PopoverArrow />
        <PopoverCloseButton />
        <PopoverHeader>Izberi jezike</PopoverHeader>
        <PopoverBody>
          <VStack align="start" spacing={2}>
            {options.map((option) => (
              <Checkbox
                key={option.id_language}
                isChecked={selectedOptions.includes(option.id_language)}
                onChange={() => handleCheckboxChange(option.id_language)}
              >
                {option.language}
              </Checkbox>
            ))}
          </VStack>
        </PopoverBody>
      </PopoverContent>
    </Popover>
  );
};

export default LanguageFilter;
