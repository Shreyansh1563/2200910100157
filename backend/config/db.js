import mongoose from "mongoose";

async function dbConnect() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Mongo connected");
  } catch (e) {
    console.error("Connection error:", e.message);
    process.exit(1);
  }
}

export default dbConnect;
