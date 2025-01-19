import axiosInstance from "../axiosInstance";
import { AxiosError } from "axios";

export const logoutUser = async () => {
  try {
    const response = await axiosInstance.post(
      "/episodeNamer/user/auth/Logout",
      { withCredentials: true }
    );
    console.log("Status ", response.data.message);
    return true;
  } catch (e) {
    if (e instanceof AxiosError) {
      console.error("Axios error:", e.response?.data || e.message);
    }
    console.error("Login error:", e);
  }
};
