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
import { registerInProcess } from "../../api/register/RegistrationProcess.api";
import { useNavigate } from "react-router-dom";
import Notification from "../Notifications/Notification";

export default function EmailCode() {
  const [code, setCode] = useState<string>("");
  const [alert, setAlert] = useState<{
    type: "error";
    message: string;
  } | null>(null);
  const navigator = useNavigate();

  const handaleRegistrationProcess = async () => {
    try {
      const process = await registerInProcess(code);
      if (process) {
        setCode("");
        navigator("/");
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
    <>
      <div className={style["signup-body"]}>
        <Container className={style["signup-container"]}>
          <CssBaseline />
          <Box className={style["signup-box"]}>
            <Avatar className={style["signup-avatar"]}>
              <LockOutlined />
            </Avatar>
            <Typography variant="h5" className={style["signup-header-text"]}>
              Enter Code
            </Typography>
            <Box className={style["signup-form-box"]}>
              <Grid
                sx={{ display: "flex", flexDirection: "column" }}
                container
                spacing={2}
                className={style["signup-grid-container"]}
              >
                <div>
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
                </div>
                <Button
                  sx={{ backgroundColor: "#343A40" }}
                  variant="contained"
                  className={style["signup-register-button"]}
                  onClick={handaleRegistrationProcess}
                >
                  Register
                </Button>
              </Grid>
            </Box>
          </Box>
        </Container>
        <Notification alert={alert} setAlert={setAlert} />
      </div>
    </>
  );
}
