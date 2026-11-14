import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import router from "./routes/agent.route.js";
import fileRoutes from "./routes/file.route.js";
dotenv.config();

const app = express();
const PORT = process.env.PORT;

app.use(express.json({ limit: "10mb" }));
app.use("/", router);

app.use((err, req, res, next) => {
  console.log(err);

  if (err.status) {
    return res.status(err.status).json(err.data);
  }
  return res.status(500).json({ message: `agent error ${err}` });
});

app.use("/api/files", fileRoutes);
app.get("/", (req, res) => {
  res.json({ message: "Hello from Agent server!" });
});

app.listen(PORT, () => {
  console.log(`Agent started at Port ${PORT}`);
  connectDB();
});
