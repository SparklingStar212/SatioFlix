// src/context/SurvivalContext.tsx
import { createContext, useContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';
import type { SurvivalRequest, SurvivalPlanResponse } from '../services/api'; // 👈 Import response type

interface SurvivalContextType {
  state: SurvivalRequest;
  updateState: (updates: Partial<SurvivalRequest>) => void;
  savedPlan: SurvivalPlanResponse | null; // 👈 Add saved plan state
  setSavedPlan: (plan: SurvivalPlanResponse | null) => void; // 👈 Add setter
  resetState: () => void;
}

const initialState: SurvivalRequest = {
  mission: 'emergency',
  country: 'Nigeria',
  currency: 'NGN',
  budget: 0,
  days: 1,
  pantry: [],
  energyLevel: 3, // Default to basic cooking
};

const SurvivalContext = createContext<SurvivalContextType | undefined>(undefined);

export const SurvivalProvider = ({ children }: { children: ReactNode }) => {
  const [state, setState] = useState<SurvivalRequest>(initialState);

  // STEP 8: State to hold the final generated plan
  const [savedPlan, setSavedPlanState] = useState<SurvivalPlanResponse | null>(null);

  // STEP 8: Load from local storage when the app mounts
  useEffect(() => {
    const cached = localStorage.getItem('satio_active_survival_plan');
    if (cached) {
      try {
        setSavedPlanState(JSON.parse(cached));
      } catch (error) {
        console.error("Failed to parse saved survival plan:", error);
      }
    }
  }, []);

  // STEP 8: Custom setter that updates state AND local storage simultaneously
  const setSavedPlan = (plan: SurvivalPlanResponse | null) => {
    setSavedPlanState(plan);
    if (plan) {
      localStorage.setItem('satio_active_survival_plan', JSON.stringify(plan));
    } else {
      localStorage.removeItem('satio_active_survival_plan');
    }
  };

  const updateState = (updates: Partial<SurvivalRequest>) => {
    setState((prev) => ({ ...prev, ...updates }));
  };

  const resetState = () => {
    setState(initialState);
    setSavedPlan(null); // 👈 Clear the saved plan so they can start fresh
  };

  return (
    <SurvivalContext.Provider value={{ state, updateState, savedPlan, setSavedPlan, resetState }}>
      {children}
    </SurvivalContext.Provider>
  );
};

export const useSurvival = () => {
  const context = useContext(SurvivalContext);
  if (!context) throw new Error('useSurvival must be used within a SurvivalProvider');
  return context;
};