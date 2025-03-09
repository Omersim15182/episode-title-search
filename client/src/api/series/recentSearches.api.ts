import axiosInstance from "../axiosInstance";
import { AxiosError } from "axios";

export const getRecentSearches = async () => {
  const userId = localStorage.getItem("userId");
  try {
    const response = await axiosInstance.get(
      "/episodeNamer/Series/series-data/recent-searches",
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
