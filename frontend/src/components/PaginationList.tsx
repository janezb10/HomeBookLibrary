import { Box, Button } from "@chakra-ui/react";

interface Props {
  numberOfPages: number;
  onSelectPage: (n: number) => void;
  currentPage: number;
}

const PaginationList = ({
  numberOfPages,
  onSelectPage,
  currentPage,
}: Props) => {
  const pages = [];
  for (let i = 1; i <= numberOfPages; i++) {
    pages.push(
      <Button
        borderRadius={500}
        isDisabled={i === currentPage}
        key={i}
        mr={1}
        onClick={() => onSelectPage(i)}
        size="sm"
      >
        {i}
      </Button>,
    );
  }

  return <Box m={2}>pages: {pages}</Box>;
};

export default PaginationList;
