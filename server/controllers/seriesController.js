
import {
  getSeriesIdService,
  getEpisodeTitleService,
} from "../api/episodeTitleService.js";
import {  getOfferEpisodes } from "../api/nearbyEpisodesService.js";
import { isInvalidSeriesId } from "../utils/idValidator.js";

async function getTitle(req, res) {
  try {
    const seriesId = await getSeriesIdService(req.body);

    if (isInvalidSeriesId(seriesId)) {
      return res.status(200).json({
        episodeTitle: seriesId,
      });
    }
    const dataSeries = await getEpisodeTitleService(req.body, seriesId);
    await getOfferEpisodes(req.body, dataSeries.seasons);
    return res.status(200).json({
      seriesId,
      episodeTitle: dataSeries.title,
    });
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error" });
  }
}
export default getTitle;
