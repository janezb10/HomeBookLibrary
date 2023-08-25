import {
  Alert,
  AlertIcon,
  Button,
  Container,
  Flex,
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
  bookAttributes: {
    authors,
    positions,
    languages,
    collections,
    fields,
    authorsMap,
    languagesMap,
    refetch,
  },
  bookSaved,
  isOpen,
  onClose,
  newBook,
}: Props) => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState<string | number>(0);
  const [position, setPosition] = useState(0);
  const [language, setLanguage] = useState<string | number>(0);
  const [collection, setCollection] = useState(0);
  const [field, setField] = useState(0);
  const [subfield, setSubfield] = useState(0);
  const [country, setCountry] = useState<string | null>("");
  const [year, setYear] = useState<string | null>("");
  const [notes, setNotes] = useState<string | null>("");
  //
  const [authorIsListed, setAuthorIsListed] = useState(true);
  const [languageIsListed, setLanguageIsListed] = useState(true);
  //
  const [error, setError] = useState(false);
  useEffect(() => {
    if (isOpen) {
      setTitle(newBook.title);
      setAuthor(newBook.id_author);
      setPosition(newBook.id_position);
      setLanguage(newBook.id_language);
      setCollection(newBook.id_collection);
      setField(newBook.id_field);
      setSubfield(newBook.id_subfield);
      setCountry(newBook.country);
      setYear(newBook.year);
      setNotes(newBook.notes);

      setAuthorIsListed(true);
      setLanguageIsListed(true);
    }
  }, [isOpen]);

  const saveBook = async () => {
    let authorId = authors.find((a) => a.author === author)?.id_author;
    if (!authorIsListed) {
      await apiClient
        .post(`/api/v1/authors/`, { author: author })
        .then((res) => {
          // console.log("Author added successfully", res.data);
          setError(false);
          authorId = res.data[0].id_author;
          refetch();
        })
        .catch((err) => {
          console.log(err);
          setError(true);
        });
    }

    let languageId = languages.find((l) => l.language === language)
      ?.id_language;
    if (!languageIsListed) {
      await apiClient
        .post(`/api/v1/languages/`, { language: language })
        .then((res) => {
          setError(false);
          languageId = res.data[0].id_language;
          refetch();
        })
        .catch((err) => {
          console.log(err);
          setError(true);
        });
    }

    const book = {
      ...newBook,
      title: title,
      id_author: authorId,
      id_position: position,
      id_language: languageId,
      id_collection: collection,
      id_field: field,
      id_subfield: subfield,
      country: country,
      year: year,
      notes: notes,
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
          <Container maxW="4xl">
            <ModalHeader>{newBook?.title || "Book Form"}</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <Flex justifyContent="flex-end">
                <Button onClick={saveBook}>Save Book</Button>
              </Flex>

              <Stack spacing={4}>
                <Title
                  currentTitle={newBook?.title || ""}
                  onChange={(e) => {
                    setTitle(e);
                  }}
                />
                <Authors
                  selected={authorsMap.get(newBook?.id_author) || ""}
                  authors={authors}
                  authorIsListed={authorIsListed}
                  setAuthorIsListed={setAuthorIsListed}
                  onSelect={(s: string) => {
                    setAuthor(s);
                  }}
                />
                <Fields
                  selectedFields={{
                    id_field: newBook.id_field,
                    id_subfield: newBook.id_subfield,
                  }}
                  allFields={fields}
                  onSelect={(o) => {
                    setField(o.id_field);
                    setSubfield(o.id_subfield);
                  }}
                />
                <Positions
                  selected={newBook.id_position}
                  positions={positions}
                  onSelect={(e) => {
                    setPosition(e);
                  }}
                />
                <Languages
                  selected={languagesMap.get(newBook?.id_language) || ""}
                  languages={languages}
                  languageIsListed={languageIsListed}
                  setLanguageIsListed={setLanguageIsListed}
                  onSelect={(s) => {
                    setLanguage(s);
                  }}
                />
                <Collections
                  selected={newBook.id_collection}
                  collections={collections}
                  onSelect={(e) => {
                    setCollection(e);
                  }}
                />
                <Country
                  currentCountry={newBook.country}
                  onChange={(e) => {
                    setCountry(e);
                  }}
                />
                <Year
                  currentYear={newBook.year}
                  onChange={(e) => {
                    setYear(e);
                  }}
                />
                <Notes
                  currentNotes={newBook.notes}
                  onChange={(e) => {
                    setNotes(e);
                  }}
                />
              </Stack>
            </ModalBody>
            <ModalFooter>
              {error && (
                <Alert status="error">
                  <AlertIcon />
                  Something went wrong...
                </Alert>
              )}
            </ModalFooter>
            <ModalFooter>
              <Button colorScheme="blue" mr={3} onClick={onClose}>
                Close
              </Button>
              <Button onClick={saveBook}>Save Book</Button>
            </ModalFooter>
          </Container>
        </ModalContent>
      </Modal>
    </>
  );
};

export default BookForm;
