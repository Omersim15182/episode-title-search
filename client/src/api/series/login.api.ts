import axiosInstance from "../axiosInstance";
import { userLogin } from "../../types/types";

export const authLogin = async (user: userLogin) => {
  try {
    const response = await axiosInstance.post("/episodeNamer/user/Login", user);
    console.log("status user login : ", response.data);
    return true;
  } catch (err: any) {
    console.error(
      "Error occurred:",
      err.response ? err.response.data : err.message
    );
  }
};
