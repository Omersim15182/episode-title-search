import axios from "axios";

export default axios.create({
  baseURL: "/api/episodeNamer",
  timeout: 5000,
  withCredentials: true,
});
