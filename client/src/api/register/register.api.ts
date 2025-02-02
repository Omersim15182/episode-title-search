import axiosInstance from "../axiosInstance";
import { UserRegister } from "../../types/types";
import { AxiosError } from "axios";

export const registerUser = async (user: UserRegister) => {
  try {
    const response = await axiosInstance.post(
      "/episodeNamer/user/auth/register",
      user,
      {
        withCredentials: true,
      }
    );
    console.log("rgister ", response.data.message);
    return response.data.message;
  } catch (e) {
    if (e instanceof AxiosError) {
      throw new Error(e.response?.data?.message);
    }
    throw new Error("An unexpected error occurred.");
  }
};
