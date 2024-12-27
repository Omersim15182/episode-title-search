import axiosInstance from "../axiosInstance";
import { userLogin } from "../../types/types";
import { setCookie } from "typescript-cookie";

export const inLogging = async (user: userLogin) => {
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

    console.log("status user login : ", response.data);
    return true;
  } catch (err: any) {
    console.error(
      "Error occurred:",
      err.response ? err.response.data : err.message
    );
  }
};
