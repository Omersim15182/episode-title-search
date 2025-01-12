import axiosInstance from "../axiosInstance";
import { userLogin } from "../../types/types";
import { setCookie } from "typescript-cookie";
import { AxiosError } from "axios";

export const loginUser = async (user: userLogin) => {
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
    console.log("Status ", response.data.message);

    return true;
  } catch (e) {
    if (e instanceof AxiosError) {
      console.error("Axios error:", e.response?.data || e.message);
    }
    console.error("Login error:", e);
  }
};
