import axiosInstance from "../axiosInstance";
import { userRegister } from "../../types/types";

export const registerUser = async (user: userRegister) => {
  try {
    const response = await axiosInstance.post(
      "/episodeNamer/user/auth/register",
      user,
      { withCredentials: true }
    );
    console.log("status user register : ", response.data);
  } catch (err: any) {
    console.error(
      "Error occurred:",
      err.response ? err.response.data : err.message
    );
  }
};
