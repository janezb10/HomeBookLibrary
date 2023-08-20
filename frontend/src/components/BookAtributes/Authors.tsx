import { FormControl, FormLabel, Select } from "@chakra-ui/react";

export interface AuthorInterface {
  id_author: number;
  author: string;
}

interface Props {
  authors: AuthorInterface[];
  selected?: number;
  onSelect: (selectedId: number) => void;
}

const Authors = ({ authors, selected, onSelect }: Props) => {
  return (
    <FormControl>
      <FormLabel>Avtor:</FormLabel>
      <Select
        placeholder="Avtorji..."
        defaultValue={selected}
        onChange={(e) => onSelect(+e.target.value)}
      >
        {authors.map((author) => {
          return (
            <option value={author.id_author} key={author.id_author}>
              {author.author}
            </option>
          );
        })}
      </Select>
    </FormControl>
  );
};

export default Authors;
