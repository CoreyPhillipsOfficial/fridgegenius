import { useState } from 'react';
import { useRecipe } from './api/useRecipe';
import IngredientInput from './components/IngredientInput';
import RecipeCard from './components/RecipeCard';

function App() {
  const [ingredients, setIngredients] = useState<string[]>([]);
  const { mutate, data, isPending } = useRecipe();

  const handleSubmit = (input: string[]) => {
    setIngredients(input);
    mutate(input);
  };

  return (
    <main className="max-w-xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">FridgeGenius</h1>
      <IngredientInput onSubmit={handleSubmit} />
      {isPending && <p className="mt-4">Cooking up your recipe...</p>}
      {data && <RecipeCard content={data} />}
    </main>
  );
}

export default App;
