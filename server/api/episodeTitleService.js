const axios = require("axios");
const Series = require("../models/Series");
const { imdbInstance } = require("../common/axios-instance");
const apiKey = process.env.API_KEY;

const getEpisodeTitleService = async (updateData, seriesId) => {
  const { seriesName, seasonNumber, episodeNumber } = updateData;
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

    return title;
  } catch (error) {
    console.error(error);
    return null;
  }
};

module.exports = { getEpisodeTitleService };
