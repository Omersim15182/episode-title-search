import Box from "@mui/material/Box";
import SearchBar from "./SearchBar";
import style from "./SearchBar.module.css";
import { Dispatch, SetStateAction } from "react";
import ActorCard from "../Card/ActorCard";

interface Props {
  title: string;
  setTitle: Dispatch<SetStateAction<string>>;
}

export default function BoxSearch({ title, setTitle }: Props) {
  return (
    <Box className={style["page-container"]}>
      <SearchBar title={title} setTitle={setTitle} />
      {/* <ActorCard></ActorCard> */}
    </Box>
  );
}
