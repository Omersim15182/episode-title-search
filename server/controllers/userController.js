const { getSeriesNameService } = require("../api/seriesNameServies");
const { getEpisodeTitleService } = require("../api/episodeTitleService");

async function sendSeriesData(req, res, next) {
  try {
    const { seriesName, seasonNumber, episodeNumber } = req.body;
    if (!seriesName) {
      res.status(400).json({ message: "Series name is required" });
    }

    const seriesId = await getSeriesNameService({ seriesName });
    if (!seriesId) {
      return res.status(404).json({ message: "Series not found" });
    }
    console.log("Found series ID:", seriesId);
    await getEpisodeTitleService({ seriesId, seasonNumber, episodeNumber });
    res.status(200).json({
      message: "Series data received successfully",
      seriesName: seriesName,
      seasonNumber: seasonNumber,
      episodeNumber: episodeNumber,
    });
    console.log(
      "accept series name : ",
      seriesName,
      ", season :",
      seasonNumber,
      "episode ",
      episodeNumber
    );
  } catch (error) {
    console.error("Error in sendSeriesData:", error);
    res.status(500).json({ message: "Server error" });
  }
}
module.exports = { sendSeriesData };
