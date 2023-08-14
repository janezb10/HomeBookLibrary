import { useEffect, useState } from "react";
import { AuthorInterface } from "../components/BookAtributes/Authors.tsx";
import { PodrocjeInterface } from "../components/BookAtributes/Podrocja.tsx";
import { PositionInterface } from "../components/BookAtributes/Positions.tsx";
import { LanguageInterface } from "../components/BookAtributes/Languages.tsx";
import { CollectionInterface } from "../components/BookAtributes/Collections.tsx";
import apiClient from "../services/api-client.ts";
import { CanceledError } from "axios";

const useBookAttributes = (authToken: string) => {
  const [authors, setAuthors] = useState<AuthorInterface[]>([]);
  const [podrocja, setPodrocja] = useState<PodrocjeInterface[]>([]);
  // const [podpodrocja, setPodpodrocja] = useState<PodpodrocjeInterface[]>([]);
  const [positions, setPositions] = useState<PositionInterface[]>([]);
  const [languages, setLanguages] = useState<LanguageInterface[]>([]);
  const [collections, setCollections] = useState<CollectionInterface[]>([]);

  useEffect(() => {
    const controller = new AbortController();
    apiClient.defaults.headers.common["Authorization"] = `Bearer ${authToken}`;

    apiClient
      .get(`/api/v1/authors`, {
        signal: controller.signal,
      })
      .then((res) => {
        setAuthors([...res.data]);
      })
      .catch((err) => {
        if (err instanceof CanceledError) return;
        console.log(err);
      });

    apiClient
      .get("/api/v1/podrocja", {
        signal: controller.signal,
      })
      .then((res) => {
        setPodrocja([...res.data]);
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
        setPositions([...res.data]);
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
        setLanguages([...res.data]);
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
        setCollections([...res.data]);
      })
      .catch((err) => {
        if (err instanceof CanceledError) return;
        console.log(err);
      });
  }, []);

  return { authors, podrocja, positions, languages, collections };
};
export default useBookAttributes;
