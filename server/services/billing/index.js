import express from "express";
import "dotenv/config";
import connectDB from "./config/db.js";
import router from "./routes/billing.route.js";

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use("/", router);

app.get("/", (req, res) => {
  res.json({ message: "Hello from Billing server!" });
});

const startServer = async () => {
  try {
    await connectDB();

    app.listen(PORT, () => {
      console.log(`Billing started at Port ${PORT}`);
    });
  } catch (error) {
    console.log("Billing startup error:", error);
    process.exit(1);
  }
};

startServer();
