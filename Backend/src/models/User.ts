// src/models/User.ts
import mongoose, { Schema, Document } from "mongoose";

export interface IUser extends Document {
  username: string;
  email: string;
  passwordHash: string;
  savedRecipes: mongoose.Types.ObjectId[];
  savedVideos: mongoose.Types.ObjectId[];
  preferredUnits: "metric" | "imperial";
  createdAt: Date;
}

const UserSchema: Schema = new Schema({
  username: { type: String, required: true, unique: true, trim: true },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
  },
  passwordHash: { type: String, required: true },
  savedRecipes: [{ type: Schema.Types.ObjectId, ref: "Recipe" }],
  savedVideos: [{ type: Schema.Types.ObjectId, ref: "Video" }],
  preferredUnits: {
    type: String,
    enum: ["metric", "imperial"],
    default: "metric",
  },
  createdAt: { type: Date, default: Date.now },
});

export const User = mongoose.model<IUser>("User", UserSchema);
