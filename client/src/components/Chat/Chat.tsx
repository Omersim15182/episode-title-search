import style from "./Chat.module.css";
import TextField from "@mui/material/TextField";
import SearchIcon from "@mui/icons-material/Search";
import InputAdornment from "@mui/material/InputAdornment";

export default function Chat() {
  return (
    <div className={style["chat-container"]}>
      <form className={style["contacts-container"]}>
        <div className={style["contacts"]}>
          <TextField
            id="standard-basic"
            label="Search Contact"
            variant="standard"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
            sx={{
              "& .MuiInput-underline:before": {
                borderBottom: "none",
              },
              "& .MuiInput-underline:after": {
                borderBottom: "none",
              },
              "& .MuiInputLabel-root.Mui-focused": {
                color: "inherit",
              },
            }}
          />
        </div>
      </form>
    </div>
  );
}
