// src/components/RecipeCard.tsx
import React from 'react';
import { Clock, Users, Globe } from 'lucide-react';
import type { Recipe } from '../services/api';

interface RecipeCardProps {
  recipe: Recipe;
}

export default function RecipeCard({ recipe }: RecipeCardProps) {
  const totalTime = recipe.prepTime + recipe.cookTime;

  return (
    <article className="group flex flex-col bg-white dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800/80 rounded-2xl overflow-hidden shadow-sm hover:shadow-md hover:border-zinc-200 dark:hover:border-zinc-700 transition-all duration-300">
      {/* 1. Card Image Container */}
      <div className="relative aspect-video w-full overflow-hidden bg-zinc-100 dark:bg-zinc-850">
        <img
          src={recipe.coverImage}
          alt={recipe.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
          loading="lazy"
        />
        {/* Country Badge Overlay */}
        <span className="absolute top-3 left-3 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-white/95 dark:bg-zinc-900/95 text-zinc-900 dark:text-zinc-50 shadow-sm backdrop-blur-sm">
          <Globe className="w-3.5 h-3.5 text-rose-500" />
          {recipe.countryOfOrigin}
        </span>
      </div>

      {/* 2. Card Content */}
      <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
        <div>
          <h3 className="font-extrabold text-lg line-clamp-1 group-hover:text-rose-500 transition-colors">
            {recipe.title}
          </h3>
          <p className="text-sm text-zinc-500 dark:text-zinc-400 line-clamp-2 mt-1">
            {recipe.description}
          </p>
        </div>

        {/* 3. Card Meta Info */}
        <div className="flex items-center justify-between text-xs font-medium text-zinc-500 dark:text-zinc-400 border-t border-zinc-100 dark:border-zinc-800/80 pt-4">
          <div className="flex items-center gap-1">
            <Clock className="w-4 h-4 text-zinc-400" />
            <span>{totalTime} mins</span>
          </div>
          <div className="flex items-center gap-1">
            <Users className="w-4 h-4 text-zinc-400" />
            <span>{recipe.servingsDefault} servings</span>
          </div>
        </div>
      </div>
    </article>
  );
}