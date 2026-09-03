// src/components/survival/SurvivalResults.tsx
import { useState, useEffect } from 'react';
import { useSurvival } from '../../context/SurvivalContext';
import type { SurvivalPlanResponse, Video, DailyMealSlot } from '../../services/api';
import { api } from '../../services/api';
import { CheckCircle2, ShoppingCart, Calendar, RotateCcw, PlaySquare, DollarSign, Sparkles } from 'lucide-react';

interface SurvivalResultsProps {
  plan: SurvivalPlanResponse;
  onReset: () => void;
}

// --- STEP 10: THE FUZZY MATCHER ALGORITHM ---
const findSynergyMatch = (mealTitle: string, videos: Video[]): Video | undefined => {
  const cleanString = (str: string) => str.toLowerCase().replace(/[^a-z0-9 ]/g, '');
  const ignoreWords = ['and', 'with', 'fried', 'boiled', 'student', 'survival', 'meal', 'the', 'a', 'quick', 'easy', 'minute'];

  const mealKeywords = cleanString(mealTitle).split(' ').filter(word => word.length > 2 && !ignoreWords.includes(word));
  if (mealKeywords.length === 0) return undefined;

  let bestVideo: Video | undefined = undefined;
  let highestScore = 0;

  videos.forEach((video) => {
    const videoKeywords = cleanString(video.title).split(' ');
    let matchScore = 0;

    mealKeywords.forEach(word => {
      if (videoKeywords.includes(word)) matchScore++;
      else if (videoKeywords.some(vw => vw.includes(word) || word.includes(vw))) matchScore += 0.5;
    });

    if (matchScore >= 1 && matchScore > highestScore) {
      bestVideo = video;
      highestScore = matchScore;
    }
  });

  return bestVideo;
};

export default function SurvivalResults({ plan, onReset }: SurvivalResultsProps) {
  const { state } = useSurvival();
  const [matchingVideos, setMatchingVideos] = useState<Video[]>([]);
  const [activeTab, setActiveTab] = useState<'meals' | 'grocery'>('meals');

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const res = await api.get<Video[]>('/api/videos');
        setMatchingVideos(res.data);
      } catch (err) {
        console.error("Failed to fetch videos for reel sync:", err);
      }
    };
    fetchVideos();
  }, [],);

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-200 dark:border-zinc-800 shadow-xl space-y-6 animate-fade-in">

      {/* Top Banner & Summary */}
      <div className="flex items-center justify-between border-b border-zinc-200 dark:border-zinc-800 pb-4">
        <div>
          <span className="px-3 py-1 bg-emerald-500/10 text-emerald-500 rounded-full text-xs font-black uppercase tracking-wider">
            Mission Successful 🛡️
          </span>
          <h2 className="text-xl font-black text-zinc-900 dark:text-white mt-2">Your {state.days}-Day Survival Plan</h2>
        </div>
        <button
          onClick={onReset}
          className="flex items-center gap-1.5 px-3 py-2 bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 text-zinc-600 dark:text-zinc-300 rounded-xl text-xs font-bold transition-all cursor-pointer"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>New Mission</span>
        </button>
      </div>

      {/* Budget Overview Cards */}
      <div className="grid grid-cols-2 gap-4">
        <div className="p-4 bg-zinc-50 dark:bg-zinc-800/50 rounded-xl border border-zinc-200/60 dark:border-zinc-700/60">
          <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-400">Total Budget Allocated</span>
          <div className="text-lg font-black text-zinc-900 dark:text-white mt-0.5 flex items-center">
            <DollarSign className="w-4 h-4 text-rose-500 -ml-1" />
            <span>{state.budget.toLocaleString()} {plan.currency}</span>
          </div>
        </div>
        <div className="p-4 bg-emerald-500/5 rounded-xl border border-emerald-500/20">
          <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">Estimated Spent</span>
          <div className="text-lg font-black text-emerald-600 dark:text-emerald-400 mt-0.5 flex items-center">
            <span>{plan.totalBudgetUsed.toLocaleString()} {plan.currency}</span>
          </div>
        </div>
      </div>

      {/* Toggle Tabs */}
      <div className="flex bg-zinc-100 dark:bg-zinc-800 p-1 rounded-xl">
        <button
          onClick={() => setActiveTab('meals')}
          className={`flex-1 py-2.5 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center justify-center gap-2 ${activeTab === 'meals' ? 'bg-white dark:bg-zinc-900 text-rose-500 shadow-sm' : 'text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-200'
            }`}
        >
          <Calendar className="w-4 h-4" />
          <span>Meal Timetable ({plan.meals.length} Days)</span>
        </button>
        <button
          onClick={() => setActiveTab('grocery')}
          className={`flex-1 py-2.5 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center justify-center gap-2 ${activeTab === 'grocery' ? 'bg-white dark:bg-zinc-900 text-rose-500 shadow-sm' : 'text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-200'
            }`}
        >
          <ShoppingCart className="w-4 h-4" />
          <span>Grocery Checklist ({plan.groceryList.length})</span>
        </button>
      </div>

      {/* TAB 1: MEAL TIMETABLE */}
      {activeTab === 'meals' && (
        <div className="space-y-6 max-h-125 overflow-y-auto pr-1 scrollbar-thin">
          {plan.meals.map((dayPlan, dayIdx) => (
            <div key={dayIdx} className="space-y-3">
              {/* Day Header Badge */}
              <div className="flex items-center gap-2">
                <span className="px-3 py-1 bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 rounded-lg text-xs font-black uppercase tracking-wider">
                  Day {dayPlan.day}
                </span>
                <div className="h-px bg-zinc-200 dark:bg-zinc-800 flex-1" />
              </div>

              {/* Render Daily Meal Slots (Lunch & Dinner) */}
              <div className="space-y-3">
                {dayPlan.dailyMeals?.map((meal: DailyMealSlot, mealIdx: number) => {
                  const matchedVideo = findSynergyMatch(meal.mealTitle, matchingVideos);

                  return (
                    <div
                      key={mealIdx}
                      className="p-4 bg-zinc-50 dark:bg-zinc-800/40 rounded-xl border border-zinc-200 dark:border-zinc-700/60 flex flex-col sm:flex-row gap-4 justify-between relative overflow-hidden"
                    >
                      {matchedVideo && <div className="absolute top-0 right-0 w-16 h-16 bg-rose-500/5 rounded-bl-full z-0" />}

                      <div className="z-10 flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <span className="px-2 py-0.5 bg-rose-500/10 text-rose-500 rounded text-[10px] font-black uppercase">
                            {meal.slot}
                          </span>
                          <span className="text-xs font-bold text-zinc-500">
                            ~{plan.currency} {meal.estimatedCost}
                          </span>
                        </div>

                        <h3 className="text-sm font-black text-zinc-900 dark:text-white leading-tight">
                          {meal.mealTitle}
                        </h3>

                        <ul className="mt-2.5 space-y-1.5 text-xs text-zinc-600 dark:text-zinc-400">
                          {meal.instructions.map((step, i) => (
                            <li key={i} className="flex items-start gap-1.5">
                              <span className="text-rose-500 font-bold mt-0.5">•</span>
                              <span className="leading-relaxed">{step}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* VISUAL REEL INJECTION */}
                      {matchedVideo && (
                        <div className="z-10 sm:w-32 shrink-0 flex flex-col gap-2 border-t sm:border-t-0 sm:border-l border-zinc-200 dark:border-zinc-700 pt-3 sm:pt-0 sm:pl-4 justify-center">
                          <div className="text-[10px] font-bold text-rose-500 flex items-center gap-1">
                            <Sparkles className="w-3 h-3" />
                            <span>Video Match</span>
                          </div>
                          <a
                            href={`/reels?v=${matchedVideo._id}`}
                            className="group relative w-full aspect-video sm:aspect-square bg-zinc-900 rounded-lg overflow-hidden flex items-center justify-center border border-zinc-800 shadow-md hover:ring-2 ring-rose-500 transition-all cursor-pointer"
                          >
                            {matchedVideo.thumbnailUrl ? (
                              <img
                                src={matchedVideo.thumbnailUrl}
                                alt={matchedVideo.title}
                                className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:opacity-40 transition-opacity"
                              />
                            ) : (
                              <div className="absolute inset-0 bg-linear-to-br from-rose-900 to-zinc-900 opacity-80" />
                            )}
                            <PlaySquare className="w-8 h-8 text-white relative z-10 drop-shadow-lg group-hover:scale-110 transition-transform" />
                          </a>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* TAB 2: GROCERY CHECKLIST */}
      {activeTab === 'grocery' && (
        <div className="space-y-2 max-h-96 overflow-y-auto pr-1">
          {plan.groceryList.map((item, idx) => (
            <div key={idx} className="flex items-center justify-between p-3.5 bg-zinc-50 dark:bg-zinc-800/40 rounded-xl border border-zinc-200 dark:border-zinc-700/60">
              <div className="flex items-center gap-3">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                <span className="text-xs font-bold text-zinc-800 dark:text-zinc-200">{item.name}</span>
              </div>
              <span className="text-xs font-black text-zinc-500">
                ~{item.estimatedCost} {plan.currency}
              </span>
            </div>
          ))}
        </div>
      )}

    </div>
  );
}