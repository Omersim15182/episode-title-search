import style from "./Messages.module.css";
import SendIcon from "@mui/icons-material/Send";
import ChatButton from "./ChatButton";
import { useEffect, useState } from "react";
import { User } from "../../types/types";
import { saveMessages } from "../../api/chat/messages.api";
import { socket } from "../../socket/socket";
import { setupSocketListeners } from "../../socket/socketEvents";

interface selectedUserProps {
  selectedUser: User | null;
}

interface Message {
  message: string;
  source_id: string | null;
  destination_id?: string;
}

export default function Messages({ selectedUser }: selectedUserProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputMessage, setInputMessage] = useState<string>("");
  const userId = localStorage.getItem("userId");

  const handleMessage = async () => {
    setMessages((prev) => [
      ...prev,
      {
        message: inputMessage,
        source_id: userId,
        destination_id: selectedUser?._id,
        destination_photo: selectedUser?.photo,
        destination_name: selectedUser?.name,
      },
    ]);
    await saveMessages(messages);

    socket.emit("private message", {
      destination_id: selectedUser?._id,
      message: inputMessage,
    });
    setInputMessage("");
  };

  useEffect(() => {
    socket.on("connect", () => {
      console.log(socket.id);
    });
    const cleanup = setupSocketListeners((data) => {
      setMessages((prevMessages) => [...prevMessages, data]);
    });

    return () => {
      cleanup();
      socket.disconnect();
    };
  }, []);
  console.log(messages);

  return (
    <div className={style["messages"]}>
      <div className={style["messages-container"]}>
        <ChatButton></ChatButton>
        <div className={style["input-wrapper"]}>
          <input
            type="text"
            value={inputMessage}
            className={style["custom-input"]}
            placeholder="Type a message..."
            onChange={(e) => setInputMessage(e.target.value)}
          />
          <div onClick={handleMessage} className={style["send-icon"]}>
            <SendIcon />
          </div>
        </div>
      </div>
    </div>
  );
}
