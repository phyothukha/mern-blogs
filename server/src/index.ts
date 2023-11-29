import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cookieParser from "cookie-parser";
import authRoute from "./routes/auth.routes";
import { connectDb } from "./config/dbconnection";
import cors from "cors";
import morgan from "morgan";

/*config server  */
const app = express();
const PORT = process.env.PORT;
app.use(cookieParser());

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/** routing  system */

app.use("/api", authRoute);

/**  connecting to databases */

connectDb();

app.get("/", (req, res) => {
  res.json({ message: "you are in main route" });
});

/** listening to the port  */

app.listen(PORT, () => {
  console.log(`your server is running on http://localhost:${PORT} 🤖🛩️`);
});
