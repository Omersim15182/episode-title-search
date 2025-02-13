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
import style from "./Signup.module.css";
import { UserRegister } from "../../types/types";
import { registerUser } from "../../api/register/register.api";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { useNavigate } from "react-router-dom";
import Notification from "../Notifications/Notification";

export default function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [photo, setPhoto] = useState<string>("");
  const [alert, setAlert] = useState<{
    type: "error";
    message: string;
  } | null>(null);

  const navigator = useNavigate();

  const handleRegister = async () => {
    const user: UserRegister = {
      name: name,
      email: email,
      password: password,
      photo: photo,
    };
    try {
      const registered = await registerUser(user);
      if (registered) {
        // setAlert({ type: "success", message: registered });
        setName("");
        setEmail("");
        setPassword("");
        setPhoto("");
        navigator("/emailcode");
      }
    } catch (error) {
      if (error instanceof Error) {
        setAlert({ type: "error", message: error.message });
      } else {
        setAlert({ type: "error", message: "try later." });
      }
    }
  };

  const handlePhotoChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const base64 = await convertToBase64(file);
      setPhoto(base64 as string);
    }
  };

  const convertToBase64 = (file: any) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);
      fileReader.onload = () => {
        resolve(fileReader.result);
      };
      fileReader.onerror = (error) => {
        reject(error);
      };
    });
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
                    name="name"
                    required
                    fullWidth
                    id="name"
                    label="Name"
                    autoFocus
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className={style["signup-text-field"]}
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
                    className={style["signup-text-field"]}
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
                    className={style["signup-text-field"]}
                  />
                </Grid>
                <Grid>
                  <Button
                    style={{
                      marginTop: "7px",
                      marginLeft: "15px",
                      backgroundColor: "#343A40",
                      borderRadius: "3px",
                    }}
                    component="label"
                    role={undefined}
                    variant="contained"
                    tabIndex={-1}
                    startIcon={<CloudUploadIcon />}
                  >
                    Upload files
                    <input
                      type="file"
                      className={style["visually-hidden"]}
                      onChange={handlePhotoChange}
                      multiple
                    />
                  </Button>
                </Grid>
              </Grid>

              <Button
                sx={{ backgroundColor: "#343A40" }}
                fullWidth
                variant="contained"
                className={style["signup-register-button"]}
                onClick={handleRegister}
              >
                Register
              </Button>
              <Grid
                container
                justifyContent="flex-end"
                className={style["signup-link-container"]}
              >
                <Grid item>
                  <Link to="/" className={style["signup-link-text"]}>
                    Already have an account? Login
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Container>
        <div>
          <Notification alert={alert} setAlert={setAlert} />
        </div>
      </div>
    </>
  );
}
