import mongoose from "mongoose";

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Chat DB connected");
  } catch (error) {
    console.log("Chat DB error:", error);
    throw error;
  }
};

export default connectDB;
