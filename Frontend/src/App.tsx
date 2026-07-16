// src/App.tsx
import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useSearchParams, useLocation } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import Sidebar from './components/layout/Sidebar';
import RecipeCard from './components/RecipeCard';
import RecipeDrawer from './components/RecipeDrawer';
import CreateRecipePage from './components/CreateRecipePage';
import ReelsPage from './components/ReelsPage';
import { api } from './services/api';
import type { Recipe } from './services/api';
import { Loader2, Heart } from 'lucide-react';

// 🎲 High-performance Fisher-Yates Shuffle algorithm
const shuffleArray = <T,>(array: T[]): T[] => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

const TAG_FILTERS = ['All', 'Vegan', 'Spicy', 'Easy', 'Dessert', 'Quick', 'Healthy', 'Savory', 'Breakfast', 'Lunch', 'Sour', 'Vegetarian', 'Comfort-Food', 'Sweet', 'Soup', 'Salad', 'Classic', 'Creamy', 'Spiced', 'Curry', 'Slow-Cooked', 'Exotic', 'Sweet-Savory',  'Crispy', 'Onion-Heavy', 'Baked', 'Celebration', 'Traditional', 'Authentic', 'Cheesy', 'Seafood', 'Street-Food', 'Sweet-Spicy', 'Smoky', 'Beefy', 'Porky', 'Smoky', 'Grill', 'Stir-Fry', 'Fried', 'Herby', 'Chicken', 'Fresh', 'Classic', 'Pastry'];

function Home() {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTag, setActiveTag] = useState('All');

  // ⭐️ Favorites State
  const [favoriteIds, setFavoriteIds] = useState<string[]>([]);
  const [showFavoritesOnly, setShowFavoritesOnly] = useState(false);

  const [searchParams] = useSearchParams();
  const countryFilter = searchParams.get('country') || '';
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);

  // Fetch initial recipes
  useEffect(() => {
    const fetchRecipes = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await api.get('/recipes');

        // 🔀 SHUFFLE! Randomize the recipes catalog immediately on fetch
        const randomizedRecipes = shuffleArray<Recipe>(response.data);
        setRecipes(randomizedRecipes);
      } catch (err: any) {
        console.error("❌ Failed to fetch recipes:", err);
        setError("Could not connect to the SatioFlix server. Make sure your Backend is running on port 5000!");
      } finally {
        setIsLoading(false);
      }
    };

    fetchRecipes();
  }, [countryFilter]);

  // Load and listen to localStorage updates for Favorites
  useEffect(() => {
    const loadFavorites = () => {
      const saved = JSON.parse(localStorage.getItem('satio_favorites') || '[]');
      setFavoriteIds(saved);
    };

    loadFavorites();

    window.addEventListener('favorites-updated', loadFavorites);
    return () => window.removeEventListener('favorites-updated', loadFavorites);
  }, []);

  // Reset tag selection when switching countries
  useEffect(() => {
    setActiveTag('All');
    setShowFavoritesOnly(false);
  }, [countryFilter]);

  // 🔎 Combined Master Filter
  const filteredRecipes = recipes.filter((recipe) => {
    const matchesFavorites = !showFavoritesOnly || favoriteIds.includes(recipe._id);

    const queryCountry = countryFilter.trim().toLowerCase();
    let matchesCountry = true;
    if (countryFilter) {
      const dbCountry = recipe.countryOfOrigin?.trim().toLowerCase() || '';
      const countryMap: Record<string, string[]> = {
        korean: ['south korea', 'korea', 'korean'],
        nigerian: ['nigeria', 'nigerian'],
        italian: ['italy', 'italian'],
        mexican: ['mexico', 'mexican'],
        japanese: ['japan', 'japanese'],
        chinese: ['china', 'chinese'],
        indian: ['india', 'indian'],
        thai: ['thailand', 'thai'],
        french: ['france', 'french'],
        spanish: ['spain', 'spanish'],
        greek: ['greece', 'greek'],
        brazilian: ['brazil', 'brazilian'],
        vietnamese: ['vietnam', 'vietnamese'],
        british: ['united kingdom', 'british', 'uk', 'england'],
        american: ['united states', 'usa', 'us', 'american'],
        'middle eastern': ['middle east', 'middle eastern', 'lebanon', 'egypt', 'turkish']
      };
      const acceptableMatches = countryMap[queryCountry] || [queryCountry];
      matchesCountry = acceptableMatches.includes(dbCountry);
    }

    const matchesTag =
      activeTag === 'All' ||
      recipe.tags?.some(tag => tag.toLowerCase() === activeTag.toLowerCase());

    const queryText = searchQuery.toLowerCase().trim();
    const matchesText =
      !queryText ||
      recipe.title.toLowerCase().includes(queryText) ||
      recipe.tags?.some(tag => tag.toLowerCase().includes(queryText)) ||
      recipe.description?.toLowerCase().includes(queryText);

    return matchesFavorites && matchesCountry && matchesTag && matchesText;
  });

  return (
    <div className="p-4 md:p-8 max-w-7xl mx-auto space-y-6">
      {/* Header & Search Row */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 border-b border-zinc-100 dark:border-zinc-800/80 pb-6">
        <div>
          <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight">
            {showFavoritesOnly ? 'My Bookmarks' : countryFilter ? `${countryFilter} Dishes` : 'Explore Culinary Creations'}
          </h2>
          <p className="text-zinc-500 dark:text-zinc-400 mt-1.5">
            {showFavoritesOnly
              ? 'Your personalized cookbook of saved recipes.'
              : countryFilter
                ? `Curated, authentic recipes originating directly from ${countryFilter}.`
                : 'Browse through premium recipes seeded from all around the globe.'}
          </p>
        </div>

        {/* Search input */}
        <div className="relative w-full md:w-80 shrink-0">
          <input
            type="text"
            placeholder="Search recipes or ingredients..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-11 pr-4 py-3 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-sm focus:outline-none focus:ring-2 focus:ring-rose-500/20 dark:focus:ring-rose-500/10 transition-all shadow-sm"
          />
          <div className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400 pointer-events-none">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
        </div>
      </div>

      {/* Tag Pill Filter Row & Favorites Toggle */}
      {!isLoading && !error && (
        <div className="flex flex-wrap items-center justify-between gap-3 pb-2">
          <div className="flex gap-2 overflow-x-auto scrollbar-none">
            {TAG_FILTERS.map((tag) => (
              <button
                key={tag}
                onClick={() => {
                  setActiveTag(tag);
                  setShowFavoritesOnly(false);
                }}
                className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all duration-300 shrink-0 cursor-pointer ${activeTag === tag && !showFavoritesOnly
                  ? 'bg-rose-600 text-white shadow-md shadow-rose-600/25'
                  : 'bg-white dark:bg-zinc-950 text-zinc-500 dark:text-zinc-400 border border-zinc-200 dark:border-zinc-800 hover:border-zinc-300 dark:hover:border-zinc-700'
                  }`}
              >
                {tag}
              </button>
            ))}
          </div>

          <button
            onClick={() => {
              setShowFavoritesOnly(!showFavoritesOnly);
              setActiveTag('All');
            }}
            className={`px-4 py-1.5 rounded-full text-xs font-bold flex items-center gap-1.5 border transition-all duration-300 cursor-pointer ${showFavoritesOnly
              ? 'bg-rose-100 dark:bg-rose-950/30 text-rose-600 dark:text-rose-400 border-rose-200 dark:border-rose-900/40 shadow-sm'
              : 'bg-white dark:bg-zinc-950 text-zinc-500 dark:text-zinc-400 border-zinc-200 dark:border-zinc-800 hover:border-zinc-300 dark:hover:border-zinc-700'
              }`}
          >
            <Heart className={`w-3.5 h-3.5 ${showFavoritesOnly ? 'fill-rose-500 stroke-rose-500' : 'stroke-zinc-500'}`} />
            <span>Saved Only ({favoriteIds.length})</span>
          </button>
        </div>
      )}

      {/* Loading state */}
      {isLoading && (
        <div className="flex flex-col items-center justify-center py-20 space-y-4">
          <Loader2 className="w-10 h-10 animate-spin text-rose-500" />
          <p className="text-sm font-semibold text-zinc-500">Retrieving flavor profiles...</p>
        </div>
      )}

      {/* Error state */}
      {error && (
        <div className="p-4 rounded-2xl bg-rose-50 dark:bg-rose-950/20 border border-rose-200 dark:border-rose-900/30 text-rose-600 dark:text-rose-400 max-w-2xl text-sm">
          {error}
        </div>
      )}

      {/* Recipe Grid Layout */}
      {!isLoading && !error && (
        <>
          {filteredRecipes.length === 0 ? (
            <div className="text-center py-16 bg-zinc-100/50 dark:bg-zinc-900/40 rounded-3xl border border-dashed border-zinc-200 dark:border-zinc-800">
              <p className="text-zinc-500 font-medium">
                {showFavoritesOnly
                  ? "You haven't bookmarked any recipes yet! Tap the heart icon on any dish."
                  : "No dishes match your active search or tag filters. Try another combination!"}
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredRecipes.map((recipe) => (
                <div
                  key={recipe._id}
                  onClick={() => setSelectedRecipe(recipe)}
                  className="cursor-pointer"
                >
                  <RecipeCard recipe={recipe} />
                </div>
              ))}
            </div>
          )}
        </>
      )}

      {/* Slide-over details Panel */}
      <RecipeDrawer
        recipe={selectedRecipe}
        onClose={() => setSelectedRecipe(null)}
      />
    </div>
  );
}

// 📱 Main Layout Wrapper (Calculates dynamic padding depending on current page URL)
function AppContent() {
  const location = useLocation();
  const isReelsPage = location.pathname === '/reels';

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-50 transition-colors duration-300">

      {/* Sidebar/Bottom Navigation Bar remains mounted */}
      <Sidebar />

      {/* 
        On /reels: No top padding (pt-0) and full bottom bar room (pb-20).
        On other pages: Standard mobile breathing room (pt-14 pb-20).
      */}
      <main
        className={`flex-1 min-h-screen overflow-y-auto md:pt-0 md:pb-0 ${isReelsPage ? 'pt-0 pb-20' : 'pt-14 pb-20'
          }`}
      >
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/reels" element={<ReelsPage />} />
          <Route path="/create" element={<CreateRecipePage />} />
        </Routes>
      </main>
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <Router>
        <AppContent /> {/* 👈 Beautiful. Simply renders the AppContent wrapper with no duplicate nodes! */}
      </Router>
    </ThemeProvider>
  );
}