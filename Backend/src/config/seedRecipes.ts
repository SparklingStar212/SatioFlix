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
      "https://plus.unsplash.com/premium_photo-1700746098646-6dc011a64d82?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
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
      "https://images.unsplash.com/photo-1638866281450-3933540af86a?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
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
      "https://images.unsplash.com/photo-1652957705092-b2f8d357c8a2?q=80&w=435&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
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
      "https://lowcarbafrica.com/wp-content/uploads/2022/09/Poulet-Yassa-Senegalese-Chicken-Recipe-2.webp",
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
      "https://foodieonboard.com/wp-content/uploads/2014/11/dsc_6572.jpg",
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
      "https://plus.unsplash.com/premium_photo-1695297516692-82b537c62733?q=80&w=387&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
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
      "https://images.unsplash.com/photo-1604329760661-e71dc83f8f26?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
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
      "https://www.simplyrecipes.com/thmb/SY2lL2neXpYOvkxhYvoUcl6pXLQ=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/Simply-Recipes-French-Onion-Soup-LEAD-2-757941da129647dc90e490ed72b3807c.jpg",
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
      "https://plus.unsplash.com/premium_photo-1694790149322-e8f8957e01c5?q=80&w=387&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
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
      "https://silkroadrecipes.com/wp-content/uploads/2022/01/Eggplant-Moussaka-square.jpg",
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
      "https://images.unsplash.com/photo-1594610352455-e4d10d2f2cf0?q=80&w=872&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
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
      "https://images.unsplash.com/photo-1660180750968-4fbc84789a96?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
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
      "https://images.unsplash.com/photo-1697384874147-4e9b086d144d?q=80&w=387&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
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
      "https://images.unsplash.com/photo-1627906327792-4ede6149189f?q=80&w=435&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
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
      "https://images.unsplash.com/photo-1610057098265-05f2bcbedd55?q=80&w=387&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
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
      "https://cravingsjournal.com/wp-content/uploads/2018/07/lomo-saltado-2-500x375.jpg",
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
      "https://images.unsplash.com/photo-1590412200988-a436970781fa?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8U2hha3NodWthfGVufDB8fDB8fHww",
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
      "https://images.unsplash.com/photo-1680990999782-ba7fe26e4d0b?q=80&w=710&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
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
      "https://images.unsplash.com/photo-1719282431565-3b30bb7d2658?q=80&w=387&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
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
      "https://www.seriouseats.com/thmb/nhgfDG68_YXD-qz-0b1C9L45lmE=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/__opt__aboutcom__coeus__resources__content_migration__serious_eats__seriouseats.com__recipes__images__2014__02__20140225-baba-ganoush-recipe-food-lab-vegan-primary-3-30d3fa6c920a4c3dafce66e140a35905.jpg",
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
      "https://images.unsplash.com/photo-1764314845985-82dd5d0bdbf9?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
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
      "https://images.unsplash.com/photo-1579208030886-b937da0925dc?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
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
      "https://plus.unsplash.com/premium_photo-1683861800944-0ffaf3ef9b13?q=80&w=387&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
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
      "https://images.unsplash.com/photo-1624128082323-beb6b8b508db?q=80&w=465&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
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
      "https://noshingwiththenolands.com/wp-content/uploads/2018/01/Belgian-Waffles-IMG_4979-CROPPED.jpg",
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
  {
    title: "Smoky Jollof Rice",
    description:
      "Long-grain parboiled rice cooked to perfection in a rich, deeply seasoned tomato, onion, and tatashe (bell pepper) base with signature party-style smoky flavor.",
    author: "SatioFlix Chef",
    countryOfOrigin: "Nigeria",
    prepTime: 20,
    cookTime: 45,
    servingsDefault: 4,
    coverImage:
      "https://images.unsplash.com/photo-1665332195309-9d75071138f0?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    ingredients: [
      { name: "Long-grain parboiled rice", quantity: 400, unit: "g" },
      { name: "Roma tomatoes", quantity: 5, unit: "pcs" },
      { name: "Red bell peppers (Tatashe)", quantity: 3, unit: "pcs" },
      { name: "Onions", quantity: 2, unit: "pcs" },
      { name: "Tomato paste", quantity: 100, unit: "g" },
      { name: "Bay leaves", quantity: 3, unit: "pcs" },
      { name: "Curry powder", quantity: 1, unit: "tbsp" },
    ],
    instructions: [
      {
        stepNumber: 1,
        text: "Blend tomatoes, bell peppers, Scotch bonnets, and onions into a smooth puree, then boil until reduced.",
      },
      {
        stepNumber: 2,
        text: "Fry sliced onions and tomato paste in vegetable oil, add curry, thyme, and the boiled pepper base, frying until oil separates.",
      },
      {
        stepNumber: 3,
        text: "Add washed rice and chicken stock, adjust seasoning, cover tightly with foil, and cook on low heat until parboiled rice absorbs liquid and develops a classic smoky bottom burn.",
      },
    ],
    tags: ["Classic", "Smoky", "Traditional", "Celebration"],
  },
  {
    title: "Egusi Soup",
    description:
      "A rich, savory soup prepared with ground melon seeds, cooked in bleached palm oil, and loaded with leafy greens, stockfish, and assorted meats.",
    author: "SatioFlix Chef",
    countryOfOrigin: "Nigeria",
    prepTime: 25,
    cookTime: 35,
    servingsDefault: 4,
    coverImage:
      "https://images.unsplash.com/photo-1763048443535-1243379234e2?q=80&w=672&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    ingredients: [
      { name: "Ground melon seeds (Egusi)", quantity: 200, unit: "g" },
      { name: "Palm oil", quantity: 150, unit: "ml" },
      { name: "Assorted meats (Beef & Shaki)", quantity: 500, unit: "g" },
      { name: "Stockfish", quantity: 1, unit: "pc" },
      { name: "Ground crayfish", quantity: 2, unit: "tbsp" },
      { name: "Fresh spinach or Ugu leaves", quantity: 150, unit: "g" },
    ],
    instructions: [
      {
        stepNumber: 1,
        text: "Mix ground egusi with a little warm water to form thick pastes.",
      },
      {
        stepNumber: 2,
        text: "Heat palm oil in a pot, fry onions, add the egusi pastes in small chunks, and stir-fry for 10 minutes until firm.",
      },
      {
        stepNumber: 3,
        text: "Pour in meat stock, crayfish, and cooked meats, simmer for 15 minutes, then stir in the green vegetables and cook for 5 more minutes.",
      },
    ],
    tags: ["Soup", "Traditional", "Savory", "Beefy"],
  },
  {
    title: "Suya",
    description:
      "Thinly sliced beef skewered and coated in a spicy yaji peanut spice rub, then perfectly grilled over an open fire.",
    author: "SatioFlix Chef",
    countryOfOrigin: "Nigeria",
    prepTime: 30,
    cookTime: 15,
    servingsDefault: 2,
    coverImage:
      "https://media.istockphoto.com/id/2245938019/photo/a-pack-of-spicy-tasty-nigerian-beef-suya.webp?a=1&b=1&s=612x612&w=0&k=20&c=cARfhqIyABYplk2HPUuYhQyGCEdQjCxD5v8visqTqao=",
    ingredients: [
      { name: "Beef sirloin, thinly sliced", quantity: 500, unit: "g" },
      { name: "Yaji spice (Peanut powder blend)", quantity: 4, unit: "tbsp" },
      { name: "Vegetable oil", quantity: 3, unit: "tbsp" },
      { name: "Red onions, sliced", quantity: 1, unit: "pc" },
    ],
    instructions: [
      {
        stepNumber: 1,
        text: "Thread the thinly sliced strips of beef onto pre-soaked wooden skewers.",
      },
      {
        stepNumber: 2,
        text: "Generously coat the meat with the yaji spice blend and brush with vegetable oil.",
      },
      {
        stepNumber: 3,
        text: "Grill over hot charcoal or in an oven at high heat until cooked through and slightly charred around the edges, serving hot with extra onions.",
      },
    ],
    tags: ["Street-Food", "Spicy", "Grill", "Beefy"],
  },
  {
    title: "Asun (Spicy Peppered Goat)",
    description:
      "Delectable, authentic smoked goat meat chopped into bite-sized pieces and sautéed in a fiery crushed habanero pepper and onion mix.",
    author: "SatioFlix Chef",
    countryOfOrigin: "Nigeria",
    prepTime: 15,
    cookTime: 40,
    servingsDefault: 4,
    coverImage:
      "https://images.unsplash.com/photo-1628294896516-344152572ee8?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8QXN1biUyMChTcGljeSUyMFBlcHBlcmVkJTIwR29hdCl8ZW58MHx8MHx8fDA%3D",
    ingredients: [
      { name: "Goat meat (with skin)", quantity: 800, unit: "g" },
      { name: "Scotch bonnet peppers (Rodo)", quantity: 6, unit: "pcs" },
      { name: "Onions", quantity: 3, unit: "pcs" },
      { name: "Vegetable oil", quantity: 2, unit: "tbsp" },
    ],
    instructions: [
      {
        stepNumber: 1,
        text: "Boil goat meat with seasonings until tender, then roast or grill until skin is crispy.",
      },
      {
        stepNumber: 2,
        text: "Coarsely blend or chop the scotch bonnets and onions.",
      },
      {
        stepNumber: 3,
        text: "Heat oil, stir-fry the chopped peppers and onions, toss in the grilled goat meat, and stir on high heat until thoroughly coated.",
      },
    ],
    tags: ["Street-Food", "Spicy", "Authentic", "Onion-Heavy"],
  },
  {
    title: "Pounded Yam and Nsala Soup",
    description:
      "Also known as White Soup, a light yet deeply aromatic pepper soup thickened with mashed white yam, served with smooth pounded yam.",
    author: "SatioFlix Chef",
    countryOfOrigin: "Nigeria",
    prepTime: 20,
    cookTime: 30,
    servingsDefault: 3,
    coverImage:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR_ZgUZWEAVWgF7DGtf__WuJcZH4urJ9ySvrOosAximtA&s=10",
    ingredients: [
      { name: "Catfish or Assorted Chicken", quantity: 600, unit: "g" },
      { name: "Pounded yam paste (for thickening)", quantity: 100, unit: "g" },
      { name: "Utazi leaves", quantity: 5, unit: "pcs" },
      { name: "Ehuru (Calabash nutmeg)", quantity: 1, unit: "tsp" },
      { name: "Uziza seeds", quantity: 1, unit: "tsp" },
    ],
    instructions: [
      {
        stepNumber: 1,
        text: "Boil the meat or catfish with ground uziza, ehuru, and seasoning cubes until aromatic.",
      },
      {
        stepNumber: 2,
        text: "Add small chunks of raw pounded yam into the boiling pot to melt completely and thicken the broth.",
      },
      {
        stepNumber: 3,
        text: "Shred and add the utazi leaves, simmering for 5 more minutes before serving hot.",
      },
    ],
    tags: ["Soup", "Traditional", "Spiced", "Comfort-Food"],
  },
  {
    title: "Boli and Roasted Fish",
    description:
      "A popular Nigerian street food combo consisting of sweet, ripe plantain roasted over charcoal grills and paired with peppered grilled fish.",
    author: "SatioFlix Chef",
    countryOfOrigin: "Nigeria",
    prepTime: 10,
    cookTime: 25,
    servingsDefault: 2,
    coverImage:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT15vaEZGSa1lH2cgMJuVnroS3YbVX0RJ-uZ_NQ8d_hYg&s=10",
    ingredients: [
      { name: "Ripe plantains", quantity: 3, unit: "pcs" },
      { name: "Whole Mackerel (Titus Fish)", quantity: 1, unit: "pc" },
      { name: "Crushed chili peppers", quantity: 2, unit: "tbsp" },
      { name: "Palm oil", quantity: 2, unit: "tbsp" },
    ],
    instructions: [
      {
        stepNumber: 1,
        text: "Peel plantains and place them directly on an open charcoal grill or oven wire rack, turning frequently.",
      },
      {
        stepNumber: 2,
        text: "Marinate the fish with chili peppers, palm oil, and seasoning cubes.",
      },
      {
        stepNumber: 3,
        text: "Grill both the fish and plantains until the plantains turn golden brown and caramelized, and the fish is fully charred.",
      },
    ],
    tags: ["Street-Food", "Grill", "Sweet-Savory", "Seafood"],
  },
  {
    title: "Ofe Akwu (Banga Soup)",
    description:
      "An incredibly flavorful palm fruit extract soup loaded with fresh catfish, dried fish, and local aromatic herbs, traditionally eaten with white rice.",
    author: "SatioFlix Chef",
    countryOfOrigin: "Nigeria",
    prepTime: 35,
    cookTime: 40,
    servingsDefault: 4,
    coverImage:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSYzH6fPQTbUKtHTg043T0kYN7Pw8J7qpBbCR0kC_otwQ&s=10",
    ingredients: [
      { name: "Palm fruit concentrate", quantity: 400, unit: "g" },
      { name: "Fresh catfish", quantity: 500, unit: "g" },
      { name: "Banga spice mix", quantity: 1, unit: "tbsp" },
      { name: "Beletete leaves", quantity: 1, unit: "tsp" },
      { name: "Oburunbebe stick", quantity: 1, unit: "pc" },
    ],
    instructions: [
      {
        stepNumber: 1,
        text: "Boil the palm fruit concentrate with water until the oil begins to float to the top.",
      },
      {
        stepNumber: 2,
        text: "Add the banga spices, oburunbebe stick, crayfish, and cooked proteins.",
      },
      {
        stepNumber: 3,
        text: "Gently fold in fresh catfish and beletete leaves, simmering until the sauce thickens and flavors fully marry.",
      },
    ],
    tags: ["Soup", "Traditional", "Seafood", "Slow-Cooked"],
  },
  {
    title: "Classic Moi Moi",
    description:
      "A silky, steamed savory bean pudding made from peeled black-eyed peas, enriched with peppers, onions, oil, and hard-boiled eggs.",
    author: "SatioFlix Chef",
    countryOfOrigin: "Nigeria",
    prepTime: 30,
    cookTime: 45,
    servingsDefault: 6,
    coverImage:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS0OvGhXyq1XOlKL9ykcmwKtmhz7bVAGDxilLxNYF4jiA&s=10",
    ingredients: [
      { name: "Honey beans or black-eyed peas", quantity: 300, unit: "g" },
      { name: "Red bell pepper", quantity: 2, unit: "pcs" },
      { name: "Onions", quantity: 1, unit: "pc" },
      { name: "Vegetable oil", quantity: 100, unit: "ml" },
      { name: "Boiled eggs, sliced", quantity: 2, unit: "pcs" },
    ],
    instructions: [
      {
        stepNumber: 1,
        text: "Soak and peel the beans, then blend with bell peppers and onions into an ultra-smooth batter.",
      },
      {
        stepNumber: 2,
        text: "Whisk vegetable oil, stock, and salt into the batter until fluffy.",
      },
      {
        stepNumber: 3,
        text: "Pour into lined ramekins or pouches, drop egg slices inside, and steam over boiling water until set.",
      },
    ],
    tags: ["Classic", "Healthy", "Savory", "Traditional"],
  },
  {
    title: "Akara (Fried Bean Cakes)",
    description:
      "Crispy on the outside, light and fluffy on the inside golden bean fritters flavored with finely chopped onions and habaneros.",
    author: "SatioFlix Chef",
    countryOfOrigin: "Nigeria",
    prepTime: 20,
    cookTime: 15,
    servingsDefault: 4,
    coverImage:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRi4pecAtWGcrOnXSoPtfH7HDf0i4YjP1mdnVdjGOcznQ&s=10",
    ingredients: [
      { name: "Peeled brown beans", quantity: 250, unit: "g" },
      { name: "Onion, finely chopped", quantity: 1, unit: "pc" },
      { name: "Scotch bonnet, chopped", quantity: 1, unit: "pc" },
      { name: "Vegetable oil (for frying)", quantity: 300, unit: "ml" },
    ],
    instructions: [
      {
        stepNumber: 1,
        text: "Blend peeled beans with minimal water into a very thick paste.",
      },
      {
        stepNumber: 2,
        text: "Vigorously whisk the batter using a wooden spoon for 5-10 minutes to incorporate air until light and white.",
      },
      {
        stepNumber: 3,
        text: "Fold in chopped onions and peppers, scoop into hot oil, and deep-fry until golden brown.",
      },
    ],
    tags: ["Fried", "Breakfast", "Crispy", "Street-Food"],
  },
  {
    title: "Gizdodo",
    description:
      "A vibrant, mouth-watering celebration dish combining sweet fried plantain cubes and chewy gizzards tossed in a rich pepper sauce.",
    author: "SatioFlix Chef",
    countryOfOrigin: "Nigeria",
    prepTime: 20,
    cookTime: 25,
    servingsDefault: 4,
    coverImage:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR45bubk3N3pcPGNc3wfuTAQuKTPF-i6sE5PqKe0gTWtg&s=10",
    ingredients: [
      { name: "Chicken gizzards", quantity: 400, unit: "g" },
      { name: "Ripe plantains, cubed", quantity: 2, unit: "pcs" },
      { name: "Bell peppers, chopped", quantity: 2, unit: "pcs" },
      { name: "Onions", quantity: 1, unit: "pc" },
    ],
    instructions: [
      {
        stepNumber: 1,
        text: "Season and boil gizzards until tender, then deep fry until crisp.",
      },
      {
        stepNumber: 2,
        text: "Deep fry the cubed plantains until golden brown and sweet.",
      },
      {
        stepNumber: 3,
        text: "Sauté onions and bell peppers to form a thick chunky sauce, then toss in the fried gizzards and plantains until well combined.",
      },
    ],
    tags: ["Sweet-Savory", "Celebration", "Chicken", "Fried"],
  },
  {
    title: "Ewa Agoyin",
    description:
      "Extremely soft, mashed brown beans served with a famous dark, spicy, and smoky palm oil pepper sauce.",
    author: "SatioFlix Chef",
    countryOfOrigin: "Nigeria",
    prepTime: 15,
    cookTime: 60,
    servingsDefault: 3,
    coverImage:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSWRO3gwM6cVn-fQgKmp8ukQ-pRK0YbpXNZR5dFctSfvw&s=10",
    ingredients: [
      { name: "Nigerian honey beans", quantity: 300, unit: "g" },
      { name: "Dried bell peppers (Sombo)", quantity: 50, unit: "g" },
      { name: "Onions, sliced", quantity: 3, unit: "pcs" },
      { name: "Palm oil", quantity: 200, unit: "ml" },
    ],
    instructions: [
      {
        stepNumber: 1,
        text: "Boil the beans with a little salt on low heat for an hour until mushy, then mash with a wooden spoon.",
      },
      {
        stepNumber: 2,
        text: "Bleach the palm oil until amber-colored, then fry a heavy amount of chopped onions until dark brown.",
      },
      {
        stepNumber: 3,
        text: "Add ground dried peppers and fry continuously until the sauce turns dark, gritty, and deeply smoky.",
      },
    ],
    tags: ["Slow-Cooked", "Spicy", "Street-Food", "Onion-Heavy"],
  },
  {
    title: "Pepper Soup (Assorted Meat)",
    description:
      "A light, fiery, and deeply comforting broth packed with traditional medicinal spices and tender assorted meats.",
    author: "SatioFlix Chef",
    countryOfOrigin: "Nigeria",
    prepTime: 10,
    cookTime: 30,
    servingsDefault: 3,
    coverImage:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSeUju6tfCVihSLSlN3OV5WN6rS7zvEBwczcadd7jGhTg&s=10",
    ingredients: [
      { name: "Assorted beef parts", quantity: 600, unit: "g" },
      { name: "Pepper soup spice blend", quantity: 2, unit: "tbsp" },
      { name: "Uziza or scent leaves", quantity: 10, unit: "pcs" },
      { name: "Scotch bonnet, minced", quantity: 2, unit: "pcs" },
    ],
    instructions: [
      {
        stepNumber: 1,
        text: "Cut beef into bite-sized pieces and boil with minced onions and garlic.",
      },
      {
        stepNumber: 2,
        text: "Add plenty of water, the aromatic pepper soup spice blend, and minced scotch bonnets.",
      },
      {
        stepNumber: 3,
        text: "Simmer until the meats are incredibly soft, then top with shredded scent leaves right before serving.",
      },
    ],
    tags: ["Soup", "Spicy", "Comfort-Food", "Spiced"],
  },
  {
    title: "Amala and Abula (Ewedu & Gbegiri)",
    description:
      "Dark, smooth yam flour swallow served with a classic trio combo of silky jute leaf soup, creamy bean soup, and peppered stew.",
    author: "SatioFlix Chef",
    countryOfOrigin: "Nigeria",
    prepTime: 25,
    cookTime: 35,
    servingsDefault: 2,
    coverImage:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSniyewXCRPDLoXDbfSg172onKUOwCiqoQDe7dFY72_Ww&s=10",
    ingredients: [
      { name: "Elubo (Yam flour)", quantity: 200, unit: "g" },
      { name: "Ewedu (Jute leaves)", quantity: 150, unit: "g" },
      { name: "Peeled beans (for Gbegiri)", quantity: 100, unit: "g" },
      { name: "Palm oil", quantity: 2, unit: "tbsp" },
    ],
    instructions: [
      {
        stepNumber: 1,
        text: "Boil peeled beans until soft, mash and sieve to form a smooth paste, then cook with palm oil to create Gbegiri.",
      },
      {
        stepNumber: 2,
        text: "Blend boiled ewedu leaves with iru (locust beans) into a smooth, viscous green soup.",
      },
      {
        stepNumber: 3,
        text: "Turn yam flour into boiling water continuously, beating vigorously until smooth and fluffy.",
      },
    ],
    tags: ["Traditional", "Authentic", "Soup", "Creamy"],
  },
  {
    title: "Edikang Ikong Soup",
    description:
      "A prestigious, nutrient-dense dry soup native to South-South Nigeria, crafted with a perfect ratio of waterleaf and fluted pumpkin leaves.",
    author: "SatioFlix Chef",
    countryOfOrigin: "Nigeria",
    prepTime: 30,
    cookTime: 20,
    servingsDefault: 4,
    coverImage:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTMZkNgCMpEpPj1kOtiEwIt2I0KBCC45yca2WGbbpV3zA&s=10",
    ingredients: [
      { name: "Ugu leaves (Pumpkin)", quantity: 400, unit: "g" },
      { name: "Waterleaf", quantity: 200, unit: "g" },
      { name: "Periwinkles", quantity: 100, unit: "g" },
      { name: "Smoked fish & Beef", quantity: 400, unit: "g" },
      { name: "Palm oil", quantity: 100, unit: "ml" },
    ],
    instructions: [
      {
        stepNumber: 1,
        text: "Boil assorted meats and smoked fish with minimal water until dry.",
      },
      {
        stepNumber: 2,
        text: "Add palm oil, ground crayfish, and periwinkles, then throw in the waterleaf first.",
      },
      {
        stepNumber: 3,
        text: "Add the sliced ugu leaves immediately after, toss well on high heat for 5 minutes without covering the pot to lock in fresh color.",
      },
    ],
    tags: ["Soup", "Healthy", "Traditional", "Authentic"],
  },
  {
    title: "Ogor Miyan Kuka",
    description:
      "A popular, traditional Northern Nigerian green soup prepared from dried boabab leaf powder and flavorful dried fish chunks.",
    author: "SatioFlix Chef",
    countryOfOrigin: "Nigeria",
    prepTime: 10,
    cookTime: 25,
    servingsDefault: 3,
    coverImage:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRFSBijuDaZWz0d0lP-Y3gex23HK8AEqnJJJMIJKzZqBA&s=10",
    ingredients: [
      { name: "Kuka powder (Baobab leaf)", quantity: 3, unit: "tbsp" },
      { name: "Dried fish", quantity: 200, unit: "g" },
      { name: "Yaji spice mix", quantity: 1, unit: "tsp" },
      { name: "Palm oil", quantity: 2, unit: "tbsp" },
    ],
    instructions: [
      {
        stepNumber: 1,
        text: "Boil meat stock along with dried fish, onions, and yaji spikes.",
      },
      {
        stepNumber: 2,
        text: "Gradually whisk in the green kuka powder into the boiling broth to avoid forming lumps.",
      },
      {
        stepNumber: 3,
        text: "Simmer gently on low heat for 10 minutes until smooth and viscous.",
      },
    ],
    tags: ["Soup", "Traditional", "Exotic", "Savory"],
  },
  {
    title: "Miyan Taushe",
    description:
      "A rich, pumpkin-based Northern soup sweet and savory in profile, heavily infused with peanut paste and served with Tuwo Shinkafa.",
    author: "SatioFlix Chef",
    countryOfOrigin: "Nigeria",
    prepTime: 15,
    cookTime: 30,
    servingsDefault: 4,
    coverImage:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRN0ZjkswSoAziCIgsGj0HBOB7HthG1TzrT8NCpJ0JD6A&s=10",
    ingredients: [
      { name: "Ripe pumpkin, mashed", quantity: 300, unit: "g" },
      { name: "Peanut paste", quantity: 3, unit: "tbsp" },
      { name: "Beef chunks", quantity: 350, unit: "g" },
      { name: "Sorrel leaves (Yakuwa)", quantity: 50, unit: "g" },
    ],
    instructions: [
      {
        stepNumber: 1,
        text: "Boil pieces of pumpkin with beef until the pumpkin is mushy enough to fork-mash into a paste.",
      },
      {
        stepNumber: 2,
        text: "Stir the peanut paste and blended peppers smoothly into the pumpkin mixture.",
      },
      {
        stepNumber: 3,
        text: "Add chopped yakuwa sorrel leaves, simmer for 8 minutes to balance the sweet-savory notes.",
      },
    ],
    tags: ["Soup", "Sweet-Savory", "Creamy", "Traditional"],
  },
  {
    title: "Nkwobi",
    description:
      "A classic Eastern Nigerian bar dessert snack composed of tender cow foot gelatinous chunks bathed in a rich, palm oil spicy potash mortar sauce.",
    author: "SatioFlix Chef",
    countryOfOrigin: "Nigeria",
    prepTime: 15,
    cookTime: 50,
    servingsDefault: 2,
    coverImage:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSG1A8yFvAV_5QE7qTpatl4feRSY3l5U_rMXTeGbu0U4A&s=10",
    ingredients: [
      { name: "Cow foot pieces", quantity: 800, unit: "g" },
      { name: "Palm oil", quantity: 100, unit: "ml" },
      { name: "Edible potash (Kanwa)", quantity: 1, unit: "tsp" },
      { name: "Utazi leaves, sliced", quantity: 5, unit: "pcs" },
      { name: "Ground Ehuru mix", quantity: 1, unit: "tsp" },
    ],
    instructions: [
      {
        stepNumber: 1,
        text: "Pressure cook the cow foot pieces until completely tender and sticky.",
      },
      {
        stepNumber: 2,
        text: "Mix palm oil with dissolved potash solution in a mortar, whisking until it emulsifies into a thick yellow cream.",
      },
      {
        stepNumber: 3,
        text: "Fold in the cooked meat, pepper paste, and ehuru, garnishing with fresh onions and sliced bitter utazi leaves.",
      },
    ],
    tags: ["Street-Food", "Authentic", "Savory", "Slow-Cooked"],
  },
  {
    title: "Abacha (African Salad)",
    description:
      "A refreshing, exotic Eastern salad made from shredded, dried cassava flakes rehydrated and tossed in a savory palm oil paste.",
    author: "SatioFlix Chef",
    countryOfOrigin: "Nigeria",
    prepTime: 20,
    cookTime: 10,
    servingsDefault: 3,
    coverImage:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSLIpShqzk-FIGAiPuXFiyMOIZR70R0Q56epWEEiLAhNg&s=10",
    ingredients: [
      { name: "Dried Abacha flakes", quantity: 200, unit: "g" },
      { name: "Palm oil", quantity: 80, unit: "ml" },
      { name: "Ugba (Oil bean slices)", quantity: 50, unit: "g" },
      { name: "Garden eggs, sliced", quantity: 2, unit: "pcs" },
      { name: "Kanda (Cow skin strips)", quantity: 100, unit: "g" },
    ],
    instructions: [
      {
        stepNumber: 1,
        text: "Soak dried abacha flakes in warm water for 5 minutes to soften, then drain fully.",
      },
      {
        stepNumber: 2,
        text: "Make a yellow palm oil emulsion using warm water and dissolved potash.",
      },
      {
        stepNumber: 3,
        text: "Stir in the abacha flakes, ugba, pepper paste, and kanda, assembling with fresh garden eggs on top.",
      },
    ],
    tags: ["Salad", "Traditional", "Exotic", "Fresh"],
  },
  {
    title: "Plantain Mosa",
    description:
      "Fluffy, golden sweet-savory breakfast puff fritters made from over-ripe mashed plantains and a dash of pepper.",
    author: "SatioFlix Chef",
    countryOfOrigin: "Nigeria",
    prepTime: 15,
    cookTime: 15,
    servingsDefault: 3,
    coverImage:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTBUL29iKa5qiwTdO5f_tQIC6-LDOo3eFo0EHmxOFq_9Q&s=10",
    ingredients: [
      { name: "Over-ripe plantains", quantity: 2, unit: "pcs" },
      { name: "All-purpose flour", quantity: 100, unit: "g" },
      { name: "Instant dry yeast", quantity: 1, unit: "tsp" },
      { name: "Scotch bonnet, minced", quantity: 0.5, unit: "pc" },
    ],
    instructions: [
      {
        stepNumber: 1,
        text: "Mash the plantains until completely liquid and smooth with no solid chunks.",
      },
      {
        stepNumber: 2,
        text: "Mix in flour, yeast, and minced pepper, allowing the batter to proof for 20 minutes.",
      },
      {
        stepNumber: 3,
        text: "Scoop small balls into hot vegetable oil and deep fry until crispy and deeply browned.",
      },
    ],
    tags: ["Breakfast", "Sweet-Savory", "Fried", "Easy"],
  },
  {
    title: "Ofada Rice and Ayamase Stew",
    description:
      "Unpolished, local short-grain rice accompanied by a fierce, rich green bell pepper stew cooked in deeply bleached palm oil.",
    author: "SatioFlix Chef",
    countryOfOrigin: "Nigeria",
    prepTime: 20,
    cookTime: 40,
    servingsDefault: 3,
    coverImage:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSmTkQfmGVfSNo_q5PqRL-Fy0NCwfMWg8U4JkfMdMuYDw&s=10",
    ingredients: [
      { name: "Local Ofada Rice", quantity: 300, unit: "g" },
      { name: "Green bell peppers", quantity: 6, unit: "pcs" },
      { name: "Bleached palm oil", quantity: 150, unit: "ml" },
      { name: "Iru (Locust beans)", quantity: 2, unit: "tbsp" },
      { name: "Assorted meats, diced", quantity: 400, unit: "g" },
    ],
    instructions: [
      {
        stepNumber: 1,
        text: "Wash and boil the pungent local ofada rice until tender.",
      },
      {
        stepNumber: 2,
        text: "Bleach palm oil in a closed pot until crystal clear, then fry onions and locust beans until sizzling.",
      },
      {
        stepNumber: 3,
        text: "Pour in blended, strained green peppers, add diced meats, and fry until the oil floats cleanly above the green sauce.",
      },
    ],
    tags: ["Classic", "Spicy", "Authentic", "Traditional"],
  },
  {
    title: "Ogbono Soup",
    description:
      "A comforting, thick African mango seed soup that features an incredible draw texture, loaded with stockfish and leafy vegetables.",
    author: "SatioFlix Chef",
    countryOfOrigin: "Nigeria",
    prepTime: 10,
    cookTime: 25,
    servingsDefault: 4,
    coverImage:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTlLRo7KgFnWILSVhFnhmPtFjBpyjKYpIwE8Q5fphZjAw&s=10",
    ingredients: [
      { name: "Ground Ogbono seeds", quantity: 80, unit: "g" },
      { name: "Palm oil", quantity: 3, unit: "tbsp" },
      { name: "Assorted meats", quantity: 400, unit: "g" },
      { name: "Ugu leaves, shredded", quantity: 50, unit: "g" },
    ],
    instructions: [
      {
        stepNumber: 1,
        text: "Dissolve ground ogbono seeds inside warm palm oil completely off the flame to prevent clumping.",
      },
      {
        stepNumber: 2,
        text: "Pour the smooth oil mixture into boiling meat stock, stirring continuously as it begins to draw and thicken.",
      },
      {
        stepNumber: 3,
        text: "Toss in cooked meats, crayfish, and vegetables, simmering gently on low heat for 15 minutes.",
      },
    ],
    tags: ["Soup", "Traditional", "Easy", "Savory"],
  },
  {
    title: "Peppered Snail Snack",
    description:
      "Crispy, crunchy giant African land snails tossed in a fiery habanero onion reduction, perfect as a gourmet party appetizer.",
    author: "SatioFlix Chef",
    countryOfOrigin: "Nigeria",
    prepTime: 25,
    cookTime: 20,
    servingsDefault: 2,
    coverImage:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTSf0IWEk5tJatLj9bCYxUs9PBKqrhAOB_c8NONS0L1bQ&s=10",
    ingredients: [
      { name: "Cleaned land snails", quantity: 6, unit: "pcs" },
      { name: "Scotch bonnet peppers", quantity: 4, unit: "pcs" },
      { name: "Onions, chopped", quantity: 2, unit: "pcs" },
      { name: "Vegetable oil", quantity: 2, unit: "tbsp" },
    ],
    instructions: [
      {
        stepNumber: 1,
        text: "Boil washed snails with lime juice, garlic, and onions until fully cooked but firm.",
      },
      {
        stepNumber: 2,
        text: "Deep-fry or pan-sear the snails briefly to give them a crunchy bite.",
      },
      {
        stepNumber: 3,
        text: "Sauté the chopped peppers and plenty of onions in oil, toss the snails inside, and glaze evenly.",
      },
    ],
    tags: ["Street-Food", "Spicy", "Onion-Heavy", "Celebration"],
  },
  {
    title: "Oloyin Honey Beans (Porridge)",
    description:
      "Naturally sweet Nigerian honey beans stewed softly down into a savory palm oil porridge structure.",
    author: "SatioFlix Chef",
    countryOfOrigin: "Nigeria",
    prepTime: 10,
    cookTime: 50,
    servingsDefault: 3,
    coverImage:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTU2NqtTRwiqKK1sQrddUmm5HuNvDfOP-MnFSAGiNsHyQ&s=10",
    ingredients: [
      { name: "Oloyin Honey Beans", quantity: 300, unit: "g" },
      { name: "Palm oil", quantity: 50, unit: "ml" },
      { name: "Blended onion paste", quantity: 2, unit: "tbsp" },
      { name: "Crayfish powder", quantity: 1, unit: "tbsp" },
    ],
    instructions: [
      {
        stepNumber: 1,
        text: "Boil the honey beans until extremely soft and creamy.",
      },
      {
        stepNumber: 2,
        text: "Pour in palm oil, pepper mix, onion paste, and crayfish directly into the pot.",
      },
      {
        stepNumber: 3,
        text: "Stir thoroughly, mash a portion of the beans against the side of the pot to thicken, and simmer until thick.",
      },
    ],
    tags: ["Vegetarian", "Slow-Cooked", "Comfort-Food", "Easy"],
  },
  {
    title: "Nigerian Meat Pie",
    description:
      "The ultimate street-food pastry pastry, featuring a buttery, flaky crust stuffed with seasoned minced beef, carrots, and potatoes.",
    author: "SatioFlix Chef",
    countryOfOrigin: "Nigeria",
    prepTime: 35,
    cookTime: 25,
    servingsDefault: 4,
    coverImage:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTxe_vh6NYlhSLwm9kC4bSW7OzImACJmgicSvLQ5vXRNQ&s=10",
    ingredients: [
      { name: "All-purpose flour", quantity: 500, unit: "g" },
      { name: "Minced beef", quantity: 300, unit: "g" },
      { name: "Margarine or butter", quantity: 250, unit: "g" },
      { name: "Diced potatoes & carrots", quantity: 100, unit: "g" },
    ],
    instructions: [
      {
        stepNumber: 1,
        text: "Cook minced beef with potatoes, carrots, and flour slurry to form a thick, moist pie filling.",
      },
      {
        stepNumber: 2,
        text: "Rub cold butter into flour, mix with ice water to make dough, and roll out flat.",
      },
      {
        stepNumber: 3,
        text: "Cut out circles, stuff with meat filling, crimp edges with a fork, and bake at 180°C until golden.",
      },
    ],
    tags: ["Pastry", "Beefy", "Baked", "Classic"],
  },
  {
    title: "Banga Rice",
    description:
      "A rich coastal dish of rice cooked directly inside fresh, aromatic palm fruit extract broth and ground local spices.",
    author: "SatioFlix Chef",
    countryOfOrigin: "Nigeria",
    prepTime: 15,
    cookTime: 35,
    servingsDefault: 4,
    coverImage:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSVdKTrrmOwB71bS1ZIaXXUZySxM6EInDT52KjnOqi9iQ&s=10",
    ingredients: [
      { name: "Parboiled rice", quantity: 400, unit: "g" },
      { name: "Palm fruit concentrate", quantity: 250, unit: "g" },
      { name: "Dried catfish pieces", quantity: 100, unit: "g" },
      { name: "Banga spices blend", quantity: 1, unit: "tsp" },
    ],
    instructions: [
      {
        stepNumber: 1,
        text: "Boil palm fruit concentrate with water and local banga spices until rich and fragrant.",
      },
      {
        stepNumber: 2,
        text: "Add dried catfish, crayfish, and washed parboiled rice directly into the palm broth.",
      },
      {
        stepNumber: 3,
        text: "Cover tightly and let the rice steam slowly until dry and infused with rich palm oils.",
      },
    ],
    tags: ["Traditional", "Savory", "Seafood", "Slow-Cooked"],
  },
  {
    title: "Crunchy Chin Chin",
    description:
      "A highly addictive, fried sweet pastry snack cut into tiny cubes.",
    author: "SatioFlix Chef",
    countryOfOrigin: "Nigeria",
    prepTime: 20,
    cookTime: 15,
    servingsDefault: 6,
    coverImage:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSS8OLtbjsnZrMKimWDIvOBZuKdoOoAkMbuPucUYMtZsQ&s=10",
    ingredients: [
      { name: "All-purpose flour", quantity: 400, unit: "g" },
      { name: "Sugar", quantity: 80, unit: "g" },
      { name: "Butter", quantity: 50, unit: "g" },
      { name: "Ground nutmeg", quantity: 1, unit: "tsp" },
    ],
    instructions: [
      {
        stepNumber: 1,
        text: "Combine flour, sugar, and nutmeg, then rub in the butter until crumbly.",
      },
      {
        stepNumber: 2,
        text: "Add milk to form a stiff dough, roll out thin on a board, and slice into tiny squares.",
      },
      {
        stepNumber: 3,
        text: "Deep fry in small batches in hot oil until crunchy and light golden brown.",
      },
    ],
    tags: ["Pastry", "Sweet", "Crispy", "Celebration"],
  },
  {
    title: "Garden Egg Sauce",
    description:
      "A uniquely savory, slightly bitter sauce made from mashed white garden eggs cooked down in palm oil, perfect with boiled yams.",
    author: "SatioFlix Chef",
    countryOfOrigin: "Nigeria",
    prepTime: 15,
    cookTime: 20,
    servingsDefault: 3,
    coverImage:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT7lix4JQjDKDWSO1DmUPSiofhRqBFX6f1Idr9Qcj3jNQ&s=10",
    ingredients: [
      { name: "White garden eggs (Eggplants)", quantity: 8, unit: "pcs" },
      { name: "Palm oil", quantity: 80, unit: "ml" },
      { name: "Smoked mackerel chunks", quantity: 150, unit: "g" },
      { name: "Onion, chopped", quantity: 1, unit: "pc" },
    ],
    instructions: [
      {
        stepNumber: 1,
        text: "Boil garden eggs for 10 minutes, remove skins, and mash coarsely with a fork.",
      },
      {
        stepNumber: 2,
        text: "Sauté chopped onions in palm oil, add blended peppers and smoked fish.",
      },
      {
        stepNumber: 3,
        text: "Stir in the mashed garden eggs and simmer for 10 minutes until oil bubbles over.",
      },
    ],
    tags: ["Vegetarian", "Lunch", "Traditional", "Easy"],
  },
  {
    title: "Fried Plantain (Dodo)",
    description:
      "Sweet, perfectly caramelized ripe plantain slices fried to golden perfection—the ultimate Nigerian side dish.",
    author: "SatioFlix Chef",
    countryOfOrigin: "Nigeria",
    prepTime: 5,
    cookTime: 10,
    servingsDefault: 2,
    coverImage:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQlZ_P9nTYv_Z-Qm5b0MkMro8I5ehX2NcxVSeD-vj3veA&s=10",
    ingredients: [
      { name: "Ripe yellow plantains", quantity: 2, unit: "pcs" },
      { name: "Vegetable oil (for frying)", quantity: 200, unit: "ml" },
      { name: "Salt", quantity: 0.5, unit: "tsp" },
    ],
    instructions: [
      {
        stepNumber: 1,
        text: "Peel the plantains and slice diagonally into uniform disks.",
      },
      {
        stepNumber: 2,
        text: "Toss with a tiny pinch of salt based on preference.",
      },
      {
        stepNumber: 3,
        text: "Fry in hot oil for 3-4 minutes per side until beautifully caramelized and golden.",
      },
    ],
    tags: ["Sweet-Savory", "Fried", "Easy", "Quick"],
  },
  {
    title: "Chicken Pepper Stew",
    description:
      "A classic Sunday staple of fried chicken steeped deep inside a vibrant tomato and red bell pepper sauce mix.",
    author: "SatioFlix Chef",
    countryOfOrigin: "Nigeria",
    prepTime: 15,
    cookTime: 35,
    servingsDefault: 4,
    coverImage:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQSiH30AjemR77qrIlM08jVpbATQ48yjQtTuQn7OqoQqw&s=10",
    ingredients: [
      { name: "Chicken drumsticks", quantity: 6, unit: "pcs" },
      { name: "Tomatoes", quantity: 6, unit: "pcs" },
      { name: "Red bell peppers", quantity: 4, unit: "pcs" },
      { name: "Vegetable oil", quantity: 100, unit: "ml" },
    ],
    instructions: [
      {
        stepNumber: 1,
        text: "Boil chicken with onions and thyme, then fry or bake until golden crisp.",
      },
      {
        stepNumber: 2,
        text: "Fry concentrated tomato-pepper puree in hot oil until the sourness fades completely.",
      },
      {
        stepNumber: 3,
        text: "Pour in rich chicken stock, add the fried chicken pieces, and reduce until thick and oil rises.",
      },
    ],
    tags: ["Chicken", "Classic", "Lunch", "Traditional"],
  },
  {
    title: "Yamarita (Egg-Fried Yam)",
    description:
      "Crispy street-food slices of white yam coated in a seasoned egg and flour batter, then shallow-fried until golden.",
    author: "SatioFlix Chef",
    countryOfOrigin: "Nigeria",
    prepTime: 10,
    cookTime: 15,
    servingsDefault: 2,
    coverImage:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTREZOs3FfH6bktsJ73xwfYTaAYvcIMQfohqMr9g2wF5w&s=10",
    ingredients: [
      { name: "White Puna Yam tuber", quantity: 400, unit: "g" },
      { name: "Eggs, beaten", quantity: 2, unit: "pcs" },
      { name: "All-purpose flour", quantity: 3, unit: "tbsp" },
      { name: "Chili powder", quantity: 1, unit: "tsp" },
    ],
    instructions: [
      {
        stepNumber: 1,
        text: "Slice yam into flat rectangles and parboil with salt for 8 minutes until slightly tender.",
      },
      {
        stepNumber: 2,
        text: "Dredge each yam slice in seasoned flour, then dip completely into the beaten eggs.",
      },
      {
        stepNumber: 3,
        text: "Fry in hot oil until both sides are perfectly crisp and crunchy.",
      },
    ],
    tags: ["Breakfast", "Fried", "Crispy", "Street-Food"],
  },
];

export const seedDatabase = async (): Promise<void> => {
  try {
    await mongoose.connect(process.env.MONGODB_URI || "");
    console.log("📡 Seeding Database: Connected to MongoDB.");

    console.log("🌱 Syncing global recipes with database changes...");

    // ⚡ Instead of skipping, we loop and upsert every recipe.
    // This inserts new recipes AND instantly updates existing ones with your edits!
    for (const recipe of recipesToSeed) {
      await Recipe.updateOne(
        { title: recipe.title },
        { $set: recipe },
        { upsert: true },
      );
    }

    // Fetch final count to verify
    const finalCount = await Recipe.countDocuments();
    console.log(
      `🎉 Sync Complete! Database now has ${finalCount} up-to-date recipes.`,
    );
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