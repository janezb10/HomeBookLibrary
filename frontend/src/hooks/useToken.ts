import { useState } from "react";

export interface AuthTokenInterface {
  authToken: string;
  setAuthToken?: (authToken: string) => void;
}

const useToken = () => {
  const [authToken, setAuthToken] = useState("");

  return { authToken, setAuthToken };
};

export default useToken;
