import axiosInstance from "../axiosInstance";
import { Episode } from "../../types/types";
import { AxiosError } from "axios";

export const getEpisodeTitle = async (series: Episode) => {
  const id = localStorage.getItem("userId");

  const requestData = {
    series: series,
    userId: id,
  };
  try {
    const response = await axiosInstance.post(
      "/episodeNamer/Series/series-data",
      requestData,
      { withCredentials: true }
    );
    const episodeTitle = response.data.episodeTitle;
    return episodeTitle;
  } catch (e) {
    if (e instanceof AxiosError) {
      console.error("Unexpected error:", e);
    }
    console.error("Unexpected error:", e);
  }
};
