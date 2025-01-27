import { getContacts } from "./contactsService.js";

export async function contacts(req, res) {
  try {
    const contactsData = await getContacts();
    return res
      .status(200)
      .json({ message: "successful to logout user", contacts: contactsData });
  } catch (error) {
    return res.status(500).json({
      message: "Faild to fetch contacts",
    });
  }
}
