// src/components/survival/SurvivalPantry.tsx
import { useState, useMemo } from 'react';
import { useSurvival } from '../../context/SurvivalContext';
import { Search, ShoppingBag, ArrowLeft, Zap, Check, Plus } from 'lucide-react';

interface PantryCategory {
  category: string;
  items: string[];
}

const PANTRY_DATABASE: PantryCategory[] = [
  {
    category: 'Carbs & Grains',
    items: ['Rice', 'Pasta / Spaghetti', 'Bread', 'Instant Noodles', 'Oats', 'Potatoes', 'Flour', 'Tortillas / Wraps', 'Couscous']
  },
  {
    category: 'Proteins & Dairy',
    items: ['Eggs', 'Canned Tuna / Sardines', 'Chicken', 'Beans / Lentils', 'Milk', 'Cheese', 'Peanut Butter', 'Tofu']
  },
  {
    category: 'Vegetables & Aromatics',
    items: ['Onions', 'Garlic', 'Tomatoes', 'Spinach / Leafy Greens', 'Carrots', 'Bell Peppers']
  },
  {
    category: 'Oils & Condiments',
    items: ['Cooking Oil', 'Butter / Margarine', 'Salt', 'Black Pepper', 'Soy Sauce / Hot Sauce', 'Basic Spices (Curry/Paprika)']
  },
  {
    category: 'Quick Fixes & Pantry',
    items: ['Canned Baked Beans', 'Tea / Coffee', 'Sugar', 'Cereal', 'Tomato Paste']
  }
];

const ENERGY_LEVELS = [
  { level: 1, label: 'Zero Cook (Raw / Soak / Microwave)', icon: '⚡' },
  { level: 2, label: 'Very Low (Boil water / Quick assemble)', icon: '💧' },
  { level: 3, label: 'Basic (1 Pot / Under 20 mins)', icon: '🍳' },
  { level: 4, label: 'Moderate (Standard frying / Boiling)', icon: '🔥' },
  { level: 5, label: 'Full Chef Mode (No constraints)', icon: '👑' },
];

interface SurvivalPantryProps {
  onBack: () => void;
  onSubmitMission: () => void;
}

export default function SurvivalPantry({ onBack, onSubmitMission }: SurvivalPantryProps) {
  const { state, updateState } = useSurvival();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [customInput, setCustomInput] = useState('');
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const toggleIngredient = (item: string) => {
    const exists = state.pantry.includes(item);
    let updated: string[];
    if (exists) {
      updated = state.pantry.filter((i) => i !== item);
    } else {
      updated = [...state.pantry, item];
    }
    updateState({ pantry: updated });
    if (errorMsg) setErrorMsg(null);
  };

  const handleAddCustomItem = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = customInput.trim();
    if (!trimmed) return;

    const formatted = trimmed.charAt(0).toUpperCase() + trimmed.slice(1);
    if (!state.pantry.includes(formatted)) {
      updateState({ pantry: [...state.pantry, formatted] });
    }
    setCustomInput('');
    if (errorMsg) setErrorMsg(null);
  };

  const handleGenerate = () => {
    // 1. Guardrail: If budget is 0 AND pantry is completely empty, block generation
    if (state.budget === 0 && (!state.pantry || state.pantry.length === 0)) {
      setErrorMsg("⚠️ Bro, you have zero cash and zero pantry items! Even faith needs a pinch of salt. Please select or add at least one pantry item.");
      return;
    }

    // 2. Hybrid Reality Check: If they have cash > 0 BUT have NO pantry items selected, 
    // check if their budget is drastically too low for the requested duration.
    if (state.budget > 0 && (!state.pantry || state.pantry.length === 0)) {
      const dailySpend = state.budget / state.days;
      // If daily cash available is extremely restrictive without any pantry stock backing it up:
      if (dailySpend < 200) {
        setErrorMsg(`⚠️ Warning: ${state.budget} ${state.currency} for ${state.days} days with NO pantry items is extremely tight. Consider selecting some items you own or reducing your days.`);
        return;
      }
    }

    // If they have pantry items backing them up, any small cash top-up is fully accepted!
    setErrorMsg(null);
    onSubmitMission();
  };

  const filteredCategories = useMemo(() => {
    return PANTRY_DATABASE.map((cat) => {
      if (selectedCategory !== 'All' && cat.category !== selectedCategory) {
        return null;
      }
      const matchingItems = cat.items.filter((item) =>
        item.toLowerCase().includes(searchQuery.toLowerCase())
      );
      if (matchingItems.length === 0) return null;
      return { ...cat, items: matchingItems };
    }).filter(Boolean) as PantryCategory[];
  }, [searchQuery, selectedCategory]);

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-200 dark:border-zinc-800 shadow-xl space-y-6">

      {/* Header & Back Button */}
      <div className="flex items-center justify-between">
        <button
          onClick={onBack}
          className="flex items-center gap-1.5 text-xs font-bold text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-200 transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Setup</span>
        </button>
        <div className="flex items-center gap-2 px-3 py-1 bg-rose-500/10 text-rose-500 rounded-full text-xs font-black">
          <ShoppingBag className="w-3.5 h-3.5" />
          <span>{state.pantry.length} Items Selected</span>
        </div>
      </div>

      <div>
        <h2 className="text-xl font-black text-zinc-900 dark:text-white">What's Already in Your Kitchen?</h2>
        <p className="text-xs text-zinc-500 dark:text-zinc-400">Tap preset items or type your own unique foodstuffs below.</p>
      </div>

      {/* ➕ Custom Ingredient Input Form */}
      <form onSubmit={handleAddCustomItem} className="flex gap-2">
        <input
          type="text"
          value={customInput}
          onChange={(e) => setCustomInput(e.target.value)}
          placeholder="Add custom food item (e.g. Suya spice, Ayamase paste)..."
          className="flex-1 bg-zinc-100 dark:bg-zinc-800 border border-zinc-300 dark:border-zinc-700 rounded-xl px-4 py-2.5 text-xs font-semibold text-zinc-800 dark:text-zinc-200 focus:outline-none focus:border-rose-500 transition-colors"
        />
        <button
          type="submit"
          className="px-4 py-2.5 bg-rose-500 hover:bg-rose-600 text-white rounded-xl text-xs font-bold transition flex items-center gap-1 cursor-pointer shrink-0 shadow-md shadow-rose-500/20"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>Add</span>
        </button>
      </form>

      {/* 🔍 Sticky Search Bar */}
      <div className="sticky top-0 z-20 bg-white/90 dark:bg-zinc-900/90 backdrop-blur-md py-2">
        <div className="relative">
          <Search className="absolute left-4 top-3.5 w-4 h-4 text-zinc-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search preset ingredients (e.g. Rice, Eggs, Pasta)..."
            className="w-full bg-zinc-100 dark:bg-zinc-800 border border-zinc-300 dark:border-zinc-700 rounded-xl pl-11 pr-4 py-3 text-sm font-semibold text-zinc-800 dark:text-zinc-200 focus:outline-none focus:border-rose-500 transition-colors"
          />
        </div>

        {/* 🏷️ Horizontal Category Chips */}
        <div className="flex gap-2 overflow-x-auto pt-3 pb-1 scrollbar-none">
          <button
            type="button"
            onClick={() => setSelectedCategory('All')}
            className={`px-4 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${selectedCategory === 'All'
                ? 'bg-rose-500 text-white shadow-md shadow-rose-500/20'
                : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-200 dark:hover:bg-zinc-700'
              }`}
          >
            All Items
          </button>
          {PANTRY_DATABASE.map((cat) => (
            <button
              type="button"
              key={cat.category}
              onClick={() => setSelectedCategory(cat.category)}
              className={`px-4 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${selectedCategory === cat.category
                  ? 'bg-rose-500 text-white shadow-md shadow-rose-500/20'
                  : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-200 dark:hover:bg-zinc-700'
                }`}
            >
              {cat.category}
            </button>
          ))}
        </div>
      </div>

      {/* 🧺 Tappable Ingredient Chips Grid */}
      <div className="space-y-6 max-h-56 overflow-y-auto pr-1">
        {filteredCategories.length === 0 ? (
          <div className="text-center py-6 text-xs text-zinc-400">
            No preset ingredients found matching "{searchQuery}"
          </div>
        ) : (
          filteredCategories.map((cat) => (
            <div key={cat.category} className="space-y-2">
              <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-400">{cat.category}</h3>
              <div className="flex flex-wrap gap-2">
                {cat.items.map((item) => {
                  const isSelected = state.pantry.includes(item);
                  return (
                    <button
                      type="button"
                      key={item}
                      onClick={() => toggleIngredient(item)}
                      className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${isSelected
                          ? 'bg-rose-500 text-white shadow-md shadow-rose-500/20 scale-105'
                          : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-200 dark:hover:bg-zinc-700/80 border border-zinc-200/50 dark:border-zinc-700/50'
                        }`}
                    >
                      {isSelected && <Check className="w-3.5 h-3.5" />}
                      <span>{item}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          ))
        )}
      </div>

      {/* ⚡ Energy Level Selector */}
      <div className="space-y-3 pt-4 border-t border-zinc-200 dark:border-zinc-800">
        <label className="flex items-center gap-2 text-xs font-bold text-zinc-700 dark:text-zinc-300 uppercase tracking-wider">
          <Zap className="w-4 h-4 text-amber-500" />
          <span>Cooking Energy Level ({state.energyLevel}/5)</span>
        </label>

        <div className="grid grid-cols-1 gap-2">
          {ENERGY_LEVELS.map((el) => (
            <button
              type="button"
              key={el.level}
              onClick={() => updateState({ energyLevel: el.level as any })}
              className={`flex items-center justify-between px-4 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer border ${state.energyLevel === el.level
                  ? 'bg-amber-500/10 border-amber-500 text-amber-600 dark:text-amber-400 shadow-sm'
                  : 'bg-zinc-100 dark:bg-zinc-800 border-zinc-200 dark:border-zinc-700 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-200 dark:hover:bg-zinc-700'
                }`}
            >
              <div className="flex items-center gap-2">
                <span>{el.icon}</span>
                <span>{el.label}</span>
              </div>
              <span className="text-[10px] opacity-75">Level {el.level}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Error Warning Banner */}
      {errorMsg && (
        <div className="p-4 bg-rose-500/10 border border-rose-500/30 rounded-xl text-rose-600 dark:text-rose-400 text-xs font-bold animate-shake text-center">
          {errorMsg}
        </div>
      )}

      {/* Generate Button */}
      <button
        type="button"
        onClick={handleGenerate}
        className="w-full py-4 bg-rose-500 hover:bg-rose-600 text-white font-black text-sm rounded-xl transition-all shadow-xl shadow-rose-500/30 cursor-pointer flex items-center justify-center gap-2"
      >
        <span>Generate AI Survival Plan 🚀</span>
      </button>

    </div>
  );
}