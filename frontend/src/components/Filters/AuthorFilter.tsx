import {
  Box,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Checkbox,
  Button,
} from "@chakra-ui/react";
import { useState } from "react";
import { AuthorInterface } from "../BookAtributes/Authors.tsx";

interface Props {
  options: AuthorInterface[];
  selectedOptions: number[];
  onSelect: (s: number[]) => void;
}

const DropdownCheckbox = ({ options, selectedOptions, onSelect }: Props) => {
  const [isOpen, setIsOpen] = useState(false);

  const togglemenu = () => {
    setIsOpen(!isOpen);
  };

  const handleCheckboxChange = (option: number) => {
    const updatedSelection = selectedOptions.includes(option)
      ? selectedOptions.filter((selected) => selected !== option)
      : [...selectedOptions, option];

    onSelect(updatedSelection);
  };

  return (
    <Box p={4}>
      <Menu isOpen={isOpen}>
        <MenuButton as={Button} onClick={togglemenu}>
          Avtorji
        </MenuButton>
        <MenuList>
          {options.map((option) => (
            <MenuItem key={option.id_author}>
              <Checkbox
                isChecked={selectedOptions.includes(option.id_author)}
                onChange={() => handleCheckboxChange(option.id_author)}
              >
                {option.author}
              </Checkbox>
            </MenuItem>
          ))}
        </MenuList>
      </Menu>
    </Box>
  );
};

export default DropdownCheckbox;
