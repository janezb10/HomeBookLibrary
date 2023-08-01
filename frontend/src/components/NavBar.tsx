import { NavLink } from "react-router-dom";
import { AuthTokenInterface } from "../hooks/useToken.ts";

const NavBar = ({ authToken, setAuthToken }: AuthTokenInterface) => {
  return (
    <nav>
      <NavLink to="/">Home</NavLink>
      {!authToken && <NavLink to="/login">Login</NavLink>}
      {authToken && <NavLink to="/library">Library</NavLink>}
      {authToken && (
        <NavLink
          onClick={() => {
            sessionStorage.removeItem("authToken");
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
