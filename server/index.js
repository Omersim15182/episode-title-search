import cors from "cors";
import express from "express";
import fs from "fs";
import https from "https";
import path from "path";
import connectDB from "./config/db.js";
import dotenv from "dotenv";
import userRoutes from "./routes/userRoutes.js";
import cookieParser from "cookie-parser";
dotenv.config();

const app = express();
const PORT = process.env.PORT_SERVER;

connectDB();
const dirname = path.resolve();
const options = {
  key: fs.readFileSync(path.join(dirname, "localhost-key.pem")),

  cert: fs.readFileSync(path.join(dirname, "localhost.pem")),
};

app.use(cookieParser());

app.use(
  cors({
    origin: "https://localhost:5173",
    credentials: true,
  })
);

app.use(express.json());

app.use("/episodeNamer", userRoutes);

const server = https.createServer(options, app);

server.listen(PORT, () => {
  console.log(`App is listening on port ${PORT} with HTTPS`);
});
