// src/server.ts
import express, { Request, Response } from "express";
import cors from "cors";
import dotenv from "dotenv";
import { connectDB } from "./config/db";
import videoRoutes from "./routes/videoRoutes";
import recipeRoutes from "./routes/recipeRoutes";
import userRoutes from "./routes/userRoutes"; // 👈 1. Import user routes

dotenv.config();

const app = express();
const PORT = process.env.PORT;

connectDB();

app.use(
  cors({
    origin: process.env.FRONTEND_URL || process.env.VITE_FRONTEND_URL,
    credentials: true,
  }),
);
app.use(express.json());

// Register API Routes
app.use("/api/videos", videoRoutes);
app.use("/api/recipes", recipeRoutes);
app.use("/api/users", userRoutes); // 👈 2. Mount user routes!

app.get("/", (req: Request, res: Response) => {
  res.json({ message: "Welcome to the SatioFlix API! 🍽️" });
});

app.listen(PORT, () => {
  console.log(`🚀 SatioFlix Server running on http://localhost:${PORT}`);
});
