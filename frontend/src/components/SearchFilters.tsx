import { Badge, Box, Icon, Text } from "@chakra-ui/react";
import { BookAttributesInterface } from "../hooks/useBookAttributes.ts";
import PositionFilter from "./Filters/PositionFilter.tsx";
import AuthorFilter from "./Filters/AuthorFilter.tsx";
import { TiDelete } from "react-icons/ti";
import LanguageFilter from "./Filters/LanguageFilter.tsx";
import CollectionFilter from "./Filters/CollectionFilter.tsx";
import FieldsFilter from "./Filters/FieldsFilter.tsx";
import { FiltersInterface } from "../hooks/useFilters.ts";

interface Props {
  bookAttributes: BookAttributesInterface;
  filters: FiltersInterface;
}

const SearchFilters = ({
  bookAttributes: {
    positions,
    authors,
    authorsMap,
    positionsMap,
    languages,
    languagesMap,
    collections,
    collectionsMap,
    fields,
    fieldsMap,
  },
  filters: {
    selectedPositions,
    setSelectedPositions,
    selectedAuthors,
    setSelectedAuthors,
    selectedLanguages,
    setSelectedLanguages,
    selectedCollections,
    setSelectedCollections,
    selectedFields,
    setSelectedFields,
  },
}: Props) => {
  return (
    <Box m={1}>
      <Text overflow="hidden">
        Filtri:
        {selectedPositions.map((sp) => (
          <Badge colorScheme="green" fontSize="1rem" m={1} key={`p${sp}`}>
            {positionsMap.get(sp)}
            <Icon
              as={TiDelete}
              fontSize="1.3rem"
              onClick={() =>
                setSelectedPositions(selectedPositions.filter((p) => p !== sp))
              }
            />
          </Badge>
        ))}
        {selectedAuthors.map((sa) => (
          <Badge colorScheme="purple" fontSize="1rem" m={1} key={`a${sa}`}>
            {authorsMap.get(sa)}
            <Icon
              as={TiDelete}
              fontSize="1.3rem"
              onClick={() =>
                setSelectedAuthors(selectedAuthors.filter((a) => a !== sa))
              }
            />
          </Badge>
        ))}
        {selectedLanguages.map((sl) => (
          <Badge colorScheme="yellow" fontSize="1rem" m={1} key={`l${sl}`}>
            {languagesMap.get(sl)}
            <Icon
              as={TiDelete}
              fontSize="1.3rem"
              onClick={() =>
                setSelectedLanguages(selectedLanguages.filter((l) => l !== sl))
              }
            />
          </Badge>
        ))}
        {selectedCollections.map((sc) => (
          <Badge colorScheme="orange" fontSize="1rem" m={1} key={`c${sc}`}>
            {collectionsMap.get(sc)}
            <Icon
              as={TiDelete}
              fontSize="1.3rem"
              onClick={() =>
                setSelectedCollections(
                  selectedCollections.filter((c) => c !== sc),
                )
              }
            />
          </Badge>
        ))}
        {selectedFields.map((sf) => (
          <Badge m={1} key={`f${sf}`} colorScheme="teal" fontSize="1rem">
            {fieldsMap.get(sf)}
            <Icon
              as={TiDelete}
              fontSize="1.3rem"
              onClick={() =>
                setSelectedFields(selectedFields.filter((f) => f !== sf))
              }
            />
          </Badge>
        ))}
      </Text>
      <PositionFilter
        options={positions}
        selectedOptions={selectedPositions}
        onSelect={setSelectedPositions}
      />
      <AuthorFilter
        options={authors}
        selectedOptions={selectedAuthors}
        onSelect={setSelectedAuthors}
        authorsMap={authorsMap}
      />
      <LanguageFilter
        options={languages}
        selectedOptions={selectedLanguages}
        onSelect={setSelectedLanguages}
      />
      <CollectionFilter
        options={collections}
        selectedOptions={selectedCollections}
        onSelect={setSelectedCollections}
        collectionMap={collectionsMap}
      />
      <FieldsFilter
        options={fields.reduce<{ id_field: number; field: string }[]>(
          (acc, item) => {
            const existingField = acc.find(
              (field) => field.id_field === item.id_field,
            );
            if (!existingField) {
              acc.push({ id_field: item.id_field, field: item.field });
            }
            return acc;
          },
          [],
        )}
        selectedOptions={selectedFields}
        onSelect={setSelectedFields}
        fieldsMap={fieldsMap}
      />
    </Box>
  );
};

export default SearchFilters;
