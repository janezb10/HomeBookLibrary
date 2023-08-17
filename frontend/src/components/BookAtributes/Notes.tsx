import { FormControl, FormLabel, Textarea } from "@chakra-ui/react";
interface Props {
  note?: string | null;
  onChange: (note: string) => void;
}

const Notes = ({ note, onChange }: Props) => {
  return (
    <FormControl>
      <FormLabel>Opombe:</FormLabel>
      <Textarea
        defaultValue={note || ""}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Notes..."
      />
    </FormControl>
  );
};

export default Notes;
