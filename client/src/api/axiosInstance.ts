import axios from "axios";

export default axios.create({
  baseURL: "https://localhost:3501",
  timeout: 5000,
  withCredentials: true,
});
