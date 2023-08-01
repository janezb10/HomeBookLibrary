import { Outlet } from "react-router-dom";
import NavBar from "../components/NavBar.tsx";
import { AuthTokenInterface } from "../hooks/useToken.ts";

const SharedLayout = ({ authToken, setAuthToken }: AuthTokenInterface) => {
  return (
    <>
      <NavBar authToken={authToken} setAuthToken={setAuthToken} />
      <Outlet />
    </>
  );
};
export default SharedLayout;
