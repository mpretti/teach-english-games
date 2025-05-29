import React from 'react';
import type { SaladRecipe, Vegetable } from '../types/game';

interface SaladRecipeCardProps {
  recipe: SaladRecipe;
  vegetables: Vegetable[];
  canMake: boolean;
  onMake: () => void;
}

export const SaladRecipeCard: React.FC<SaladRecipeCardProps> = ({
  recipe,
  vegetables,
  canMake,
  onMake
}) => {
  const getVegetableEmoji = (vegetableId: string): string => {
    const vegetable = vegetables.find(v => v.id === vegetableId);
    return vegetable?.emoji || '🥗';
  };

  return (
    <div className={`card ${canMake ? 'border-primary-300' : 'border-gray-200'}`}>
      <div className="text-center">
        <h3 className="font-bold text-xl text-gray-800 mb-1">{recipe.name}</h3>
        <p className="text-gray-600 mb-3">{recipe.nameKorean}</p>
        
        <div className="flex justify-center space-x-1 mb-3">
          {recipe.requiredVegetables.map((vegetableId, index) => (
            <span key={index} className="text-2xl">
              {getVegetableEmoji(vegetableId)}
            </span>
          ))}
        </div>
        
        <p className="text-sm text-gray-600 mb-2">{recipe.description}</p>
        <p className="text-sm text-gray-500 mb-4">{recipe.descriptionKorean}</p>
        
        <div className="flex justify-between items-center mb-4">
          <span className="text-yellow-600 font-bold">+{recipe.bonusPoints} bonus points</span>
        </div>
        
        <button
          onClick={onMake}
          disabled={!canMake}
          className={`w-full py-2 px-4 rounded-lg font-medium transition-colors duration-200 ${
            canMake
              ? 'bg-primary-500 hover:bg-primary-600 text-white'
              : 'bg-gray-200 text-gray-400 cursor-not-allowed'
          }`}
        >
          {canMake ? 'Make Salad' : 'Missing Ingredients'}
        </button>
      </div>
    </div>
  );
}; 