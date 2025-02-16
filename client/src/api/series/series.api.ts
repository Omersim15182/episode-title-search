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
    console.log("s", response.data);
    const seriesId = response.data.seriesId;
    const episodeTitle = response.data.episodeTitle;

    return { episodeTitle, seriesId };
  } catch (e) {
    if (e instanceof AxiosError) {
      console.error("Unexpected error:", e);
    }
    console.error("episode title error:", e);
  }
};
