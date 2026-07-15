// src/models/Video.ts
import mongoose, { Schema, Document } from "mongoose";

export interface IVideo extends Document {
  title: string;
  platform: string;
  videoUrl: string;
  externalVideoId: string;
  thumbnailUrl: string;
  creatorName: string;
  category: string; // e.g. "Korean", "Italian", "ASMR Cooking"
  createdAt: Date;
}

const VideoSchema: Schema = new Schema({
  title: { type: String, required: true },
  platform: { type: String, default: "youtube" },
  videoUrl: { type: String, required: true },
  externalVideoId: { type: String, required: true, unique: true }, // unique prevents duplicates
  thumbnailUrl: { type: String, required: true },
  creatorName: { type: String, required: true },
  category: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

export const Video = mongoose.model<IVideo>("Video", VideoSchema);
