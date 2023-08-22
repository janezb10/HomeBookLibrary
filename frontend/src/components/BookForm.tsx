import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Stack,
  useDisclosure,
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

interface Props {
  book?: BookInterface;
  bookAttributes: BookAttributesInterface;
}

const BookForm = ({
  book,
  bookAttributes: { authors, positions, languages, collections, fields },
}: Props) => {
  const [newTitle, setNewTitle] = useState(book?.title || "");
  const [newAuthor, setNewAuthor] = useState(book?.id_author || 0);
  const [newPosition, setNewPosition] = useState(book?.id_position || 0);
  const [newLanguage, setNewLanguage] = useState(book?.id_language || 0);
  const [newCollection, setNewCollection] = useState(book?.id_collection || 0);
  const [newField, setNewField] = useState(book?.id_field || 0);
  const [newSubfield, setNewSubfield] = useState(book?.id_subfield || 0);
  const [newCountry, setNewCountry] = useState(book?.country || null);
  const [newYear, setNewYear] = useState(book?.year || null);
  const [newNotes, setNewNotes] = useState(book?.notes || null);

  const { isOpen, onOpen, onClose } = useDisclosure();

  const saveBook = () => {
    const newBook: BookInterface = {
      id: book?.id,
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
    console.log(JSON.stringify(newBook));
  };

  return (
    <>
      <Button onClick={onOpen}>Open Modal</Button>

      <Modal isOpen={isOpen} onClose={onClose} size="full">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>asdf</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Stack spacing={4}>
              <Title
                onChange={(e) => {
                  setNewTitle(e);
                  console.log("Naslov:", e);
                }}
              />
              <Authors
                authors={authors}
                onSelect={(e) => {
                  setNewAuthor(e);
                  console.log("Avror:", e);
                }}
              />
              <Fields
                allFields={fields}
                onSelect={(o) => {
                  setNewField(o.id_field);
                  setNewSubfield(o.id_subfield);
                  console.log("Field: ", o.id_field);
                  console.log("Subfield: ", o.id_subfield);
                }}
              />
              <Positions
                positions={positions}
                onSelect={(e) => {
                  setNewPosition(e);
                  console.log("Pozicija:", e);
                }}
              />
              <Languages
                languages={languages}
                onSelect={(e) => {
                  setNewLanguage(e);
                  console.log("Jezik", e);
                }}
              />
              <Collections
                collections={collections}
                onSelect={(e) => {
                  setNewCollection(e);
                  console.log("Zbirka:", e);
                }}
              />
              <Country
                onChange={(e) => {
                  setNewCountry(e);
                  console.log("Drzava:", e);
                }}
              />
              <Year
                onChange={(e) => {
                  setNewYear(e);
                  console.log("Leto:", e);
                }}
              />
              <Notes
                onChange={(e) => {
                  setNewNotes(e);
                  console.log("Opombe", e);
                }}
              />
            </Stack>
          </ModalBody>
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
