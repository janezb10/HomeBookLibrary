import {
  Alert,
  AlertIcon,
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Stack,
} from "@chakra-ui/react";
import { useState } from "react";
import { BookInterface } from "./Book.tsx";
import { BookAttributesInterface } from "../hooks/useBookAttributes.ts";
import Title from "./BookAtributes/Title.tsx";
import Authors from "./BookAtributes/Authors.tsx";
import Positions from "./BookAtributes/Positions.tsx";
import Languages from "./BookAtributes/Languages.tsx";
import Collections from "./BookAtributes/Collections.tsx";
import Country from "./BookAtributes/Country.tsx";
import Year from "./BookAtributes/Year.tsx";
import Notes from "./BookAtributes/Notes.tsx";
import Fields from "./BookAtributes/Fields.tsx";
import apiClient from "../services/api-client.ts";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  bookAttributes: BookAttributesInterface;
  bookSaved: (book: BookInterface) => void;
  newBook: BookInterface;
  setNewBook: (book: BookInterface) => void;
}

const BookForm = ({
  // book,
  bookAttributes: { authors, positions, languages, collections, fields },
  bookSaved,
  isOpen,
  onClose,
  newBook,
  setNewBook,
}: Props) => {
  const [error, setError] = useState(false);

  const saveBook = () => {
    if (newBook.id) {
      apiClient
        .put(`/api/v1/books/${newBook.id}`, newBook)
        .then((res) => {
          console.log("Book updated successfully", res.data);
          setError(false);
          onClose();
          bookSaved(newBook);
        })
        .catch((err) => {
          setError(true);
          console.log("Error updating book", err);
        });
    } else {
      apiClient
        .post(`/api/v1/books`, newBook)
        .then((res) => {
          console.log("Book created successfully", res.data);
          setError(false);
          onClose();
          bookSaved(newBook);
        })
        .catch((err) => {
          setError(true);
          console.log("Error creating book", err);
        });
    }
  };

  return (
    <>
      <Modal
        isOpen={isOpen}
        onClose={() => {
          onClose();
          setError(false);
        }}
        size="full"
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{newBook?.title || "Book Form"}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Stack spacing={4}>
              <Title
                currentTitle={newBook?.title || ""}
                onChange={(e) => {
                  setNewBook({ ...newBook, title: e });
                  console.log("Naslov:", e);
                }}
              />
              <Authors
                selected={newBook?.id_author || 0}
                authors={authors}
                onSelect={(e) => {
                  setNewBook({ ...newBook, id_author: e });
                  console.log("Avror:", e);
                }}
              />
              <Fields
                selectedFields={{
                  id_field: newBook.id_field,
                  id_subfield: newBook.id_subfield,
                }}
                allFields={fields}
                onSelect={(o) => {
                  setNewBook({
                    ...newBook,
                    id_field: o.id_field,
                    id_subfield: o.id_subfield,
                  });
                  console.log("Field: ", o.id_field);
                  console.log("Subfield: ", o.id_subfield);
                }}
              />
              <Positions
                selected={newBook.id_position}
                positions={positions}
                onSelect={(e) => {
                  setNewBook({ ...newBook, id_position: e });
                  console.log("Pozicija:", e);
                }}
              />
              <Languages
                selected={newBook.id_language}
                languages={languages}
                onSelect={(e) => {
                  setNewBook({ ...newBook, id_language: e });
                  console.log("Jezik", e);
                }}
              />
              <Collections
                selected={newBook.id_collection}
                collections={collections}
                onSelect={(e) => {
                  setNewBook({ ...newBook, id_collection: e });
                  console.log("Zbirka:", e);
                }}
              />
              <Country
                currentCountry={newBook.country}
                onChange={(e) => {
                  setNewBook({ ...newBook, country: e });
                  console.log("Drzava:", e);
                }}
              />
              <Year
                currentYear={newBook.year}
                onChange={(e) => {
                  setNewBook({ ...newBook, year: e });
                  console.log("Leto:", e);
                }}
              />
              <Notes
                currentNotes={newBook.notes}
                onChange={(e) => {
                  setNewBook({ ...newBook, notes: e });
                  console.log("Opombe", e);
                }}
              />
            </Stack>
          </ModalBody>
          <ModalFooter>
            {error && (
              <Alert status="error">
                <AlertIcon />
                There was an error deleting a book.
              </Alert>
            )}
          </ModalFooter>
          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Close
            </Button>
            <Button onClick={saveBook}>Save Book</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default BookForm;
