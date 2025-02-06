import { AxiosError } from "axios";
import axiosInstance from "../axiosInstance";

export const getDataAi = async (message: string) => {
  try {
    const response = await axiosInstance.get("/episodeNamer/Ai/getData", {
      params: { message },
      withCredentials: true,
    });
    console.log("response from Ai", response);
    return response.data;
  } catch (e) {
    if (e instanceof AxiosError) {
      return e.response?.data;
    }
    console.error("Unexpected error:", e);
  }
};
