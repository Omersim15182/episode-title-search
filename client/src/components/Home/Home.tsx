import { useState } from "react";
import SearchHistory from "../History/SearchHistory";
import SearchBar from "../SearchLabel/SearchBar";
import Chart from "../Chart/Chart";

export default function Home() {
  const [title, setTitle] = useState<string>("");

  return (
    <div>
      <div
        style={{
          height: " 100%",
          width: "100%",
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <SearchHistory title={title} />
        <SearchBar title={title} setTitle={setTitle} />
        <Chart title={title}></Chart>
      </div>
    </div>
  );
}
