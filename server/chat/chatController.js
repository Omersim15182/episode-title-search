import { getContacts } from "./contactsService.js";
import { getMessages, saveMessages } from "./messagesService.js";
export async function contacts(req, res) {
  try {
    const contactsData = await getContacts();
    return res
      .status(200)
      .json({ message: "successful fetch contacts", contacts: contactsData });
  } catch (error) {
    return res.status(500).json({
      message: "Faild to fetch contacts",
    });
  }
}

export async function messages(req, res) {
  const { messages } = req.body;

  try {
    const result = await saveMessages(messages);
    if (result) {
      return res.status(200).json({ message: "successful save messages" });
    }
    return res.status(404).json({ message: "didnt save messages" });
  } catch (error) {
    return res.status(500).json({
      message: "Faild to save messages",
    });
  }
}

export async function fetchMessages(req, res) {
  const { userId, destination_id } = req.query;

  try {
    const result = await getMessages(userId, destination_id);

    if (result) {
      return res
        .status(200)
        .json({ message: "successful save messages", messages: result });
    }
    return res.status(404).json({ message: "didnt save messages" });
  } catch (error) {
    return res.status(500).json({
      message: "Faild to save messages",
    });
  }
}
