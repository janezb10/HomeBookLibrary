import { Select } from "@chakra-ui/react";

interface PodrocjeInterface {
  id_podrocje: number;
  podrocje: string;
}

interface Props {
  podrocja: PodrocjeInterface[];
}

const Podrocja = ({ podrocja }: Props) => {
  <Select placeholder="Select option">
    {podrocja.map((podrocje) => {
      return (
        <option value={podrocje.id_podrocje} key={podrocje.id_podrocje}>
          {podrocje.podrocje}
        </option>
      );
    })}
  </Select>;
};

export default Podrocja;
