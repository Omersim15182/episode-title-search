import mongoose from "mongoose";
import { v4 as uuidv4 } from "uuid";

const seriesSchema = new mongoose.Schema({
  _id: {
    type: String,
    default: uuidv4,
  },
  episodeTitle: {
    type: String,
    required: true,
  },
  seriesName: {
    type: String,
    required: true,
  },
  seasonNumber: {
    type: String,
    required: null,
  },
  episodeNumber: {
    type: String,
    required: null,
  },
  dateAdded: {
    type: Date,
    default: Date.now,
  },
});

const Series = mongoose.model("Series", seriesSchema);

export default Series;
