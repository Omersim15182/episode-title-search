import {
  getSeriesIdService,
  getEpisodeTitleService,
  getRecentEpisodes,
} from "../series/episodeTitleService.js";
import { getOfferEpisodes } from "../series/nearbyEpisodesService.js";
import isInvalidSeriesId from "../utils/idValidator.js";
import { getSearchCount } from "./sereisChartService.js";
import { getStreamingInfo } from "./streamingService.js";

export async function getTitle(req, res) {
  const { series, userId } = req.body;

  try {
    const result = await getSeriesIdService(series, userId);

    if (result.existingSeriesId && result.cachedEpisodeTitle) {
      return res.status(200).json({
        episodeTitle: result.cachedEpisodeTitle,
        seriesId: result.existingSeriesId.seriesId,
      });
    }

    const dataSeries = await getEpisodeTitleService(
      series,
      result.seriesId,
      userId
    );

    await getOfferEpisodes(req.body.series, dataSeries.seasons);
    return res.status(200).json({
      seriesId: result.seriesId,
      episodeTitle: dataSeries.title,
    });
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error" });
  }
}

export async function recentSearches(req, res) {
  const { userId } = req.query;

  try {
    const recentSearches = await getRecentEpisodes(userId);
    return res.status(200).json({
      data: recentSearches,
    });
  } catch (err) {
    return res.status(err.status).json({ message: err.message });
  }
}

export async function seriesSearchCounts(req, res) {
  const { userId } = req.query;

  try {
    const searchCounts = await getSearchCount(userId);

    return res.status(200).json({
      data: searchCounts,
    });
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error" });
  }
}

export async function streamingInfo(req, res) {
  const { seriesId } = req.query;

  try {
    const streamData = await getStreamingInfo(seriesId);
    const streamOptions = streamData.streamingOptions.us.map(
      (option) => option.link
    );
    console.log("data", streamOptions);

    return res.status(200).json({
      data: streamOptions,
    });
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error" });
  }
}
