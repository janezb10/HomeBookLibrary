import { FormControl, FormLabel, Textarea } from "@chakra-ui/react";
interface Props {
  notes?: string | null;
  onChange: (note: string) => void;
}

const Notes = ({ notes, onChange }: Props) => {
  return (
    <FormControl>
      <FormLabel>Opombe:</FormLabel>
      <Textarea
        defaultValue={notes || ""}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Opombe..."
      />
    </FormControl>
  );
};

export default Notes;
