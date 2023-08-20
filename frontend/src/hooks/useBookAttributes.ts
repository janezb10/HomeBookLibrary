import { useEffect, useState } from "react";
import { AuthorInterface } from "../components/BookAtributes/Authors.tsx";
import { PositionInterface } from "../components/BookAtributes/Positions.tsx";
import { LanguageInterface } from "../components/BookAtributes/Languages.tsx";
import { CollectionInterface } from "../components/BookAtributes/Collections.tsx";
import apiClient from "../services/api-client.ts";
import { CanceledError } from "axios";
import { AllFieldsInterface } from "../components/BookAtributes/Fields.tsx";

export interface BookAttributesInterface {
  authors: AuthorInterface[];
  positions: PositionInterface[];
  languages: LanguageInterface[];
  collections: CollectionInterface[];
  fields: AllFieldsInterface[];

  authorsMap: Map<number, string>;
  positionsMap: Map<number, string>;
  languagesMap: Map<number, string>;
  collectionsMap: Map<number, string>;
  fieldsMap: Map<number, string>;
}

const useBookAttributes = (authToken: string) => {
  const [authors, setAuthors] = useState<AuthorInterface[]>([]);
  const [positions, setPositions] = useState<PositionInterface[]>([]);
  const [languages, setLanguages] = useState<LanguageInterface[]>([]);
  const [collections, setCollections] = useState<CollectionInterface[]>([]);
  const [fields, setFields] = useState<AllFieldsInterface[]>([]);

  const [authorsMap, setAuthorsMap] = useState<Map<number, string>>(new Map());
  const [positionsMap, setPositionsMap] = useState<Map<number, string>>(
    new Map(),
  );
  const [languagesMap, setLanguagesMap] = useState<Map<number, string>>(
    new Map(),
  );
  const [collectionsMap, setCollectionsMap] = useState<Map<number, string>>(
    new Map(),
  );
  const [fieldsMap, setFieldsMap] = useState<Map<number, string>>(new Map());
  // const [subfieldsMap, setSubfieldsMap] = useState<Map<number, string>>(
  //   new Map(),
  // );

  useEffect(() => {
    const controller = new AbortController();

    apiClient.defaults.headers.common["Authorization"] = `Bearer ${authToken}`;

    apiClient
      .get(`/api/v1/authors`, {
        signal: controller.signal,
      })
      .then((res) => {
        const data = res.data;
        setAuthors(data);
        setAuthorsMap(
          new Map(
            data.map((author: AuthorInterface) => [
              author.id_author,
              author.author,
            ]),
          ),
        );
      })
      .catch((err) => {
        if (err instanceof CanceledError) return;
        console.log(err);
      });

    apiClient
      .get("/api/v1/fields", {
        signal: controller.signal,
      })
      .then((res) => {
        const data = res.data;
        setFields(data);
        //TODO subfields: Map fields, Map subfields
        const uniqueFieldsMap = new Map();
        data.forEach((field: AllFieldsInterface) => {
          if (!uniqueFieldsMap.has(field.id_field)) {
            uniqueFieldsMap.set(field.id_field, field.field);
          }
        });
        setFieldsMap(uniqueFieldsMap);
      })
      .catch((err) => {
        if (err instanceof CanceledError) return;
        console.log(err);
      });

    apiClient
      .get("/api/v1/positions", {
        signal: controller.signal,
      })
      .then((res) => {
        const data = res.data;
        setPositions(data);
        setPositionsMap(
          new Map(
            data.map((position: PositionInterface) => [
              position.id_position,
              position.position,
            ]),
          ),
        );
      })
      .catch((err) => {
        if (err instanceof CanceledError) return;
        console.log(err);
      });

    apiClient
      .get("/api/v1/languages", {
        signal: controller.signal,
      })
      .then((res) => {
        const data = res.data;
        setLanguages(data);
        setLanguagesMap(
          new Map(
            data.map((language: LanguageInterface) => [
              language.id_language,
              language.language,
            ]),
          ),
        );
      })
      .catch((err) => {
        if (err instanceof CanceledError) return;
        console.log(err);
      });

    apiClient
      .get("/api/v1/collections", {
        signal: controller.signal,
      })
      .then((res) => {
        const data = res.data;
        setCollections(data);
        setCollectionsMap(
          new Map(
            data.map((collection: CollectionInterface) => [
              collection.id_collection,
              collection.collection,
            ]),
          ),
        );
      })
      .catch((err) => {
        if (err instanceof CanceledError) return;
        console.log(err);
      });
  }, []);

  return {
    authors,
    positions,
    languages,
    collections,
    fields,
    authorsMap,
    positionsMap,
    languagesMap,
    collectionsMap,
    fieldsMap,
  };
};
export default useBookAttributes;
