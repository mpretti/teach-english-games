import React, { useState, useEffect } from 'react';
import type { GameState, GrammarExercise as GrammarExerciseType } from '../types/game';
import { vegetables, saladRecipes, grammarExercises } from '../data/gameData';
import { 
  buyVegetable, 
  makeSalad, 
  getAvailableRecipes, 
  formatCurrency, 
  calculateInventoryValue,
  getRandomExercises 
} from '../utils/gameUtils';
import { VegetableCard } from './VegetableCard';
import { SaladRecipeCard } from './SaladRecipeCard';
import { GrammarExercise } from './GrammarExercise';

const initialGameState: GameState = {
  money: 20,
  score: 0,
  inventory: {},
  completedSalads: [],
  currentRound: 1,
  totalRounds: 3,
  gamePhase: 'shopping'
};

export const Game: React.FC = () => {
  const [gameState, setGameState] = useState<GameState>(initialGameState);
  const [cart, setCart] = useState<{ [key: string]: number }>({});
  const [currentExercise, setCurrentExercise] = useState<GrammarExerciseType | null>(null);
  const [exerciseQueue, setExerciseQueue] = useState<GrammarExerciseType[]>([]);

  useEffect(() => {
    // Initialize exercise queue
    setExerciseQueue(getRandomExercises(grammarExercises, 5));
  }, []);

  const handleQuantityChange = (vegetableId: string, quantity: number) => {
    setCart(prev => ({
      ...prev,
      [vegetableId]: quantity
    }));
  };

  const handlePurchase = () => {
    let newGameState = { ...gameState };
    
    Object.entries(cart).forEach(([vegetableId, quantity]) => {
      if (quantity > 0) {
        const vegetable = vegetables.find(v => v.id === vegetableId);
        if (vegetable) {
          newGameState = buyVegetable(vegetable, quantity, newGameState);
        }
      }
    });

    setGameState(newGameState);
    setCart({});
    
    // Show grammar exercise after purchase
    if (exerciseQueue.length > 0) {
      const nextExercise = exerciseQueue[0];
      if (nextExercise) {
        setCurrentExercise(nextExercise);
        setExerciseQueue(prev => prev.slice(1));
      } else {
        setGameState(prev => ({ ...prev, gamePhase: 'cooking' }));
      }
    } else {
      setGameState(prev => ({ ...prev, gamePhase: 'cooking' }));
    }
  };

  const handleExerciseAnswer = (correct: boolean) => {
    if (correct) {
      setGameState(prev => ({ ...prev, score: prev.score + 2 }));
    }
    
    setCurrentExercise(null);
    setGameState(prev => ({ ...prev, gamePhase: 'cooking' }));
  };

  const handleMakeSalad = (recipeId: string) => {
    const recipe = saladRecipes.find(r => r.id === recipeId);
    if (recipe) {
      const newGameState = makeSalad(recipe, gameState);
      setGameState(newGameState);
    }
  };

  const handleNextRound = () => {
    if (gameState.currentRound < gameState.totalRounds) {
      setGameState(prev => ({
        ...prev,
        currentRound: prev.currentRound + 1,
        gamePhase: 'shopping',
        money: prev.money + 10 // Bonus money for next round
      }));
      setExerciseQueue(getRandomExercises(grammarExercises, 3));
    } else {
      setGameState(prev => ({ ...prev, gamePhase: 'results' }));
    }
  };

  const resetGame = () => {
    setGameState(initialGameState);
    setCart({});
    setCurrentExercise(null);
    setExerciseQueue(getRandomExercises(grammarExercises, 5));
  };

  const getTotalCartCost = () => {
    return Object.entries(cart).reduce((total, [vegetableId, quantity]) => {
      const vegetable = vegetables.find(v => v.id === vegetableId);
      return total + (vegetable ? vegetable.price * quantity : 0);
    }, 0);
  };

  const getMaxQuantity = (vegetablePrice: number) => {
    return Math.floor(gameState.money / vegetablePrice);
  };

  const availableRecipes = getAvailableRecipes(saladRecipes, gameState.inventory);

  if (currentExercise) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 py-8">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-800 mb-2">Grammar Challenge!</h1>
            <p className="text-gray-600">Answer correctly to earn bonus points</p>
          </div>
          <GrammarExercise exercise={currentExercise} onAnswer={handleExerciseAnswer} />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold text-gray-800">Point Salad</h1>
              <p className="text-gray-600">포인트 샐러드 - 영어 학습 게임</p>
            </div>
            <div className="flex space-x-6 text-right">
              <div>
                <p className="text-sm text-gray-600">Money</p>
                <p className="text-xl font-bold text-green-600">{formatCurrency(gameState.money)}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Score</p>
                <p className="text-xl font-bold text-yellow-600">{gameState.score}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Round</p>
                <p className="text-xl font-bold text-blue-600">{gameState.currentRound}/{gameState.totalRounds}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {gameState.gamePhase === 'shopping' && (
          <div>
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-800 mb-2">Vegetable Market</h2>
              <p className="text-gray-600">야채 시장에서 샐러드 재료를 구매하세요</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {vegetables.map(vegetable => (
                <VegetableCard
                  key={vegetable.id}
                  vegetable={vegetable}
                  quantity={cart[vegetable.id] || 0}
                  onQuantityChange={(quantity) => handleQuantityChange(vegetable.id, quantity)}
                  maxQuantity={getMaxQuantity(vegetable.price)}
                />
              ))}
            </div>

            {Object.values(cart).some(q => q > 0) && (
              <div className="card max-w-md mx-auto">
                <h3 className="text-xl font-bold mb-4">Shopping Cart</h3>
                <div className="space-y-2 mb-4">
                  {Object.entries(cart).map(([vegetableId, quantity]) => {
                    if (quantity === 0) return null;
                    const vegetable = vegetables.find(v => v.id === vegetableId);
                    if (!vegetable) return null;
                    return (
                      <div key={vegetableId} className="flex justify-between">
                        <span>{vegetable.name} x{quantity}</span>
                        <span>{formatCurrency(vegetable.price * quantity)}</span>
                      </div>
                    );
                  })}
                </div>
                <div className="border-t pt-4">
                  <div className="flex justify-between font-bold text-lg mb-4">
                    <span>Total:</span>
                    <span>{formatCurrency(getTotalCartCost())}</span>
                  </div>
                  <button
                    onClick={handlePurchase}
                    disabled={getTotalCartCost() > gameState.money}
                    className="btn-primary w-full"
                  >
                    Purchase Items
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        {gameState.gamePhase === 'cooking' && (
          <div>
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-800 mb-2">Make Salads</h2>
              <p className="text-gray-600">재료를 조합해서 샐러드를 만드세요</p>
            </div>

            {/* Inventory */}
            <div className="card mb-8">
              <h3 className="text-xl font-bold mb-4">Your Ingredients</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {Object.entries(gameState.inventory).map(([vegetableId, quantity]) => {
                  if (quantity === 0) return null;
                  const vegetable = vegetables.find(v => v.id === vegetableId);
                  if (!vegetable) return null;
                  return (
                    <div key={vegetableId} className="text-center">
                      <div className="text-3xl mb-1">{vegetable.emoji}</div>
                      <div className="text-sm font-medium">{vegetable.name}</div>
                      <div className="text-xs text-gray-600">x{quantity}</div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Available Recipes */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              {saladRecipes.map(recipe => (
                <SaladRecipeCard
                  key={recipe.id}
                  recipe={recipe}
                  vegetables={vegetables}
                  canMake={availableRecipes.includes(recipe)}
                  onMake={() => handleMakeSalad(recipe.id)}
                />
              ))}
            </div>

            <div className="text-center">
              <button onClick={handleNextRound} className="btn-primary">
                {gameState.currentRound < gameState.totalRounds ? 'Next Round' : 'Finish Game'}
              </button>
            </div>
          </div>
        )}

        {gameState.gamePhase === 'results' && (
          <div className="text-center">
            <div className="card max-w-2xl mx-auto">
              <h2 className="text-4xl font-bold text-gray-800 mb-4">Game Complete!</h2>
              <p className="text-xl text-gray-600 mb-6">게임 완료!</p>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="text-center">
                  <div className="text-3xl font-bold text-yellow-600">{gameState.score}</div>
                  <div className="text-gray-600">Final Score</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-green-600">{gameState.completedSalads.length}</div>
                  <div className="text-gray-600">Salads Made</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-600">{calculateInventoryValue(gameState.inventory, vegetables)}</div>
                  <div className="text-gray-600">Ingredient Points</div>
                </div>
              </div>

              <button onClick={resetGame} className="btn-primary">
                Play Again
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}; 