import { AxiosError } from "axios";
import axiosInstance from "../axiosInstance";

export const getSeriesSearchCount = async () => {
  const userId = localStorage.getItem("userId");

  try {
    const response = await axiosInstance.get(
      "/episodeNamer/Series/series-data/seriesChart",
      { params: { userId }, withCredentials: true }
    );
    return response.data;
  } catch (e) {
    if (e instanceof AxiosError) {
      return e.response?.data;
    }
    console.error("Unexpected error:", e);
  }
};
