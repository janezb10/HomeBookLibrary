import { Box } from "@chakra-ui/react";
import BookList from "../components/BookList.tsx";
import SearchInput from "../components/SearchInput.tsx";
import { useState } from "react";
import { BookInterface } from "../components/Book.tsx";
import { AuthTokenInterface } from "../hooks/useToken.ts";
import Podrocja from "../components/Podrocja.tsx";
import Podpodrocja from "../components/Podpodrocja.tsx";

const Library = ({ authToken }: AuthTokenInterface) => {
  const [books, setBooks] = useState<BookInterface[]>([]);

  const handleBookSearch = (books: BookInterface[]) => {
    setBooks([...books]);
  };

  return (
    <section>
      <SearchInput authToken={authToken} onBookSearch={handleBookSearch} />
      <Box>
        <Podrocja
          selected={3}
          onSelect={(n) => console.log(n)}
          podrocja={[
            {
              id_podrocje: 1,
              podrocje: "NE VEM",
            },
            {
              id_podrocje: 2,
              podrocje: "slo leposlovje",
            },
            {
              id_podrocje: 3,
              podrocje: "tuje leposlovje",
            },
            {
              id_podrocje: 4,
              podrocje: "otroško",
            },
            {
              id_podrocje: 5,
              podrocje: "dramatika",
            },
            {
              id_podrocje: 6,
              podrocje: "poezija",
            },
            {
              id_podrocje: 7,
              podrocje: "družboslovje",
            },
            {
              id_podrocje: 8,
              podrocje: "jezikoslovje",
            },
            {
              id_podrocje: 9,
              podrocje: "naravoslovje",
            },
            {
              id_podrocje: 10,
              podrocje: "dom",
            },
            {
              id_podrocje: 11,
              podrocje: "drugo",
            },
          ]}
        />
        <Podpodrocja
          selected={2}
          onSelect={(n) => console.log(n)}
          podpodrocja={[
            {
              id_podpodrocje: 1,
              id_podrocje: 2,
              podpodrocje: "NE VEM",
            },
            {
              id_podpodrocje: 2,
              id_podrocje: 2,
              podpodrocje: "detektivka",
            },
            {
              id_podpodrocje: 3,
              id_podrocje: 2,
              podpodrocje: "vojni",
            },
            {
              id_podpodrocje: 4,
              id_podrocje: 2,
              podpodrocje: "humor, komedija",
            },
            {
              id_podpodrocje: 5,
              id_podrocje: 2,
              podpodrocje: "ljubezenski",
            },
            {
              id_podpodrocje: 6,
              id_podrocje: 2,
              podpodrocje: "biografija",
            },
            {
              id_podpodrocje: 7,
              id_podrocje: 2,
              podpodrocje: "potopis, dnevnik",
            },
            {
              id_podpodrocje: 8,
              id_podrocje: 2,
              podpodrocje: "kratko(pravljica, novela)",
            },
            {
              id_podpodrocje: 9,
              id_podrocje: 2,
              podpodrocje: "družbeni roman",
            },
            {
              id_podpodrocje: 10,
              id_podrocje: 2,
              podpodrocje: "grozljivka",
            },
            {
              id_podpodrocje: 11,
              id_podrocje: 2,
              podpodrocje: "zf, utopija, distopija",
            },
            {
              id_podpodrocje: 12,
              id_podrocje: 2,
              podpodrocje: "zgodovinski",
            },
            {
              id_podpodrocje: 13,
              id_podrocje: 2,
              podpodrocje: "eksotični",
            },
            {
              id_podpodrocje: 14,
              id_podrocje: 2,
              podpodrocje: "eksistencializem",
            },
            {
              id_podpodrocje: 15,
              id_podrocje: 2,
              podpodrocje: "erotika",
            },
          ]}
        />
        <BookList books={books} />
      </Box>
    </section>
  );
};

export default Library;
