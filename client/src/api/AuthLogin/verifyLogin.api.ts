import axiosInstance from "../axiosInstance";

export const userVerify = async (): Promise<boolean> => {
  try {
    const response = await axiosInstance.post(
      "/episodeNamer/user/auth/verify",
      { withCredentials: true }
    );
    return true;
  } catch (err: any) {
    localStorage.setItem("userId", "");
    console.error(
      "Error verify user:",
      err.response ? err.response.data : err.message
    );
    return false;
  }
};
