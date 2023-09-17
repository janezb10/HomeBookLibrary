import axios, { CanceledError, AxiosError } from "axios";

const apiClient = axios.create({
  baseURL: location.hostname,
});

export { CanceledError, AxiosError };

export default apiClient;
