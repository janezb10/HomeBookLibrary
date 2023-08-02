import { Box } from "@chakra-ui/react";
import BookList from "../components/BookList.tsx";

const Library = () => {
  return (
    <section>
      <h4>Hello, Knjižnica not sm</h4>
      <Box>
        <BookList />
      </Box>
    </section>
  );
};

export default Library;
