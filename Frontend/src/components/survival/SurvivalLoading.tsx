// src/components/survival/SurvivalLoading.tsx
import { useState, useEffect } from 'react';
import { useSurvival } from '../../context/SurvivalContext';
import { api } from '../../services/api';
import type { SurvivalPlanResponse } from '../../services/api';
import { Flame, Sparkles } from 'lucide-react';

const LOADING_TIPS = [
  "Calculating the exact cost of survival...",
  "Consulting local market prices...",
  "Checking your pantry for hidden treasures...",
  "Enforcing strict student budget rules...",
  "Matching meals with your SatioFlix reels...",
  "Almost ready... hang tight!"
];

interface SurvivalLoadingProps {
  onPlanGenerated: (plan: SurvivalPlanResponse) => void;
  onError: (errMessage: string) => void;
}

export default function SurvivalLoading({ onPlanGenerated, onError }: SurvivalLoadingProps) {
  const { state } = useSurvival();
  const [tipIndex, setTipIndex] = useState(0);

  // Rotate loading tips every 2.5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setTipIndex((prev) => (prev + 1) % LOADING_TIPS.length);
    }, 2500);

    return () => clearInterval(interval);
  }, []);

  // Dispatch the Axios request on mount
  useEffect(() => {
    const fetchSurvivalPlan = async () => {
      try {
        const response = await api.post<SurvivalPlanResponse>('/survival/generate', state);
        onPlanGenerated(response.data);
      } catch (err: any) {
        console.error("Failed to generate plan:", err);
        onError(err.response?.data?.error || "Failed to generate your survival plan. Please try again.");
      }
    };

    fetchSurvivalPlan();
  }, [state, onPlanGenerated, onError]);

  return (
    <div className="max-w-md mx-auto p-12 bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-200 dark:border-zinc-800 shadow-2xl text-center space-y-6">

      {/* Animated Icon */}
      <div className="relative w-20 h-20 mx-auto flex items-center justify-center bg-rose-500/10 rounded-full animate-pulse">
        <Flame className="w-10 h-10 text-rose-500 animate-bounce" />
        <div className="absolute -top-1 -right-1 p-1 bg-amber-500 rounded-full text-white">
          <Sparkles className="w-4 h-4 animate-spin" />
        </div>
      </div>

      <div className="space-y-2">
        <h2 className="text-xl font-black text-zinc-900 dark:text-white">Building Your Plan</h2>
        <p className="text-xs text-rose-500 font-bold transition-all duration-500 h-6">
          {LOADING_TIPS[tipIndex]}
        </p>
      </div>

      {/* Progress Bar Animation */}
      <div className="w-full bg-zinc-100 dark:bg-zinc-800 h-2 rounded-full overflow-hidden">
        <div className="bg-rose-500 h-full rounded-full animate-[shimmer_2s_infinite]" style={{ width: '60%' }} />
      </div>

    </div>
  );
}