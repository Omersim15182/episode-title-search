import { AxiosError } from "axios";
import axiosInstance from "../axiosInstance";

export const getSeriesSearchCount = async () => {
  const userId = localStorage.getItem("userId");

  try {
    const response = await axiosInstance.post(
      "/episodeNamer/Series/series-data/seriesChart",
      { userId },
      { withCredentials: true }
    );
    console.log("response from series search counts server", response.data);
    return response.data;
  } catch (e) {
    if (e instanceof AxiosError) {
      return e.response?.data;
    }
    console.error("Unexpected error:", e);
  }
};
