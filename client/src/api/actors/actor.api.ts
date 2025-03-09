import { AxiosError } from "axios";
import axiosInstance from "../axiosInstance";

interface ActorDataPrpos {
  seriesId?: string | null;
}

export const getActor = async ({ seriesId }: ActorDataPrpos) => {
  try {
    const response = await axiosInstance.get(
      "/episodeNamer/Series/series-data/actorId",
      { params: { seriesId }, withCredentials: true }
    );
    return response.data.actorData;
  } catch (e) {
    if (e instanceof AxiosError) {
      throw new Error(e.response?.data?.message || "get actors failed!");
    }
    throw new Error("An unexpected error occurred.");
  }
};
