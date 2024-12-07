import axios, { AxiosInstance } from "axios";

const instance: AxiosInstance = axios.create({
  baseURL: "http://localhost:3500",
  timeout: 5000,
  headers: { "X-Custom-Header": "foobar" },
});
export default instance;
