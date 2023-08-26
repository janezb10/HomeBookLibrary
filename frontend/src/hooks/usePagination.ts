import { useState } from "react";

export interface paginationInterface {
  numberOfPages: number;
  setNumberOfPages: (n: number) => void;
  latestSearch: string;
  setLatestSearch: (s: string) => void;
  currentPage: number;
  setCurrentPage: (n: number) => void;
}

const usePagination = () => {
  const [numberOfPages, setNumberOfPages] = useState(-1);
  const [latestSearch, setLatestSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  return {
    numberOfPages,
    setNumberOfPages,
    latestSearch,
    setLatestSearch,
    currentPage,
    setCurrentPage,
  };
};

export default usePagination;
