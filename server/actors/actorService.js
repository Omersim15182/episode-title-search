import imdbInstance from "../common/axios-instance.js";
import { InternalServerError, NotFoundError } from "../custom-errors/errors.js";

export const getActorId = async (seriesId) => {

  try {
    const response = await imdbInstance.get("/title/v2/get-top-cast-and-crew", {
      params: {
        tconst: seriesId,
      },
    });

    if (!response || !response.data) {
      throw new NotFoundError("Error not found actor data");
    }

    return response.data;
  } catch (error) {
    throw new InternalServerError("Error in fetch actor data", error.message);
  }
};