import axiosInstance from "../axiosInstance";
import { UserLogin } from "../../types/types";
import { setCookie } from "typescript-cookie";
import { AxiosError } from "axios";

export const userLogging = async (user: UserLogin) => {
  try {
    const response = await axiosInstance.post(
      "/episodeNamer/user/auth/Login",
      user,
      { withCredentials: true }
    );
    const token = response.data.token;
    setCookie("token", token, {
      expires: 1 / 24,
      path: "/",
    });
    const userId = response.data.userId;
    localStorage.setItem("userId", userId);

    return response.data.message;
  } catch (e) {
    if (e instanceof AxiosError) {
      throw new Error(e.response?.data?.message || "Login failed!");
    }
    throw new Error("An unexpected error occurred.");
  }
};
