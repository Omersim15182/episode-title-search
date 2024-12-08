import Button from "@mui/material/Button";
import SearchIcon from "@mui/icons-material/Search";
import Stack from "@mui/material/Stack";

interface AddButtonProps {
  onClick: () => void;
}

export default function AddButton(props: AddButtonProps) {
  return (
    <Stack direction="row" spacing={2}>
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
