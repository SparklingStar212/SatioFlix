// src/routes/userRoutes.ts
import express, { Request, Response } from "express";
import bcrypt from "bcryptjs";
import { User } from "../models/User";

const router = express.Router();

// 1. Route: POST /api/users/register (User Registration)
router.post("/register", async (req: Request, res: Response): Promise<any> => {
  try {
    const { username, email, password } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ $or: [{ email }, { username }] });
    if (existingUser) {
      return res
        .status(400)
        .json({ error: "Username or Email already registered" });
    }

    // Hash the password securely
    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);

    const newUser = new User({
      username,
      email,
      passwordHash,
    });

    const savedUser = await newUser.save();

    // Return safe user data (exclude password hash)
    res.status(201).json({
      _id: savedUser._id,
      username: savedUser.username,
      email: savedUser.email,
      preferredUnits: savedUser.preferredUnits,
    });
  } catch (error) {
    console.error("❌ Registration error:", error);
    res.status(500).json({ error: "Failed to register user" });
  }
});

// 2. Route: POST /api/users/login (User Login)
router.post("/login", async (req: Request, res: Response): Promise<any> => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ error: "Invalid email or password" });
    }

    const isMatch = await bcrypt.compare(password, user.passwordHash);
    if (!isMatch) {
      return res.status(400).json({ error: "Invalid email or password" });
    }

    res.json({
      _id: user._id,
      username: user.username,
      email: user.email,
      preferredUnits: user.preferredUnits,
    });
  } catch (error) {
    console.error("❌ Login error:", error);
    res.status(500).json({ error: "Failed to log in" });
  }
});

// 3. Route: POST /api/users/:id/save-recipe (Save/Bookmark a Recipe)
router.post(
  "/:id/save-recipe",
  async (req: Request, res: Response): Promise<any> => {
    try {
      const { recipeId } = req.body;
      const user = await User.findById(req.params.id);

      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }

      // Toggle logic: If already saved, remove it. If not, add it.
      const savedIndex = user.savedRecipes.indexOf(recipeId);
      if (savedIndex > -1) {
        user.savedRecipes.splice(savedIndex, 1);
        await user.save();
        return res.json({
          message: "Recipe removed from cookbook",
          savedRecipes: user.savedRecipes,
        });
      } else {
        user.savedRecipes.push(recipeId);
        await user.save();
        return res.json({
          message: "Recipe saved to cookbook",
          savedRecipes: user.savedRecipes,
        });
      }
    } catch (error) {
      console.error("❌ Save recipe error:", error);
      res.status(500).json({ error: "Failed to save recipe" });
    }
  },
);

// 4. Route: GET /api/users/:id/cookbook (Retrieve a User's Populated Cookbook)
router.get(
  "/:id/cookbook",
  async (req: Request, res: Response): Promise<any> => {
    try {
      const user = await User.findById(req.params.id)
        .populate("savedRecipes") // Dynamically fills the recipe IDs with actual recipe objects!
        .populate("savedVideos");

      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }

      res.json({
        savedRecipes: user.savedRecipes,
        savedVideos: user.savedVideos,
      });
    } catch (error) {
      console.error("❌ Fetch cookbook error:", error);
      res.status(500).json({ error: "Failed to fetch cookbook" });
    }
  },
);

export default router;
