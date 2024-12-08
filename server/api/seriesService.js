const Series = require("../models/Series");

async function saveNewSeries({
  episodeTitle,
  seriesName,
  seasonNumber,
  episodeNumber,
}) {
  try {
    const newSeries = new Series({
      episodeTitle,
      seriesName,
      seasonNumber,
      episodeNumber,
    });
    console.log("2");

    // Save the series to the database
    await newSeries.save();
    return newSeries;
  } catch (error) {
    throw new Error("Error saving series to database: " + error.message);
  }
}

module.exports = { saveNewSeries };
