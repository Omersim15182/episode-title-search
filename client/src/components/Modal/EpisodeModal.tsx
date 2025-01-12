import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Typography from "@mui/material/Typography";
import { Episode } from "../../types/types";
import style from "./EpisodeModal.module.css";
import { useEffect } from "react";
import { getActor } from "../../api/actors/actor.api";

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
  console.log(episode);

  useEffect(() => {
    const fetchActorData = async () => {
      try {
        const actorData = await getActor({ seriesId: episode?.seriesId });
        console.log("actor data", actorData);
      } catch (error) {
        console.error(error);
      }
    };
    fetchActorData();
  }, [episode]);

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
          </Typography>{" "}
          <Typography
            id="keep-mounted-modal-description"
            sx={{ mt: 2 }}
          ></Typography>
          <button onClick={() => setCloseModal()}>Close</button>
        </Box>
      </Modal>
    </div>
  );
}
