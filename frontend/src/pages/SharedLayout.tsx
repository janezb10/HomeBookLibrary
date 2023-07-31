import { Outlet } from "react-router-dom";
import NavBar from "../components/NavBar.tsx";

const SharedLayout = () => {
  return (
    <>
      <NavBar />
      <Outlet />
    </>
  );
};
export default SharedLayout;
