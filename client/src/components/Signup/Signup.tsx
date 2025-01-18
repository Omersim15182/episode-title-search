import {
  Avatar,
  Box,
  Button,
  Container,
  CssBaseline,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import { LockOutlined } from "@mui/icons-material";
import { useState } from "react";
import { Link } from "react-router-dom";
import style from "./Signup.module.css"; // Import the CSS module
import { userRegister } from "../../types/types";
import { registerUser } from "../../api/register/register.api";

export default function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async () => {
    const user: userRegister = {
      name: name,
      email: email,
      password: password,
    };
    await registerUser(user);
  };

  return (
    <>
      <Container maxWidth="xs" className={style["body"]}>
        <CssBaseline />
        <Box className={style["container"]}>
          <Avatar className={style["avatar"]}>
            <LockOutlined />
          </Avatar>
          <Typography variant="h5" className={style["header-text"]}>
            Register
          </Typography>
          <Box className={style["form-box"]}>
            <Grid container spacing={2} className={style["grid-container"]}>
              <Grid item xs={12}>
                <TextField
                  name="name"
                  required
                  fullWidth
                  id="name"
                  label="Name"
                  autoFocus
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className={style["text-field"]}
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={style["text-field"]}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className={style["text-field"]}
                />
              </Grid>
            </Grid>
            <Button
              sx={{ backgroundColor: "black" }}
              fullWidth
              variant="contained"
              className={style["register-button"]}
              onClick={handleRegister}
            >
              Register
            </Button>
            <Grid
              container
              justifyContent="flex-end"
              className={style["link-container"]}
            >
              <Grid item>
                <Link to="/" className={style["link-text"]}>
                  Already have an account? Login
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </>
  );
}
