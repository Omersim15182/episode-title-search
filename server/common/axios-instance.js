import axios from "axios";

const apiKey = process.env.API_KEY;

const imdbInstance = axios.create({
  baseURL: "https://imdb8.p.rapidapi.com",
  timeout: 5000,
  headers: {
    "x-rapidapi-key": apiKey,
    "x-rapidapi-host": "imdb8.p.rapidapi.com",
  },
});
export default imdbInstance;
