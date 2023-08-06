import { Input } from "@chakra-ui/react";

interface Props {
  currentTitle: string | null;
  onChange: (title: string) => void;
}

const Title = ({ currentTitle, onChange }: Props) => {
  return (
    <Input
      defaultValue={currentTitle || ""}
      onChange={(e) => onChange(e.target.value)}
      placeholder="Title"
    />
  );
};

export default Title;
