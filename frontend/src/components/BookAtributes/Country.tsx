import { Input } from "@chakra-ui/react";

interface Props {
  currentCountry: string | null;
  onChange: (note: string) => void;
}

const Country = ({ currentCountry, onChange }: Props) => {
  return (
    <Input
      defaultValue={currentCountry || ""}
      onChange={(e) => onChange(e.target.value)}
      placeholder="Country"
    />
  );
};

export default Country;
