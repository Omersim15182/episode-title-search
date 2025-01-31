import { Snackbar, Alert, AlertTitle } from "@mui/material";
import { Dispatch, SetStateAction } from "react";

interface NotificationProps {
  alert: {
    type: "success" | "error";
    message: string;
  } | null;
  setAlert: Dispatch<
    SetStateAction<{ type: "success" | "error"; message: string } | null>
  >;
}

export default function Notification({ alert, setAlert }: NotificationProps) {
  return (
    <Snackbar
      open={!!alert}
      autoHideDuration={1000}
      onClose={() => setAlert(null)}
      anchorOrigin={{ vertical: "top", horizontal: "center" }}
    >
      <div>
        {alert && (
          <Alert
            sx={{ width: "300px" }}
            severity={alert.type}
            onClose={() => setAlert(null)}
          >
            <AlertTitle>
              {alert.type === "success" ? "Success" : "Error"}
            </AlertTitle>
            {alert.message}
          </Alert>
        )}
      </div>
    </Snackbar>
  );
}
