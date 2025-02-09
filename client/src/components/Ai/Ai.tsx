import { useState } from "react";
import style from "./Ai.module.css";
import { Button, TextField, Box, Paper, Typography } from "@mui/material";
import { getDataAi } from "../../api/ai/ai.api";
import Notification from "../Notifications/Notification";

export default function Ai() {
  const [messageAi, setMessageAi] = useState("");
  const [message, setMessage] = useState("");
  const [alert, setAlert] = useState<{
    type: "error";
    message: string;
  } | null>(null);
  const handleInput = async () => {
    if (message.length === 0) {
      return setAlert({ type: "error", message: "Please enter a message" });
    }
    try {
      const response = await getDataAi(message);
      if (!response) {
        setAlert({ type: "error", message: "No message from AI" });
      }

      const responseFromAi =
        response?.choices?.[0]?.message?.content || "No message from AI";
      setMessageAi(responseFromAi);
    } catch (error) {
      console.log(error);
    }
  };
  console.log(messageAi);

  return (
    <div className={style["ai-container"]}>
      <Paper
        sx={{
          backgroundColor: "#495057",
          height: "85%",
          borderRadius: "15px",
          width: "70%",
        }}
        elevation={3}
        className={style["chat-box"]}
      >
        <Typography
          sx={{ backgroundColor: "#495057" }}
          variant="h6"
          className={style["chat-title"]}
        >
          AI Chat
        </Typography>
        <Box className={style["chat-messages"]}>{messageAi}</Box>
        <Box className={style["chat-input-container"]}>
          <TextField
            sx={{ input: { color: "white" } }}
            label="Enter your request"
            variant="outlined"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            fullWidth
            className={style["chat-input"]}
            autoComplete="off"
          />
          <Button
            sx={{ borderRadius: "10px" }}
            variant="contained"
            className={style["chat-button"]}
            onClick={handleInput}
          >
            Send
          </Button>
        </Box>
        <Notification alert={alert} setAlert={setAlert} />
      </Paper>
    </div>
  );
}
