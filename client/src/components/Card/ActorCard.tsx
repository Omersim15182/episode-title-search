import { useState } from "react";
import { useActorContext } from "../../context/ActorContext";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import CardActionArea from "@mui/material/CardActionArea";
import Button from "@mui/material/Button";
import style from "./Actor.module.css";

export default function ActorCard() {
  const { actorData } = useActorContext();
  const credits =
    actorData?.actorData?.title?.principalCredits[1]?.credits ?? [];

  const [currentIndex, setCurrentIndex] = useState(0);

  if (!actorData || credits.length === 0) {
    return <Typography>No actor data available</Typography>;
  }

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % credits.length);
  };

  const handlePrevious = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? credits.length - 1 : prevIndex - 1
    );
  };

  const currentCredit = credits[currentIndex];

  return (
    <div className={style["actor"]}>
      <Card aria-hidden="true" className={style["actor-card"]}>
        <CardActionArea>
          <CardMedia
            className={style["actor-card-media"]}
            component="img"
            image={currentCredit.name.primaryImage?.url}
            alt={
              currentCredit.name.primaryImage?.url
                ? "Character image"
                : "Default image"
            }
          />
          <CardContent>
            <Typography gutterBottom variant="h5">
              Actor: {currentCredit.name.nameText?.text || "Unknown Actor"}
            </Typography>
            <Typography
              variant="body2"
              sx={{ color: "text.secondary" }}
              component="div"
            >
              {currentCredit.characters[0]?.name || "Unknown Character"}
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginTop: "10px",
        }}
      >
        <Button
          onClick={handlePrevious}
          variant="contained"
          sx={{ backgroundColor: "#343A40" }}
        >
          Previous
        </Button>
        <Button
          onClick={handleNext}
          variant="contained"
          sx={{ backgroundColor: "#343A40" }}
        >
          Next
        </Button>
      </div>
    </div>
  );
}
