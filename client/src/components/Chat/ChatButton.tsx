import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { Button } from "@mui/material";
import Box from "@mui/material/Box";
import Fab from "@mui/material/Fab";
import { useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";

export default function ChatButton() {
  const [file, setFile] = useState<string>("");
  const [buttonPlus, setButtonPlus] = useState<boolean>(false);

  const handleButton = () => {
    setButtonPlus(!buttonPlus);
  };

  const handlePhotoChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const base64 = await convertToBase64(file);
      setFile(base64 as string);
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
    <div>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column-reverse",
          alignItems: "flex-end",
        }}
      >
        <Fab
          sx={{
            backgroundColor: "black",
            marginRight: "11px",
            marginBottom: "5px",
            marginTop: "5px",
            boxShadow: "none",
            "&:hover": {
              backgroundColor: "#426c97",
            },
          }}
          size="small"
          color="secondary"
          aria-label="add"
          onClick={handleButton}
        >
          {buttonPlus ? <RemoveIcon /> : <AddIcon />}
        </Fab>
        {buttonPlus && (
          <Button
            style={{
              marginTop: "7px",
              marginLeft: "15px",
              backgroundColor: "#343A40",
              clipPath: "circle()",
              width: "40px",
              height: "40px",
            }}
            component="label"
            role={undefined}
            variant="contained"
            tabIndex={-1}
            startIcon={<CloudUploadIcon style={{ marginLeft: "12px" }} />}
          >
            <input
              style={{ display: "none" }}
              type="file"
              onChange={handlePhotoChange}
              multiple
            />
          </Button>
        )}
      </Box>
    </div>
  );
}
