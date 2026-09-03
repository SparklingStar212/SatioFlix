// src/components/survival/SurvivalSetup.tsx
import { useState, useEffect } from 'react';
import { useSurvival } from '../../context/SurvivalContext';
import { ShieldAlert, Globe, Wallet, Calendar } from 'lucide-react';

export interface CountryCurrencyInfo {
  name: string;
  currency: string;
  symbol: string;
  minDailyThreshold: number;
}

export const GLOBAL_COUNTRIES: CountryCurrencyInfo[] = [
  // --- AFRICA ---
  { name: 'Nigeria', currency: 'NGN', symbol: '₦', minDailyThreshold: 500 },
  { name: 'Ghana', currency: 'GHS', symbol: 'GH₵', minDailyThreshold: 15 },
  { name: 'Kenya', currency: 'KES', symbol: 'KSh', minDailyThreshold: 150 },
  { name: 'South Africa', currency: 'ZAR', symbol: 'R', minDailyThreshold: 30 },
  { name: 'Egypt', currency: 'EGP', symbol: 'E£', minDailyThreshold: 40 },
  { name: 'Rwanda', currency: 'RWF', symbol: 'FRw', minDailyThreshold: 1500 },
  { name: 'Uganda', currency: 'UGX', symbol: 'USh', minDailyThreshold: 4000 },
  { name: 'Tanzania', currency: 'TZS', symbol: 'TSh', minDailyThreshold: 2500 },
  { name: 'Ethiopia', currency: 'ETB', symbol: 'Br', minDailyThreshold: 60 },
  { name: 'Morocco', currency: 'MAD', symbol: 'DH', minDailyThreshold: 15 },
  { name: 'Cameroon', currency: 'XAF', symbol: 'FCFA', minDailyThreshold: 1000 },
  { name: 'Ivory Coast', currency: 'XOF', symbol: 'CFA', minDailyThreshold: 1000 },
  { name: 'Senegal', currency: 'XOF', symbol: 'CFA', minDailyThreshold: 1000 },
  { name: 'Mauritius', currency: 'MUR', symbol: '₨', minDailyThreshold: 50 },

  // --- NORTH & SOUTH AMERICA ---
  { name: 'United States', currency: 'USD', symbol: '$', minDailyThreshold: 3 },
  { name: 'Canada', currency: 'CAD', symbol: 'C$', minDailyThreshold: 4 },
  { name: 'Brazil', currency: 'BRL', symbol: 'R$', minDailyThreshold: 15 },
  { name: 'Mexico', currency: 'MXN', symbol: '$', minDailyThreshold: 50 },
  { name: 'Argentina', currency: 'ARS', symbol: '$', minDailyThreshold: 1200 },
  { name: 'Colombia', currency: 'COP', symbol: '$', minDailyThreshold: 6000 },
  { name: 'Chile', currency: 'CLP', symbol: '$', minDailyThreshold: 2500 },

  // --- EUROPE ---
  { name: 'United Kingdom', currency: 'GBP', symbol: '£', minDailyThreshold: 2 },
  { name: 'Germany', currency: 'EUR', symbol: '€', minDailyThreshold: 3 },
  { name: 'France', currency: 'EUR', symbol: '€', minDailyThreshold: 3 },
  { name: 'Italy', currency: 'EUR', symbol: '€', minDailyThreshold: 3 },
  { name: 'Spain', currency: 'EUR', symbol: '€', minDailyThreshold: 3 },
  { name: 'Netherlands', currency: 'EUR', symbol: '€', minDailyThreshold: 3 },
  { name: 'Poland', currency: 'PLN', symbol: 'zł', minDailyThreshold: 12 },
  { name: 'Sweden', currency: 'SEK', symbol: 'kr', minDailyThreshold: 35 },
  { name: 'Switzerland', currency: 'CHF', symbol: 'CHF', minDailyThreshold: 4 },
  { name: 'Ukraine', currency: 'UAH', symbol: '₴', minDailyThreshold: 80 },

  // --- ASIA & OCEANIA ---
  { name: 'India', currency: 'INR', symbol: '₹', minDailyThreshold: 100 },
  { name: 'China', currency: 'CNY', symbol: '¥', minDailyThreshold: 15 },
  { name: 'Japan', currency: 'JPY', symbol: '¥', minDailyThreshold: 400 },
  { name: 'South Korea', currency: 'KRW', symbol: '₩', minDailyThreshold: 4000 },
  { name: 'Philippines', currency: 'PHP', symbol: '₱', minDailyThreshold: 100 },
  { name: 'Malaysia', currency: 'MYR', symbol: 'RM', minDailyThreshold: 10 },
  { name: 'Indonesia', currency: 'IDR', symbol: 'Rp', minDailyThreshold: 15000 },
  { name: 'Vietnam', currency: 'VND', symbol: '₫', minDailyThreshold: 40000 },
  { name: 'Thailand', currency: 'THB', symbol: '฿', minDailyThreshold: 60 },
  { name: 'Pakistan', currency: 'PKR', symbol: '₨', minDailyThreshold: 300 },
  { name: 'Bangladesh', currency: 'BDT', symbol: '৳', minDailyThreshold: 150 },
  { name: 'Australia', currency: 'AUD', symbol: 'A$', minDailyThreshold: 5 },
  { name: 'New Zealand', currency: 'NZD', symbol: 'NZ$', minDailyThreshold: 5 },

  // --- MIDDLE EAST ---
  { name: 'United Arab Emirates', currency: 'AED', symbol: 'AED', minDailyThreshold: 12 },
  { name: 'Saudi Arabia', currency: 'SAR', symbol: 'SAR', minDailyThreshold: 10 },
  { name: 'Turkey', currency: 'TRY', symbol: '₺', minDailyThreshold: 60 },
  { name: 'Israel', currency: 'ILS', symbol: '₪', minDailyThreshold: 12 }
].sort((a, b) => a.name.localeCompare(b.name));

export function getCountryDetails(countryName: string): CountryCurrencyInfo {
  const found = GLOBAL_COUNTRIES.find(c => c.name === countryName);
  if (found) return found;
  return { name: countryName, currency: 'USD', symbol: '$', minDailyThreshold: 3 };
}

interface SurvivalSetupProps {
  onNext: () => void;
}

export default function SurvivalSetup({ onNext }: SurvivalSetupProps) {
  const { state, updateState } = useSurvival();
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [isZeroBudget, setIsZeroBudget] = useState(state.budget === 0);

  useEffect(() => {
    const savedCountry = localStorage.getItem('satio_survival_country');
    if (savedCountry) {
      const details = getCountryDetails(savedCountry);
      updateState({ country: details.name, currency: details.currency });
    }
  }, []);

  const handleCountryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedCountryName = e.target.value;
    const details = getCountryDetails(selectedCountryName);

    updateState({ country: details.name, currency: details.currency });
    localStorage.setItem('satio_survival_country', details.name);
    localStorage.setItem('satio_survival_currency', details.currency);
  };

  const handleZeroBudgetToggle = (e: React.ChangeEvent<HTMLInputElement>) => {
    const checked = e.target.checked;
    setIsZeroBudget(checked);
    if (checked) {
      updateState({ budget: 0 });
      setErrorMsg(null);
    }
  };

  const handleProceed = () => {
    const details = getCountryDetails(state.country);
    const absoluteMinimum = details.minDailyThreshold * state.days;

    if (state.days <= 0) {
      setErrorMsg("Please enter a valid number of days.");
      return;
    }

    // Skip cash threshold validation if user selected zero cash (pantry-only mode)
    if (!isZeroBudget) {
      if (state.budget <= 0) {
        setErrorMsg("Please enter a valid budget or select 'I have zero cash'.");
        return;
      }
      if (state.budget < absoluteMinimum) {
        setErrorMsg(`Bro, even garri needs water! ${state.budget} ${state.currency} is too low for ${state.days} days. Try at least ${absoluteMinimum} ${state.currency} or fewer days.`);
        return;
      }
    }

    setErrorMsg(null);
    onNext();
  };

  return (
    <div className="max-w-xl mx-auto p-6 bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-200 dark:border-zinc-800 shadow-xl space-y-6">
      <div className="flex items-center gap-3">
        <div className="p-3 bg-rose-500/10 rounded-xl text-rose-500">
          <ShieldAlert className="w-6 h-6" />
        </div>
        <div>
          <h2 className="text-xl font-black text-zinc-900 dark:text-white">Survival Mission Setup</h2>
          <p className="text-xs text-zinc-500 dark:text-zinc-400">Configure your parameters to calculate a realistic student budget plan.</p>
        </div>
      </div>

      {/* 1. Location & Currency Selector */}
      <div className="space-y-2">
        <label className="flex items-center gap-2 text-xs font-bold text-zinc-700 dark:text-zinc-300 uppercase tracking-wider">
          <Globe className="w-4 h-4 text-rose-500" />
          <span>Location & Currency</span>
        </label>
        <select
          value={state.country}
          onChange={handleCountryChange}
          className="w-full bg-zinc-100 dark:bg-zinc-800 border border-zinc-300 dark:border-zinc-700 rounded-xl px-4 py-3 text-sm font-semibold text-zinc-800 dark:text-zinc-200 focus:outline-none focus:border-rose-500 transition-colors"
        >
          {GLOBAL_COUNTRIES.map((c) => (
            <option key={c.name} value={c.name}>
              📍 {c.name} ({c.currency} - {c.symbol})
            </option>
          ))}
        </select>
      </div>

      {/* 2. Budget Input with Zero Cash Toggle */}
      <div className="space-y-2">
        <div className="flex justify-between items-center">
          <label className="flex items-center gap-2 text-xs font-bold text-zinc-700 dark:text-zinc-300 uppercase tracking-wider">
            <Wallet className="w-4 h-4 text-rose-500" />
            <span>Total Budget ({state.currency})</span>
          </label>
          <label className="flex items-center gap-2 text-xs font-bold text-emerald-600 dark:text-emerald-400 cursor-pointer">
            <input
              type="checkbox"
              checked={isZeroBudget}
              onChange={handleZeroBudgetToggle}
              className="w-4 h-4 rounded border-zinc-300 dark:border-zinc-700 text-emerald-500 focus:ring-emerald-500"
            />
            <span>I have zero cash (Pantry Only)</span>
          </label>
        </div>
        <input
          type="number"
          disabled={isZeroBudget}
          value={isZeroBudget ? 0 : (state.budget || '')}
          onChange={(e) => updateState({ budget: Number(e.target.value) })}
          placeholder="e.g. 15000"
          className={`w-full rounded-xl px-4 py-3 text-sm font-semibold transition-colors ${isZeroBudget
              ? 'bg-zinc-100 dark:bg-zinc-800/40 border border-zinc-200 dark:border-zinc-800 text-zinc-400 cursor-not-allowed'
              : 'bg-zinc-100 dark:bg-zinc-800 border border-zinc-300 dark:border-zinc-700 text-zinc-800 dark:text-zinc-200 focus:outline-none focus:border-rose-500'
            }`}
        />
      </div>

      {/* 4. Meals Per Day Selector */}
      <div className="space-y-2">
        <label className="flex items-center gap-2 text-xs font-bold text-zinc-700 dark:text-zinc-300 uppercase tracking-wider">
          <Calendar className="w-4 h-4 text-rose-500" />
          <span>Meals Per Day (1 to 3)</span>
        </label>
        <div className="grid grid-cols-3 gap-2">
          {[1, 2, 3].map((num) => (
            <button
              type="button"
              key={num}
              onClick={() => updateState({ mealsPerDay: num as any })}
              className={`py-3 rounded-xl text-xs font-bold transition-all cursor-pointer border ${(state.mealsPerDay || 2) === num
                  ? 'bg-rose-500 text-white border-rose-500 shadow-md shadow-rose-500/20'
                  : 'bg-zinc-100 dark:bg-zinc-800 border-zinc-300 dark:border-zinc-700 text-zinc-700 dark:text-zinc-300'
                }`}
            >
              {num} {num === 1 ? 'Meal' : 'Meals'} / Day
            </button>
          ))}
        </div>
      </div>

      {/* 3. Duration (Days) Input */}
      <div className="space-y-2">
        <label className="flex items-center gap-2 text-xs font-bold text-zinc-700 dark:text-zinc-300 uppercase tracking-wider">
          <Calendar className="w-4 h-4 text-rose-500" />
          <span>Duration (Days)</span>
        </label>
        <input
          type="number"
          min="1"
          max="30"
          value={state.days}
          onChange={(e) => updateState({ days: Number(e.target.value) })}
          className="w-full bg-zinc-100 dark:bg-zinc-800 border border-zinc-300 dark:border-zinc-700 rounded-xl px-4 py-3 text-sm font-semibold text-zinc-800 dark:text-zinc-200 focus:outline-none focus:border-rose-500 transition-colors"
        />
      </div>

      {/* Error Banner */}
      {errorMsg && (
        <div className="p-4 bg-rose-500/10 border border-rose-500/30 rounded-xl text-rose-600 dark:text-rose-400 text-xs font-bold animate-shake">
          {errorMsg}
        </div>
      )}

      {/* Proceed Button */}
      <button
        onClick={handleProceed}
        className="w-full py-3.5 bg-rose-500 hover:bg-rose-600 text-white font-bold rounded-xl transition-all shadow-lg shadow-rose-500/20 cursor-pointer"
      >
        Next: Select Pantry Ingredients ➔
      </button>
    </div>
  );
}