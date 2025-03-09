import Series from "./model/Series.js";
import { NotFoundError, InternalServerError } from "../custom-errors/errors.js";

class SeriesRepository {
  /**
   * Fetch the number of series searches by userId
   * @param {String} userId - The ID of the user
   * @returns {Promise<Object>} - An object containing series names and their search counts
   */

  static async getSeriesSearchCountByUserId(userId) {
    try {
      const searchCounts = await Series.aggregate([
        {
          $match: { userId },
        },
        {
          $group: {
            _id: "$seriesName",
            count: { $sum: 1 },
          },
        },
      ]);
      return searchCounts.map((item) => ({
        name: item._id,
        count: item.count,
      }));
    } catch (error) {
      throw new InternalServerError("Can't get search counts from Db");
    }
  }

  static async getAllRecommendedSeries(userId) {
    try {
      const series = await Series.distinct("seriesName", { userId: userId });
      return series;
    } catch (error) {
      throw new InternalServerError("Can't get series name from Db");
    }
  }
}

export default SeriesRepository;
