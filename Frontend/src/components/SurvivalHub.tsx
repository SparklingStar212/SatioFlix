// src/pages/SurvivalHub.tsx
import { useState, useEffect } from 'react';
import SurvivalSetup from '../components/survival/SurvivalSetup';
import SurvivalPantry from '../components/survival/SurvivalPantry';
import SurvivalLoading from '../components/survival/SurvivalLoading';
import SurvivalResults from '../components/survival/SurvivalResults';
import { useSurvival } from '../context/SurvivalContext';

export default function SurvivalHub() {
  const { savedPlan, setSavedPlan, resetState } = useSurvival();
  const [step, setStep] = useState<'setup' | 'pantry' | 'loading' | 'results'>('setup');
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  // STEP 8 MAGIC: If a plan is loaded from browser storage, jump straight to results
  useEffect(() => {
    if (savedPlan) {
      setStep('results');
    }
  }, [savedPlan]);

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 py-12 px-4 md:px-8">

      {/* Error banner if generation fails */}
      {errorMsg && (
        <div className="max-w-md mx-auto mb-6 p-4 bg-rose-500/10 border border-rose-500/30 rounded-xl text-rose-600 dark:text-rose-400 text-xs font-bold text-center">
          {errorMsg}
          <button onClick={() => setErrorMsg(null)} className="block mx-auto mt-2 text-xs underline cursor-pointer">Dismiss</button>
        </div>
      )}

      {step === 'setup' && !savedPlan && (
        <SurvivalSetup onNext={() => setStep('pantry')} />
      )}

      {step === 'pantry' && !savedPlan && (
        <SurvivalPantry
          onBack={() => setStep('setup')}
          onSubmitMission={() => setStep('loading')}
        />
      )}

      {step === 'loading' && !savedPlan && (
        <SurvivalLoading
          onPlanGenerated={(plan) => {
            setSavedPlan(plan); // Updates context AND localStorage
            setStep('results');
          }}
          onError={(msg) => {
            setErrorMsg(msg);
            setStep('pantry');
          }}
        />
      )}

      {step === 'results' && savedPlan && (
        <SurvivalResults
          plan={savedPlan}
          onReset={() => {
            resetState(); // Clears everything so they can start over
            setStep('setup');
          }}
        />
      )}

    </div>
  );
}