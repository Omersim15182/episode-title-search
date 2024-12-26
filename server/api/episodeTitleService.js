import Series from "../models/Series.js";
import imdbInstance from "../common/axios-instance.js";
import redisClient from "../config/redisClient.js";

export const getSeriesIdService = async (showDetails) => {
  const { seriesName, seasonNumber, episodeNumber } = showDetails;
  const cacheKey = `${seriesName}:season:${seasonNumber}:episode:${episodeNumber}`;

  try {
    const cachedEpisodeTitle = await redisClient.get(cacheKey);
    console.log("cache", cachedEpisodeTitle);

    if (cachedEpisodeTitle) {
      console.log("Cache hit");
      return cachedEpisodeTitle;
    }

    const response = await imdbInstance.get("/auto-complete", {
      params: { q: seriesName },
    });

    //filter the data to get the id of the series
    const seriesId = response.data.d?.[0]?.id || null;
    return seriesId;
  } catch (error) {
    console.error("error", error);
    return null;
  }
};

export const getEpisodeTitleService = async (updateData, seriesId) => {
  const { seriesName, seasonNumber, episodeNumber } = updateData;
  const cacheKey = `${seriesName}:season:${seasonNumber}:episode:${episodeNumber}`;

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

    const newSeries = new Series({
      episodeTitle: title,
      seriesName,
      seasonNumber,
      episodeNumber,
    });
    await newSeries.collection.insertOne(newSeries);
    await redisClient.setEx(cacheKey, 3600, title);

    return { status: "success", title, seasons };
  } catch (error) {
    console.error("error", error);
    return null;
  }
};
