import { Select } from "@chakra-ui/react";

interface LanguageInterface {
  id_jezik: number;
  jezik: string;
}

interface Props {
  languages: LanguageInterface[];
  selected: number;
  onSelect: (selectedId: number) => void;
}

const Languages = ({ languages, onSelect, selected }: Props) => {
  return (
    <Select
      placeholder="Languages..."
      defaultValue={selected || 0}
      onChange={(e) => onSelect(+e.target.value)}
    >
      {languages.map((language) => {
        return (
          <option value={language.id_jezik} key={language.id_jezik}>
            {language.jezik}
          </option>
        );
      })}
    </Select>
  );
};

export default Languages;