import axios, { CanceledError, AxiosError } from "axios";

const apiClient = axios.create({
  baseURL: "http://localhost:3001/",
});

export { CanceledError, AxiosError };

export default apiClient;
