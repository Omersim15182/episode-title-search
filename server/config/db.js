import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const mongoURI = process.env.MONGO_URI;

console.log(mongoURI);

const connectDB = async () => {
  try {
    await mongoose.connect(mongoURI);
    console.log("MongoDB connected successfully");
    const connectionStatus = mongoose.connection.readyState;
    if (connectionStatus === 1) {
      console.log("Connection is live.");
    } else {
      console.error("Connection not live.");
    }
  } catch (err) {
    console.error("MongoDB connection failed:", err.message);
    process.exit(1);
  }
};

export default connectDB;
