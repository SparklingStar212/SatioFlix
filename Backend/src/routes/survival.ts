// src/routes/survival.ts
import { Request, Response, Router } from "express";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { Video } from "../models/Video";
import SurvivalPlan from "../models/SurvivalPlan";

const router = Router();
const aiClient = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");

// --- DYNAMIC MODEL CANDIDATES FALLBACK LOOP ---
const MODEL_CANDIDATES = [
  "gemini-3.7-flash", // Latest high-speed flash generation
  "gemini-3.5-flash", // Rock-solid agentic flash model
  "gemini-2.5-pro", // Reliable deep reasoning fallback
];

async function generateMealPlanWithFallback(prompt: string) {
  const generationConfig = { responseMimeType: "application/json" };

  for (const modelName of MODEL_CANDIDATES) {
    try {
      console.log(`🧠 Attempting AI Generation with: ${modelName}...`);
      const model = aiClient.getGenerativeModel({
        model: modelName,
        generationConfig,
      });
      const result = await model.generateContent(prompt);

      const text = result.response.text();
      if (text) {
        console.log(`✅ Success using model: ${modelName}`);
        return JSON.parse(text);
      }
    } catch (error: any) {
      console.warn(
        `⚠️ Model ${modelName} failed or throttled. Trying next candidate...`,
        error.message || error,
      );
    }
  }

  // If the loop finishes without returning, every single model failed
  console.error(
    "❌ All model candidates in the fallback array failed simultaneously.",
  );
  throw new Error(
    "Critical: AI Generation failed across all configured Gemini models.",
  );
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
      2: "Very low effort. Boiling water or assembling pre-main items.",
      3: "Basic cooking. 1 pot/pan, under 20 minutes.",
      4: "Moderate cooking. Standard frying, boiling, and chopping allowed.",
      5: "Full cooking. Time and effort are not constraints.",
    };

    // Upgraded system prompt incorporating real student variety, fresh daily meals, and zero ghost leftovers
    const systemPrompt = `
      You are an expert student budget meal planner for a student in ${country}.
      Output strictly valid JSON. No markdown, no conversational text.

      PARAMETERS:
      - Mission: ${mission}
      - Budget: ${budget} ${currency}
      - Duration: ${days} days
      - Pantry (Available items): ${sortedPantry.length > 0 ? sortedPantry.join(", ") : "None"}
      - Effort Level (1-5): ${energyConstraints[energyLevel]}

      CRITICAL REAL-WORLD STUDENT RULES:
      1. REALISTIC MEAL FREQUENCY: Provide 1 to 2 substantial meals per day (e.g., Lunch and Dinner slots) reflecting real student eating habits without complex breakfast rituals.
      2. ZERO GHOST LEFTOVERS: Students do not store food for weeks. Each meal or cooking session must be freshly prepared for that day's window. Do not reference phantom leftovers from days prior.
      3. STRICT VARIETY (NO REPETITION): The primary goal is variety so the student stops eating the same thing over and over. Rotate actively between different carbs and proteins (e.g., alternate between rice, beans, yam, potatoes, pasta, or swallow variations across consecutive days).
      4. BUDGET INTEGRITY: Keep the grocery list strictly within the ${budget} ${currency} limit.
      5. BIAS TOWARD THESE RECIPES if they fit the budget: [${existingTitles}].

      EXPECTED JSON SCHEMA:
      {
        "totalBudgetUsed": Number,
        "currency": "${currency}",
        "groceryList": [{ "name": "String", "estimatedCost": Number }],
        "meals": [{
          "day": Number,
          "dailyMeals": [
            {
              "slot": "Lunch" | "Dinner",
              "mealTitle": "String",
              "estimatedCost": Number,
              "instructions": ["Step 1", "Step 2"]
            }
          ]
        }]
      }
    `;

    // 3. CALL ARRAY-BASED MULTI-MODEL FALLBACK LOOP
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
