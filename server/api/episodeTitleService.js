const Series = require("../models/Series");
const { imdbInstance } = require("../common/axios-instance");

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

const getSeriesNameService = async (showDetails) => {
  const { seriesName } = showDetails;

  try {
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

module.exports = { getEpisodeTitleService, getSeriesNameService };
