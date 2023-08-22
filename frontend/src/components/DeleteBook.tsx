import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  AlertDialogCloseButton,
  Button,
  UnorderedList,
  ListItem,
  AlertIcon,
  Alert,
} from "@chakra-ui/react";
import { useRef, useState } from "react";
import { BookInterface } from "./Book.tsx";
import { BookAttributesInterface } from "../hooks/useBookAttributes.ts";
import apiClient from "../services/api-client.ts";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  selectedBook: BookInterface | null;
  setSelectedBook: (book: BookInterface | null) => void;
  bookAttributes: BookAttributesInterface;
  bookDeleted: (book: BookInterface) => void;
}

function DeleteBook({
  isOpen,
  onClose,
  selectedBook,
  setSelectedBook,
  bookDeleted,
  bookAttributes: { authorsMap },
}: Props) {
  const cancelRef = useRef(null);
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);

  const deleteBook = () => {
    apiClient
      .delete(`/api/v1/books/${selectedBook!.id}`)
      .then((res) => {
        console.log("Book deleted successfully", res.data);
        setSuccess(true);
        setError(false);
        bookDeleted(selectedBook!);
      })
      .catch((err) => {
        console.log("Error deleting book", err);
        setError(true);
      });
  };

  return (
    <>
      <>
        {/*<Button onClick={onOpen}>Discard</Button>*/}
        <AlertDialog
          motionPreset="slideInBottom"
          leastDestructiveRef={cancelRef}
          onClose={() => {
            onClose();
            setError(false);
            setSuccess(false);
            setSelectedBook(null);
          }}
          isOpen={isOpen}
          isCentered
        >
          <AlertDialogOverlay />

          <AlertDialogContent>
            <AlertDialogHeader>
              Delete book: {selectedBook?.title}?
            </AlertDialogHeader>
            <AlertDialogCloseButton />
            <AlertDialogBody>
              Are you sure you want to delete:
              <UnorderedList>
                <ListItem>id: {selectedBook?.id || ""}</ListItem>
                <ListItem>naslov: {selectedBook?.title || ""}</ListItem>
                <ListItem>
                  Avtor:{" "}
                  {selectedBook ? authorsMap.get(selectedBook!.id_author) : ""}
                </ListItem>
                <ListItem>{selectedBook?.notes || "no notes"}</ListItem>
              </UnorderedList>
            </AlertDialogBody>
            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onClose} isDisabled={success}>
                No
              </Button>
              <Button
                isDisabled={success}
                colorScheme="red"
                ml={3}
                onClick={() => deleteBook()}
              >
                Yes
              </Button>
            </AlertDialogFooter>
            <AlertDialogFooter>
              {error && (
                <Alert status="error">
                  <AlertIcon />
                  There was an error deleting a book.
                </Alert>
              )}
              {success && (
                <Alert status="success">
                  <AlertIcon />
                  Book deleted successfully.
                </Alert>
              )}
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </>
    </>
  );
}

export default DeleteBook;
