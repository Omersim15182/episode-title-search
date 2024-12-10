import axios, { AxiosInstance } from "axios";

const instance: AxiosInstance = axios.create({
  baseURL: "http://localhost:3500",
  timeout: 5000,
});
export default instance;
