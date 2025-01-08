import Box from "@mui/material/Box";
import SearchBar from "../SearchBar/SearchBar";
import style from "./Home.module.css";
import { Dispatch, SetStateAction } from "react";

interface Props {
  title: string;
  setTitle: Dispatch<SetStateAction<string>>;
}

function PageContent({ title, setTitle }: Props) {
  return (
    <Box className={style["demo-page-container"]}>
      <SearchBar title={title} setTitle={setTitle} />
    </Box>
  );
}

export default PageContent;
