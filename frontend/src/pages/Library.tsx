import { Box } from "@chakra-ui/react";
import BookList from "../components/BookList.tsx";
import SearchInput from "../components/SearchInput.tsx";
import { useState } from "react";
import { BookInterface } from "../components/Book.tsx";
import { AuthTokenInterface } from "../hooks/useToken.ts";
import Podrocja from "../components/BookAtributes/Podrocja.tsx";
import Podpodrocja from "../components/BookAtributes/Podpodrocja.tsx";
import Collections from "../components/BookAtributes/Collections.tsx";
import Languages from "../components/BookAtributes/Languages.tsx";
import Year from "../components/BookAtributes/Year.tsx";

const Library = ({ authToken }: AuthTokenInterface) => {
  const [books, setBooks] = useState<BookInterface[]>([]);

  const handleBookSearch = (books: BookInterface[]) => {
    setBooks([...books]);
  };

  return (
    <section>
      <SearchInput authToken={authToken} onBookSearch={handleBookSearch} />
      <Box>
        <Year year={null} onChange={(a) => console.log(a)} />
        <Languages
          selected={2}
          onSelect={(a) => console.log(a)}
          languages={[
            {
              id_jezik: 1,
              jezik: "NE VEM",
            },
            {
              id_jezik: 2,
              jezik: "slovenščina",
            },
            {
              id_jezik: 3,
              jezik: "angleščina",
            },
            {
              id_jezik: 4,
              jezik: "hrvaščina",
            },
            {
              id_jezik: 5,
              jezik: "francoščina",
            },
            {
              id_jezik: 6,
              jezik: "italijanščina",
            },
          ]}
        />
        <Collections
          selected="3"
          onSelect={(a) => console.log(a)}
          collections={[
            {
              id_zbirka: 1,
              zbirka: "NE VEM",
            },
            {
              id_zbirka: 3,
              zbirka: "ABC",
            },
            {
              id_zbirka: 13,
              zbirka: "BISERI UMETNOSTI",
            },
            {
              id_zbirka: 16,
              zbirka: "ČKZ",
            },
            {
              id_zbirka: 18,
              zbirka: "CPP",
            },
            {
              id_zbirka: 23,
              zbirka: "FAVOURITE TALES",
            },
            {
              id_zbirka: 27,
              zbirka: "GUINNESS WORLD RECORDS",
            },
            {
              id_zbirka: 29,
              zbirka: "KROŽNIK OKUSOV",
            },
            {
              id_zbirka: 31,
              zbirka: "LIKOVNA PRIČEVANJA",
            },
            {
              id_zbirka: 37,
              zbirka: "LJUDSTVA SVETA",
            },
            {
              id_zbirka: 40,
              zbirka: "MALA SPLOŠNA ENCIKLOPEDIJA",
            },
            {
              id_zbirka: 46,
              zbirka: "MALA STOR",
            },
            {
              id_zbirka: 48,
              zbirka: "MATEMATIKA",
            },
            {
              id_zbirka: 50,
              zbirka: "MATEMATIKA=ZABAVA",
            },
            {
              id_zbirka: 52,
              zbirka: "MOJE VRTNE RASTLINE",
            },
            {
              id_zbirka: 53,
              zbirka: "NEBESNA ZNAMENJA",
            },
            {
              id_zbirka: 89,
              zbirka: "NOBELOVCI",
            },
            {
              id_zbirka: 90,
              zbirka: "NOSTALGIJA",
            },
            {
              id_zbirka: 97,
              zbirka: "NOVA OBZORJA",
            },
            {
              id_zbirka: 99,
              zbirka: "ODABERI SVOJU PUSTOLOVINU",
            },
            {
              id_zbirka: 100,
              zbirka: "POMOČ IZ",
            },
            {
              id_zbirka: 102,
              zbirka: "PREPOROSTE TEHNIKE",
            },
            {
              id_zbirka: 109,
              zbirka: "PREŠERNOVA DRUŽBA",
            },
            {
              id_zbirka: 110,
              zbirka: "SVETOVNA",
            },
            {
              id_zbirka: 113,
              zbirka: "TINTIN",
            },
            {
              id_zbirka: 116,
              zbirka: "UMETNOST V SLIKAH",
            },
            {
              id_zbirka: 120,
              zbirka: "V SVETU CANKARJEVE DRAMATIKE",
            },
            {
              id_zbirka: 137,
              zbirka: "VELIKA STOR",
            },
            {
              id_zbirka: 145,
              zbirka: "VRHUNCI STOLETJA",
            },
            {
              id_zbirka: 160,
              zbirka: "ZAKLADNICA USPEŠNIC",
            },
          ]}
        />
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
