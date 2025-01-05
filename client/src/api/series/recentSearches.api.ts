import axiosInstance from "../axiosInstance";
import { AxiosError } from "axios";

export const getRecentSearches = async () => {
  const userId = localStorage.getItem("userId");
  try {
    const response = await axiosInstance.post(
      "/episodeNamer/Series/series-data/recent-searches",
      { userId },
      { withCredentials: true }
    );
    console.log("Series name successfully:", response.data);
    return response.data;
  } catch (e) {
    if (e instanceof AxiosError) {
      return e.response?.data;
    }
    console.error("Unexpected error:", e);
  }
};
