import { AxiosError } from "axios";
import axiosInstance from "../axiosInstance";

export const registerInProcess = async (code: string) => {

  try {
    const response = await axiosInstance.post(
      "/episodeNamer/user/auth/verifyemail",
      { code },
      {
        withCredentials: true,
      }
    );
    return response.data.message;
  } catch (e) {
    if (e instanceof AxiosError) {
      throw new Error(e.response?.data?.message);
    }
    throw new Error("An unexpected error occurred.");
  }
};
