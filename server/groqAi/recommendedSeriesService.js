import { NotFoundError } from "groq-sdk";
import SeriesRepository from "../series/series-repository.js";
import { getGroqChatCompletion } from "./groq.js";

export const getRecommendedSeries = async (userId) => {
  try {
    const seriesRecommended = await SeriesRepository.getAllRecommendedSeries(
      userId
    );
    if (seriesRecommended) {
      const seriesList = seriesRecommended.map((series) => series).join(",");
      const groqMessage = await getGroqChatCompletion(
        `Please provide recommendations based on these series and show every series in number : ${seriesList}`
      );
      console.log(groqMessage);

      return groqMessage;
    }
    throw new NotFoundError("Series not found");
  } catch (error) {
    throw new InternalServerError("Can't get Recommended Series ");
  }
};
