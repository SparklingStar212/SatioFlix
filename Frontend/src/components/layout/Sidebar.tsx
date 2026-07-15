// src/components/layout/Sidebar.tsx
import React from 'react';
import { useNavigate, useSearchParams, useLocation } from 'react-router-dom';
import { ChefHat, Film, PlusCircle, Globe, Moon, Sun } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';

const CUISINES = [
  { name: 'Korean', flag: '🇰🇷' },
  { name: 'Nigerian', flag: '🇳🇬' },
  { name: 'Italian', flag: '🇮🇹' },
  { name: 'Mexican', flag: '🇲🇽' },
  { name: 'Japanese', flag: '🇯🇵' }
];

export default function Sidebar() {
  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams] = useSearchParams();
  const { theme, toggleTheme } = useTheme();

  const activeCountry = searchParams.get('country');
  const isHomeActive = location.pathname === '/' && !activeCountry;
  const isReelsActive = location.pathname === '/reels';
  const isCreateActive = location.pathname === '/create';

  const handleCuisineClick = (countryName: string) => {
    navigate(`/?country=${countryName}`);
  };

  const handleAllCuisinesClick = () => {
    navigate('/');
  };

  return (
    <>
      {/* 📱 1. MODERN TOP MOBILE HEADER (Only visible on screens smaller than md) */}
      <header className="md:hidden fixed top-0 left-0 right-0 h-14 bg-white/80 dark:bg-zinc-900/80 backdrop-blur-md border-b border-zinc-200/60 dark:border-zinc-800/60 flex items-center justify-between px-4 z-40">
        <div
          onClick={handleAllCuisinesClick}
          className="flex items-center gap-2 cursor-pointer"
        >
          <ChefHat className="w-6 h-6 text-rose-500" />
          <span className="text-lg font-black tracking-tight text-rose-500">SatioFlix</span>
        </div>

        {/* 🌙 / ☀️ Toggle Button with active scaling animation */}
        <button
          onClick={toggleTheme}
          className="p-2 rounded-xl bg-zinc-100 dark:bg-zinc-800/80 hover:bg-zinc-200 text-zinc-600 dark:text-zinc-300 transition-all duration-300 active:scale-90 cursor-pointer"
          aria-label="Toggle Theme"
        >
          {theme === 'dark' ? (
            <Sun className="w-4 h-4 text-amber-500 animate-pulse" />
          ) : (
            <Moon className="w-4 h-4 text-indigo-500" />
          )}
        </button>
      </header>


      {/* 📱 2. BOTTOM NAV + 💻 DESKTOP LEFT SIDEBAR */}
      <aside
        /* 
          Mobile: Fixed at bottom, full width.
          Desktop: Sticky left column.
        */
        className="w-full md:w-64 bg-white/90 dark:bg-zinc-900/90 backdrop-blur-lg border-t md:border-t-0 md:border-r border-zinc-200 dark:border-zinc-800 flex flex-row md:flex-col p-2 md:p-4 z-40 shrink-0 h-16 md:h-screen fixed bottom-0 left-0 right-0 md:sticky md:top-0 md:bottom-auto"
      >
        {/* App Branding (Desktop Only) */}
        <div
          onClick={handleAllCuisinesClick}
          className="hidden md:flex items-center gap-2 px-2 mb-8 cursor-pointer group"
        >
          <ChefHat className="w-8 h-8 text-rose-500 group-hover:rotate-12 transition-transform duration-300" />
          <h1 className="text-xl font-black tracking-tight text-rose-500">SatioFlix</h1>
        </div>

        {/* Main Navigation Links */}
        <nav className="flex-1 flex flex-row md:flex-col gap-1 md:gap-1.5 justify-around md:justify-start items-center md:items-stretch w-full">

          {/* All Recipes (Home) */}
          <button
            onClick={handleAllCuisinesClick}
            className={`flex flex-col md:flex-row items-center gap-1 md:gap-3 px-3 md:px-4 py-1 md:py-2.5 rounded-xl text-[10px] md:text-sm font-bold transition-all duration-300 cursor-pointer ${isHomeActive
                ? 'text-rose-500 md:bg-rose-500 md:text-white md:shadow-lg md:shadow-rose-500/20'
                : 'text-zinc-400 dark:text-zinc-500 md:text-zinc-500 md:dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800/60'
              }`}
          >
            <ChefHat className="w-5 h-5" />
            <span>Home</span>
          </button>

          {/* Short Reels Feed */}
          <button
            onClick={() => navigate('/reels')}
            className={`flex flex-col md:flex-row items-center gap-1 md:gap-3 px-3 md:px-4 py-1 md:py-2.5 rounded-xl text-[10px] md:text-sm font-bold transition-all duration-300 cursor-pointer ${isReelsActive
                ? 'text-rose-500 md:bg-rose-500 md:text-white md:shadow-lg md:shadow-rose-500/20'
                : 'text-zinc-400 dark:text-zinc-500 md:text-zinc-500 md:dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800/60'
              }`}
          >
            <Film className="w-5 h-5" />
            <span>Satio Reels</span>
          </button>

          {/* Add Recipe Form */}
          <button
            onClick={() => navigate('/create')}
            className={`flex flex-col md:flex-row items-center gap-1 md:gap-3 px-3 md:px-4 py-1 md:py-2.5 rounded-xl text-[10px] md:text-sm font-bold transition-all duration-300 cursor-pointer ${isCreateActive
                ? 'text-rose-500 md:bg-rose-500 md:text-white md:shadow-lg md:shadow-rose-500/20'
                : 'text-zinc-400 dark:text-zinc-500 md:text-zinc-500 md:dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800/60'
              }`}
          >
            <PlusCircle className="w-5 h-5" />
            <span>Add Recipe</span>
          </button>

          {/* --- Divider for Desktop Layout --- */}
          <div className="hidden md:block my-4 border-t border-zinc-200 dark:border-zinc-800" />

          {/* Dynamic Cuisines Sub-list (Desktop Only) */}
          <div className="hidden md:flex flex-col gap-1.5 w-full">
            <div className="px-4 py-2 flex items-center gap-2 text-zinc-400 text-[10px] font-bold uppercase tracking-wider">
              <Globe className="w-3.5 h-3.5" />
              <span>Explore Cuisines</span>
            </div>

            {CUISINES.map((cuisine) => {
              const isActive = activeCountry === cuisine.name;
              return (
                <button
                  key={cuisine.name}
                  onClick={() => handleCuisineClick(cuisine.name)}
                  className={`flex items-center justify-between px-4 py-2 rounded-xl text-xs font-bold transition-all duration-300 cursor-pointer ${isActive
                      ? 'bg-rose-100/75 dark:bg-rose-950/20 text-rose-600 dark:text-rose-400 border border-rose-200 dark:border-rose-900/40'
                      : 'text-zinc-500 dark:text-zinc-400 hover:bg-zinc-50 dark:hover:bg-zinc-800/40 border border-transparent'
                    }`}
                >
                  <span>{cuisine.name}</span>
                  <span className="text-sm">{cuisine.flag}</span>
                </button>
              );
            })}
          </div>
        </nav>

        {/* Theme Toggle Button (Desktop Only) */}
        <div className="hidden md:block pt-4 border-t border-zinc-200 dark:border-zinc-800">
          <button
            onClick={toggleTheme}
            className="w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-xs font-bold text-zinc-500 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800/60 cursor-pointer transition-colors"
          >
            {theme === 'dark' ? (
              <>
                <Sun className="w-4 h-4 text-amber-500" />
                <span>Light Mode</span>
              </>
            ) : (
              <>
                <Moon className="w-4 h-4 text-indigo-500" />
                <span>Dark Mode</span>
              </>
            )}
          </button>
        </div>
      </aside>
    </>
  );
}