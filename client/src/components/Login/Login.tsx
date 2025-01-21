import { LockOutlined } from "@mui/icons-material";
import {
  Container,
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
import { userLogin } from "../../types/types";
import { userLogging } from "../../api/login/login.api";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigator = useNavigate();

  const handleLogin = async () => {
    const user: userLogin = {
      email: email,
      password: password,
    };

    const existingUser = await userLogging(user);
    if (existingUser) {
      navigator("/home");
    }
  };

  return (
    <div className={style["loginBoxContainer"]}>
      <CssBaseline />
      <Box className={style["loginBox"]}>
        <Avatar className={style["avatar"]}>
          <LockOutlined />
        </Avatar>
        <Typography variant="h5">Login</Typography>
        <Box className={style["loginContent"]}>
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
            className={style["loginButton"]}
            onClick={handleLogin}
          >
            Login
          </Button>
          <Grid container justifyContent={"flex-end"}>
            <Grid item>
              <Link to="/sign-up" className={style["link-text"]}>
                Don't have an account? Register
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </div>
  );
}
