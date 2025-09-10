import mongoose from "mongoose";

const urlSchema = new mongoose.Schema({
  longUrl: { type: String, required: true },
  shortCode: { type: String, required: true, unique: true },
  expiry: { type: Date, required: true },
  clicks: { type: Number, default: 0 }
}, { timestamps: true });

export default mongoose.model("Url", urlSchema);
