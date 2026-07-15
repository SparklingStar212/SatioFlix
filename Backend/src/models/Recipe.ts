// src/models/Recipe.ts
import mongoose, { Schema, Document } from "mongoose";

export interface IIngredient {
  name: string;
  quantity: number; // Numeric so we can scale servings dynamically on the frontend!
  unit: string; // e.g., "g", "ml", "cups", "pcs"
}

export interface IInstruction {
  stepNumber: number;
  text: string;
  image?: string; // Optional step-by-step image
}

export interface IRecipe extends Document {
  title: string;
  description: string;
  author: string; // We'll link this to a User ID later! For now, a simple string name.
  countryOfOrigin: string; // e.g., "Italy", "South Korea", "Nigeria"
  prepTime: number; // in minutes
  cookTime: number; // in minutes
  servingsDefault: number;
  coverImage: string; // Image URL
  ingredients: IIngredient[];
  instructions: IInstruction[];
  tags: string[]; // ["vegan", "spicy", "easy"]
  createdAt: Date;
}

const RecipeSchema: Schema = new Schema({
  title: { type: String, required: true, trim: true },
  description: { type: String, required: true },
  author: { type: String, required: true, default: "SatioFlix Chef" },
  countryOfOrigin: { type: String, required: true },
  prepTime: { type: Number, required: true },
  cookTime: { type: Number, required: true },
  servingsDefault: { type: Number, default: 4 },
  coverImage: { type: String, required: true },
  ingredients: [
    {
      name: { type: String, required: true },
      quantity: { type: Number, required: true },
      unit: { type: String, required: true },
    },
  ],
  instructions: [
    {
      stepNumber: { type: Number, required: true },
      text: { type: String, required: true },
      image: { type: String },
    },
  ],
  tags: [{ type: String }],
  createdAt: { type: Date, default: Date.now },
});

export const Recipe = mongoose.model<IRecipe>("Recipe", RecipeSchema);
