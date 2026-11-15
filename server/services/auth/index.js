import express from "express";
import "dotenv/config";
import connectDB from "./config/db.js";
import router from "./routes/auth.route.js";

const app = express();
const PORT = process.env.PORT;

app.use(express.json());
app.use("/", router);

app.get("/", (req, res) => {
  res.json({ message: "Hello from Auth server!" });
});

const startServer = async () => {
  try {
    await connectDB();

    app.listen(PORT, () => {
      console.log(`Auth started at Port ${PORT}`);
    });
  } catch (error) {
    console.log("Auth startup error:", error);
    process.exit(1);
  }
};

startServer();
