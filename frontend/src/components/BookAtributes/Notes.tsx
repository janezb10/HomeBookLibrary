import { FormControl, FormLabel, Textarea } from "@chakra-ui/react";
interface Props {
  currentNotes?: string | null;
  onChange: (note: string) => void;
}

const Notes = ({ currentNotes, onChange }: Props) => {
  return (
    <FormControl>
      <FormLabel>Opombe:</FormLabel>
      <Textarea
        defaultValue={currentNotes || ""}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Opombe..."
      />
    </FormControl>
  );
};

export default Notes;
