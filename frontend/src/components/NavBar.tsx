import { NavLink } from "react-router-dom";
import { AuthTokenInterface } from "../hooks/useToken.ts";
import { Button, Flex } from "@chakra-ui/react";

const NavBar = ({ authToken, setAuthToken }: AuthTokenInterface) => {
  return (
    <Flex bg="#E6FFFA">
      <Button colorScheme="teal" variant="ghost" size="lg">
        <NavLink to="/">Home</NavLink>
      </Button>
      {!authToken && (
        <Button colorScheme="teal" variant="ghost" size="lg">
          <NavLink to="/login">Login</NavLink>
        </Button>
      )}
      {authToken && (
        <Button colorScheme="teal" variant="ghost" size="lg">
          <NavLink to="/library">Library</NavLink>
        </Button>
      )}
      {authToken && (
        <Button colorScheme="teal" variant="ghost" size="lg">
          <NavLink
            onClick={() => {
              sessionStorage.removeItem("authToken");
              setAuthToken("");
            }}
            to="/"
          >
            Log out
          </NavLink>
        </Button>
      )}
    </Flex>
  );
};

export default NavBar;
