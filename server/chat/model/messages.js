import mongoose from "mongoose";
import { v4 as uuidv4 } from "uuid";

const MessagesSchema = new mongoose.Schema({
  _id: {
    type: String,
    default: uuidv4,
    require: false,
  },
  message: {
    type: String,
    required: true,
  },
  source_id: {
    type: String,
    required: true,
  },
  destination_id: {
    type: String,
    required: true,
  },
  destination_name: {
    type: String,
    required: true,
  },
  destination_photo: {
    type: String,
    required: false,
  },
});

const Messages = mongoose.model("Messages", MessagesSchema);

export default Messages;
