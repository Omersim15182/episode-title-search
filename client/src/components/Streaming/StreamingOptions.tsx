import { useEffect, useState } from "react";
import { streaming } from "../../api/streamingAvailability/streaming.api";
import Notification from "../Notifications/Notification";

interface Props {
  seriesId: string | null;
  searchTrigger: number;
}

export default function StreamingOptions({ seriesId, searchTrigger }: Props) {
  // const [streamingInfo,setStreamingInfo] = useState
  const [alert, setAlert] = useState<{
    type: "error";
    message: string;
  } | null>(null);

  useEffect(() => {
    const updateStreaming = async () => {
      if (!seriesId) {
        return;
      }
      try {
        const streamingInfo = await streaming(seriesId);
        console.log("stream", streamingInfo);
      } catch (error) {
        if (error instanceof Error) {
          setAlert({ type: "error", message: error.message });
        }
      }
    };
    updateStreaming();
  }, [searchTrigger]);

  return (
    <div>
      <h1>heyyy</h1>
      <Notification alert={alert} setAlert={setAlert} />
    </div>
  );
}
