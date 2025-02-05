import { InternalServerError, NotFoundError } from "../custom-errors/errors.js";
import MessageRepository from "./messages-repository.js";
import Messages from "./model/Messages.js";

export const saveMessages = async (messages) => {
  if (!messages) throw new NotFoundError("Message didn't send");
  console.log("messages", messages);

  const lastMessage = messages[messages.length - 1];

  const message = new Messages({
    message: lastMessage.message,
    source_id: lastMessage.source_id,
    destination_id: lastMessage.destination_id,
    destination_name: lastMessage.destination_name,
    destination_photo: lastMessage.destination_photo,
  });

  try {
    const savedMessage = await message.save();

    if (savedMessage) {
      return true;
    }
    throw new NotFoundError("Message didn't save in the database");
  } catch (error) {
    console.log(error);

    throw new InternalServerError("Error didn't except int the messages save ");
  }
};

export const getMessages = async (userId, destination_id) => {
  try {
    console.log(1);

    const messages = MessageRepository.getMessagesById(userId, destination_id);
    if (messages) {
      return messages;
    }
    throw new NotFoundError("Failed to fetch messages from db");
  } catch (error) {
    throw new InternalServerError("failed request ");
  }
};
