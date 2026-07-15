// src/routes/recipeRoutes.ts
import express, { Request, Response } from "express";
import { Recipe } from "../models/Recipe";

const router = express.Router();

// 1. Route: POST /api/recipes (Create a new recipe)
router.post("/", async (req: Request, res: Response): Promise<any> => {
  try {
    const {
      title,
      description,
      author,
      countryOfOrigin,
      prepTime,
      cookTime,
      servingsDefault,
      coverImage,
      ingredients,
      instructions,
      tags,
    } = req.body;

    const newRecipe = new Recipe({
      title,
      description,
      author,
      countryOfOrigin,
      prepTime,
      cookTime,
      servingsDefault,
      coverImage,
      ingredients,
      instructions,
      tags,
    });

    const savedRecipe = await newRecipe.save();
    res.status(201).json(savedRecipe);
  } catch (error) {
    console.error("❌ Error creating recipe:", error);
    res.status(500).json({ error: "Failed to create recipe" });
  }
});

// 2. Route: GET /api/recipes (Fetch all recipes OR filter by country/tag)
router.get("/", async (req: Request, res: Response): Promise<any> => {
  try {
    const { country, tag } = req.query;
    let queryFilter: any = {};

    // Filter by country if provided (case-insensitive)
    if (country) {
      queryFilter.countryOfOrigin = {
        $regex: new RegExp(country as string, "i"),
      };
    }

    // Filter by tag if provided
    if (tag) {
      queryFilter.tags = { $in: [tag] };
    }

    const recipes = await Recipe.find(queryFilter).sort({ createdAt: -1 });
    res.json(recipes);
  } catch (error) {
    console.error("❌ Error fetching recipes:", error);
    res.status(500).json({ error: "Failed to retrieve recipes" });
  }
});

// 3. Route: GET /api/recipes/:id (Get a single recipe detail)
router.get("/:id", async (req: Request, res: Response): Promise<any> => {
  try {
    const recipe = await Recipe.findById(req.params.id);
    if (!recipe) {
      return res.status(404).json({ error: "Recipe not found" });
    }
    res.json(recipe);
  } catch (error) {
    console.error("❌ Error fetching recipe detail:", error);
    res.status(500).json({ error: "Failed to retrieve recipe" });
  }
});

export default router;
