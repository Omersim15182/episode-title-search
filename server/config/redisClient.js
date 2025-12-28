import { createClient } from "redis";
import dotenv from "dotenv";

dotenv.config();

const redisClient = createClient({
  // הפרדה של הסיסמה והכתובת מונעת שגיאות URI malformed
  password: process.env.REDIS_PASSWORD,
  socket: {
    host: process.env.REDIS_HOST,
    port: parseInt(process.env.REDIS_PORT) || 6379,
    connectTimeout: 10000,
    reconnectStrategy: (retries) => Math.min(retries * 100, 3000),
  },
});

redisClient.on("error", (err) => console.error("❌ Redis error:", err));
redisClient.on("ready", () => console.log("🚀 Connected to Redis on AWS!"));

await redisClient.connect();

export default redisClient;
