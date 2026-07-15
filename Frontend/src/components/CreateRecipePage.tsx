// src/components/CreateRecipePage.tsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../services/api';
import { Plus, Trash, ArrowLeft, Loader2 } from 'lucide-react';

export default function CreateRecipePage() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Form State
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [author, setAuthor] = useState('');
  const [countryOfOrigin, setCountryOfOrigin] = useState('Korean');
  const [prepTime, setPrepTime] = useState(15);
  const [cookTime, setCookTime] = useState(20);
  const [servingsDefault, setServingsDefault] = useState(2);
  const [coverImage, setCoverImage] = useState('');

  // Arrays for dynamic ingredients & steps
  const [ingredients, setIngredients] = useState([{ name: '', quantity: 1, unit: 'pcs' }]);
  const [instructions, setInstructions] = useState([{ stepNumber: 1, text: '' }]);

  // Ingredient Helpers
  const handleAddIngredient = () => {
    setIngredients([...ingredients, { name: '', quantity: 1, unit: 'pcs' }]);
  };

  const handleRemoveIngredient = (index: number) => {
    setIngredients(ingredients.filter((_, i) => i !== index));
  };

  const handleIngredientChange = (index: number, field: string, value: any) => {
    const updated = ingredients.map((ing, i) => {
      if (i === index) {
        return { ...ing, [field]: value };
      }
      return ing;
    });
    setIngredients(updated);
  };

  // Instruction Helpers
  const handleAddInstruction = () => {
    setInstructions([
      ...instructions,
      { stepNumber: instructions.length + 1, text: '' }
    ]);
  };

  const handleRemoveInstruction = (index: number) => {
    const filtered = instructions.filter((_, i) => i !== index);
    // Recalculate ordered step numbers
    const reordered = filtered.map((step, idx) => ({
      ...step,
      stepNumber: idx + 1
    }));
    setInstructions(reordered);
  };

  const handleInstructionChange = (index: number, value: string) => {
    const updated = instructions.map((step, i) => {
      if (i === index) {
        return { ...step, text: value };
      }
      return step;
    });
    setInstructions(updated);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    // Filter out incomplete dynamic items
    const validIngredients = ingredients.filter(ing => ing.name.trim() !== '');
    const validInstructions = instructions.filter(step => step.text.trim() !== '');

    if (validIngredients.length === 0 || validInstructions.length === 0) {
      setError("Please add at least one ingredient and one preparation step!");
      setIsLoading(false);
      return;
    }

    try {
      const payload = {
        title,
        description,
        author,
        countryOfOrigin,
        prepTime,
        cookTime,
        servingsDefault,
        coverImage: coverImage || 'https://images.unsplash.com/photo-1495521821757-a1efb6729352?auto=format&fit=crop&q=80&w=800',
        ingredients: validIngredients,
        instructions: validInstructions,
        tags: [countryOfOrigin.toLowerCase(), 'user-created']
      };

      await api.post('/recipes', payload);
      navigate('/'); // Return to home on successful creation!
    } catch (err: any) {
      console.error(err);
      setError("Failed to create recipe. Make sure all fields are valid and your server is online!");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="p-4 md:p-8 max-w-2xl mx-auto space-y-6">
      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-200 transition-colors text-sm font-medium cursor-pointer"
      >
        <ArrowLeft className="w-4 h-4" /> Back
      </button>

      <div>
        <h2 className="text-3xl font-black tracking-tight">Create a Recipe</h2>
        <p className="text-zinc-500 mt-1.5">Publish your dish to the global SatioFlix database.</p>
      </div>

      {error && (
        <div className="p-4 rounded-xl bg-rose-50 dark:bg-rose-950/20 border border-rose-200 dark:border-rose-900/40 text-rose-600 dark:text-rose-400 text-sm">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Core details card */}
        <div className="p-5 bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-100 dark:border-zinc-800 space-y-4 shadow-sm">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-zinc-400 mb-1.5">Recipe Title</label>
              <input
                type="text" required placeholder="e.g., Spicy Tofu Soup"
                value={title} onChange={(e) => setTitle(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-transparent text-sm focus:outline-none focus:ring-2 focus:ring-rose-500/20"
              />
            </div>
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-zinc-400 mb-1.5">Cuisine Country</label>
              <select
                value={countryOfOrigin} onChange={(e) => setCountryOfOrigin(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-sm focus:outline-none"
              >
                <option value="Korean">Korean</option>
                <option value="Nigerian">Nigerian</option>
                <option value="Italian">Italian</option>
                <option value="Mexican">Mexican</option>
                <option value="Japanese">Japanese</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-zinc-400 mb-1.5">Description</label>
            <textarea
              required placeholder="Brief summary of your flavor profile..." rows={3}
              value={description} onChange={(e) => setDescription(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-transparent text-sm focus:outline-none focus:ring-2 focus:ring-rose-500/20"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-zinc-400 mb-1.5">Creator Name</label>
              <input
                type="text" required placeholder="e.g., Chef Amina"
                value={author} onChange={(e) => setAuthor(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-transparent text-sm focus:outline-none focus:ring-2 focus:ring-rose-500/20"
              />
            </div>
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-zinc-400 mb-1.5">Cover Image URL</label>
              <input
                type="url" placeholder="Paste Unspslah image link..."
                value={coverImage} onChange={(e) => setCoverImage(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-transparent text-sm focus:outline-none focus:ring-2 focus:ring-rose-500/20"
              />
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3 pt-2">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-zinc-400 mb-1.5">Prep (mins)</label>
              <input
                type="number" min="1" required
                value={prepTime} onChange={(e) => setPrepTime(Number(e.target.value))}
                className="w-full px-4 py-2.5 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-transparent text-sm"
              />
            </div>
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-zinc-400 mb-1.5">Cook (mins)</label>
              <input
                type="number" min="0" required
                value={cookTime} onChange={(e) => setCookTime(Number(e.target.value))}
                className="w-full px-4 py-2.5 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-transparent text-sm"
              />
            </div>
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-zinc-400 mb-1.5">Servings</label>
              <input
                type="number" min="1" required
                value={servingsDefault} onChange={(e) => setServingsDefault(Number(e.target.value))}
                className="w-full px-4 py-2.5 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-transparent text-sm"
              />
            </div>
          </div>
        </div>

        {/* 1. Dynamic Ingredients Section */}
        <div className="p-5 bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-100 dark:border-zinc-800 space-y-4 shadow-sm">
          <div className="flex items-center justify-between border-b border-zinc-100 dark:border-zinc-800 pb-3">
            <h3 className="font-extrabold text-sm uppercase tracking-wider text-zinc-400">Ingredients</h3>
            <button
              type="button" onClick={handleAddIngredient}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 text-zinc-700 dark:text-zinc-300 rounded-xl text-xs font-bold transition-all cursor-pointer"
            >
              <Plus className="w-4 h-4" /> Add
            </button>
          </div>

          <div className="space-y-3">
            {ingredients.map((ing, idx) => (
              <div key={idx} className="flex gap-2 items-center">
                <input
                  type="text" required placeholder="Ingredient name..."
                  value={ing.name} onChange={(e) => handleIngredientChange(idx, 'name', e.target.value)}
                  className="flex-1 px-4 py-2 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-transparent text-sm focus:outline-none"
                />
                <input
                  type="number" min="0.1" step="any" required placeholder="Qty"
                  value={ing.quantity} onChange={(e) => handleIngredientChange(idx, 'quantity', Number(e.target.value))}
                  className="w-16 px-3 py-2 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-transparent text-sm text-center"
                />
                <input
                  type="text" required placeholder="unit (e.g. g, ml)"
                  value={ing.unit} onChange={(e) => handleIngredientChange(idx, 'unit', e.target.value)}
                  className="w-20 px-3 py-2 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-transparent text-sm text-center"
                />
                {ingredients.length > 1 && (
                  <button
                    type="button" onClick={() => handleRemoveIngredient(idx)}
                    className="p-2 text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/20 rounded-xl cursor-pointer"
                  >
                    <Trash className="w-4 h-4" />
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* 2. Dynamic Instructions Section */}
        <div className="p-5 bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-100 dark:border-zinc-800 space-y-4 shadow-sm">
          <div className="flex items-center justify-between border-b border-zinc-100 dark:border-zinc-800 pb-3">
            <h3 className="font-extrabold text-sm uppercase tracking-wider text-zinc-400">Instructions</h3>
            <button
              type="button" onClick={handleAddInstruction}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 text-zinc-700 dark:text-zinc-300 rounded-xl text-xs font-bold transition-all cursor-pointer"
            >
              <Plus className="w-4 h-4" /> Add Step
            </button>
          </div>

          <div className="space-y-4">
            {instructions.map((step, idx) => (
              <div key={idx} className="flex gap-3 items-start">
                <span className="w-6 h-6 rounded-full bg-rose-50 dark:bg-rose-950/30 text-rose-600 flex items-center justify-center text-xs font-bold shrink-0 mt-2">
                  {step.stepNumber}
                </span>
                <textarea
                  required placeholder={`Step ${step.stepNumber} details...`} rows={2}
                  value={step.text} onChange={(e) => handleInstructionChange(idx, e.target.value)}
                  className="flex-1 px-4 py-2 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-transparent text-sm focus:outline-none focus:ring-2 focus:ring-rose-500/20"
                />
                {instructions.length > 1 && (
                  <button
                    type="button" onClick={() => handleRemoveInstruction(idx)}
                    className="p-2 text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/20 rounded-xl mt-2 cursor-pointer"
                  >
                    <Trash className="w-4 h-4" />
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <button
          type="submit" disabled={isLoading}
          className="w-full py-3.5 bg-rose-600 hover:bg-rose-700 disabled:opacity-50 text-white font-extrabold text-sm rounded-2xl flex items-center justify-center gap-2 shadow-lg shadow-rose-600/20 active:scale-99 transition-all cursor-pointer"
        >
          {isLoading ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              <span>Publishing recipe to database...</span>
            </>
          ) : (
            <span>Publish Recipe</span>
          )}
        </button>
      </form>
    </div>
  );
}