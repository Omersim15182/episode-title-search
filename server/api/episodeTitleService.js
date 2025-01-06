import Users from "../models/Users.js";
import Series from "../models/Series.js";
import imdbInstance from "../common/axios-instance.js";
import redisClient from "../config/redisClient.js";
import { NotFoundError, InternalServerError } from "../custom-errors/errors.js";

export const getSeriesIdService = async (showDetails, userId) => {
  const { seriesName, seasonNumber, episodeNumber } = showDetails;
  const cacheKey = `${seriesName}:season:${seasonNumber}:episode:${episodeNumber}`;

  try {
    const cachedEpisodeTitle = await redisClient.get(cacheKey);

    if (cachedEpisodeTitle) {
      const newSeries = new Series({
        episodeTitle: cachedEpisodeTitle,
        seriesName,
        seasonNumber,
        episodeNumber,
        userId: userId,
      });

      const savedSeries = await newSeries.save();
      console.log("Saved series to the database:", savedSeries);

      const updatedUser = await Users.findByIdAndUpdate(
        userId,
        {
          $push: { watchedSeries: savedSeries._id },
        },
        { new: true }
      );

      if (!updatedUser) {
        console.log("User not found.");
        return null;
      }
      return cachedEpisodeTitle;
    }
    const response = await imdbInstance.get("/auto-complete", {
      params: { q: seriesName },
    });

    const seriesId = response.data.d?.[0]?.id || null;
    return seriesId;
  } catch (error) {
    console.error("error", error);
    return null;
  }
};

export const getEpisodeTitleService = async (updateData, seriesId, userId) => {
  const { seriesName, seasonNumber, episodeNumber } = updateData;
  const cacheKey = `${seriesName}:season:${seasonNumber}:episode:${episodeNumber}`;
  console.log("ssss", userId);

  try {
    const response = await imdbInstance.get("/title/get-seasons", {
      params: {
        tconst: seriesId,
      },
    });

    //filter the data for get the title
    const seasons = response.data[(parseInt(seasonNumber, 10) - 1).toString()];
    const episodeIndex = parseInt(episodeNumber, 10) - 1;
    const episode = seasons.episodes[episodeIndex.toString()];
    const title = episode.title;
    console.log("title", title);
    console.log(4);

    const newSeries = new Series({
      episodeTitle: title,
      seriesName,
      seasonNumber,
      episodeNumber,
      userId: userId,
    });

    const savedSeries = await newSeries.save();
    await redisClient.setEx(cacheKey, 3600, title);
    const updatedUser = await Users.findByIdAndUpdate(
      userId,
      {
        $push: { watchedSeries: savedSeries._id },
      },
      { new: true }
    );
    if (!updatedUser) {
      console.log("User not found.");
      return null;
    }
    return { status: "success", title, seasons };
  } catch (error) {
    console.error("error", error);
    return null;
  }
};

export const getRecentEpisodes = async (userId) => {
  try {
    const user = await Users.findById(userId).populate({
      path: "watchedSeries",
      model: "Series",
    });

    if (!user) {
      console.log("User not found");
      throw new NotFoundError("User not found");
    }

    return user.watchedSeries && user.watchedSeries.length > 0
      ? user.watchedSeries
      : null;
  } catch (error) {
    console.error("Error fetching recent episodes:", error);
    throw InternalServerError("Error fetching recent episodes");
  }
};
