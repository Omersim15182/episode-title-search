import redisClient from "../config/redisClient.js";
import { NotFoundError } from "../custom-errors/errors.js";

export const getOfferEpisodes = async (data, seasons) => {
  const { seriesName, seasonNumber, episodeNumber } = data;
  console.log("in nearby");

  const episodeIndex = parseInt(episodeNumber, 10) - 1;

  try {
    for (let i = episodeIndex - 2; i <= episodeIndex + 2; i++) {
      if (i >= 0 && i < Object.keys(seasons.episodes).length) {
        const episode = seasons.episodes[i.toString()];
        const title = episode.title;
        const episodeNum = i + 1;
        const cacheKey = `${seriesName}:season:${seasonNumber}:episode:${episodeNum}`;
        await redisClient.setEx(cacheKey, 3600, title);
      }
    }
  } catch (error) {
    throw new NotFoundError("series ID not found", error.message);
  }
};
