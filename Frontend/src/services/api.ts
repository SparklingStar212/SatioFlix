// src/services/api.ts
import axios from "axios";

const API_BASE_URL =
  import.meta.env.VITE_API_URL || import.meta.env.VITE_BACKEND_URL;

export const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export interface Ingredient {
  name: string;
  quantity: number;
  unit: string;
}

export interface Instruction {
  stepNumber: number;
  text: string;
}

export interface Recipe {
  _id: string;
  title: string;
  description: string;
  author: string;
  countryOfOrigin: string;
  prepTime: number;
  cookTime: number;
  servingsDefault: number;
  coverImage: string;
  ingredients: Ingredient[];
  instructions: Instruction[];
  tags: string[];
}

export interface Video {
  _id: string;
  title: string;
  platform: string;
  videoUrl: string;
  externalVideoId: string;
  thumbnailUrl: string;
  creatorName: string;
  category: string;
  createdAt: string;
  countryOfOrigin?: string;
}

export interface SurvivalRequest {
  mission: "emergency" | "planner" | "survivor";
  country: string;
  currency: string;
  budget: number;
  days: number;
  pantry: string[];
  energyLevel: 1 | 2 | 3 | 4 | 5;
  mealsPerDay?: number;
}

export interface GroceryItem {
  name: string;
  estimatedCost: number;
}

// Updated to support multi-meal slots per day (e.g., Lunch & Dinner)
export interface DailyMealSlot {
  slot: "Lunch" | "Dinner";
  mealTitle: string;
  matchedVideoId?: string; // Maps to Video._id for reel synchronization
  estimatedCost: number;
  instructions: string[];
}

export interface MealPlan {
  day: number;
  dailyMeals: DailyMealSlot[];
}

export interface SurvivalPlanResponse {
  _id?: string; // For cached plans from MongoDB
  totalBudgetUsed: number;
  currency: string;
  groceryList: GroceryItem[];
  meals: MealPlan[];
}
