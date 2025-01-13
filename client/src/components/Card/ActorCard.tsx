import { useActorContext } from "../../context/ActorContext";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import CardActionArea from "@mui/material/CardActionArea";
import style from "./Actor.module.css";
export default function ActorCard() {
  const { actorData } = useActorContext();
  const credits =
    actorData?.actorData?.title?.principalCredits[1]?.credits ?? [];

  if (!actorData || actorData.length === 0) {
    return <Typography>No actor data available</Typography>;
  }

  console.log(
    "actor formal from card",
    actorData?.actorData?.title?.principalCredits[1]?.credits
  );
  return (
    <div className={style["actor"]}>
      {credits.map((credit: any, index) => (
        <Card style={{ height: "50%" }} sx={{ maxWidth: 345 }} key={index}>
          <CardActionArea>
            <CardMedia
              component="img"
              height="140"
              image={credit.name.primaryImage?.url}
              alt={
                credit.name.primaryImage?.url
                  ? "Character image"
                  : "Default image"
              }
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                {credit.characters[0]?.name || "Unknown Character"}
              </Typography>
              <Typography variant="body2" sx={{ color: "text.secondary" }}>
                Actor: {credit.name.nameText?.text || "Unknown Actor"}
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>
      ))}
    </div>
  );
}
