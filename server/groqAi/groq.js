import Groq from "groq-sdk";
import dotenv from "dotenv";
import { InternalServerError } from "../custom-errors/errors.js";

dotenv.config();

// const apiKeyAi = process.env.GROQ_API_KEY;

const groq = new Groq({
  apiKey: process.env.MY_GROQ_KEY,
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
    console.log(response);
    const aiMessage = response.choices[0].message.content;

    return aiMessage;
  } catch (error) {
    console.error("DEBUG GROQ ERROR:", error); // זה יגיד לנו אם המפתח לא תקין או שיש בעיית רשת
    throw new InternalServerError("Error using Ai");
  }
}
