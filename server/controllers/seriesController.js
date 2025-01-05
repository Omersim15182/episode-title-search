import {
  getSeriesIdService,
  getEpisodeTitleService,
  getRecentEpisodes,
} from "../api/episodeTitleService.js";
import { getOfferEpisodes } from "../api/nearbyEpisodesService.js";
import { isInvalidSeriesId } from "../utils/idValidator.js";

export async function getTitle(req, res) {
  const { series, userId } = req.body;
  console.log("series", series);

  try {
    const seriesId = await getSeriesIdService(series,userId);

    if (isInvalidSeriesId(seriesId)) {
      return res.status(200).json({
        episodeTitle: seriesId,
      });
    }
    const dataSeries = await getEpisodeTitleService(series, seriesId, userId);
    await getOfferEpisodes(req.body.series, dataSeries.seasons);
    return res.status(200).json({
      seriesId,
      episodeTitle: dataSeries.title,
    });
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error" });
  }
}

export async function recentSearches(req, res) {
  const { userId } = req.body;
  console.log("Received userId:", userId);
  const recentSearches = await getRecentEpisodes(userId);
  if (recentSearches) {
    return res.status(200).json({
      data: recentSearches,
    });
  }
  return res
    .status(500)
    .json({ message: "An error occurred during fetch series data." });
}
