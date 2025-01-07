import axiosInstance from "../axiosInstance";
import { userRegister } from "../../types/types";

export const registerUser = async (user: userRegister) => {
  try {
    await axiosInstance.post("/episodeNamer/user/auth/register", user, {
      withCredentials: true,
    });
  } catch (err: any) {
    console.error(
      "Error occurred:",
      err.response ? err.response.data : err.message
    );
  }
};
