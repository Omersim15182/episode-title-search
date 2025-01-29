import style from "./Chat.module.css";
import TextField from "@mui/material/TextField";
import SearchIcon from "@mui/icons-material/Search";
import InputAdornment from "@mui/material/InputAdornment";
import { useEffect, useState } from "react";
import { fetchContacts } from "../../api/chat/contacts.api";

interface user {
  name: string;
  email: string;
  password: string;
  photo: string | undefined;
}
export default function Chat() {
  const [users, setUsers] = useState<user[]>([]);
  const [searchUser, setSearchUser] = useState<string>("");

  //Fetch contacts
  useEffect(() => {
    const contactsData = async () => {
      try {
        const contacts = await fetchContacts();
        setUsers(contacts);
        console.log("users", users);
      } catch (error) {
        console.error(error);
      }
    };
    contactsData();
  }, []);

  //Filter contacts in order input search
  const fillteredUser = users.filter((user) =>
    user.name.toLowerCase().includes(searchUser.toLowerCase())
  );

  return (
    <div className={style["chat-container"]}>
      <form className={style["contacts-container"]}>
        <div className={style["contacts"]}>
          <TextField
            id="standard-basic"
            label="Search Contact"
            variant="standard"
            value={searchUser}
            onChange={(e) => setSearchUser(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
            sx={{
              "& .MuiInput-underline:before": {
                borderBottom: "none",
              },
              "& .MuiInput-underline:after": {
                borderBottom: "none",
              },
              "& .MuiInputLabel-root.Mui-focused": {
                color: "inherit",
              },
            }}
          />
          <div className={style["contact-box"]}>
            {fillteredUser.map((user, index) => (
              <div className={style["contact"]} key={index}>
                <img
                  style={{ width: "30%", height: "100%" }}
                  src={user.photo}
                  alt="Profile"
                />
                {user.name}
              </div>
            ))}
          </div>
        </div>
      </form>
    </div>
  );
}
