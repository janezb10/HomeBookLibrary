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
  Text,
} from "@chakra-ui/react";
import { AuthorInterface } from "../BookAtributes/Authors.tsx";

interface Props {
  options: AuthorInterface[];
  selectedOptions: number[];
  onSelect: (n: number[]) => void;
  authorsMap: Map<number, string>;
}

// todo badge for selected authors

const AuthorFilter = ({
  options,
  selectedOptions,
  onSelect,
  authorsMap,
}: Props) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleSelectAuthor = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedAuthorId = event.target.value;
    console.log("selectedAuthorId", selectedAuthorId);
    if (!selectedOptions.includes(+selectedAuthorId)) {
      onSelect([...selectedOptions, +selectedAuthorId]);
    }
    // console.log(authorId);
  };

  const handleClickRemove = (n: number) => {
    onSelect(selectedOptions.filter((au) => au !== n));
  };

  return (
    <Popover
      isOpen={isOpen}
      onOpen={() => setIsOpen(true)}
      onClose={() => setIsOpen(false)}
    >
      <PopoverTrigger>
        <Button m={1}>Avtorji</Button>
      </PopoverTrigger>
      <PopoverContent>
        <PopoverArrow />
        <PopoverCloseButton />
        <PopoverHeader>Izberi Avtorje</PopoverHeader>
        <PopoverBody>
          {selectedOptions.map((so) => (
            <Text key={so}>
              {authorsMap.get(so)} {/*todo icon*/}
              <span onClick={() => handleClickRemove(so)}>X</span>
            </Text>
          ))}
          <Divider />
          <Select onChange={handleSelectAuthor}>
            {options.map((author) => (
              <option key={author.id_author} value={author.id_author}>
                {author.author}
              </option>
            ))}
          </Select>
        </PopoverBody>
      </PopoverContent>
    </Popover>
  );
};

export default AuthorFilter;
