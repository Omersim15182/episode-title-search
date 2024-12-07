const cors = require("cors");
const express = require("express");
const app = express();
const connectDB = require("./config/db");
require("dotenv").config();
const port = 3500;

connectDB();

const userRoutes = require("./routes/userRoutes");

app.use(cors());

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use("/episodeNamer", userRoutes);

app.listen(port, () => {
  console.log(`app listening on port ${port}`);
});
