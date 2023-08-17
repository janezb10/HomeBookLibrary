import { FormControl, FormLabel, Select } from "@chakra-ui/react";

export interface PodpodrocjeInterface {
  id_podpodrocje: number;
  id_podrocje: number;
  podpodrocje: string;
}

interface Props {
  selected?: number;
  onSelect: (selectedId: number) => void;
  podpodrocja: PodpodrocjeInterface[];
}

const Podpodrocja = ({ selected, onSelect, podpodrocja }: Props) => {
  return (
    <FormControl>
      <FormLabel>Podpodročje:</FormLabel>
      <Select
        placeholder="Podpodročje..."
        defaultValue={selected || 0}
        onChange={(e) => onSelect(+e.target.value)}
      >
        {podpodrocja.map((podpodrocje: PodpodrocjeInterface) => {
          return (
            <option
              value={podpodrocje.id_podpodrocje}
              key={podpodrocje.id_podpodrocje}
            >
              {podpodrocje.podpodrocje}
            </option>
          );
        })}
      </Select>
    </FormControl>
  );
};

export default Podpodrocja;
