import axiosInstance from "../axiosInstance";
import { Episode } from "../../types/types";

export const getEpisodeTitle = async (series: Episode) => {
  try {
    const response = await axiosInstance.post(
      "/episodeNamer/Series/series-data",
      series
    );
    const episodeTitle = response.data.episodeTitle;
    console.log("Series name successfully:", episodeTitle);
    return episodeTitle;
  } catch (e: any) {
    return e.response.data;
  }
};
