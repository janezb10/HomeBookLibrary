import { Button, Stack } from "@chakra-ui/react";
import Title from "./BookAtributes/Title.tsx";
import { useEffect, useState } from "react";
import apiClient from "../services/api-client.ts";
import { CanceledError } from "axios";
import Authors, { AuthorInterface } from "./BookAtributes/Authors.tsx";
import Podrocja, { PodrocjeInterface } from "./BookAtributes/Podrocja.tsx";
import { PodpodrocjeInterface } from "./BookAtributes/Podpodrocja.tsx";
import { PositionInterface } from "./BookAtributes/Positions.tsx";
import { BookInterface } from "./Book.tsx";

interface Props {
  book: BookInterface;
  authToken: string;
  onClose: () => void;
}

const UpdateBook = ({ book, authToken, onClose }: Props) => {
  const [authors, setAuthors] = useState<AuthorInterface[]>([]);
  const [podrocja, setPodrocja] = useState<PodrocjeInterface[]>([]);
  // const [podpodrocja, setPodpodrocja] = useState<PodpodrocjeInterface[]>([]);
  const [positions, setPositions] = useState<PositionInterface[]>([]);

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

    // apiClient
    //   .get("/api/v1/podpodrocja", {
    //     signal: controller.signal,
    //   })
    //   .then((res) => {
    //     setPodpodrocja([...res.data]);
    //   })
    //   .catch((err) => {
    //     if (err instanceof CanceledError) return;
    //     console.log(err);
    //   });
  }, []);

  return (
    <Stack spacing={4}>
      <Title currentTitle={book.naslov} onChange={(e) => console.log(e)} />
      <Authors
        authors={[
          { id_avtor: 0, avtor: "aaaa" },
          { id_avtor: 1, avtor: "bbb" },
        ]}
        selected={1}
        onSelect={(e) => console.log(e)}
      />
      <Podrocja
        podrocja={[
          { id_podrocje: 0, podrocje: "aaa" },
          { id_podrocje: 1, podrocje: "bbb" },
        ]}
        onSelect={(e) => console.log(e)}
        selected={1}
      />
      <Button onClick={onClose}>Close</Button>
    </Stack>
  );
};

export default UpdateBook;

// Trapping Focus within Popover#
// na strani
