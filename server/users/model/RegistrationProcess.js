import mongoose from "mongoose";
import { v4 as uuidv4 } from "uuid";

const RegistrationProcessSchema = new mongoose.Schema({
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
  code: {
    type: String,
    required: false,
  },
});

const RegistrationProcess = mongoose.model(
  "RegistrationProcess",
  RegistrationProcessSchema
);

export default RegistrationProcess;
