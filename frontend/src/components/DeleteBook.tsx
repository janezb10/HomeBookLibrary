import {
  Alert,
  AlertIcon,
  Button,
  Flex,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverFooter,
  PopoverHeader,
  PopoverTrigger,
  Portal,
  useDisclosure,
} from "@chakra-ui/react";
import { useState } from "react";
import apiClient from "../services/api-client.ts";

interface Props {
  id: number;
}

const DeleteBook = ({ id }: Props) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);

  const deleteThisBook = () => {
    apiClient
      .delete(`/api/v1/books/${id}`)
      .then((res) => {
        console.log("Book deleted successfully", res.data);
        setSuccess(true);
        setError(false);
      })
      .catch((err) => {
        console.log("Error deleting book", err);
        setError(true);
        setSuccess(false);
      });
  };

  return (
    <Popover
      isOpen={isOpen}
      onOpen={onOpen}
      onClose={onClose}
      placement="right"
      closeOnBlur={false}
    >
      <PopoverTrigger>
        <Button>Delete Book</Button>
      </PopoverTrigger>
      <Portal>
        <PopoverContent>
          <PopoverArrow />
          <PopoverHeader>Delete Book</PopoverHeader>
          <PopoverCloseButton />
          <PopoverBody>
            <p>Do you really want to delete this book?</p>
            <Flex justifyContent="space-around">
              <Button colorScheme="red" onClick={deleteThisBook}>
                yes
              </Button>
              <Button colorScheme="blue" onClick={onClose}>
                No
              </Button>
            </Flex>
          </PopoverBody>
          <PopoverFooter>
            {" "}
            {error && (
              <Alert status="error">
                <AlertIcon />
                Error deleting book
              </Alert>
            )}
            {success && (
              <Alert status="success">
                <AlertIcon />
                Book deleted successfully
              </Alert>
            )}
          </PopoverFooter>
        </PopoverContent>
      </Portal>
    </Popover>
  );
};
export default DeleteBook;
