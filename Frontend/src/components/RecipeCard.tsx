// src/components/RecipeCard.tsx
import { useEffect, useState } from 'react';
import { Clock, Users, Globe, Heart } from 'lucide-react';
import type { Recipe } from '../services/api';

interface RecipeCardProps {
  recipe: Recipe;
}

export default function RecipeCard({ recipe }: RecipeCardProps) {
  const [isFavorited, setIsFavorited] = useState(false);

  // Sync state with localStorage on mount
  useEffect(() => {
    const favorites = JSON.parse(localStorage.getItem('satio_favorites') || '[]');
    setIsFavorited(favorites.includes(recipe._id));
  }, [recipe._id]);

  const toggleFavorite = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevents the card click (opening details drawer) from firing!
    
    const favorites = JSON.parse(localStorage.getItem('satio_favorites') || '[]');
    let updatedFavorites: string[];

    if (favorites.includes(recipe._id)) {
      updatedFavorites = favorites.filter((id: string) => id !== recipe._id);
      setIsFavorited(false);
    } else {
      updatedFavorites = [...favorites, recipe._id];
      setIsFavorited(true);
    }

    localStorage.setItem('satio_favorites', JSON.stringify(updatedFavorites));
    
    // Dispatch a custom event so our Home screen can instantly listen and update!
    window.dispatchEvent(new Event('favorites-updated'));
  };

  const totalTime = recipe.prepTime + recipe.cookTime;

  return (
    <div className="group relative bg-white dark:bg-zinc-900 rounded-3xl border border-zinc-100 dark:border-zinc-800/80 overflow-hidden shadow-sm hover:shadow-xl hover:border-zinc-200/80 dark:hover:border-zinc-700/60 transition-all duration-300 flex flex-col h-full">
      
      {/* 📸 Recipe Cover Image */}
      <div className="relative aspect-video w-full bg-zinc-100 dark:bg-zinc-800 overflow-hidden">
        <img 
          src={recipe.coverImage} 
          alt={recipe.title} 
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        
        {/* Flag Badge */}
        <span className="absolute bottom-3 left-3 inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-extrabold bg-white/95 dark:bg-zinc-900/95 text-zinc-900 dark:text-zinc-50 shadow-md backdrop-blur-sm">
          <Globe className="w-3 h-3 text-rose-500" />
          {recipe.countryOfOrigin}
        </span>

        {/* 💖 FLOATING HEART TOGGLE */}
        <button
          onClick={toggleFavorite}
          className="absolute top-3 right-3 p-2 rounded-full bg-white/90 dark:bg-zinc-900/90 hover:bg-white dark:hover:bg-zinc-800 shadow-md backdrop-blur-sm transition-all duration-200 active:scale-90 cursor-pointer group/heart"
          aria-label="Favorite recipe"
        >
          <Heart 
            className={`w-4 h-4 transition-colors ${
              isFavorited 
                ? 'fill-rose-500 stroke-rose-500 scale-110' 
                : 'stroke-zinc-500 dark:stroke-zinc-400 group-hover/heart:stroke-rose-500'
            }`} 
          />
        </button>
      </div>

      {/* 📝 Content Body */}
      <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
        <div>
          <span className="text-[10px] font-black uppercase tracking-wider text-rose-500">
            by {recipe.author}
          </span>
          <h3 className="font-extrabold text-base text-zinc-900 dark:text-zinc-50 mt-1 line-clamp-1">
            {recipe.title}
          </h3>
          <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1.5 line-clamp-2 leading-relaxed">
            {recipe.description}
          </p>
        </div>

        {/* 🕒 Time & Servings Info */}
        <div className="flex items-center gap-4 text-zinc-500 dark:text-zinc-400 text-[11px] font-bold border-t border-zinc-100 dark:border-zinc-800/60 pt-3">
          <div className="flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5 text-zinc-400" />
            <span>{totalTime} mins</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Users className="w-3.5 h-3.5 text-zinc-400" />
            <span>Serves {recipe.servingsDefault}</span>
          </div>
        </div>
      </div>
    </div>
  );
}