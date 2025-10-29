import { InternalServerError } from "../custom-errors/errors.js";
import Messages from "./model/messages.js";

class MessageRepository {
  static async getMessagesById(userId, dest_id) {
    try {
      const messages = await Messages.find({
        $or: [
          { source_id: userId, destination_id: dest_id },
          { source_id: dest_id, destination_id: userId },
        ],
      }).exec();

      return messages;
    } catch (error) {
      throw new InternalServerError("Can't get the message in the db");
    }
  }
}

export default MessageRepository;
