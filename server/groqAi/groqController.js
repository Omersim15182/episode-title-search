import { getGroqChatCompletion } from "./groq.js";

export async function fetchDataFromAi(req, res) {
  const { message } = req.query;

  try {
    const chatCompletion = await getGroqChatCompletion(message);
    console.log("chat", chatCompletion);

    res.json(chatCompletion);
  } catch (error) {
    console.error("Error fetching Groq response:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}
