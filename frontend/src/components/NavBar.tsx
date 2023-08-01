import { NavLink } from "react-router-dom";
// import useToken from "../hooks/useToken.ts";
import { AuthTokenInterface } from "../hooks/useToken.ts";

const NavBar = ({ authToken, setAuthToken }: AuthTokenInterface) => {
  // const token = sessionStorage.getItem("authToken");
  // const { token, setToken } = useToken();

  return (
    <nav>
      <NavLink to="/">Home</NavLink>
      {!authToken && <NavLink to="/login">Login</NavLink>}
      {authToken && <NavLink to="/library">Library</NavLink>}
      {authToken && (
        <NavLink
          onClick={() => {
            setAuthToken("");
          }}
          to="/"
        >
          Log out
        </NavLink>
      )}
    </nav>
  );
};

export default NavBar;
