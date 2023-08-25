import { FormControl, FormLabel, Input, Text } from "@chakra-ui/react";

export interface AuthorInterface {
  id_author: number;
  author: string;
}

interface Props {
  authors: AuthorInterface[];
  selected?: string;
  onSelect: (author: string) => void;
  authorIsListed: boolean;
  setAuthorIsListed: (b: boolean) => void;
}

const Authors = ({
  authors,
  selected,
  onSelect,
  authorIsListed,
  setAuthorIsListed,
}: Props) => {
  const handleChange = (s: string) => {
    if (authors.find((e) => e.author === s)) {
      setAuthorIsListed(true);
    } else {
      setAuthorIsListed(false);
    }
    onSelect(s);
  };

  return (
    <FormControl>
      <FormLabel>Avtor:</FormLabel>
      <Input
        bgColor={authorIsListed ? "white" : "yellow.100"}
        defaultValue={selected}
        type="text"
        list="authorList"
        placeholder="Avtorji..."
        onChange={(e) => handleChange(e.target.value)}
      />
      <datalist id="authorList">
        {authors.map((author) => {
          return <option key={author.id_author}>{author.author}</option>;
        })}
      </datalist>
      {!authorIsListed && <Text color="orange.500">Dodan bo nov avtor</Text>}
    </FormControl>
  );
};

export default Authors;
