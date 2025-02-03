import axiosInstance from "../axiosInstance";
import { AxiosError } from "axios";

interface Message {
  message: string;
  source_id: string | null;
  destination_id?: string;
}

export const saveMessages = async (messages: Message[]) => {
  try {
    const response = await axiosInstance.post(
      "/episodeNamer/chat/messages/save",
      { messages },
      {
        withCredentials: true,
      }
    );
    console.log(response.data);

    return response;
  } catch (e) {
    if (e instanceof AxiosError) {
      console.error("Axios error:", e.response?.data || e.message);
    }
    console.error("user info error:", e);
  }
};
