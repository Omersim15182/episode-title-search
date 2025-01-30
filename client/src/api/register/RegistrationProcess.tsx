import axiosInstance from "../axiosInstance";

export const registerInProcess = async (code: string) => {
  console.log(code);
  console.log(1);

  try {
    const response = await axiosInstance.post(
      "/episodeNamer/user/auth/verifyemail",
      { code },
      {
        withCredentials: true,
      }
    );
    console.log("rgister ", response.data);
    return true;
  } catch (err: any) {
    console.error(
      "Error occurred:",
      err.response ? err.response.data : err.message
    );
  }
};
