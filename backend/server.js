import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import urlRoutes from "./routes/urlRoutes.js";
import logger from "../../loggingmiddleware/logger.js"; // Import logging middleware

dotenv.config();
connectDB();

const app = express();
app.use(express.json());

// Use external logger middleware
app.use(logger);

app.use("/", urlRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on ${PORT} port`));