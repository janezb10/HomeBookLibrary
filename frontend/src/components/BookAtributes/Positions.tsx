import { Select } from "@chakra-ui/react";

interface PositionInterface {
  id_pozicija: number;
  pozicija: string;
}

interface Props {
  positions: PositionInterface[];
  selected: number;
  onSelect: (selectedId: number) => void;
}

const Positions = ({ positions, selected, onSelect }: Props) => {
  return (
    <Select
      placeholder="Pozicije... "
      defaultValue={selected}
      onChange={(e) => onSelect(+e.target.value)}
    >
      {positions.map((position) => {
        return (
          <option value={position.id_pozicija} key={position.id_pozicija}>
            {position.pozicija}
          </option>
        );
      })}
    </Select>
  );
};

export default Positions;
