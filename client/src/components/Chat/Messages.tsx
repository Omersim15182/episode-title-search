import style from "./Messages.module.css";
import SendIcon from "@mui/icons-material/Send";
import ChatButton from "./ChatButton";
import { useEffect, useState } from "react";
import { User } from "../../types/types";
import { saveMessages } from "../../api/chat/messages.api";
import { socket } from "../../socket/socket";
// import { setupSocketListeners } from "../../socket/socketEvents";

interface selectedUserProps {
  selectedUser: User | null;
}

interface Message {
  message: string;
  source_id: string | null;
  destination_id?: string;
  destination_photo?: string;
  destination_name?: string;
}

export default function Messages({ selectedUser }: selectedUserProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [socketMsg, setSocketMsg] = useState<Message>();
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
      source_id: userId,
      destination_id: selectedUser?._id,
      message: inputMessage,
      destination_photo: selectedUser?.photo,
      destination_name: selectedUser?.name,
    });

    setInputMessage("");
  };

  useEffect(() => {
    socket.on("connection", () => {
      console.log(socket.id);
    });

    socket.emit("register", userId);

    socket.on("private message callback", (msg) => {
      console.log("msg", msg);
      setMessages((prev) => [
        ...prev,
        {
          source_id: msg.source_id,
          destination_id: msg.destination_id,
          message: msg.message,
          destination_photo: msg.destination_photo,
          destination_name: msg.destination_name,
        },
      ]);
      setSocketMsg(msg);
    });

    return () => {
      socket.off("private message callback");
      socket.disconnect();
    };
  }, []);
  console.log("messages:", messages);
  console.log("test id ", socketMsg?.destination_id, selectedUser?._id);
  console.log("aaaa", socketMsg);

  return (
    <div className={style["messages"]}>
      <div className={style["messages-container"]}>
        {messages.map((msg, index) => (
          <div key={index}>{msg.message} </div>
        ))}
        <ChatButton />
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
