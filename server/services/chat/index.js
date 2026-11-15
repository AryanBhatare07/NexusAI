import express from "express";
import "dotenv/config";
import connectDB from "./config/db.js";
import router from "./routes/chat.route.js";

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));
app.use("/", router);

app.get("/", (req, res) => {
  res.json({ message: "Hello from Chat server!" });
});

const startServer = async () => {
  try {
    await connectDB();

    app.listen(PORT, () => {
      console.log(`Chat started at Port ${PORT}`);
    });
  } catch (error) {
    console.log("Chat startup error:", error);
    process.exit(1);
  }
};

startServer();
