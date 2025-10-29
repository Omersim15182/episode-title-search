import Groq from "groq-sdk";
import dotenv from "dotenv";
import { InternalServerError } from "../custom-errors/errors.js";

dotenv.config();

// const apiKeyAi = process.env.GROQ_API_KEY;

const groq = new Groq({
  apiKey: "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",
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
