const mongoose = require("mongoose");
const { v4: uuidv4 } = require("uuid");

const seriesSchema = new mongoose.Schema({
  _id: {
    type: String,
    default: uuidv4,
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

module.exports = Series;
