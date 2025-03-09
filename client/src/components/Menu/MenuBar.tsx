import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import AccountCircle from "@mui/icons-material/AccountCircle";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import { useState } from "react";
import { userLogout } from "../../api/logout/logout.api";
import Account from "../MyAccount/Account";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

export default function MenuBar() {
  const navigate = useNavigate();
  const [auth] = useState(true);

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [accountDisplay, setAccountDisplay] = useState(false);

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = async () => {
    setAnchorEl(null);
  };

  const handleLogout = async () => {
    setAnchorEl(null);
    await userLogout();
    navigate("/");
  };

  const handleAccountClick = () => {
    setAnchorEl(null);
    setAccountDisplay(true);
  };

  return (
    <div>
      <Box sx={{ display: "flex" }}>
        <AppBar style={{ backgroundColor: "#2F4F4F" }} position="static">
          <Toolbar>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" component="div">
              Episeoder Title Search
            </Typography>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                width: "80vw",
              }}
            >
              <MenuItem onClick={handleClose} component={Link} to="/Home">
                Home
              </MenuItem>
              <MenuItem onClick={handleClose} component={Link} to="/chat">
                Chat
              </MenuItem>
              <MenuItem onClick={handleClose}>My account</MenuItem>
            </div>

            {auth && (
              <div>
                <IconButton
                  size="large"
                  aria-label="account of current user"
                  aria-controls="menu-appbar"
                  aria-haspopup="true"
                  onClick={handleMenu}
                  color="inherit"
                >
                  <AccountCircle />
                </IconButton>
                <Menu
                  id="menu-appbar"
                  anchorEl={anchorEl}
                  anchorOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  open={Boolean(anchorEl)}
                  onClose={handleClose}
                >
                  <MenuItem onClick={handleLogout}>Logout</MenuItem>
                  <MenuItem onClick={handleAccountClick}>Account</MenuItem>
                  {accountDisplay && (
                    <Account
                      display={accountDisplay}
                      setDisplay={setAccountDisplay}
                    />
                  )}
                </Menu>
              </div>
            )}
          </Toolbar>
        </AppBar>
      </Box>
    </div>
  );
}
