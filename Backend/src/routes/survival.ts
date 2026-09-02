// src/routes/survival.ts (or wherever your routes/services live)
import { Request, Response, Router } from "express";
import { Video } from "../models/Video";
import SurvivalPlan from "../models/SurvivalPlan"; // You'll create this Mongoose model next
// import { aiClient } from '../config/ai'; // Assuming your AI setup is in your config folder

const router = Router();

router.post("/generate", async (req: Request, res: Response) => {
  try {
    // 1. Cast the request body to our strict interface from Step 1
    const { mission, country, currency, budget, days, pantry, energyLevel } =
      req.body;

    // 2. THE CACHE INTERCEPT (Step 3)
    // Sort pantry alphabetically so ["Eggs", "Rice"] matches ["Rice", "Eggs"]
    const sortedPantry = [...pantry].sort();

    const cachedPlan = await SurvivalPlan.findOne({
      mission,
      country,
      budget,
      days,
      energyLevel,
      pantry: sortedPantry,
    }).lean(); // .lean() for maximum performance

    if (cachedPlan) {
      // Boom. $0.00 cost, instant response.
      return res.status(200).json(cachedPlan);
    }

    // 3. CACHE MISS: Prepare for AI Generation
    const existingVideos = await Video.find({}).select("title -_id").lean();
    const existingTitles = existingVideos
      .map((v) => (v as any).title)
      .join(", ");

    const energyConstraints: Record<number, string> = {
      1: "Zero cooking. Require raw, soaked, instant, or microwave prep only.",
      2: "Very low effort. Boiling water or assembling pre-made items.",
      3: "Basic cooking. 1 pot/pan, under 20 minutes.",
      4: "Moderate cooking. Standard frying, boiling, and chopping allowed.",
      5: "Full cooking. Time and effort are not constraints.",
    };

    // 4. The Master System Prompt
    const systemPrompt = `
      You are a realistic budget meal planner for a student in ${country}.
      Output strictly valid JSON. No markdown, no conversational text.

      PARAMETERS:
      - Mission: ${mission}
      - Budget: ${budget} ${currency}
      - Duration: ${days} days
      - Pantry: ${sortedPantry.length > 0 ? sortedPantry.join(", ") : "None"}
      - Effort: ${energyConstraints[energyLevel]}

      RULES:
      1. ONLY suggest locally available, cheap staples in ${country}.
      2. Keep grocery list within the ${budget} ${currency} limit.
      3. BIAS TOWARD THESE RECIPES if they fit the budget: [${existingTitles}].

      EXPECTED JSON SCHEMA:
      {
        "totalBudgetUsed": Number,
        "currency": "${currency}",
        "groceryList": [{ "name": "String", "estimatedCost": Number }],
        "meals": [{
          "day": Number,
          "mealTitle": "String",
          "totalEstimatedCost": Number,
          "instructions": ["Step 1", "Step 2"]
        }]
      }
    `;

    // 5. Call your AI Config (Implementation depends on your AI provider in /config)
    /*
      const response = await aiClient.generate({ prompt: systemPrompt });
      const generatedData = JSON.parse(response.text);
    */
    // 5. Call your AI Config (Temporary Mock Data for Deployment Testing)
    const generatedData = {
      totalBudgetUsed: budget * 0.95,
      currency: currency,
      groceryList: [
        { name: "Bulk Carb (Rice/Pasta)", estimatedCost: budget * 0.4 },
        { name: "Protein (Eggs/Beans)", estimatedCost: budget * 0.3 },
        { name: "Vegetables & Oil", estimatedCost: budget * 0.25 },
      ],
      meals: Array.from({ length: days }).map((_, i) => ({
        day: i + 1,
        mealTitle: "Test Survival Meal",
        totalEstimatedCost: Math.floor((budget * 0.95) / days),
        instructions: ["Prep ingredients", "Cook meal", "Serve hot"],
      })),
    };

    // 6. SAVE TO GLOBAL POOL (Step 3)
    const savedPlan = await SurvivalPlan.create({
      mission,
      country,
      budget,
      days,
      energyLevel,
      pantry: sortedPantry,
      ...generatedData, // Spreads the AI JSON (groceryList, meals, etc.)
    });

    return res.status(200).json(savedPlan);
  } catch (error) {
    console.error("Survival Engine Error:", error);
    return res.status(500).json({ error: "Failed to generate survival plan." });
  }
});

export default router;
