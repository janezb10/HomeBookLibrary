import { NumberInput, NumberInputField } from "@chakra-ui/react";

interface Props {
  year: string | null;
  onChange: (year: number | null) => void;
}

const Year = ({ year, onChange }: Props) => {
  return (
    <NumberInput defaultValue={year || ""}>
      <NumberInputField
        onChange={(e) =>
          onChange(e.target.value === "" ? null : +e.target.value)
        }
      />
    </NumberInput>
  );
};

export default Year;
