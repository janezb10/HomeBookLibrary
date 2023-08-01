import { Navigate } from "react-router-dom";
import { ReactNode } from "react";
// import useToken from "../hooks/useToken.ts";
// import { AuthTokenInterface } from "../hooks/useToken.ts";

interface Props {
  children: ReactNode;
  authToken: string;
}

const ProtectedRoute = ({ children, authToken }: Props) => {
  // const { token } = useToken();
  // console.log(token);

  // const token = sessionStorage.getItem("authToken");
  if (!authToken) {
    return <Navigate to="/" />;
  }

  return children;
};

export default ProtectedRoute;
