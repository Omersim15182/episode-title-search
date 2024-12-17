import {
  getSeriesNameService,
  getEpisodeTitleService,
} from "../api/episodeTitleService.js";
import { getOfferEpisode } from "../api/offerEpisodesService.js";
import { isInvalidSeriesId } from "../utils/idValidator.js";

async function sendSeriesData(req, res) {
  try {
    const seriesId = await getSeriesNameService(req.body);
    if (isInvalidSeriesId(seriesId)) {
      return res.status(200).json({
        episodeTitle: seriesId,
      });
    }
    const dataSeries = await getEpisodeTitleService(req.body, seriesId);
    await getOfferEpisode(req.body, dataSeries.seasons);

    return res.status(200).json({
      seriesId,
      episodeTitle: dataSeries.title,
    });
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error" });
  }
}
export default sendSeriesData;
