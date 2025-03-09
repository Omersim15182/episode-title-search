import mongoose from "mongoose";
import { v4 as uuidv4 } from "uuid";

const UsersSchema = new mongoose.Schema({
  _id: {
    type: String,
    default: uuidv4,
  },
  name: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    set: (value) => value.toLowerCase(),
  },
  photo: {
    type: String,
    required: false,
  },
  watchedSeries: [
    {
      type: String,
      ref: "Series",
    },
  ],
});

const Users = mongoose.model("Users", UsersSchema);

export default Users;
