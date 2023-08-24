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
import { useEffect, useState } from "react";
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
}

const BookForm = ({
  // book,
  bookAttributes: { authors, positions, languages, collections, fields },
  bookSaved,
  isOpen,
  onClose,
  newBook,
}: Props) => {
  const [newTitle, setNewTitle] = useState("");
  const [newAuthor, setNewAuthor] = useState(0);
  const [newPosition, setNewPosition] = useState(0);
  const [newLanguage, setNewLanguage] = useState(0);
  const [newCollection, setNewCollection] = useState(0);
  const [newField, setNewField] = useState(0);
  const [newSubfield, setNewSubfield] = useState(0);
  const [newCountry, setNewCountry] = useState<string | null>("");
  const [newYear, setNewYear] = useState<string | null>("");
  const [newNotes, setNewNotes] = useState<string | null>("");

  const [error, setError] = useState(false);
  useEffect(() => {
    if (isOpen) {
      setNewTitle(newBook.title);
      setNewAuthor(newBook.id_author);
      setNewPosition(newBook.id_position);
      setNewLanguage(newBook.id_language);
      setNewCollection(newBook.id_collection);
      setNewField(newBook.id_field);
      setNewSubfield(newBook.id_subfield);
      setNewCountry(newBook.country);
      setNewYear(newBook.year);
      setNewNotes(newBook.notes);
    }
  }, [isOpen]);

  const saveBook = () => {
    const book = {
      ...newBook,
      title: newTitle,
      id_author: newAuthor,
      id_position: newPosition,
      id_language: newLanguage,
      id_collection: newCollection,
      id_field: newField,
      id_subfield: newSubfield,
      country: newCountry,
      year: newYear,
      notes: newNotes,
    };

    if (newBook.id) {
      apiClient
        .put(`/api/v1/books/${newBook.id}`, book)
        .then((res) => {
          // console.log("Book updated successfully", res.data);
          setError(false);
          onClose();
          bookSaved(res.data[0]);
        })
        .catch(() => {
          setError(true);
          // console.log("Error updating book", err);
        });
    } else {
      apiClient
        .post(`/api/v1/books`, book)
        .then((res) => {
          // console.log("Book created successfully", res.data);
          setError(false);
          onClose();
          bookSaved(res.data[0]);
        })
        .catch(() => {
          setError(true);
          // console.log("Error creating book", err);
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
                  setNewTitle(e);
                }}
              />
              <Authors
                selected={newBook?.id_author || 0}
                authors={authors}
                onSelect={(e) => {
                  setNewAuthor(e);
                }}
              />
              <Fields
                selectedFields={{
                  id_field: newBook.id_field,
                  id_subfield: newBook.id_subfield,
                }}
                allFields={fields}
                onSelect={(o) => {
                  setNewField(o.id_field);
                  setNewSubfield(o.id_subfield);
                }}
              />
              <Positions
                selected={newBook.id_position}
                positions={positions}
                onSelect={(e) => {
                  setNewPosition(e);
                }}
              />
              <Languages
                selected={newBook.id_language}
                languages={languages}
                onSelect={(e) => {
                  setNewLanguage(e);
                }}
              />
              <Collections
                selected={newBook.id_collection}
                collections={collections}
                onSelect={(e) => {
                  setNewCollection(e);
                }}
              />
              <Country
                currentCountry={newBook.country}
                onChange={(e) => {
                  setNewCountry(e);
                }}
              />
              <Year
                currentYear={newBook.year}
                onChange={(e) => {
                  setNewYear(e);
                }}
              />
              <Notes
                currentNotes={newBook.notes}
                onChange={(e) => {
                  setNewNotes(e);
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
