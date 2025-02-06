import Groq from "groq-sdk";
import dotenv from "dotenv";

dotenv.config();

const apiKeyAi = process.env.GROQ_API_KEY;
const groq = new Groq({ apiKey: `${apiKeyAi}` });

export async function main() {
  const chatCompletion = await getGroqChatCompletion();
  // Print the completion returned by the LLM.
  console.log(chatCompletion.choices[0]?.message?.content || "");
}

export async function getGroqChatCompletion(message) {
  return groq.chat.completions.create({
    messages: [
      {
        role: "user",
        content: message,
      },
    ],
    model: "llama-3.3-70b-versatile",
  });
}
