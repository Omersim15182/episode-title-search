import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Typography from "@mui/material/Typography";
import { Episode } from "../../types/types";
import style from "./EpisodeModal.module.css";
import { useEffect, useState } from "react";
import { getActor } from "../../api/actors/actor.api";
import { useActorContext } from "../../context/ActorContext";
import Notification from "../Notifications/Notification";

interface ShowEpisodeDataProps {
  open: boolean;
  setCloseModal: () => void;
  episode: Episode | null;
}

export default function ShowEpisodeData({
  episode,
  open,
  setCloseModal,
}: ShowEpisodeDataProps) {
  const { setActorData } = useActorContext();
  const [alert, setAlert] = useState<{
    type: "error";
    message: string;
  } | null>(null);

  useEffect(() => {
    const fetchActorData = async () => {
      try {
        const actorData = await getActor({ seriesId: episode?.seriesId });
        setActorData(actorData);
      } catch (error) {
        if (error instanceof Error) {
          setAlert({ type: "error", message: error.message });
        }
      }
    };
    fetchActorData();
  }, [episode?.episodeTitle]);

  return (
    <div>
      <Modal
        aria-hidden="true"
        keepMounted
        open={open}
        aria-labelledby="keep-mounted-modal-title"
        aria-describedby="keep-mounted-modal-description"
      >
        <Box className={style["modal-box"]}>
          <Typography id="keep-mounted-modal-title" variant="h6" component="h2">
            <div className={style["modal-episode"]}>
              Series name : {episode?.seriesName}
            </div>
            <div className={style["modal-episode"]}>
              Episode title : {episode?.episodeTitle}
            </div>
            <div className={style["modal-episode"]}>
              Season number : {episode?.seasonNumber}
            </div>
            <div className={style["modal-episode"]}>
              Episode number : {episode?.episodeNumber}
            </div>
          </Typography>
          <Typography id="keep-mounted-modal-description"></Typography>
          <button onClick={() => setCloseModal()}>Close</button>
        </Box>
      </Modal>
      <Notification alert={alert} setAlert={setAlert} />
    </div>
  );
}
