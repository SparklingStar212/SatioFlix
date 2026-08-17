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
  author: string;
  countryOfOrigin: string; // e.g., "Italy", "South Korea", "Nigeria"
  prepTime: number; // in minutes
  cookTime: number; // in minutes
  servingsDefault: number;
  coverImage: string;
  ingredients: IIngredient[];
  instructions: IInstruction[];
  tags: string[];
  createdAt: Date;
}

const IngredientSchema = new Schema(
  {
    name: { type: String, required: true },
    quantity: { type: Number, required: true },
    unit: { type: String, required: true },
  },
  { _id: false }, // ⚡ Strips unnecessary ObjectIds to reduce database document weight
);

const InstructionSchema = new Schema(
  {
    stepNumber: { type: Number, required: true },
    text: { type: String, required: true },
    image: { type: String },
  },
  { _id: false }, // ⚡ Strips unnecessary ObjectIds to reduce database document weight
);

const RecipeSchema: Schema = new Schema({
  title: { type: String, required: true, trim: true },
  description: { type: String, required: true },
  author: { type: String, required: true, default: "SatioFlix Chef" },
  countryOfOrigin: { type: String, required: true, index: true }, // ⚡ Single index for country lookup
  prepTime: { type: Number, required: true },
  cookTime: { type: Number, required: true },
  servingsDefault: { type: Number, default: 4 },
  coverImage: { type: String, required: true },
  ingredients: [IngredientSchema],
  instructions: [InstructionSchema],
  tags: [{ type: String, index: true }], // ⚡ Multikey index for tag filtering
  createdAt: { type: Date, default: Date.now, index: true }, // ⚡ Index for reverse-chronological sorting
});

// ⚡ Compound index for instant filtered & sorted country queries
RecipeSchema.index({ countryOfOrigin: 1, createdAt: -1 });

export const Recipe = mongoose.model<IRecipe>("Recipe", RecipeSchema);
