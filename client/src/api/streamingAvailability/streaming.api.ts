import axiosInstance from "../axiosInstance";
import { AxiosError } from "axios";

export const streaming = async (seriesId: string) => {
  try {
    const response = await axiosInstance.get(
      "/episodeNamer/Series/series-data/streaming",
      { params: { seriesId }, withCredentials: true }
    );
    console.log("response", response);

    const streamLink = response.data;
    return streamLink;
  } catch (e) {
    if (e instanceof AxiosError) {
      console.error("Axios error:", e.response?.data || e.message);
    }
    console.error("Login error:", e);
  }
};
