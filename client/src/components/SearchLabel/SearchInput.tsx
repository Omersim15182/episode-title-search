import * as React from "react";
import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import style from "./SearchInput.module.css";

interface SearchInputProps {
  value: string;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  placeholder: string;
  showNextInput?: boolean;
}

export default function SearchInput(props: SearchInputProps) {
  return (
    <Paper component="form" className={style["paper-container"]}>
      <IconButton className={style["icon-button"]} aria-label="menu">
        <MenuIcon />
      </IconButton>
      <InputBase
        className={style["input-base-container"]}
        placeholder={props.placeholder}
        value={props.value}
        onChange={props.onChange}
        inputProps={{ "aria-label": props.placeholder }}
      />
      <Divider className={style["divider-container"]} orientation="vertical" />
    </Paper>
  );
}
