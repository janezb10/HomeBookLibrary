import {
  FormControl,
  FormLabel,
  NumberInput,
  NumberInputField,
} from "@chakra-ui/react";

interface Props {
  currentYear?: string | null;
  onChange: (year: string | null) => void;
}

const Year = ({ currentYear, onChange }: Props) => {
  return (
    <FormControl>
      <FormLabel>Leto:</FormLabel>
      <NumberInput defaultValue={currentYear || ""}>
        <NumberInputField
          onChange={(e) =>
            onChange(e.target.value === "" ? null : e.target.value)
          }
        />
      </NumberInput>
    </FormControl>
  );
};

export default Year;
