import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import MailIcon from "@mui/icons-material/Mail";
import PersonIcon from "@mui/icons-material/Person";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { userInfo } from "../../api/info/info.api";

type UserInfo = {
  name: string;
  email: string;
  id: string;
};

type displayProps = {
  display: boolean;
  setDisplay: Dispatch<SetStateAction<boolean>>;
};
export default function Account({ display, setDisplay }: displayProps) {
  const [open, setOpen] = useState(false);
  const [info, setInfo] = useState<UserInfo | null>(null);

  const toggleDrawer =
    (isOpen: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
      if (
        event.type === "keydown" &&
        ((event as React.KeyboardEvent).key === "Tab" ||
          (event as React.KeyboardEvent).key === "Shift")
      ) {
        return;
      }
      setOpen(isOpen);
      setDisplay(isOpen);
    };

  useEffect(() => {
    const fetchUserInfo = async () => {
      const user = await userInfo();
      setInfo(user);
    };
    fetchUserInfo();
  }, [open]);

  const list = () => (
    <Box
      role="presentation"
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
    >
      <List sx={{ width: "15vw" }}>
        <ListItem disablePadding>
          <ListItemButton>
            <ListItemIcon>
              <PersonIcon />
              {info?.name}
            </ListItemIcon>
            <ListItemText />
          </ListItemButton>
        </ListItem>
      </List>
      <Divider />
      <List sx={{ width: "15vw" }}>
        <ListItem disablePadding>
          <ListItemButton>
            <ListItemIcon>
              <MailIcon /> {info?.email}
            </ListItemIcon>
            <ListItemText />
          </ListItemButton>
        </ListItem>
      </List>
    </Box>
  );

  return (
    <div>
      <Button
        sx={{ display: "flex", color: "black" }}
        onClick={toggleDrawer(true)}
      />
      <Drawer anchor="right" open={display} onClose={toggleDrawer(false)}>
        {list()}
      </Drawer>
    </div>
  );
}
