import { useActorContext } from "../../context/ActorContext";
export default function ActorCard() {
  const { actorData } = useActorContext();
  console.log("actor data from card", actorData);
  console.log("actor data from card", actorData);

  return <div aria-hidden="true">ActorCard</div>;
}
