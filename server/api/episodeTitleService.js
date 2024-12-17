import Series from "../models/Series.js";
import imdbInstance from "../common/axios-instance.js";
import redisClient from "../config/redisClient.js";

export const getEpisodeTitleService = async (updateData, seriesId) => {
  const { seriesName, seasonNumber, episodeNumber } = updateData;
  const cacheKey = `${seriesName}:season:${seasonNumber}:episode:${episodeNumber}`;
  console.log("id", seriesId);

  try {
    const response = await imdbInstance.get("/title/get-seasons", {
      params: {
        tconst: seriesId,
      },
    });

    //filter the data for get the title
    const seasons = response.data[(parseInt(seasonNumber, 10) - 1).toString()];
    const episode =
      seasons.episodes[(parseInt(episodeNumber, 10) - 1).toString()];
    const title = episode.title;
    console.log("title ", title);

    const newSeries = new Series({
      episodeTitle: title,
      seriesName,
      seasonNumber,
      episodeNumber,
    });
    await newSeries.save();
    await redisClient.setEx(cacheKey, 3600, title);

    return title;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const getSeriesNameService = async (showDetails) => {
  const { seriesName, seasonNumber, episodeNumber } = showDetails;
  const cacheKey = `${seriesName}:season:${seasonNumber}:episode:${episodeNumber}`;

  try {
    const cachedTitle = await redisClient.get(cacheKey);
    console.log("cacahe", cachedTitle);

    if (cachedTitle) {
      console.log("Cache hit");
      return cachedTitle;
    }

    const response = await imdbInstance.get("/auto-complete", {
      params: { q: seriesName },
    });

    //filter the data to get the id of the series
    const seriesId = response.data.d?.[0]?.id || null;
    console.log("first", seriesId);
    return seriesId;
  } catch (error) {
    console.error(error);
    return null;
  }
};

