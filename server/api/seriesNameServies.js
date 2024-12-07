const axios = require("axios");

const apiKey = process.env.API_KEY;

const getSeriesNameService = async (showDetails) => {
  const { seriesName } = showDetails;

  const options = {
    method: "GET",
    url: "https://imdb8.p.rapidapi.com/auto-complete",
    params: { q: seriesName },
    headers: {
      "x-rapidapi-key": apiKey,
      "x-rapidapi-host": "imdb8.p.rapidapi.com",
    },
  };

  try {
    const response = await axios.request(options);
    const tvShowId = response.data.d?.[0]?.id || null;
    return tvShowId;
  } catch (error) {
    console.error(error);
    return null;
  }
};

module.exports = { getSeriesNameService };
