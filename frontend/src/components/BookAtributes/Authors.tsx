import { Select } from "@chakra-ui/react";

export interface AuthorInterface {
  id_avtor: number;
  avtor: string;
}

interface Props {
  authors: AuthorInterface[];
  selected: number;
  onSelect: (selectedId: number) => void;
}

const Authors = ({ authors, selected, onSelect }: Props) => {
  return (
    <Select
      placeholder="Authors..."
      defaultValue={selected}
      onChange={(e) => onSelect(+e.target.value)}
    >
      {authors.map((author) => {
        return (
          <option value={author.id_avtor} key={author.id_avtor}>
            {author.avtor}
          </option>
        );
      })}
    </Select>
  );
};

export default Authors;
