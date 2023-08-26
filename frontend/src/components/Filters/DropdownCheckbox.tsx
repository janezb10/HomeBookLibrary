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

interface Props {
  options: string[];
  selectedOptions: string[];
  onSelect: (s: string[]) => void;
}

const DropdownCheckbox = ({ options, selectedOptions, onSelect }: Props) => {
  const [isOpen, setIsOpen] = useState(false);

  const togglemenu = () => {
    setIsOpen(!isOpen);
  };

  const handleCheckboxChange = (option: string) => {
    const updatedSelection = selectedOptions.includes(option)
      ? selectedOptions.filter((selected) => selected !== option)
      : [...selectedOptions, option];

    onSelect(updatedSelection);
  };

  return (
    <Box p={4}>
      <Menu isOpen={isOpen}>
        <MenuButton as={Button} onClick={togglemenu}>
          Select options
        </MenuButton>
        <MenuList>
          {options.map((option) => (
            <MenuItem key={option}>
              <Checkbox
                isChecked={selectedOptions.includes(option)}
                onChange={() => handleCheckboxChange(option)}
              >
                {option}
              </Checkbox>
            </MenuItem>
          ))}
        </MenuList>
      </Menu>
    </Box>
  );
};

export default DropdownCheckbox;
