import express from "express";
import "dotenv/config";
import connectDB from "./config/db.js";
import router from "./routes/agent.route.js";
import fileRoutes from "./routes/file.route.js";

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json({ limit: "10mb" }));

app.use("/", router);
app.use("/api/files", fileRoutes);

app.get("/", (req, res) => {
  res.json({ message: "Hello from Agent server!" });
});

app.use((err, req, res, next) => {
  console.log(err);

  if (err.status) {
    return res.status(err.status).json(err.data);
  }

  return res.status(500).json({
    message: `Agent error ${err}`,
  });
});

const startServer = async () => {
  try {
    await connectDB();

    app.listen(PORT, () => {
      console.log(`Agent started at Port ${PORT}`);
    });
  } catch (error) {
    console.log("Agent startup error:", error);
    process.exit(1);
  }
};

startServer();
