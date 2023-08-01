import axios, { CanceledError, AxiosError } from "axios";

const apiClient = axios.create({
  baseURL: "http://localhost:3001/",
  // headers: {
  //   Authorization: "asdf",
  // },
});
// Check if a token is stored in session storrage and set it as the authorization header
// const storedToken = sessionStorage.getItem("authToken");
// if (storedToken) {
//   apiClient.defaults.headers.common["Authorization"] = `Bearer ${storedToken}`;
// }

export { CanceledError, AxiosError };

export default apiClient;
