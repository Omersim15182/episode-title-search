import mongoose from "mongoose";
import { v4 as uuidv4 } from "uuid";

const SeriesSchema = new mongoose.Schema({
  _id: {
    type: String,
    default: uuidv4,
  },
  episodeTitle: {
    type: String,
    required: true,
  },
  seriesId: {
    type: String,
    default: null,
  },
  seriesName: {
    type: String,
    required: true,
  },
  seasonNumber: {
    type: String,
    required: true,
  },
  episodeNumber: {
    type: String,
    required: true,
  },
  dateAdded: {
    type: Date,
    default: Date.now,
  },
  userId: {
    type: String,
    ref: "Users",
    required: true,
  },
});

const Series = mongoose.model("Series", SeriesSchema);

export default Series;
