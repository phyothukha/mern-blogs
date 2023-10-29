import express from "express";
import dotenv from "dotenv";
import authRoute from "./routes/auth.routes";
import { connectDb } from "./config/dbconnection";

/*config server  */
dotenv.config();
const app = express();
const PORT = process.env.PORT;

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
