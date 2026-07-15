// src/components/RecipeDrawer.tsx
import React, { useState } from 'react';
import { X, Clock, Users, Globe, Check, ChefHat } from 'lucide-react';
import type { Recipe } from '../services/api';

interface RecipeDrawerProps {
  recipe: Recipe | null;
  onClose: () => void;
}

export default function RecipeDrawer({ recipe, onClose }: RecipeDrawerProps) {
  const [checkedIngredients, setCheckedIngredients] = useState<Record<string, boolean>>({});

  if (!recipe) return null;

  const totalTime = recipe.prepTime + recipe.cookTime;

  const toggleIngredient = (name: string) => {
    setCheckedIngredients(prev => ({
      ...prev,
      [name]: !prev[name]
    }));
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      {/* Backdrop overlay */}
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Slide-over Drawer Panel */}
      <div className="relative w-full max-w-lg h-full bg-white dark:bg-zinc-900 shadow-2xl flex flex-col z-50 transform transition-transform duration-300 ease-out">
        {/* Header Section */}
        <div className="p-4 border-b border-zinc-100 dark:border-zinc-800 flex items-center justify-between">
          <div className="flex items-center gap-2 text-rose-500 font-bold text-sm">
            <ChefHat className="w-5 h-5" />
            <span>Recipe Details</span>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-xl hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-500 cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Recipe Body */}
        <div className="flex-1 overflow-y-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {/* Header Cover Image */}
          <div className="relative aspect-video w-full bg-zinc-100 dark:bg-zinc-800">
            <img
              src={recipe.coverImage}
              alt={recipe.title}
              className="w-full h-full object-cover"
            />
            <span className="absolute bottom-4 left-4 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold bg-white/95 dark:bg-zinc-900/95 text-zinc-900 dark:text-zinc-50 shadow-md backdrop-blur-sm">
              <Globe className="w-3.5 h-3.5 text-rose-500" />
              {recipe.countryOfOrigin}
            </span>
          </div>

          <div className="p-6 space-y-6">
            {/* Title & Description */}
            <div>
              <h2 className="text-2xl font-black tracking-tight">{recipe.title}</h2>
              <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-2 leading-relaxed">
                {recipe.description}
              </p>
            </div>

            {/* Quick Cooking Statistics Row */}
            <div className="grid grid-cols-3 gap-2 p-3 bg-zinc-50 dark:bg-zinc-800/40 rounded-2xl border border-zinc-100 dark:border-zinc-800/50 text-center">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-400">Prep</span>
                <p className="text-sm font-extrabold mt-0.5">{recipe.prepTime}m</p>
              </div>
              <div className="border-x border-zinc-200/60 dark:border-zinc-800/80">
                <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-400">Cook</span>
                <p className="text-sm font-extrabold mt-0.5">{recipe.cookTime}m</p>
              </div>
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-400">Servings</span>
                <p className="text-sm font-extrabold mt-0.5">{recipe.servingsDefault}</p>
              </div>
            </div>

            {/* 1. Ingredients Checklist */}
            <div className="space-y-3">
              <h3 className="font-extrabold text-base border-b border-zinc-100 dark:border-zinc-800/60 pb-2">
                Ingredients <span className="text-xs text-zinc-400 font-normal">({recipe.ingredients.length} items)</span>
              </h3>
              <ul className="space-y-2">
                {recipe.ingredients.map((ing, idx) => {
                  const uniqueKey = `${ing.name}-${idx}`;
                  const isChecked = !!checkedIngredients[uniqueKey];
                  return (
                    <li
                      key={uniqueKey}
                      onClick={() => toggleIngredient(uniqueKey)}
                      className={`flex items-center gap-3 p-3 rounded-xl border transition-all duration-200 cursor-pointer ${isChecked
                          ? 'bg-rose-50/40 dark:bg-rose-950/10 border-rose-100 dark:border-rose-900/30 opacity-60'
                          : 'bg-white dark:bg-zinc-900 border-zinc-100 dark:border-zinc-800/80 hover:border-zinc-200'
                        }`}
                    >
                      <div className={`w-5 h-5 rounded-md flex items-center justify-center border transition-all ${isChecked
                          ? 'bg-rose-500 border-rose-500 text-white'
                          : 'border-zinc-300 dark:border-zinc-700'
                        }`}>
                        {isChecked && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                      </div>
                      <span className={`text-sm ${isChecked ? 'line-through text-zinc-400' : 'font-medium'}`}>
                        {ing.quantity} {ing.unit} of {ing.name}
                      </span>
                    </li>
                  );
                })}
              </ul>
            </div>

            {/* 2. Structured Instructions */}
            <div className="space-y-4">
              <h3 className="font-extrabold text-base border-b border-zinc-100 dark:border-zinc-800/60 pb-2">
                Step-by-Step Directions
              </h3>
              <div className="space-y-4">
                {recipe.instructions.map((step) => (
                  <div key={step.stepNumber} className="flex gap-4">
                    <span className="w-6 h-6 rounded-full bg-rose-100 dark:bg-rose-950/50 text-rose-600 dark:text-rose-400 flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
                      {step.stepNumber}
                    </span>
                    <p className="text-sm text-zinc-600 dark:text-zinc-300 leading-relaxed pt-0.5">
                      {step.text}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}