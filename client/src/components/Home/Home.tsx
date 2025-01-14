import { useState } from "react";
import SearchHistory from "../SearchHistory/SearchHistory";
import SearchBar from "../SearchLabel/SearchBar";

export default function Home() {
  const [title, setTitle] = useState<string>("");

  return (
    <div style={{ display: "flex" }}>
      <SearchHistory title={title} />
      <SearchBar title={title} setTitle={setTitle} />
    </div>
  );
}
