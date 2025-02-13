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
  const [fileForInput, setFileForInput] = useState<string>("");
  const userId = localStorage.getItem("userId");

  const [alert, setAlert] = useState<{
    type: "error";
    message: string;
  } | null>(null);

  const handleMessage = async () => {
    if (!inputMessage && !fileForInput) {
      setAlert({ type: "error", message: "Enter a message" });
      return;
    }
    const newMessage: Message = {
      message: inputMessage,
      source_id: userId,
      destination_id: selectedUser?._id,
      destination_photo: selectedUser?.photo,
      destination_name: selectedUser?.name,
    };

    if (fileForInput) {
      newMessage.message = fileForInput;
    }

    setMessages((prev) => [...prev, newMessage]);
    await saveMessages([newMessage]);

    socket.emit("private message", {
      source_id: userId,
      destination_id: selectedUser?._id,
      message: inputMessage || fileForInput,
      destination_photo: selectedUser?.photo,
      destination_name: selectedUser?.name,
    });

    setInputMessage("");
    setFileForInput("");
  };

  useEffect(() => {
    if (!selectedUser) return;

    socket.on("connection", () => {
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
        setMessages(fetchedMessages);
      } catch (error) {
        console.error("Error fetching messages:", error);
      }
    };
    messages();
  }, [selectedUser]);

  function isBase64(str: string) {
    const base64Regex =
      /^data:image\/(png|jpeg|jpg|gif|webp);base64,([A-Za-z0-9+/]{4})*([A-Za-z0-9+/]{3}=|[A-Za-z0-9+/]{2}==)?$/;
    return base64Regex.test(str);
  }

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
              <div className={style["message"]}>
                {isBase64(msg.message) ? (
                  <img
                    style={{ width: "400px", height: "200px" }}
                    alt="image"
                    src={msg.message}
                  />
                ) : (
                  msg.message
                )}
              </div>
            </div>
          ))}
        </div>
        <ChatButton
          setFileForInput={setFileForInput}
          fileForInput={fileForInput}
        />
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
