import Button from "@mui/material/Button";
import SearchIcon from "@mui/icons-material/Search";
import Stack from "@mui/material/Stack";
import style from "./Button.module.css";
interface AddButtonProps {
  onClick: () => void;
}

export default function AddButton(props: AddButtonProps) {
  return (
    <Stack className={style["add-button"]}>
      <Button
        variant="contained"
        endIcon={<SearchIcon />}
        onClick={props.onClick}
      >
        Search
      </Button>
    </Stack>
  );
}
