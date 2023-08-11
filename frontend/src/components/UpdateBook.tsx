import { Stack } from "@chakra-ui/react";
import Title from "./BookAtributes/Title.tsx";

const UpdateBook = () => {
  return (
    <Stack spacing={4}>
      <Title currentTitle="aaa" onChange={(e) => console.log(e)} />
    </Stack>
  );
};

export default UpdateBook;

// Trapping Focus within Popover#
// na strani
