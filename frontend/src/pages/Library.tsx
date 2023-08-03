import { Box } from "@chakra-ui/react";
import BookList from "../components/BookList.tsx";
import SearchInput from "../components/SearchInput.tsx";
import { useState } from "react";
import { BookInterface } from "../components/Book.tsx";
import { AuthTokenInterface } from "../hooks/useToken.ts";
import Podrocja from "../components/Podrocja.tsx";

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
        <BookList books={books} />
      </Box>
    </section>
  );
};

export default Library;
