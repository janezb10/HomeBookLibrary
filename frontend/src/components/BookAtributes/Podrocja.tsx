import { FormControl, FormLabel, Select } from "@chakra-ui/react";

export interface PodrocjeInterface {
  id_podrocje: number;
  podrocje: string;
}

interface Props {
  podrocja: PodrocjeInterface[];
  selected?: number;
  onSelect: (selectedId: number) => void;
}

const Podrocja = ({ podrocja, selected, onSelect }: Props) => {
  return (
    <FormControl>
      <FormLabel>Področje:</FormLabel>
      <Select
        placeholder="Področje..."
        defaultValue={selected || 0}
        onChange={(e) => {
          onSelect(0);
          setTimeout(() => onSelect(+e.target.value), 100);
          // onSelect(+e.target.value);
        }}
      >
        {podrocja.map((podrocje) => {
          return (
            <option value={podrocje.id_podrocje} key={podrocje.id_podrocje}>
              {podrocje.podrocje}
            </option>
          );
        })}
      </Select>
    </FormControl>
  );
};

export default Podrocja;
