const axios = require("axios");
const Series = require("../models/Series");

const apiKey = process.env.API_KEY;

const getEpisodeTitleService = async (updateData, seriesId) => {
  const { seriesName, seasonNumber, episodeNumber } = updateData;
  console.log("id", seriesId);

  const options = {
    method: "GET",
    url: "https://imdb8.p.rapidapi.com/title/get-seasons",
    params: {
      tconst: seriesId,
    },
    headers: {
      "x-rapidapi-key": apiKey,
      "x-rapidapi-host": "imdb8.p.rapidapi.com",
    },
  };

  try {
    const response = await axios.request(options);
    // console.log("res", response.data);

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
    // console.log(response.data[(parseInt(episodeNumber, 10) - 1).toString()]); //log for check the title
    // console.log("seasons", seasons);
    // console.log("episode", episode);

    return title;
  } catch (error) {
    console.error(error);
    return null;
  }
};

module.exports = { getEpisodeTitleService };
