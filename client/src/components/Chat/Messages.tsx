import style from "./Messages.module.css";
import SendIcon from "@mui/icons-material/Send";
import ChatButton from "./ChatButton";
import { useEffect, useState } from "react";
import { User } from "../../types/types";
import { getMessages, saveMessages } from "../../api/chat/messages.api";
import { socket } from "../../socket/socket";
import Notification from "../Notifications/Notification";

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

  const [alert, setAlert] = useState<{
    type: "error";
    message: string;
  } | null>(null);

  const handleMessage = async () => {
    const newMessage: Message = {
      message: inputMessage,
      source_id: userId,
      destination_id: selectedUser?._id,
      destination_photo: selectedUser?.photo,
      destination_name: selectedUser?.name,
    };

    setMessages((prev) => [...prev, newMessage]);
    await saveMessages([newMessage]);

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
    if (!selectedUser) return;

    socket.on("connection", () => {
      console.log(socket.id);
    });

    socket.emit("register", userId);

    socket.on("private message callback", (msg) => {
      if (!msg) {
        setAlert({ type: "error", message: "message failed" });
      }
      if (
        (msg.source_id === userId &&
          msg.destination_id === selectedUser?._id) ||
        (msg.destination_id === userId && msg.source_id === selectedUser?._id)
      ) {
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
      }
    });

    return () => {
      socket.off("private message callback");
      socket.disconnect();
    };
  }, [selectedUser]);

  useEffect(() => {
    const messages = async () => {
      try {
        const fetchedMessages = await getMessages(selectedUser?._id);
        console.log("Fetched Messages:", fetchedMessages);
        setMessages(fetchedMessages);
      } catch (error) {
        console.error("Error fetching messages:", error);
      }
    };
    messages();
  }, [selectedUser]);

  return (
    <div className={style["messages"]}>
      <div className={style["messages-container"]}>
        <div style={{ overflow: "scroll" }}>
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`${style["message-wrapper"]} ${
                msg.source_id === userId ? style["sent"] : style["received"]
              }`}
            >
              <div className={style["message"]}>{msg.message}</div>
            </div>
          ))}
        </div>
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
        <Notification alert={alert} setAlert={setAlert} />
      </div>
    </div>
  );
}
