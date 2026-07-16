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