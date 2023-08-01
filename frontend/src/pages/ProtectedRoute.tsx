import { Navigate } from "react-router-dom";
import { ReactNode } from "react";

interface Props {
  children: ReactNode;
  authToken: string;
}

const ProtectedRoute = ({ children, authToken }: Props) => {
  if (!authToken) {
    return <Navigate to="/" />;
  }

  return children;
};

export default ProtectedRoute;
