import axiosInstance from "../axiosInstance";

export const verifyUser = async (): Promise<boolean> => {
  try {
    const response = await axiosInstance.post(
      "/episodeNamer/user/auth/verify",
      { withCredentials: true }
    );
    console.log("status user verify : ", response.data);
    return true;
  } catch (err: any) {
    console.error(
      "Error verify user:",
      err.response ? err.response.data : err.message
    );
    return false;
  }
};
