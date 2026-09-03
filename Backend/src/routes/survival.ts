// src/routes/survival.ts
import { Request, Response, Router } from "express";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { Video } from "../models/Video";
import SurvivalPlan from "../models/SurvivalPlan";

const router = Router();

const aiClient = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");

async function generateMealPlanWithFallback(prompt: string) {
  const generationConfig = { responseMimeType: "application/json" };

  // Tier 1: Primary fast model
  try {
    console.log("🧠 Tier 1 Attempt: Gemini 1.5 Flash...");
    const model = aiClient.getGenerativeModel({
      model: "gemini-1.5-flash",
      generationConfig,
    });
    const result = await model.generateContent(prompt);
    return JSON.parse(result.response.text());
  } catch (tier1Error) {
    console.warn("⚠️ Tier 1 failed. Cascading to Tier 2...", tier1Error);
  }

  // Tier 2: Backup fast model / higher quota pool
  try {
    console.log("🧠 Tier 2 Attempt: Gemini 1.5 Flash 8B / Secondary...");
    const model = aiClient.getGenerativeModel({
      model: "gemini-1.5-flash-8b",
      generationConfig,
    });
    const result = await model.generateContent(prompt);
    return JSON.parse(result.response.text());
  } catch (tier2Error) {
    console.warn("⚠️ Tier 2 failed. Cascading to Tier 3 (Pro)...", tier2Error);
  }

  // Tier 3: Heavy-duty reasoning fallback
  try {
    console.log("🧠 Tier 3 Attempt: Gemini 1.5 Pro...");
    const model = aiClient.getGenerativeModel({
      model: "gemini-1.5-pro",
      generationConfig,
    });
    const result = await model.generateContent(prompt);
    return JSON.parse(result.response.text());
  } catch (tier3Error) {
    console.error("❌ All AI tiers failed simultaneously.");
    throw new Error(
      "Critical: AI Generation completely failed across all fallback models.",
    );
  }
}

router.post("/generate", async (req: Request, res: Response): Promise<any> => {
  try {
    const { mission, country, currency, budget, days, pantry, energyLevel } =
      req.body;
    const sortedPantry = [...pantry].sort();

    // 1. THE CACHE INTERCEPT
    const cachedPlan = await SurvivalPlan.findOne({
      mission,
      country,
      budget,
      days,
      energyLevel,
      pantry: sortedPantry,
    }).lean();

    if (cachedPlan) {
      console.log("⚡ Serving from MongoDB Cache");
      return res.status(200).json(cachedPlan);
    }

    // 2. CACHE MISS: Prepare for AI Generation
    const existingVideos = await Video.find({}).select("title -_id").lean();
    const existingTitles = existingVideos.map((v: any) => v.title).join(", ");

    const energyConstraints: Record<number, string> = {
      1: "Zero cooking. Require raw, soaked, instant, or microwave prep only.",
      2: "Very low effort. Boiling water or assembling pre-made items.",
      3: "Basic cooking. 1 pot/pan, under 20 minutes.",
      4: "Moderate cooking. Standard frying, boiling, and chopping allowed.",
      5: "Full cooking. Time and effort are not constraints.",
    };

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

    // 3. CALL MULTI-TIER AI ENGINE
    const generatedData = await generateMealPlanWithFallback(systemPrompt);

    // 4. SAVE TO GLOBAL POOL
    const savedPlan = await SurvivalPlan.create({
      mission,
      country,
      budget,
      days,
      energyLevel,
      pantry: sortedPantry,
      ...generatedData,
    });

    return res.status(200).json(savedPlan);
  } catch (error: any) {
    console.error("Survival Engine Error:", error);
    // 🔍 Send the real error back to the frontend for debugging
    return res.status(500).json({
      error: "Failed to generate survival plan.",
      details: error.message || String(error),
    });
  }
});

router.get("/videos", async (req: Request, res: Response): Promise<any> => {
  try {
    const videos = await Video.find({}).lean();
    return res.status(200).json(videos);
  } catch (error) {
    console.error("Failed to fetch videos:", error);
    return res.status(500).json({ error: "Failed to fetch videos" });
  }
});

export default router;
