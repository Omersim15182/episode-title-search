import { LockOutlined } from "@mui/icons-material";
import {
  CssBaseline,
  Box,
  Avatar,
  Typography,
  TextField,
  Button,
  Grid,
} from "@mui/material";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import style from "./Login.module.css";
import { UserLogin } from "../../types/types";
import { userLogging } from "../../api/login/login.api";
import Notification from "../Notifications/Notification";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [alert, setAlert] = useState<{
    type: "error";
    message: string;
  } | null>(null);

  const navigator = useNavigate();

  const handleLogin = async () => {
    const user: UserLogin = {
      email: email,
      password: password,
    };
    try {
      const isSuccess = await userLogging(user);
      if (isSuccess) {
        navigator("/home");
      }
    } catch (error) {
      if (error instanceof Error) {
        setAlert({ type: "error", message: error.message });
      } else {
        setAlert({ type: "error", message: "try later." });
      }
    }
  };

  return (
    <div className={style["login-box-container"]}>
      <CssBaseline />
      <Box className={style["login-box"]}>
        <Avatar className={style["login-avatar"]}>
          <LockOutlined />
        </Avatar>
        <Typography variant="h5">Login</Typography>
        <Box className={style["login-content"]}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoFocus
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <TextField
            margin="normal"
            required
            fullWidth
            id="password"
            name="password"
            label="Password"
            type="password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
          <Button
            sx={{ backgroundColor: "#343A40" }}
            fullWidth
            variant="contained"
            className={style["login-button"]}
            onClick={handleLogin}
          >
            Login
          </Button>
          <Grid container justifyContent={"flex-end"}>
            <Grid item>
              <Link to="/sign-up" className={style["login-link-text"]}>
                Don't have an account? Register
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
      <Notification alert={alert} setAlert={setAlert} />
    </div>
  );
}
