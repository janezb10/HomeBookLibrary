import { FormControl, FormLabel, Input } from "@chakra-ui/react";

interface Props {
  currentTitle?: string;
  onChange: (title: string) => void;
}

const Title = ({ currentTitle, onChange }: Props) => {
  return (
    <FormControl>
      <FormLabel>Naslov:</FormLabel>
      <Input
        defaultValue={currentTitle || ""}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Title..."
      />
    </FormControl>
  );
};

export default Title;
