// src/models/SurvivalPlan.ts
import mongoose, { Schema, Document } from "mongoose";

export interface ISurvivalPlan extends Document {
  mission: string;
  country: string;
  budget: number;
  days: number;
  energyLevel: number;
  pantry: string[];
  totalBudgetUsed: number;
  currency: string;
  groceryList: Array<{ name: string; estimatedCost: number }>;
  meals: Array<{
    day: number;
    mealTitle: string;
    totalEstimatedCost: number;
    instructions: string[];
  }>;
}

const SurvivalPlanSchema = new Schema(
  {
    // The Search Keys (What we check against to find a cached plan)
    mission: { type: String, required: true },
    country: { type: String, required: true },
    budget: { type: Number, required: true },
    days: { type: Number, required: true },
    energyLevel: { type: Number, required: true },
    pantry: [{ type: String }],

    // The AI Generated Output (What we return to the user)
    totalBudgetUsed: { type: Number, required: true },
    currency: { type: String, required: true },
    groceryList: [
      {
        name: { type: String, required: true },
        estimatedCost: { type: Number, required: true },
      },
    ],
    meals: [
      {
        day: { type: Number, required: true },
        mealTitle: { type: String, required: true },
        totalEstimatedCost: { type: Number, required: true },
        instructions: [{ type: String, required: true }],
      },
    ],
  },
  { timestamps: true },
);

export default mongoose.model<ISurvivalPlan>(
  "SurvivalPlan",
  SurvivalPlanSchema,
);
