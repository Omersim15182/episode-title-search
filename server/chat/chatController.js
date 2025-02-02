import { getContacts } from "./contactsService.js";
import { saveMessages } from "./messagesService.js";
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
  console.log("Raw request body:", req.body);
  const { messages } = req.body;
  console.log("Extracted messages:", messages);

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
