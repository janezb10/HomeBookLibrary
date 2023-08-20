import { FormControl, FormLabel, Select } from "@chakra-ui/react";

export interface LanguageInterface {
  id_language: number;
  language: string;
}

interface Props {
  languages: LanguageInterface[];
  selected?: number;
  onSelect: (selectedId: number) => void;
}

const Languages = ({ languages, onSelect, selected }: Props) => {
  return (
    <FormControl>
      <FormLabel>Jezik:</FormLabel>
      <Select
        placeholder="Jeziki..."
        defaultValue={selected || 0}
        onChange={(e) => onSelect(+e.target.value)}
      >
        {languages.map((language) => {
          return (
            <option value={language.id_language} key={language.id_language}>
              {language.language}
            </option>
          );
        })}
      </Select>
    </FormControl>
  );
};

export default Languages;
