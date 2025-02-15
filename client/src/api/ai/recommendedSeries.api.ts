import { AxiosError } from "axios";
import axiosInstance from "../axiosInstance";

export const getRecommendedSeries = async () => {
  const userId = localStorage.getItem("userId");

  try {
    const response = await axiosInstance.get(
      "/episodeNamer/Ai/getRecommendedSeries",
      {
        params: { userId },
        withCredentials: true,
      }
    );
    console.log("res from recomended", response.data);
    return response.data.recommendedSeries;
  } catch (e) {
    if (e instanceof AxiosError) {
      return e.response?.data;
    }
    console.error("Unexpected error:", e);
  }
};
