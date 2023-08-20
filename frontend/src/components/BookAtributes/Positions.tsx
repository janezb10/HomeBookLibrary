import { FormControl, FormLabel, Select } from "@chakra-ui/react";

export interface PositionInterface {
  id_position: number;
  position: string;
}

interface Props {
  positions: PositionInterface[];
  selected?: number;
  onSelect: (selectedId: number) => void;
}

const Positions = ({ positions, selected, onSelect }: Props) => {
  return (
    <FormControl>
      <FormLabel>Pozicija:</FormLabel>
      <Select
        placeholder="Pozicije... "
        defaultValue={selected || 0}
        onChange={(e) => onSelect(+e.target.value)}
      >
        {positions.map((position) => {
          return (
            <option value={position.id_position} key={position.id_position}>
              {position.position}
            </option>
          );
        })}
      </Select>
    </FormControl>
  );
};

export default Positions;
