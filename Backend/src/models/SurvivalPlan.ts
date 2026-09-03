// src/models/SurvivalPlan.ts
import mongoose, { Schema, Document } from "mongoose";

export interface IDailyMealSlot {
  slot: "Lunch" | "Dinner";
  mealTitle: string;
  estimatedCost: number;
  instructions: string[];
}

export interface IDayPlan {
  day: number;
  dailyMeals: IDailyMealSlot[];
}

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
  meals: IDayPlan[];
}

const DailyMealSlotSchema = new Schema(
  {
    slot: { type: String, required: true },
    mealTitle: { type: String, required: true },
    estimatedCost: { type: Number, required: true },
    instructions: [{ type: String, required: true }],
  },
  { _id: false },
);

const DayPlanSchema = new Schema(
  {
    day: { type: Number, required: true },
    dailyMeals: { type: [DailyMealSlotSchema], required: true },
  },
  { _id: false },
);

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
    meals: { type: [DayPlanSchema], required: true },
  },
  { timestamps: true },
);

export default mongoose.model<ISurvivalPlan>(
  "SurvivalPlan",
  SurvivalPlanSchema,
);
