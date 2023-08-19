import { Link as RouterLink } from "react-router-dom";
import { Box, Flex, Text, Button, Link as ChakraLink } from "@chakra-ui/react";

const Error = () => {
  return (
    <Flex justify="center" align="center" height="100vh">
      <Box>
        <Text fontSize="6xl" as="u">
          404
        </Text>
        <Text fontSize="4xl">page not found</Text>
        <ChakraLink as={RouterLink} to="/library" textDecoration="none">
          <Button colorScheme="blue" mt={4}>
            Back home
          </Button>
        </ChakraLink>
      </Box>
    </Flex>
  );
};

export default Error;
