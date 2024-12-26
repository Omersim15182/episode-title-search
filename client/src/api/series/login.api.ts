import axiosInstance from "../axiosInstance";
import { userLogin } from "../../types/types";

export const authLogin = async (user: userLogin) => {
  try {
    const paramsEmail = user.email;
    const response = await axiosInstance.get("/episodeNamer/user/Login", {
      params: { paramsEmail },
    });
    console.log("status user login : ", response.data);
  } catch (err: any) {
    console.error(
      "Error occurred:",
      err.response ? err.response.data : err.message
    );
  }
};
