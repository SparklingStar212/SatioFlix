// src/routes/recipeRoutes.ts
import express, { Request, Response } from "express";
import { Recipe } from "../models/Recipe";

const router = express.Router();

// Helper to escape regex special characters
const escapeRegex = (text: string) => {
  return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
};

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

// 2. Route: GET /api/recipes (Fetch recipes with lean hydration & caching)
router.get("/", async (req: Request, res: Response): Promise<any> => {
  try {
    const { country, tag } = req.query;
    const queryFilter: Record<string, any> = {};

    // Filter by country if provided
    if (country && typeof country === "string") {
      queryFilter.countryOfOrigin = {
        $regex: new RegExp(escapeRegex(country.trim()), "i"),
      };
    }

    // Filter by tag if provided
    if (tag && typeof tag === "string") {
      queryFilter.tags = { $in: [tag.trim()] };
    }

    // ⚡ Cache-Control: Caches responses on CDN/Browser for 2 minutes with background revalidation
    res.setHeader(
      "Cache-Control",
      "public, max-age=120, s-maxage=300, stale-while-revalidate=600",
    );

    // ⚡ .lean() skips Mongoose document hydration, making queries 3-5x faster
    const recipes = await Recipe.find(queryFilter)
      .sort({ createdAt: -1 })
      .lean()
      .exec();

    res.status(200).json(recipes);
  } catch (error) {
    console.error("❌ Error fetching recipes:", error);
    res.status(500).json({ error: "Failed to retrieve recipes" });
  }
});

// 3. Route: GET /api/recipes/:id (Get a single recipe detail)
router.get("/:id", async (req: Request, res: Response): Promise<any> => {
  try {
    // ⚡ Cache single recipe lookups for 5 minutes
    res.setHeader(
      "Cache-Control",
      "public, max-age=300, s-maxage=600, stale-while-revalidate=1200",
    );

    const recipe = await Recipe.findById(req.params.id).lean().exec();
    if (!recipe) {
      return res.status(404).json({ error: "Recipe not found" });
    }
    res.status(200).json(recipe);
  } catch (error) {
    console.error("❌ Error fetching recipe detail:", error);
    res.status(500).json({ error: "Failed to retrieve recipe" });
  }
});

export default router;
