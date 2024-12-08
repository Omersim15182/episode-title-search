const { getSeriesNameService } = require("../api/seriesNameServies");
const { getEpisodeTitleService } = require("../api/episodeTitleService");

async function sendSeriesData(req, res, next) {
  try {
    const seriesId = await getSeriesNameService(req.body);
    const title = await getEpisodeTitleService(req.body, seriesId);
    return res.status(200).json({
      seriesId,
      episodeTitle: title,
    });
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error" });
  }
}
module.exports = { sendSeriesData };
