import { FormControl, FormLabel, Input } from "@chakra-ui/react";

interface Props {
  currentCountry?: string | null;
  onChange: (note: string) => void;
}

const Country = ({ currentCountry, onChange }: Props) => {
  return (
    <FormControl>
      <FormLabel>Država:</FormLabel>
      <Input
        defaultValue={currentCountry || ""}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Country"
      />
    </FormControl>
  );
};

export default Country;
