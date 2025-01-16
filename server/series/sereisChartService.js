import { InternalServerError, NotFoundError } from "../custom-errors/errors.js";
import SeriesRepository from "./series-repository.js";

export const getSearchCount = async (userId) => {
  if (!userId) {
    throw new NotFoundError("userId on found for search count");
  }
  try {
    const result = await SeriesRepository.getSeriesSearchCountByUserId(userId);
    console.log("resuilt", result);
    return result;
  } catch (error) {
    console.log("error", error);
    throw new InternalServerError("fetch search count failed");
  }
};
