import { Textarea } from "@chakra-ui/react";
interface Props {
  note: string | null;
  onChange: (note: string) => void;
}

const Notes = ({ note, onChange }: Props) => {
  return (
    <Textarea
      defaultValue={note || ""}
      onChange={(e) => onChange(e.target.value)}
      placeholder="Notes..."
    />
  );
};

export default Notes;
