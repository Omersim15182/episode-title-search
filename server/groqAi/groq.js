import Groq from "groq-sdk";
import dotenv from "dotenv";
import { InternalServerError } from "../custom-errors/errors.js";

dotenv.config();

const apiKeyAi = process.env.GROQ_API_KEY;
const cleanedApiKey = apiKeyAi.slice(1, -1);

const groq = new Groq({
  apiKey: cleanedApiKey,
});

export async function main() {
  const chatCompletion = await getGroqChatCompletion();
}

export async function getGroqChatCompletion(message) {
  try {
    const response = await groq.chat.completions.create({
      messages: [
        {
          role: "user",
          content: "write between 5 - 10 lines on :" + message,
        },
      ],
      model: "llama-3.3-70b-versatile",
    });
    const aiMessage = response.choices[0].message.content;
    return aiMessage;
  } catch (error) {
    throw InternalServerError("Error using Ai");
  }
}
