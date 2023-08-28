import { useState } from "react";

export interface FiltersInterface {
  selectedPositions: number[];
  handleSelectPositions: (n: number[]) => void;
  selectedAuthors: number[];
  handleSelectAuthors: (n: number[]) => void;
  selectedLanguages: number[];
  hancleSelectLanguages: (n: number[]) => void;
  selectedCollections: number[];
  handleSelectCollections: (n: number[]) => void;
  selectedFields: number[];
  handleSelectFields: (n: number[]) => void;
}

const useFilters = () => {
  const [selectedPositions, setSelectedPositions] = useState<number[]>([]);
  const [selectedAuthors, setSelectedAuthors] = useState<number[]>([]);
  const [selectedLanguages, setSelectedLanguages] = useState<number[]>([]);
  const [selectedCollections, setSelectedCollections] = useState<number[]>([]);
  const [selectedFields, setSelectedFields] = useState<number[]>([]);

  return {
    selectedPositions,
    setSelectedPositions,
    selectedAuthors,
    setSelectedAuthors,
    selectedLanguages,
    setSelectedLanguages,
    selectedCollections,
    setSelectedCollections,
    selectedFields,
    setSelectedFields,
  };
};

export default useFilters;
