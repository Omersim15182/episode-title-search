import axiosInstance from "../axiosInstance";
import { Episode } from "../../types/types";

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
    console.log("Series name successfully:", episodeTitle);
    return episodeTitle;
  } catch (e: any) {
    return e.response.data;
  }
};
