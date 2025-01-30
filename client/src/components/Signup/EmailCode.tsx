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
import style from "./Signup.module.css";
import { useState } from "react";
import { LockOutlined } from "@mui/icons-material";
import { registerInProcess } from "../../api/register/RegistrationProcess";
import { Navigate } from "react-router-dom";

export default function EmailCode() {
  const [code, setCode] = useState<string>("");
  const [isUserRegister, setIsUserRegister] = useState<boolean>(false);

  const handaleRegistrationProcess = async () => {
    const process = await registerInProcess(code);
    if (process) {
      setIsUserRegister(true);
      setCode("");
    }
  };

  if (isUserRegister) {
    return <Navigate to="/" />;
  }
  console.log("ASDA", code);

  return (
    <>
      <div className={style["signup-body"]}>
        <Container className={style["signup-container"]}>
          <CssBaseline />
          <Box className={style["signup-box"]}>
            <Avatar className={style["signup-avatar"]}>
              <LockOutlined />
            </Avatar>
            <Typography variant="h5" className={style["signup-header-text"]}>
              Register
            </Typography>
            <Box className={style["signup-form-box"]}>
              <Grid
                container
                spacing={2}
                className={style["signup-grid-container"]}
              >
                <Grid item xs={12}>
                  <TextField
                    name="code"
                    required
                    fullWidth
                    id="code"
                    label="code"
                    autoFocus
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                    className={style["signup-text-field"]}
                  />
                </Grid>
                <Button
                  sx={{ backgroundColor: "#343A40" }}
                  fullWidth
                  variant="contained"
                  className={style["signup-register-button"]}
                  onClick={handaleRegistrationProcess}
                >
                  Register
                </Button>
              </Grid>

              <Grid
                container
                justifyContent="flex-end"
                className={style["signup-link-container"]}
              ></Grid>
            </Box>
          </Box>
        </Container>
      </div>
    </>
  );
}
