import type { Vegetable, SaladRecipe, GameState, GrammarExercise } from '../types/game';

export const calculateInventoryValue = (inventory: { [key: string]: number }, vegetables: Vegetable[]): number => {
  return Object.entries(inventory).reduce((total, [vegetableId, quantity]) => {
    const vegetable = vegetables.find(v => v.id === vegetableId);
    return total + (vegetable ? vegetable.points * quantity : 0);
  }, 0);
};

export const canMakeSalad = (recipe: SaladRecipe, inventory: { [key: string]: number }): boolean => {
  return recipe.requiredVegetables.every(vegetableId => 
    inventory[vegetableId] && inventory[vegetableId] > 0
  );
};

export const getAvailableRecipes = (recipes: SaladRecipe[], inventory: { [key: string]: number }): SaladRecipe[] => {
  return recipes.filter(recipe => canMakeSalad(recipe, inventory));
};

export const makeSalad = (recipe: SaladRecipe, gameState: GameState): GameState => {
  const newInventory = { ...gameState.inventory };
  
  // Remove required vegetables from inventory
  recipe.requiredVegetables.forEach(vegetableId => {
    if (newInventory[vegetableId] > 0) {
      newInventory[vegetableId] -= 1;
    }
  });

  return {
    ...gameState,
    inventory: newInventory,
    score: gameState.score + recipe.bonusPoints,
    completedSalads: [...gameState.completedSalads, recipe.id]
  };
};

export const buyVegetable = (vegetable: Vegetable, quantity: number, gameState: GameState): GameState => {
  const totalCost = vegetable.price * quantity;
  
  if (gameState.money < totalCost) {
    return gameState; // Not enough money
  }

  const newInventory = { ...gameState.inventory };
  newInventory[vegetable.id] = (newInventory[vegetable.id] || 0) + quantity;

  return {
    ...gameState,
    money: gameState.money - totalCost,
    inventory: newInventory
  };
};

export const formatCurrency = (amount: number): string => {
  return `$${amount}`;
};

export const getRandomExercises = (exercises: GrammarExercise[], count: number): GrammarExercise[] => {
  const shuffled = [...exercises].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
}; 