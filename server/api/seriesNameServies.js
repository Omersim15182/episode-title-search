const axios = require("axios");
const { imdbInstance } = require("../common/axios-instance");
const apiKey = process.env.API_KEY;

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

module.exports = { getSeriesNameService };
