import { useEffect, useState } from "react";
import { streaming } from "../../api/streamingAvailability/streaming.api";
import Notification from "../Notifications/Notification";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

interface Props {
  seriesId: string | null;
  searchTrigger: number;
  title: string | null;
}

export default function StreamingOptions({
  title,
  seriesId,
  searchTrigger,
}: Props) {
  const [alert, setAlert] = useState<{
    type: "error";
    message: string;
  } | null>(null);
  const [links, setLinks] = useState<string[]>([]);

  useEffect(() => {
    const updateStreaming = async () => {
      if (!seriesId) {
        return;
      }
      try {
        const streamingInfo = await streaming(seriesId);
        setLinks(streamingInfo.data);
      } catch (error) {
        if (error instanceof Error) {
          setAlert({ type: "error", message: error.message });
        }
      }
    };
    updateStreaming();
  }, [title, searchTrigger]);
  console.log(title);
  console.log(seriesId);

  return (
    <div>
      <Box sx={{ minWidth: 120, height: "20px" }}>
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Streaming</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            label="Link"
          >
            <div style={{ overflow: "auto", height: "20vh" }}>
              {links.map((link, index) => (
                <MenuItem key={index}>
                  <a target="_blank" href={link}>
                    link
                  </a>
                </MenuItem>
              ))}
            </div>
          </Select>
        </FormControl>
      </Box>
      <Notification alert={alert} setAlert={setAlert} />
    </div>
  );
}
