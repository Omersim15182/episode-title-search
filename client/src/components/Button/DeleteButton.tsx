import Button from "@mui/material/Button";
import DeleteIcon from "@mui/icons-material/Delete";
import Stack from "@mui/material/Stack";
import style from "./Button.module.css";

export default function DeleteButton() {
  return (
    <Stack className={style["delete-button"]}>
      <Button variant="outlined" startIcon={<DeleteIcon />}>
        Delete
      </Button>
    </Stack>
  );
}
