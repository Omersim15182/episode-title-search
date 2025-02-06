import { useState } from "react";
import style from "./Ai.module.css";
import { Button, TextField } from "@mui/material";
import { getDataAi } from "../../api/ai/ai.api";
import Notification from "../Notifications/Notification";

export default function Ai() {
  const [messageAi, setMessageAi] = useState<string>("");
  const [message, setMessage] = useState<string>("");
  const [alert, setAlert] = useState<{
    type: "error";
    message: string;
  } | null>(null);

  const handleInput = async () => {
    try {
      const response = await getDataAi(messageAi);
      if (!response) {
        setAlert({ type: "error", message: "No message from AI" });
      }
      const aiMessage =
        response?.choices[0]?.message?.content || "No message from AI";
      setMessage(aiMessage);
      console.log("message Ai", messageAi);
    } catch (error) {
      console.log(error);
    }
  };
  console.log(messageAi);

  return (
    <div className={style["ai-container"]}>
      <TextField
        margin="normal"
        required
        fullWidth
        id="Ai"
        label="Ai "
        name="Ai"
        autoFocus
        value={messageAi}
        onChange={(e) => setMessageAi(e.target.value)}
      ></TextField>
      <Button onClick={handleInput}>click me</Button>
      <p>{message}</p>
      <Notification setAlert={setAlert} alert={alert} />
    </div>
  );
}
