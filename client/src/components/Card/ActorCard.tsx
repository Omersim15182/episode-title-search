import { useState } from "react";
import { useActorContext } from "../../context/ActorContext";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import style from "./Actor.module.css";

export default function ActorCard() {
  const { actorData } = useActorContext();
  const credits = actorData;


  const [currentIndex, setCurrentIndex] = useState(0);

  if (!actorData || credits.length === 0) {
    return (
      <Typography style={{ height: "100%", backgroundColor: "#ced4da" }}>
        No actor data available
      </Typography>
    );
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

  const handleImageClick = (e) => {
    const { clientX, target } = e;
    const { left, width } = target.getBoundingClientRect();
    const middle = left + width / 2;
    if (clientX < middle) {
      handlePrevious();
    } else {
      handleNext();
    }
  };

  return (
    <div className={style["actor"]}>
      <Card aria-hidden="true" className={style["actor-card"]}>
        <CardMedia
          className={style["actor-card-media"]}
          component="img"
          image={currentCredit.name.primaryImage?.url}
          alt={
            currentCredit.name.primaryImage?.url
              ? "Character image"
              : "Default image"
          }
          onClick={handleImageClick}
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
      </Card>
    </div>
  );
}
