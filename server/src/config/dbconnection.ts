import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();
const URI = process.env.DATABASE_URL;

export const connectDb = () => {
  try {
    console.log(`database conneted! ${URI}`);
    mongoose.connect(URI);
  } catch (err) {
    console.log("your connection is err!", err);
  }
};
