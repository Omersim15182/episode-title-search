import axios from "axios";

const apiKey = process.env.API_KEY;

export const imdbInstance = axios.create({
  baseURL: "https://imdb8.p.rapidapi.com",
  timeout: 5000,
  headers: {
    "x-rapidapi-key": apiKey,
    "x-rapidapi-host": "imdb8.p.rapidapi.com",
  },
});

export const imdbStreamingInstance = axios.create({
  baseURL: "https://imdb8.p.rapidapi.com",
  timeout: 5000,
  headers: {
    "x-rapidapi-key": apiKey,
    "x-rapidapi-host": "streaming-availability.p.rapidapi.com",
  },
});
