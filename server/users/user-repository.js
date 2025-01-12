import Users from "./model/Users.js";
import { NotFoundError, InternalServerError } from "../custom-errors/errors.js";

class UserRepository {
  /**
   * Update the user's watched series list
   * @param {string} userId - The ID of the user
   * @param {string} seriesId - The ID of the saved series
   * @returns {Object|null} - The updated user object, or null if the user is not found
   */

  static async updateWatchedSeries(userId, seriesId) {
    try {
      const updatedUser = await Users.findByIdAndUpdate(
        userId,
        {
          $push: { watchedSeries: seriesId },
        },
        { new: true }
      );

      if (!updatedUser) {
        throw new NotFoundError("User not found");
      }
      return updatedUser;
    } catch (error) {
      throw new Error(`Error updating watched series: ${error.message}`);
    }
  }

  /**
   * Get the user with populated watched series
   * @param {string} userId - The ID of the user
   * @returns {Object|null} - The user object with populated series details
   */

  static async getUserWithPopulatedSeries(userId) {
    try {
      const userWithPopulatedSeries = await Users.findById(userId).populate({
        path: "watchedSeries",
        model: "Series",
      });

      if (!userWithPopulatedSeries) {
        throw new NotFoundError("User not found");
      }

      const watchedSeries =
        userWithPopulatedSeries.watchedSeries &&
        userWithPopulatedSeries.watchedSeries.length > 0
          ? userWithPopulatedSeries.watchedSeries
          : null;

      return watchedSeries;
    } catch (error) {
      throw new InternalServerError(
        `Error retrieving user with populated series: ${error.message}`
      );
    }
  }
}

export default UserRepository;
