// src/config/seedRecipes.ts
import mongoose from "mongoose";
import { Recipe } from "../models/Recipe";
import dotenv from "dotenv";

dotenv.config();

const recipesToSeed = [
  // --- ASIA ---
  {
    title: "Kimchi Fried Rice (Kimchi Bokkeumbap)",
    description:
      "A popular, comforting Korean classic. Spicy, smoky, and topped with a runny fried egg.",
    author: "SatioFlix Chef",
    countryOfOrigin: "South Korea",
    prepTime: 10,
    cookTime: 10,
    servingsDefault: 2,
    coverImage:
      "https://images.unsplash.com/photo-1598214813590-c4e3650ce89d?q=80&w=600",
    ingredients: [
      { name: "Cold leftover white rice", quantity: 400, unit: "g" },
      { name: "Ripened Kimchi, chopped", quantity: 150, unit: "g" },
      { name: "Gochujang (Korean chili paste)", quantity: 1, unit: "tbsp" },
      { name: "Toasted sesame oil", quantity: 1, unit: "tbsp" },
      { name: "Garlic cloves, minced", quantity: 2, unit: "pcs" },
      { name: "Eggs (for frying)", quantity: 2, unit: "pcs" },
    ],
    instructions: [
      {
        stepNumber: 1,
        text: "Heat vegetable oil in a pan and sauté the minced garlic and chopped kimchi for 3-4 minutes until soft.",
      },
      {
        stepNumber: 2,
        text: "Reduce heat to low, stir in the Gochujang and a splash of kimchi juice from the jar.",
      },
      {
        stepNumber: 3,
        text: "Break up the cold rice and add it to the pan. Turn up the heat and toss vigorously until completely coated.",
      },
      {
        stepNumber: 4,
        text: "Drizzle with sesame oil, fry two separate runny eggs on the side, and serve the eggs directly on top of the rice.",
      },
    ],
    tags: ["spicy", "quick", "vegetarian"],
  },
  {
    title: "Classic Pork Ramen",
    description:
      "Rich, deeply savory Japanese noodle soup with tender pork and a soft-boiled soy egg.",
    author: "SatioFlix Chef",
    countryOfOrigin: "Japan",
    prepTime: 20,
    cookTime: 120,
    servingsDefault: 2,
    coverImage:
      "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?q=80&w=600",
    ingredients: [
      { name: "Ramen noodles", quantity: 200, unit: "g" },
      { name: "Pork belly slice", quantity: 300, unit: "g" },
      { name: "Ramen eggs (Ajitsuke Tamago)", quantity: 2, unit: "pcs" },
      { name: "Rich dashi or chicken stock", quantity: 800, unit: "ml" },
      { name: "Soy sauce", quantity: 3, unit: "tbsp" },
      { name: "Mirin", quantity: 2, unit: "tbsp" },
    ],
    instructions: [
      {
        stepNumber: 1,
        text: "Simmer pork belly in stock with soy sauce and mirin on low heat for 1.5 hours until incredibly tender.",
      },
      {
        stepNumber: 2,
        text: "Boil ramen noodles for 2-3 minutes, then drain immediately.",
      },
      {
        stepNumber: 3,
        text: "Assemble by placing noodles in a large bowl, pouring hot broth over them, and slicing pork and egg on top.",
      },
    ],
    tags: ["savory", "comfort-food"],
  },
  {
    title: "Pad Thai",
    description:
      "The ultimate Thai street food—sweet, sour, savory stir-fried rice noodles.",
    author: "SatioFlix Chef",
    countryOfOrigin: "Thailand",
    prepTime: 15,
    cookTime: 10,
    servingsDefault: 2,
    coverImage:
      "https://images.unsplash.com/photo-1626804475315-9644b37a2fe4?q=80&w=600",
    ingredients: [
      { name: "Flat rice noodles", quantity: 150, unit: "g" },
      { name: "Tamarind paste", quantity: 3, unit: "tbsp" },
      { name: "Palm sugar", quantity: 3, unit: "tbsp" },
      { name: "Shrimp or chicken", quantity: 150, unit: "g" },
      { name: "Crushed peanuts", quantity: 30, unit: "g" },
      { name: "Bean sprouts", quantity: 50, unit: "g" },
    ],
    instructions: [
      {
        stepNumber: 1,
        text: "Soak rice noodles in warm water for 30 minutes until pliable but firm.",
      },
      {
        stepNumber: 2,
        text: "Make sauce by heating tamarind paste, palm sugar, and fish sauce together until dissolved.",
      },
      {
        stepNumber: 3,
        text: "Stir-fry protein in a wok, push to the side, scramble an egg, then toss in noodles and sauce until cooked through.",
      },
    ],
    tags: ["sweet", "sour", "classic"],
  },
  {
    title: "Butter Chicken (Murgh Makhani)",
    description:
      "Creamy, spiced tandoori chicken cooked in an aromatic, rich tomato butter gravy.",
    author: "SatioFlix Chef",
    countryOfOrigin: "India",
    prepTime: 30,
    cookTime: 25,
    servingsDefault: 4,
    coverImage:
      "https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?q=80&w=600",
    ingredients: [
      { name: "Chicken thighs, cubed", quantity: 600, unit: "g" },
      { name: "Garam Masala", quantity: 2, unit: "tsp" },
      { name: "Unsalted butter", quantity: 50, unit: "g" },
      { name: "Heavy whipping cream", quantity: 150, unit: "ml" },
      { name: "Canned tomato puree", quantity: 400, unit: "g" },
      { name: "Garlic ginger paste", quantity: 2, unit: "tbsp" },
    ],
    instructions: [
      {
        stepNumber: 1,
        text: "Marinate chicken in yogurt, lemon juice, and tandoori spices for at least 30 minutes, then sear in a hot pan.",
      },
      {
        stepNumber: 2,
        text: "Melt butter in a pan, sauté ginger-garlic paste, add spices, tomato puree, and cook down.",
      },
      {
        stepNumber: 3,
        text: "Stir in the seared chicken, pour in heavy cream, and simmer on low for 10 minutes until velvety.",
      },
    ],
    tags: ["creamy", "spiced", "curry"],
  },
  {
    title: "Kung Pao Chicken",
    description:
      "A classic Sichuan stir-fry featuring tender chicken, crunchy peanuts, and fiery dried chilies.",
    author: "SatioFlix Chef",
    countryOfOrigin: "China",
    prepTime: 15,
    cookTime: 10,
    servingsDefault: 3,
    coverImage:
      "https://images.unsplash.com/photo-1525755662778-989d0524087e?q=80&w=600",
    ingredients: [
      { name: "Chicken breast, cubed", quantity: 400, unit: "g" },
      { name: "Dried red chilies", quantity: 10, unit: "pcs" },
      { name: "Roasted peanuts", quantity: 50, unit: "g" },
      { name: "Sichuan peppercorns", quantity: 1, unit: "tsp" },
      { name: "Dark soy sauce", quantity: 2, unit: "tbsp" },
    ],
    instructions: [
      {
        stepNumber: 1,
        text: "Marinate chicken in soy sauce and cornstarch for 10 minutes.",
      },
      {
        stepNumber: 2,
        text: "Heat wok, stir-fry peppercorns and dried chilies in oil until fragrant.",
      },
      {
        stepNumber: 3,
        text: "Add chicken and cook, then toss in soy sauce, sugar, and peanuts until sauce thickens.",
      },
    ],
    tags: ["spicy", "wok", "quick"],
  },

  // --- AFRICA ---
  {
    title: "Moroccan Lamb Tagine",
    description:
      "Slow-cooked savory stew infused with aromatic spices, sweet dried apricots, and honey.",
    author: "SatioFlix Chef",
    countryOfOrigin: "Morocco",
    prepTime: 20,
    cookTime: 90,
    servingsDefault: 4,
    coverImage:
      "https://images.unsplash.com/photo-1541518763669-27fef04b14ea?q=80&w=600",
    ingredients: [
      { name: "Lamb shoulder, cubed", quantity: 800, unit: "g" },
      { name: "Dried apricots", quantity: 100, unit: "g" },
      { name: "Ras el Hanout spice", quantity: 2, unit: "tbsp" },
      { name: "Cinnamon stick", quantity: 1, unit: "pc" },
      { name: "Toasted sliced almonds", quantity: 30, unit: "g" },
    ],
    instructions: [
      {
        stepNumber: 1,
        text: "Coat lamb in Ras el Hanout and sear in tagine or heavy pot until browned.",
      },
      {
        stepNumber: 2,
        text: "Add chopped onions, garlic, cinnamon stick, broth, and simmer covered for 1 hour.",
      },
      {
        stepNumber: 3,
        text: "Stir in dried apricots and almonds, cooking for another 30 minutes until meat melts.",
      },
    ],
    tags: ["slow-cooked", "sweet-savory", "exotic"],
  },
  {
    title: "Senegalese Chicken Yassa",
    description:
      "A tangy, comforting dish of caramelized onions, lemon juice, and marinated mustard chicken.",
    author: "SatioFlix Chef",
    countryOfOrigin: "Senegal",
    prepTime: 30,
    cookTime: 40,
    servingsDefault: 4,
    coverImage:
      "https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?q=80&w=600",
    ingredients: [
      { name: "Chicken drumsticks", quantity: 4, unit: "pcs" },
      { name: "Large onions, sliced", quantity: 4, unit: "pcs" },
      { name: "Dijon mustard", quantity: 3, unit: "tbsp" },
      { name: "Lemon juice", quantity: 100, unit: "ml" },
      { name: "Habanero pepper", quantity: 1, unit: "pc" },
    ],
    instructions: [
      {
        stepNumber: 1,
        text: "Marinate chicken in mustard, lemon juice, chopped garlic, and sliced onions for 2 hours.",
      },
      {
        stepNumber: 2,
        text: "Remove chicken from marinade and sear until golden brown on all sides, then set aside.",
      },
      {
        stepNumber: 3,
        text: "Slowly caramelize the marinated onions in the same pot, return chicken, cover, and simmer for 30 minutes.",
      },
    ],
    tags: ["tangy", "citrusy", "onion-heavy"],
  },
  {
    title: "South African Bobotie",
    description:
      "Spiced minced meat baked with a sweet egg-based custard topping. Incredible sweet and savory flavor.",
    author: "SatioFlix Chef",
    countryOfOrigin: "South Africa",
    prepTime: 15,
    cookTime: 40,
    servingsDefault: 6,
    coverImage:
      "https://images.unsplash.com/photo-1544025162-d76694265947?q=80&w=600",
    ingredients: [
      { name: "Minced beef or lamb", quantity: 500, unit: "g" },
      { name: "Curry powder", quantity: 2, unit: "tbsp" },
      { name: "Mango chutney", quantity: 2, unit: "tbsp" },
      { name: "Eggs", quantity: 2, unit: "pcs" },
      { name: "Milk", quantity: 150, unit: "ml" },
    ],
    instructions: [
      {
        stepNumber: 1,
        text: "Sauté minced meat with curry powder, jam, and chutney until cooked through.",
      },
      {
        stepNumber: 2,
        text: "Press meat flat into a baking dish. Whisk milk and eggs, and pour directly over the meat layer.",
      },
      {
        stepNumber: 3,
        text: "Bake at 180°C for 35 minutes until the egg topping is set and beautifully golden.",
      },
    ],
    tags: ["savory-sweet", "baked", "spiced"],
  },
  {
    title: "Ethiopian Doro Wat",
    description:
      "The ultimate celebratory chicken stew simmered slowly with fiery Berbere spices and hard-boiled eggs.",
    author: "SatioFlix Chef",
    countryOfOrigin: "Ethiopia",
    prepTime: 25,
    cookTime: 60,
    servingsDefault: 4,
    coverImage:
      "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?q=80&w=600",
    ingredients: [
      { name: "Chicken legs, skinless", quantity: 4, unit: "pcs" },
      { name: "Berbere spice blend", quantity: 3, unit: "tbsp" },
      { name: "Red onions, pureed", quantity: 3, unit: "pcs" },
      { name: "Niter Kibbeh (spiced butter)", quantity: 50, unit: "g" },
      { name: "Hard-boiled eggs", quantity: 4, unit: "pcs" },
    ],
    instructions: [
      {
        stepNumber: 1,
        text: "Slowly simmer pureed onions without oil in a dry pot for 15 minutes to reduce water.",
      },
      {
        stepNumber: 2,
        text: "Add spiced butter, Berbere blend, garlic, and sauté until fragrant.",
      },
      {
        stepNumber: 3,
        text: "Add chicken, cover, simmer for 35 minutes, adding eggs in the last 10 minutes.",
      },
    ],
    tags: ["spicy", "celebration", "slow-cooked"],
  },
  {
    title: "Efo Riro (Nigerian Spinach Stew)",
    description:
      "A highly popular Nigerian rich spinach stew cooked with tatase, locust beans, and mixed proteins.",
    author: "SatioFlix Chef",
    countryOfOrigin: "Nigeria",
    prepTime: 15,
    cookTime: 25,
    servingsDefault: 4,
    coverImage:
      "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?q=80&w=600",
    ingredients: [
      { name: "Fresh spinach (shoko or tatar)", quantity: 500, unit: "g" },
      { name: "Palm oil", quantity: 80, unit: "ml" },
      { name: "Blended bell pepper and onion", quantity: 200, unit: "ml" },
      { name: "Iru (Locust beans)", quantity: 2, unit: "tbsp" },
      { name: "Assorted meats (shaki, beef)", quantity: 300, unit: "g" },
    ],
    instructions: [
      {
        stepNumber: 1,
        text: "Blanch spinach in hot water for 1 minute, squeeze out excess water completely, and chop.",
      },
      {
        stepNumber: 2,
        text: "Heat palm oil, fry chopped onion and locust beans (iru) until sizzling.",
      },
      {
        stepNumber: 3,
        text: "Add pepper blend, cook down, add meat, and finally stir in the spinach, cooking on low for 5 minutes.",
      },
    ],
    tags: ["spicy", "spinach", "traditional"],
  },

  // --- EUROPE ---
  {
    title: "Classic Spaghetti Carbonara",
    description:
      "An authentic Roman pasta dish made with crispy guanciale, creamy egg yolks, and sharp Pecorino.",
    author: "SatioFlix Chef",
    countryOfOrigin: "Italy",
    prepTime: 5,
    cookTime: 15,
    servingsDefault: 2,
    coverImage:
      "https://images.unsplash.com/photo-1612874742237-6526221588e3?q=80&w=600",
    ingredients: [
      { name: "Spaghetti", quantity: 200, unit: "g" },
      { name: "Guanciale or Pancetta", quantity: 100, unit: "g" },
      { name: "Egg yolks", quantity: 3, unit: "pcs" },
      { name: "Pecorino Romano cheese", quantity: 50, unit: "g" },
      { name: "Black pepper", quantity: 1, unit: "tbsp" },
    ],
    instructions: [
      {
        stepNumber: 1,
        text: "Cook spaghetti in salted water. Simultaneously fry diced guanciale until crispy.",
      },
      {
        stepNumber: 2,
        text: "Whisk egg yolks with grated Pecorino Romano and cracked black pepper to form a paste.",
      },
      {
        stepNumber: 3,
        text: "Toss cooked pasta with crispy meat OFF the heat, pour egg paste, add pasta water, and toss until creamy.",
      },
    ],
    tags: ["creamy", "quick", "authentic"],
  },
  {
    title: "French Onion Soup",
    description:
      "Slow-caramelized onions in a rich beef broth, topped with toasted bread and bubbly Gruyère cheese.",
    author: "SatioFlix Chef",
    countryOfOrigin: "France",
    prepTime: 15,
    cookTime: 50,
    servingsDefault: 4,
    coverImage:
      "https://images.unsplash.com/photo-1620418029653-f725a3375811?q=80&w=600",
    ingredients: [
      { name: "Yellow onions, thin-sliced", quantity: 4, unit: "pcs" },
      { name: "Beef stock", quantity: 1000, unit: "ml" },
      { name: "French baguette", quantity: 1, unit: "pc" },
      { name: "Gruyère cheese", quantity: 100, unit: "g" },
      { name: "Butter", quantity: 30, unit: "g" },
    ],
    instructions: [
      {
        stepNumber: 1,
        text: "Slowly cook onions in butter for 40 minutes on low heat until dark brown and caramelized.",
      },
      {
        stepNumber: 2,
        text: "Add beef stock, simmer for 15 minutes to concentrate flavors.",
      },
      {
        stepNumber: 3,
        text: "Ladle into crocks, top with baguette slice and gruyère, and broil until golden and bubbly.",
      },
    ],
    tags: ["savory", "comfort-food", "cheesy"],
  },
  {
    title: "Spanish Seafood Paella",
    description:
      "Saffron-infused rice cooked in a broad flat pan with squid, shrimp, mussels, and fire-roasted peppers.",
    author: "SatioFlix Chef",
    countryOfOrigin: "Spain",
    prepTime: 20,
    cookTime: 30,
    servingsDefault: 4,
    coverImage:
      "https://images.unsplash.com/photo-1534080391025-a77d0189a9e7?q=80&w=600",
    ingredients: [
      { name: "Bomba rice", quantity: 300, unit: "g" },
      { name: "Shrimp & Mussels", quantity: 300, unit: "g" },
      { name: "Saffron threads", quantity: 1, unit: "pinch" },
      { name: "Seafood stock", quantity: 700, unit: "ml" },
      { name: "Smoked paprika", quantity: 1, unit: "tsp" },
    ],
    instructions: [
      {
        stepNumber: 1,
        text: "Sauté onions, tomatoes, and garlic. Add paprika, rice, and saffron-infused hot stock.",
      },
      {
        stepNumber: 2,
        text: "Simmer without stirring to create the 'socarrat' (crispy toasted rice layer at the bottom).",
      },
      {
        stepNumber: 3,
        text: "Press seafood gently into the top of the rice and steam until shells open.",
      },
    ],
    tags: ["seafood", "celebration", "saffron"],
  },
  {
    title: "Greek Moussaka",
    description:
      "Baked casserole layers of spiced beef, roasted eggplant, potato, topped with thick bechamel sauce.",
    author: "SatioFlix Chef",
    countryOfOrigin: "Greece",
    prepTime: 30,
    cookTime: 50,
    servingsDefault: 6,
    coverImage:
      "https://images.unsplash.com/photo-1544025162-d76694265947?q=80&w=600",
    ingredients: [
      { name: "Large eggplants", quantity: 2, unit: "pcs" },
      { name: "Minced beef", quantity: 500, unit: "g" },
      { name: "Bechamel sauce", quantity: 400, unit: "ml" },
      { name: "Canned crushed tomatoes", quantity: 400, unit: "g" },
      { name: "Ground cinnamon", quantity: 1, unit: "tsp" },
    ],
    instructions: [
      {
        stepNumber: 1,
        text: "Slice eggplant, brush with olive oil, and bake at 200°C for 20 minutes until tender.",
      },
      {
        stepNumber: 2,
        text: "Brown minced beef with onion, tomatoes, cinnamon, and red wine; let cool slightly.",
      },
      {
        stepNumber: 3,
        text: "Layer potatoes, eggplants, meat sauce, pour Bechamel over the top, and bake for 45 minutes.",
      },
    ],
    tags: ["baked", "casserole", "comfort-food"],
  },
  {
    title: "Classic Beef Stroganoff",
    description:
      "Tender strips of beef sautéed with mushrooms in a savory, sour-cream infused demi-glace sauce.",
    author: "SatioFlix Chef",
    countryOfOrigin: "Russia",
    prepTime: 10,
    cookTime: 15,
    servingsDefault: 3,
    coverImage:
      "https://images.unsplash.com/photo-1544025162-d76694265947?q=80&w=600",
    ingredients: [
      { name: "Beef sirloin, sliced", quantity: 500, unit: "g" },
      { name: "Cremini mushrooms", quantity: 200, unit: "g" },
      { name: "Sour cream (Smetana)", quantity: 150, unit: "g" },
      { name: "Beef broth", quantity: 150, unit: "ml" },
      { name: "Egg noodles", quantity: 250, unit: "g" },
    ],
    instructions: [
      {
        stepNumber: 1,
        text: "Sear beef strips at high heat for 1 minute per side, then transfer immediately to a warm plate.",
      },
      {
        stepNumber: 2,
        text: "Sauté mushrooms and onions, pour beef stock and cook down. Whisk in sour cream on low heat.",
      },
      {
        stepNumber: 3,
        text: "Toss beef back into the sauce for 30 seconds and serve over cooked warm egg noodles.",
      },
    ],
    tags: ["creamy", "savory", "quick"],
  },

  // --- AMERICAS ---
  {
    title: "Authentic Mexican Tacos al Pastor",
    description:
      "Spit-roasted pork marinated in dried chilies and spices, served on warm corn tortillas with pineapple.",
    author: "SatioFlix Chef",
    countryOfOrigin: "Mexico",
    prepTime: 30,
    cookTime: 15,
    servingsDefault: 4,
    coverImage:
      "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?q=80&w=600",
    ingredients: [
      { name: "Pork shoulder, thin-sliced", quantity: 800, unit: "g" },
      { name: "Achiote paste", quantity: 3, unit: "tbsp" },
      { name: "Guajillo chilies", quantity: 3, unit: "pcs" },
      { name: "Fresh pineapple slices", quantity: 1, unit: "cup" },
      { name: "Corn tortillas", quantity: 12, unit: "pcs" },
    ],
    instructions: [
      {
        stepNumber: 1,
        text: "Rehydrate chilies and blend with achiote, vinegar, and garlic. Marinate pork for 4 hours.",
      },
      {
        stepNumber: 2,
        text: "Pan-fry marinated pork strips with small pieces of fresh pineapple until caramelized.",
      },
      {
        stepNumber: 3,
        text: "Serve sizzling on warmed corn tortillas, garnished with finely chopped onion and cilantro.",
      },
    ],
    tags: ["sweet-spicy", "street-food", "authentic"],
  },
  {
    title: "Classic Texas Smoked Chili",
    description:
      "A rich, slow-simmered bowl of comfort made with chuck roast, chili powder, and absolutely no beans.",
    author: "SatioFlix Chef",
    countryOfOrigin: "United States",
    prepTime: 20,
    cookTime: 180,
    servingsDefault: 6,
    coverImage:
      "https://images.unsplash.com/photo-1541832676-9b763b0239ab?q=80&w=600",
    ingredients: [
      { name: "Beef chuck roast, cubed", quantity: 1000, unit: "g" },
      { name: "Chili powder blend", quantity: 4, unit: "tbsp" },
      { name: "Dark beer", quantity: 355, unit: "ml" },
      { name: "Beef stock", quantity: 500, unit: "ml" },
      { name: "Tomato paste", quantity: 2, unit: "tbsp" },
    ],
    instructions: [
      {
        stepNumber: 1,
        text: "Brown beef cubes in a large pot with oil, then set aside.",
      },
      {
        stepNumber: 2,
        text: "Sauté onions and garlic, add tomato paste and spices to bloom in the residual fat.",
      },
      {
        stepNumber: 3,
        text: "Deglaze with beer, pour in beef stock, return beef, and simmer on low for 3 hours.",
      },
    ],
    tags: ["smoky", "comfort-food", "beefy"],
  },
  {
    title: "Feijoada (Brazilian Black Bean Stew)",
    description:
      "The national dish of Brazil—a rich, hearty stew of black beans, bacon, and mixed pork meats.",
    author: "SatioFlix Chef",
    countryOfOrigin: "Brazil",
    prepTime: 30,
    cookTime: 120,
    servingsDefault: 6,
    coverImage:
      "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?q=80&w=600",
    ingredients: [
      { name: "Dry black beans", quantity: 500, unit: "g" },
      { name: "Chorizo sausage", quantity: 200, unit: "g" },
      { name: "Pork ribs, chopped", quantity: 300, unit: "g" },
      { name: "Bacon, thick-cut", quantity: 150, unit: "g" },
      { name: "Bay leaves", quantity: 3, unit: "pcs" },
    ],
    instructions: [
      {
        stepNumber: 1,
        text: "Soak black beans overnight. Boil them in fresh water until softening slightly.",
      },
      {
        stepNumber: 2,
        text: "In a separate pan, brown bacon, ribs, and chorizo, then transfer to the bean pot.",
      },
      {
        stepNumber: 3,
        text: "Add garlic and bay leaves, cover, simmer for 2 hours until the broth is thick and dark.",
      },
    ],
    tags: ["porky", "slow-cooked", "traditional"],
  },
  {
    title: "Jamaican Jerk Chicken",
    description:
      "Fiery, aromatic chicken marinated in Scotch Bonnet peppers, allspice, thyme, and wood-smoked.",
    author: "SatioFlix Chef",
    countryOfOrigin: "Jamaica",
    prepTime: 20,
    cookTime: 45,
    servingsDefault: 4,
    coverImage:
      "https://images.unsplash.com/photo-1606787366850-de6330128bfc?q=80&w=600",
    ingredients: [
      { name: "Chicken thighs, bone-in", quantity: 1000, unit: "g" },
      { name: "Scotch bonnet peppers", quantity: 3, unit: "pcs" },
      { name: "Ground allspice", quantity: 2, unit: "tbsp" },
      { name: "Fresh thyme", quantity: 1, unit: "bunch" },
      { name: "Brown sugar", quantity: 2, unit: "tbsp" },
    ],
    instructions: [
      {
        stepNumber: 1,
        text: "Blend peppers, scallions, thyme, garlic, ginger, sugar, soy sauce, and allspice to a thick paste.",
      },
      {
        stepNumber: 2,
        text: "Rub marinade thoroughly over the chicken and let sit in the fridge overnight.",
      },
      {
        stepNumber: 3,
        text: "Grill chicken on medium heat, turning often, until skin is deeply charred and meat is cooked.",
      },
    ],
    tags: ["spicy", "smoky", "grill"],
  },
  {
    title: "Peruvian Lomo Saltado",
    description:
      "A fast-paced stir-fry combining marinated beef strips, red onions, tomatoes, and crispy French fries.",
    author: "SatioFlix Chef",
    countryOfOrigin: "Peru",
    prepTime: 15,
    cookTime: 10,
    servingsDefault: 2,
    coverImage:
      "https://images.unsplash.com/photo-1544025162-d76694265947?q=80&w=600",
    ingredients: [
      { name: "Beef tenderloin, sliced", quantity: 400, unit: "g" },
      { name: "Red onion, wedged", quantity: 1, unit: "pc" },
      { name: "Roma tomatoes, wedged", quantity: 2, unit: "pcs" },
      { name: "Crispy french fries", quantity: 200, unit: "g" },
      { name: "Soy sauce", quantity: 2, unit: "tbsp" },
    ],
    instructions: [
      {
        stepNumber: 1,
        text: "Sear beef in a blazing hot wok for 2 minutes to seal in juices, then remove.",
      },
      {
        stepNumber: 2,
        text: "Stir-fry onions and tomatoes, toss beef back in with soy sauce and a splash of vinegar.",
      },
      {
        stepNumber: 3,
        text: "Toss french fries directly into the wok right before serving to absorb the juicy glaze.",
      },
    ],
    tags: ["quick", "stir-fry", "savory"],
  },

  // --- MIDDLE EAST & MEDITERRANEAN ---
  {
    title: "Classic Shakshuka",
    description:
      "Eggs poached gently in a spiced, simmering bell pepper and tomato sauce. Perfect with warm bread.",
    author: "SatioFlix Chef",
    countryOfOrigin: "Middle East",
    prepTime: 10,
    cookTime: 15,
    servingsDefault: 3,
    coverImage:
      "https://images.unsplash.com/photo-1590412200988-a436bb705300?q=80&w=600",
    ingredients: [
      { name: "Eggs", quantity: 5, unit: "pcs" },
      { name: "Canned crushed tomatoes", quantity: 400, unit: "g" },
      { name: "Red bell pepper", quantity: 1, unit: "pc" },
      { name: "Ground cumin", quantity: 1, unit: "tsp" },
      { name: "Feta cheese, crumbled", quantity: 50, unit: "g" },
    ],
    instructions: [
      {
        stepNumber: 1,
        text: "Sauté chopped onion and bell pepper in olive oil until soft. Add cumin and paprika.",
      },
      {
        stepNumber: 2,
        text: "Pour in crushed tomatoes and simmer for 10 minutes until thick.",
      },
      {
        stepNumber: 3,
        text: "Make small wells in the sauce, crack eggs directly into them, cover, and cook for 5 minutes.",
      },
    ],
    tags: ["vegetarian", "breakfast", "spiced"],
  },
  {
    title: "Authentic Falafel",
    description:
      "Crispy, herb-packed deep-fried chickpea balls, crunchy on the outside and green and fluffy inside.",
    author: "SatioFlix Chef",
    countryOfOrigin: "Middle East",
    prepTime: 20,
    cookTime: 10,
    servingsDefault: 4,
    coverImage:
      "https://images.unsplash.com/photo-1547058886-af77992d478c?q=80&w=600",
    ingredients: [
      { name: "Dried chickpeas (soaked)", quantity: 250, unit: "g" },
      { name: "Fresh parsley", quantity: 1, unit: "cup" },
      { name: "Fresh cilantro", quantity: 1, unit: "cup" },
      { name: "Garlic cloves", quantity: 3, unit: "pcs" },
      { name: "Cumin powder", quantity: 1, unit: "tbsp" },
    ],
    instructions: [
      {
        stepNumber: 1,
        text: "Blend soaked chickpeas (do not use canned!) with herbs, garlic, and spices until textured like sand.",
      },
      {
        stepNumber: 2,
        text: "Refrigerate mixture for 30 minutes, then form into small balls.",
      },
      {
        stepNumber: 3,
        text: "Deep fry in hot oil until deeply golden brown and crunchy.",
      },
    ],
    tags: ["vegan", "fried", "herby"],
  },
  {
    title: "Chicken Shawarma",
    description:
      "Perfectly seasoned chicken marinated in garlic, cumin, cardamom, roasted, and served wrapped with garlic sauce.",
    author: "SatioFlix Chef",
    countryOfOrigin: "Middle East",
    prepTime: 25,
    cookTime: 20,
    servingsDefault: 4,
    coverImage:
      "https://images.unsplash.com/photo-1642145853243-82860d2b3f28?q=80&w=600",
    ingredients: [
      { name: "Chicken breasts, sliced", quantity: 800, unit: "g" },
      { name: "Lemon juice", quantity: 50, unit: "ml" },
      { name: "Toum (garlic sauce)", quantity: 4, unit: "tbsp" },
      { name: "Pita bread wraps", quantity: 4, unit: "pcs" },
      { name: "Cumin & Coriander", quantity: 1, unit: "tbsp" },
    ],
    instructions: [
      {
        stepNumber: 1,
        text: "Marinate chicken in lemon juice, olive oil, and shawarma spices for 2 hours.",
      },
      {
        stepNumber: 2,
        text: "Roast chicken on high heat in an oven or cast-iron skillet until crisp on edges.",
      },
      {
        stepNumber: 3,
        text: "Assemble by spreading toum on pita, adding chicken, pickles, and rolling tightly.",
      },
    ],
    tags: ["spiced", "chicken", "wrap"],
  },
  {
    title: "Baba Ganoush",
    description:
      "Creamy, smoky eggplant dip blended with tahini, olive oil, lemon juice, and fresh garlic.",
    author: "SatioFlix Chef",
    countryOfOrigin: "Middle East",
    prepTime: 15,
    cookTime: 25,
    servingsDefault: 4,
    coverImage:
      "https://images.unsplash.com/photo-1541518763669-27fef04b14ea?q=80&w=600",
    ingredients: [
      { name: "Large eggplants", quantity: 2, unit: "pcs" },
      { name: "Tahini paste", quantity: 3, unit: "tbsp" },
      { name: "Garlic cloves, minced", quantity: 2, unit: "pcs" },
      { name: "Lemon juice", quantity: 2, unit: "tbsp" },
      { name: "Extra virgin olive oil", quantity: 2, unit: "tbsp" },
    ],
    instructions: [
      {
        stepNumber: 1,
        text: "Char eggplants directly over a gas flame or broil until skin is completely blackened.",
      },
      {
        stepNumber: 2,
        text: "Scoop out flesh, drain excess liquid, and mash with garlic, lemon, and tahini.",
      },
      {
        stepNumber: 3,
        text: "Serve cold, drizzled generously with olive oil and a pinch of paprika.",
      },
    ],
    tags: ["vegan", "creamy", "dip"],
  },
  {
    title: "Tabbouleh Salad",
    description:
      "A super-fresh herb salad made of finely chopped parsley, mint, tomatoes, and bulgur wheat.",
    author: "SatioFlix Chef",
    countryOfOrigin: "Middle East",
    prepTime: 20,
    cookTime: 0,
    servingsDefault: 4,
    coverImage:
      "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?q=80&w=600",
    ingredients: [
      { name: "Fresh flat-leaf parsley", quantity: 2, unit: "bunches" },
      { name: "Fine Bulgur wheat", quantity: 40, unit: "g" },
      { name: "Roma tomatoes, diced", quantity: 3, unit: "pcs" },
      { name: "Fresh mint leaves", quantity: 30, unit: "g" },
      { name: "Extra virgin olive oil", quantity: 3, unit: "tbsp" },
    ],
    instructions: [
      {
        stepNumber: 1,
        text: "Soak bulgur in hot water for 15 minutes to soften, then drain completely.",
      },
      {
        stepNumber: 2,
        text: "Extremely finely chop the parsley and mint (drying them completely first is critical!).",
      },
      {
        stepNumber: 3,
        text: "Toss herbs, tomatoes, bulgur together with fresh lemon juice and olive oil.",
      },
    ],
    tags: ["vegan", "fresh", "salad"],
  },

  // --- ADDITIONAL GLOBAL FAVORITES ---
  {
    title: "Classic English Fish and Chips",
    description:
      "Flaky white fish in a light, crispy beer batter, served with thick golden hand-cut chips.",
    author: "SatioFlix Chef",
    countryOfOrigin: "United Kingdom",
    prepTime: 20,
    cookTime: 15,
    servingsDefault: 2,
    coverImage:
      "https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?q=80&w=600",
    ingredients: [
      { name: "Cod or Haddock fillets", quantity: 2, unit: "pcs" },
      { name: "Cold carbonated beer", quantity: 200, unit: "ml" },
      { name: "All-purpose flour", quantity: 150, unit: "g" },
      { name: "Baking powder", quantity: 1, unit: "tsp" },
      { name: "Russet potatoes, sliced", quantity: 4, unit: "pcs" },
    ],
    instructions: [
      {
        stepNumber: 1,
        text: "Par-fry potato wedges at 160°C for 5 minutes, then remove.",
      },
      {
        stepNumber: 2,
        text: "Whisk flour, baking powder, and ice-cold beer. Coat fish in flour, dip in batter, and fry at 190°C until golden.",
      },
      {
        stepNumber: 3,
        text: "Toss potatoes back in for a final crisping and serve together.",
      },
    ],
    tags: ["crispy", "fried", "classic"],
  },
  {
    title: "Vietnamese Pho Ga (Chicken Pho)",
    description:
      "A soothing, clear, aromatic chicken noodle broth infused with star anise, ginger, and cinnamon.",
    author: "SatioFlix Chef",
    countryOfOrigin: "Vietnam",
    prepTime: 20,
    cookTime: 60,
    servingsDefault: 3,
    coverImage:
      "https://images.unsplash.com/photo-1582878826629-29b7ad1cdc43?q=80&w=600",
    ingredients: [
      { name: "Rice stick noodles", quantity: 200, unit: "g" },
      { name: "Chicken bones & breast", quantity: 800, unit: "g" },
      { name: "Star anise & Cinnamon", quantity: 1, unit: "pcs" },
      { name: "Charred ginger & onion", quantity: 1, unit: "pc" },
      { name: "Fresh herbs (cilantro, basil)", quantity: 50, unit: "g" },
    ],
    instructions: [
      {
        stepNumber: 1,
        text: "Simmer chicken bones, charred ginger, onion, star anise, and cinnamon slowly for 1 hour.",
      },
      {
        stepNumber: 2,
        text: "Boil rice noodles, drain, place in a bowl, and top with shredded chicken breast.",
      },
      {
        stepNumber: 3,
        text: "Ladle boiling hot broth directly over the noodles and serve with fresh lime, sprouts, and herbs.",
      },
    ],
    tags: ["fresh", "soothing", "soup"],
  },
  {
    title: "Canadian Poutine",
    description:
      "The ultimate comfort food—thick, hot French fries topped with squeaky cheese curds and rich brown gravy.",
    author: "SatioFlix Chef",
    countryOfOrigin: "Canada",
    prepTime: 10,
    cookTime: 15,
    servingsDefault: 2,
    coverImage:
      "https://images.unsplash.com/photo-1585503411425-4704040a6b29?q=80&w=600",
    ingredients: [
      { name: "Fresh french fries", quantity: 400, unit: "g" },
      { name: "Fresh cheese curds", quantity: 150, unit: "g" },
      { name: "Rich beef gravy", quantity: 200, unit: "ml" },
    ],
    instructions: [
      {
        stepNumber: 1,
        text: "Deep fry potatoes until incredibly crisp and hot.",
      },
      {
        stepNumber: 2,
        text: "Scatter fresh, room-temperature cheese curds directly on top of the fries.",
      },
      {
        stepNumber: 3,
        text: "Pour boiling hot beef gravy over the top to melt the curds slightly, and serve immediately.",
      },
    ],
    tags: ["comfort-food", "cheesy", "quick"],
  },
  {
    title: "Spiced Beef Empanadas",
    description:
      "Golden, flaky pastry pockets stuffed with a flavorful filling of ground beef, onions, cumin, and olives.",
    author: "SatioFlix Chef",
    countryOfOrigin: "Argentina",
    prepTime: 25,
    cookTime: 20,
    servingsDefault: 4,
    coverImage:
      "https://images.unsplash.com/photo-1544025162-d76694265947?q=80&w=600",
    ingredients: [
      { name: "Minced beef", quantity: 400, unit: "g" },
      { name: "Large onion, minced", quantity: 1, unit: "pc" },
      { name: "Empanada dough discs", quantity: 12, unit: "pcs" },
      { name: "Green olives, chopped", quantity: 50, unit: "g" },
      { name: "Smoked paprika & Cumin", quantity: 1, unit: "tbsp" },
    ],
    instructions: [
      {
        stepNumber: 1,
        text: "Sauté beef with onion, spices, and stir in green olives once beef is cooked.",
      },
      {
        stepNumber: 2,
        text: "Place a tablespoon of filling on each dough disc, fold in half, and crimp edges tightly.",
      },
      {
        stepNumber: 3,
        text: "Brush with egg wash and bake at 200°C for 20 minutes until golden and crisp.",
      },
    ],
    tags: ["baked", "pastry", "finger-food"],
  },
  {
    title: "Belgian Waffles",
    description:
      "Light, fluffy waffles with a crisp exterior, cooked with pearl sugar pockets for deep caramelization.",
    author: "SatioFlix Chef",
    countryOfOrigin: "Belgium",
    prepTime: 15,
    cookTime: 10,
    servingsDefault: 4,
    coverImage:
      "https://images.unsplash.com/photo-1562376502-6f769499c886?q=80&w=600",
    ingredients: [
      { name: "All-purpose flour", quantity: 250, unit: "g" },
      { name: "Active dry yeast", quantity: 1, unit: "tsp" },
      { name: "Unsalted butter, melted", quantity: 80, unit: "g" },
      { name: "Pearl sugar", quantity: 100, unit: "g" },
      { name: "Eggs", quantity: 2, unit: "pcs" },
    ],
    instructions: [
      {
        stepNumber: 1,
        text: "Whisk flour, yeast, melted butter, egg yolks, and warm milk. Rest dough for 30 minutes to rise.",
      },
      {
        stepNumber: 2,
        text: "Whip egg whites to soft peaks, fold into dough, and gently fold in the pearl sugar.",
      },
      {
        stepNumber: 3,
        text: "Cook in a hot waffle iron until golden brown. The sugar pearls will caramelize beautifully.",
      },
    ],
    tags: ["sweet", "breakfast", "classic"],
  },
];

export const seedDatabase = async (): Promise<void> => {
  try {
    await mongoose.connect(process.env.MONGODB_URI || "");
    console.log("📡 Seeding Database: Connected to MongoDB.");

    // Check how many we have
    const existingCount = await Recipe.countDocuments();
    console.log(`📊 Found ${existingCount} existing recipes.`);

    if (existingCount < 25) {
      console.log(
        "🌱 Database seems empty or has low counts. Seeding 30 global recipes...",
      );

      // Prevent duplicating exact titles
      for (const recipe of recipesToSeed) {
        await Recipe.updateOne(
          { title: recipe.title },
          { $set: recipe },
          { upsert: true },
        );
      }
      console.log("🎉 Seeding Successful! 30 Premium recipes added.");
    } else {
      console.log(
        "✅ Database already has sufficient recipes. Skipping seeding.",
      );
    }
  } catch (error) {
    console.error("❌ Seeding failed:", error);
  } finally {
    await mongoose.connection.close();
    console.log("🔌 Database Connection Closed.");
  }
};

// Run if directly executed
if (require.main === module) {
  seedDatabase().then(() => process.exit(0));
}
