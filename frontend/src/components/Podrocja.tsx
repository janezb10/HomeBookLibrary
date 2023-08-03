import { Select } from "@chakra-ui/react";

interface PodrocjeInterface {
  id_podrocje: number;
  podrocje: string;
}

interface Props {
  podrocja: PodrocjeInterface[];
  selected?: number;
}

const Podrocja = ({ podrocja, selected }: Props) => {
  return (
    <Select placeholder="Področja.." defaultValue={selected || 0}>
      {podrocja.map((podrocje) => {
        return (
          <option value={podrocje.id_podrocje} key={podrocje.id_podrocje}>
            {podrocje.podrocje}
          </option>
        );
      })}
    </Select>
  );
};

export default Podrocja;
