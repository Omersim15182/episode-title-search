import { getGroqChatCompletion } from "./groq.js";
import { getRecommendedSeries } from "./recommendedSeriesService.js";

export async function fetchDataFromAi(req, res) {
  const { message } = req.query;

  try {
    const chatCompletion = await getGroqChatCompletion(message);
    console.log("chat", chatCompletion);

    res.status(200).json({ chatCompletion: chatCompletion });
  } catch (error) {
    console.error("Error fetching Groq response:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

export async function fetchRecommendedSeries(req, res) {
  const { userId } = req.query;
  try {
    const recommendedSeries = await getRecommendedSeries(userId);
    res.status(200).json({ recommendedSeries: recommendedSeries });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
}
