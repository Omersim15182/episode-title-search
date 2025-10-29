import Series from "./model/Series.js";
import { imdbInstance } from "../common/axios-instance.js";
import redisClient from "../config/redisClient.js";
import UserRepository from "../users/user-repository.js";
import { NotFoundError, InternalServerError } from "../custom-errors/errors.js";

export const getSeriesIdService = async (showDetails, userId) => {
  const { seriesName, seasonNumber, episodeNumber } = showDetails;
  const cacheKey = `${seriesName}:season:${seasonNumber}:episode:${episodeNumber}`;
  const cachedEpisodeTitle = await redisClient.get(cacheKey);

  if (cachedEpisodeTitle) {
    const newSeries = new Series({
      episodeTitle: cachedEpisodeTitle,
      seriesName,
      seasonNumber,
      episodeNumber,
      userId,
    });

    const savedSeries = await newSeries.save();
    const updatedUser = await UserRepository.updateWatchedSeries(
      userId,
      savedSeries._id
    );
    const existingSeriesId = await Series.findOne({
      seriesName,
      userId,
    }).select("seriesId");

    return updatedUser ? { cachedEpisodeTitle, existingSeriesId } : null;
  }
  console.log(seriesName);

  try {
    const response = await imdbInstance.get("/auto-complete", {
      params: { q: seriesName },
    });

    const seriesId = response.data.d?.[1]?.id || null;
    if (!seriesId) {
      throw new NotFoundError("series ID not found");
    }
    console.log("asd", seriesId);

    return { seriesId };
  } catch (error) {
    throw new InternalServerError("api request failed", error.message);
  }
};

export const getEpisodeTitleService = async (updateData, seriesId, userId) => {
  const { seriesName, seasonNumber, episodeNumber } = updateData;
  const cacheKey = `${seriesName}:season:${seasonNumber}:episode:${episodeNumber}`;

  try {
    const response = await imdbInstance.get("/title/get-seasons", {
      params: {
        tconst: seriesId,
      },
    });
    console.log(response.data);

    //filter the data for get the title
    const seasons = response.data[(parseInt(seasonNumber, 10) - 1).toString()];
    const episodeIndex = parseInt(episodeNumber, 10) - 1;
    const episode = seasons.episodes[episodeIndex.toString()];
    const title = episode.title;

    console.log(title);

    const newSeries = new Series({
      episodeTitle: title,
      seriesName,
      seriesId,
      seasonNumber,
      episodeNumber,
      userId: userId,
    });

    const savedSeries = await newSeries.save();
    await redisClient.setEx(cacheKey, 3600, title);
    const updatedUser = await UserRepository.updateWatchedSeries(
      userId,
      savedSeries._id
    );
    if (!updatedUser) {
      throw new NotFoundError("User not found");
    }

    return { title, seasons };
  } catch (error) {
    throw new InternalServerError("api request failed", error.message);
  }
};

export const getRecentEpisodes = async (userId) => {
  try {
    const watchedSeries = await UserRepository.getUserWithPopulatedSeries(
      userId
    );
    if (!watchedSeries) {
      throw new NotFoundError("Not found watched series");
    }
    return watchedSeries;
  } catch (error) {
    throw new InternalServerError(
      "Error fetching recent episodes",
      error.message
    );
  }
};
