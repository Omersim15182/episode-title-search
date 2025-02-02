import { InternalServerError, NotFoundError } from "../custom-errors/errors.js";
import Messages from "./model/Messages.js";

export const saveMessages = async (messages) => {
  if (!messages) throw new NotFoundError("Message didn't send");
  try {
    const message = new Messages({
      message: messages.message,
      source_id: messages.source_id,
      destination_id: messages.destination_id,
      destination_name: messages.destination_name,
      destination_photo: messages.destination_photo,
    });
    console.log(message);

    const result = await Messages.insertMany(messages);
    if (!result) {
      throw new NotFoundError("Message didn't save in the database");
    }
    return true;
  } catch (error) {
    throw new InternalServerError("Error didn't except int the messages save ");
  }
};
