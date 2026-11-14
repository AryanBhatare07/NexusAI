import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import router from "./routes/chat.route.js";
dotenv.config();

const app = express();
const PORT = process.env.PORT;

app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));
app.use("/", router);

app.get("/", (req, res) => {
  res.json({ message: "Hello from Chat server!" });
});

app.listen(PORT, () => {
  console.log(`Chat started at Port ${PORT}`);
  connectDB();
});
