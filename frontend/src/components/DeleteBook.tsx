import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  AlertDialogCloseButton,
  Button,
} from "@chakra-ui/react";
import { useRef } from "react";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  selectedBookId: number | null;
  setSelectedBookId: (id: null) => void;
}

function DeleteBook({
  isOpen,
  onClose,
  selectedBookId,
  setSelectedBookId,
}: Props) {
  // const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = useRef(null);

  const deleteBook = () => {
    console.log("deleteing hehe");
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
            setSelectedBookId(null);
          }}
          isOpen={isOpen}
          isCentered
        >
          <AlertDialogOverlay />

          <AlertDialogContent>
            <AlertDialogHeader>Discard Changes?</AlertDialogHeader>
            <AlertDialogCloseButton />
            <AlertDialogBody>
              Are you sure you want to delete this id: {selectedBookId}?
            </AlertDialogBody>
            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onClose}>
                No
              </Button>
              <Button colorScheme="red" ml={3} onClick={() => deleteBook()}>
                Yes
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </>
    </>
  );
}

export default DeleteBook;
