import axiosInstance from "../axiosInstance";
import { AxiosError } from "axios";

export const fetchContacts = async () => {
  try {
    const response = await axiosInstance.post("/episodeNamer/chat/contacts", {
      withCredentials: true,
    });

    console.log("Status ", response.data.contacts);
    return response.data.contacts;
  } catch (e) {
    if (e instanceof AxiosError) {
      console.error("Axios error:", e.response?.data || e.message);
    }
    console.error("user info error:", e);
  }
};
