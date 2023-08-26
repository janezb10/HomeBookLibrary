import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Box,
  Button,
} from "@chakra-ui/react";
import { paginationInterface } from "../hooks/usePagination.ts";

interface Props {
  pagination: paginationInterface;
  onSelectPage: (n: number) => void;
}

const PaginationList = ({
  onSelectPage,
  pagination: { numberOfPages, currentPage },
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

  if (numberOfPages === 0) {
    return (
      <>
        <Alert status="warning">
          <AlertIcon />
          <AlertTitle>Nothing was found</AlertTitle>
          <AlertDescription>Try different search keyword.</AlertDescription>
        </Alert>
      </>
    );
  } else if (numberOfPages > 1) return <Box m={2}>pages: {pages}</Box>;
  else return null;
};

export default PaginationList;
