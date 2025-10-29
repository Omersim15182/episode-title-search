import { useState } from "react";
import style from "./Ai.module.css";
import { Button, TextField, Box, Paper } from "@mui/material";
import { getDataAi } from "../../api/ai/ai.api";
import Notification from "../Notifications/Notification";
import { getRecommendedSeries } from "../../api/ai/recommendedSeries.api";

export default function Ai() {
  const [messageAi, setMessageAi] = useState<string>(""); // Initialize as string
  const [message, setMessage] = useState<string>("");
  const [alert, setAlert] = useState<{
    type: "error";
    message: string;
  } | null>(null);

  const handleInput = async () => {
    if (message.length === 0) {
      return setAlert({ type: "error", message: "Please enter a message" });
    }
    setMessage("");

    try {
      const response = await getDataAi(message);
      if (!response) {
        setAlert({ type: "error", message: "No message from AI" });
      }
      setMessageAi(formatResponse(response)); // Format response
    } catch (error) {
      setAlert({ type: "error", message: "Error loading Ai" });
    }
  };

  const handleRecommendedSeries = async () => {
    try {
      const recommendedSeriesMessage = await getRecommendedSeries();
      if (!recommendedSeriesMessage) {
        setAlert({ type: "error", message: "No message from AI" });
      }
      setMessageAi(formatResponse(recommendedSeriesMessage)); // Format response
    } catch (error) {
      setAlert({ type: "error", message: "Error loading Ai" });
    }
  };

  // Function to format the response from AI
  const formatResponse = (response: string): string => {
    const seriesList = response
      .split("\n")
      .map((line, index) => {
        return `<p>${index + 1}. ${line.trim()}</p>`; // Add numbering to each line
      })
      .join("");
    return seriesList;
  };

  return (
    <div className={style["ai-container"]}>
      <Paper elevation={3} className={style["chat-box"]}>
        <Box className={style["chat-messages"]}>
          <div dangerouslySetInnerHTML={{ __html: messageAi }} />{" "}
          {/* Render formatted response */}
        </Box>
        <Box className={style["chat-buttons-container"]}>
          <Button
            className={style["recomended-series-button"]}
            variant="contained"
            onClick={handleRecommendedSeries}
          >
            Recommended Series
          </Button>
          <Button
            className={style["recomended-series-button"]}
            variant="contained"
            onClick={() => setMessage("Episode suggestion")}
          >
            Episode Suggestion
          </Button>
        </Box>
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
