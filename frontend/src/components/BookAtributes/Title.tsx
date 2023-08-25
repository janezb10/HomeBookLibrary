import { FormControl, FormLabel, Input, Text } from "@chakra-ui/react";
import { useState } from "react";

interface Props {
  currentTitle?: string;
  onChange: (title: string) => void;
}

const Title = ({ currentTitle, onChange }: Props) => {
  const [invalidTitle, setInvalidTitle] = useState(false);
  const handleChange = (s: string) => {
    if (s === "") {
      setInvalidTitle(true);
    } else {
      setInvalidTitle(false);
    }
    onChange(s);
  };

  return (
    <FormControl>
      <FormLabel>Naslov:</FormLabel>
      <Input
        bgColor={invalidTitle ? "orange.100" : "white"}
        defaultValue={currentTitle || ""}
        onChange={(e) => handleChange(e.target.value)}
        placeholder="Title..."
      />
      {invalidTitle && <Text color="red.500">Knjiga mora imeti naslov!</Text>}
    </FormControl>
  );
};

export default Title;
