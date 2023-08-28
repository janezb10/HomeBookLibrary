import { useState } from "react";

export interface FiltersInterface {
  selectedPositions: number[];
  setSelectedPositions: (n: number[]) => void;
  selectedAuthors: number[];
  setSelectedAuthors: (n: number[]) => void;
  selectedLanguages: number[];
  setSelectedLanguages: (n: number[]) => void;
  selectedCollections: number[];
  setSelectedCollections: (n: number[]) => void;
  selectedFields: number[];
  setSelectedFields: (n: number[]) => void;
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
