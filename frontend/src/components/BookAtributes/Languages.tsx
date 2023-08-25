import { FormControl, FormLabel, Input, Text } from "@chakra-ui/react";

export interface LanguageInterface {
  id_language: number;
  language: string;
}

interface Props {
  languages: LanguageInterface[];
  selected?: string;
  onSelect: (language: string) => void;
  languageIsListed: boolean;
  setLanguageIsListed: (b: boolean) => void;
}

const Languages = ({
  languages,
  onSelect,
  selected,
  languageIsListed,
  setLanguageIsListed,
}: Props) => {
  const handleChange = (s: string) => {
    if (languages.find((e) => e.language === s) || s == "") {
      setLanguageIsListed(true);
    } else {
      setLanguageIsListed(false);
    }
    onSelect(s);
  };

  return (
    <FormControl>
      <FormLabel>Jezik:</FormLabel>
      <Input
        bgColor={languageIsListed ? "white" : "yellow.100"}
        defaultValue={selected}
        type="text"
        list="languageList"
        placeholder="Jeziki..."
        onChange={(e) => handleChange(e.target.value)}
      />
      <datalist id="languageList">
        {languages.map((language) => {
          return (
            <option key={language.id_language}>{language.language}</option>
          );
        })}
      </datalist>
      {!languageIsListed && <Text color="orange.500">Dodan bo nov jezik</Text>}
    </FormControl>
  );
};

export default Languages;
