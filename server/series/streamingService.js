import { imdbStreamingInstance } from "../common/axios-instance.js";
import { InternalServerError } from "../custom-errors/errors.js";

export const getStreamingInfo = async (seriesId) => {
  try {
    const response = await imdbStreamingInstance.get(`/shows/${seriesId}`, {
      params: {
        series_granularity: "episode",
        output_language: "en",
        country: "us",
      },
    });

    return response.data;
  } catch (error) {
    console.error(error);

    throw new InternalServerError("api request failed", error.message);
  }
};
