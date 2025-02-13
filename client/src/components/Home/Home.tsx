import { useState } from "react";
import SearchHistory from "../History/SearchHistory";
import SearchBar from "../SearchLabel/SearchBar";
import Ai from "../Ai/Ai";
import ActorCard from "../Card/ActorCard";

export default function Home() {
  const [title, setTitle] = useState<string>("");

  return (
    <div
      style={{
        height: " 93%",
        width: "100%",
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: " #ced4da",
      }}
    >
      <SearchHistory title={title} />
      <SearchBar title={title} setTitle={setTitle} />
      <ActorCard />
      <Ai></Ai>
    </div>
  );
}
