import axiosInstance from "../axiosInstance";
import { AxiosError } from "axios";

export const userInfo = async () => {
  const userId = localStorage.getItem("userId");

  try {
    const response = await axiosInstance.get("/episodeNamer/user/auth/info", {
      params: { userId },
      withCredentials: true,
    });
    console.log("Status ", response.data.userInfo);
    return response.data.userInfo;
  } catch (e) {
    if (e instanceof AxiosError) {
      console.error("Axios error:", e.response?.data || e.message);
    }
    console.error("user info error:", e);
  }
};
