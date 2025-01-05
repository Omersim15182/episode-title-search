import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Episode } from "../../types/types";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

interface ShowSeriesProps {
  series: Episode[];
  open: boolean;
  selectedEpisode: Episode | null;
  handleOpen: (episode: Episode) => void;
  handleClose: () => void;
}

export default function ShowSeries({
  series,
  open,
  selectedEpisode,
  handleOpen,
  handleClose,
}: ShowSeriesProps) {
  return (
    <div>
      {series.map((episode, index) => (
        <Button
          key={index}
          onClick={() => handleOpen(episode)}
          variant="outlined"
          sx={{ margin: 1 }}
        >
          {episode.episodeTitle}
        </Button>
      ))}

      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Fade in={open}>
          <Box sx={style}>
            {selectedEpisode && (
              <>
                <Typography
                  id="transition-modal-title"
                  variant="h6"
                  component="h2"
                >
                  {selectedEpisode.episodeTitle}
                </Typography>
                <Typography id="transition-modal-description" sx={{ mt: 2 }}>
                  <strong>Series Name:</strong> {selectedEpisode.seriesName}
                </Typography>
                <Typography>
                  <strong>Season Number:</strong> {selectedEpisode.seasonNumber}
                </Typography>
                <Typography>
                  <strong>Episode Number:</strong>{" "}
                  {selectedEpisode.episodeNumber}
                </Typography>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleClose}
                  sx={{ marginTop: 2 }}
                >
                  Close
                </Button>
              </>
            )}
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}
