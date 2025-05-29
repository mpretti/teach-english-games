import React, { useState, useCallback } from 'react';
import type { ManhattanGameState } from '../types/manhattanGame';
import { initializeManhattanGame, placeBuilding, canAffordBuilding, buyResources, getAvailableSuperlatives } from '../utils/manhattanUtils';
import { MANHATTAN_GRAMMAR_EXERCISES } from '../data/manhattanData';
import ManhattanBuildingCard from './ManhattanBuildingCard';
import ManhattanGrammarExercise from './ManhattanGrammarExercise';

interface ManhattanGameProps {
  difficulty: 'easy' | 'medium' | 'hard';
  language: 'en' | 'ko';
  onGameEnd: (score: number) => void;
}

const ManhattanGame: React.FC<ManhattanGameProps> = ({ difficulty, language, onGameEnd }) => {
  const [gameState, setGameState] = useState<ManhattanGameState>(() => 
    initializeManhattanGame(difficulty)
  );
  const [selectedBuilding, setSelectedBuilding] = useState<string | null>(null);
  const [selectedBlock, setSelectedBlock] = useState<string | null>(null);
  const [selectedSuperlative, setSelectedSuperlative] = useState<string>('');
  const [message, setMessage] = useState<string>('');
  const [currentExercise, setCurrentExercise] = useState<number>(0);
  const [showMarket, setShowMarket] = useState<boolean>(false);

  const handleBuildingSelect = (buildingId: string) => {
    setSelectedBuilding(buildingId);
    setSelectedBlock(null);
    setSelectedSuperlative('');
  };

  const handleBlockSelect = (blockId: string) => {
    if (!selectedBuilding) {
      setMessage('Please select a building first!');
      return;
    }
    setSelectedBlock(blockId);
  };

  const handlePlaceBuilding = useCallback(() => {
    if (!selectedBuilding || !selectedBlock || !selectedSuperlative) {
      setMessage('Please select a building, block, and superlative!');
      return;
    }

    const result = placeBuilding(gameState, selectedBuilding, selectedBlock, selectedSuperlative);
    setGameState(result.newState);
    setMessage(result.message);
    
    if (result.success) {
      setSelectedBuilding(null);
      setSelectedBlock(null);
      setSelectedSuperlative('');
      
      // Random chance for grammar exercise
      if (Math.random() < 0.4) {
        setGameState(prev => ({ ...prev, phase: 'grammar' }));
      }
    }
  }, [gameState, selectedBuilding, selectedBlock, selectedSuperlative]);

  const handleBuyResource = (resourceType: 'steel' | 'glass' | 'concrete', quantity: number) => {
    const result = buyResources(gameState, resourceType, quantity);
    setGameState(result.newState);
    setMessage(result.message);
  };

  const handleGrammarAnswer = (_correct: boolean, points: number) => {
    setGameState(prev => ({
      ...prev,
      phase: 'building',
      score: {
        ...prev.score,
        grammarBonus: prev.score.grammarBonus + points,
        total: prev.score.total + points
      }
    }));

    if (currentExercise < MANHATTAN_GRAMMAR_EXERCISES.length - 1) {
      setCurrentExercise(prev => prev + 1);
    }
  };

  const player = gameState.players[0];
  if (!player) return <div>Loading...</div>;

  const selectedBuildingData = selectedBuilding 
    ? gameState.availableBuildings.find(b => b.id === selectedBuilding)
    : null;

  const availableSuperlatives = selectedBuildingData 
    ? getAvailableSuperlatives(selectedBuildingData)
    : [];

  if (gameState.phase === 'grammar') {
    const exercise = MANHATTAN_GRAMMAR_EXERCISES[currentExercise];
    if (!exercise) {
      setGameState(prev => ({ ...prev, phase: 'building' }));
      return null;
    }

    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-700 via-gray-800 to-gray-900 p-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-6">
            <h1 className="text-3xl font-bold text-white mb-2">
              🏙️ Manhattan - Grammar Challenge
            </h1>
            <div className="text-white text-lg">
              Round {gameState.round} | Score: {gameState.score.total}
            </div>
          </div>
          <ManhattanGrammarExercise
            exercise={exercise}
            onAnswer={handleGrammarAnswer}
            language={language}
          />
        </div>
      </div>
    );
  }

  if (gameState.phase === 'results') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-700 via-gray-800 to-gray-900 p-4 flex items-center justify-center">
        <div className="bg-white rounded-xl shadow-2xl p-8 max-w-md w-full text-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-6">🏙️ Game Complete!</h2>
          
          <div className="space-y-4 mb-6">
            <div className="flex justify-between">
              <span>Building Points:</span>
              <span className="font-bold">{gameState.score.buildingPoints}</span>
            </div>
            <div className="flex justify-between">
              <span>Height Bonus:</span>
              <span className="font-bold text-blue-600">+{gameState.score.heightBonus}</span>
            </div>
            <div className="flex justify-between">
              <span>Majority Bonus:</span>
              <span className="font-bold text-green-600">+{gameState.score.majorityBonus}</span>
            </div>
            <div className="flex justify-between">
              <span>Resource Bonus:</span>
              <span className="font-bold text-purple-600">+{gameState.score.resourceBonus}</span>
            </div>
            <div className="flex justify-between">
              <span>Grammar Bonus:</span>
              <span className="font-bold text-orange-600">+{gameState.score.grammarBonus}</span>
            </div>
            <div className="border-t pt-4">
              <div className="flex justify-between text-xl font-bold">
                <span>Total Score:</span>
                <span className="text-gray-800">{gameState.score.total}</span>
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <div className="text-sm text-gray-600">
              Buildings Built: {player.buildings.length}
            </div>
            <div className="text-sm text-gray-600">
              Blocks Controlled: {player.blocksOwned.length}
            </div>
            {gameState.tallestBuilding.owner === player.id && (
              <div className="text-sm text-yellow-600 font-medium">
                🏆 Tallest Building Owner!
              </div>
            )}
          </div>

          <button
            onClick={() => onGameEnd(gameState.score.total)}
            className="w-full bg-gray-800 hover:bg-gray-700 text-white font-bold py-3 px-6 rounded-lg transition-colors mt-6"
          >
            Continue
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-700 via-gray-800 to-gray-900 p-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-6">
          <h1 className="text-4xl font-bold text-white mb-2">🏙️ Manhattan</h1>
          <div className="flex justify-center items-center space-x-6 text-white text-lg">
            <div>Round: {gameState.round}/{gameState.maxRounds}</div>
            <div>Score: {gameState.score.total}</div>
            <div>Buildings: {player.buildings.length}</div>
          </div>
        </div>

        {/* Message */}
        {message && (
          <div className="text-center mb-4">
            <div className="inline-block bg-white bg-opacity-90 text-gray-800 px-4 py-2 rounded-lg font-medium">
              {message}
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Player Resources */}
          <div className="bg-white bg-opacity-10 rounded-xl p-4">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-white font-bold text-lg">Resources</h3>
              <button
                onClick={() => setShowMarket(!showMarket)}
                className="text-sm bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded transition-colors"
              >
                Market
              </button>
            </div>
            
            <div className="space-y-3">
              <div className="flex justify-between text-white">
                <span>💰 Money:</span>
                <span className="font-bold">${player.resources.money}</span>
              </div>
              <div className="flex justify-between text-white">
                <span>🏗️ Steel:</span>
                <span className="font-bold">{player.resources.steel}</span>
              </div>
              <div className="flex justify-between text-white">
                <span>🪟 Glass:</span>
                <span className="font-bold">{player.resources.glass}</span>
              </div>
              <div className="flex justify-between text-white">
                <span>🧱 Concrete:</span>
                <span className="font-bold">{player.resources.concrete}</span>
              </div>
            </div>

            {/* Market */}
            {showMarket && (
              <div className="mt-4 p-3 bg-white bg-opacity-20 rounded-lg">
                <h4 className="text-white font-medium mb-3">Market Prices</h4>
                <div className="space-y-2">
                  {(['steel', 'glass', 'concrete'] as const).map(resource => (
                    <div key={resource} className="flex items-center justify-between">
                      <span className="text-white text-sm capitalize">{resource}: ${gameState.marketPrices[resource]}</span>
                      <button
                        onClick={() => handleBuyResource(resource, 1)}
                        className="text-xs bg-green-500 hover:bg-green-600 text-white px-2 py-1 rounded"
                      >
                        Buy 1
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Tallest Building */}
            {gameState.tallestBuilding.building && (
              <div className="mt-4 p-3 bg-yellow-500 bg-opacity-20 rounded-lg">
                <h4 className="text-yellow-300 font-medium mb-2">🏆 Tallest Building</h4>
                <div className="text-white text-sm">
                  {gameState.tallestBuilding.building.name}
                </div>
                <div className="text-yellow-300 text-sm">
                  {gameState.tallestBuilding.height}m
                </div>
              </div>
            )}
          </div>

          {/* Manhattan Grid */}
          <div className="lg:col-span-2 bg-white bg-opacity-10 rounded-xl p-4">
            <h3 className="text-white font-bold text-lg mb-4">Manhattan Grid</h3>
            <div className="grid grid-cols-4 gap-2">
              {gameState.manhattanGrid.flat().map(block => (
                <div
                  key={block.id}
                  className={`
                    aspect-square border-2 rounded-lg cursor-pointer transition-all duration-200 p-2
                    ${selectedBlock === block.id 
                      ? 'border-blue-400 bg-blue-500 bg-opacity-30' 
                      : 'border-white border-opacity-30 hover:border-opacity-60'
                    }
                    ${block.buildings.length > 0 ? 'bg-gray-600' : 'bg-gray-800'}
                  `}
                  onClick={() => handleBlockSelect(block.id)}
                >
                  <div className="text-white text-xs font-medium mb-1">{block.id.toUpperCase()}</div>
                  {block.buildings.length > 0 ? (
                    <div className="space-y-1">
                      {block.buildings.slice(0, 2).map((building, index) => (
                        <div key={index} className="text-xs text-white bg-black bg-opacity-30 rounded px-1">
                          {building.emoji} {building.height}m
                        </div>
                      ))}
                      {block.buildings.length > 2 && (
                        <div className="text-xs text-gray-300">+{block.buildings.length - 2} more</div>
                      )}
                    </div>
                  ) : (
                    <div className="text-gray-400 text-xs">Empty</div>
                  )}
                  <div className="text-xs text-gray-300 mt-1">
                    ${block.baseValue}
                  </div>
                </div>
              ))}
            </div>

            {/* Superlative Selection */}
            {selectedBuilding && selectedBlock && (
              <div className="mt-4 p-3 bg-white bg-opacity-20 rounded-lg">
                <h4 className="text-white font-medium mb-3">Choose Superlative:</h4>
                <div className="grid grid-cols-2 gap-2">
                  {availableSuperlatives.map(superlative => (
                    <button
                      key={superlative}
                      onClick={() => setSelectedSuperlative(superlative)}
                      className={`
                        text-sm px-3 py-2 rounded transition-colors
                        ${selectedSuperlative === superlative
                          ? 'bg-blue-500 text-white'
                          : 'bg-white bg-opacity-20 text-white hover:bg-opacity-30'
                        }
                      `}
                    >
                      {superlative}
                    </button>
                  ))}
                </div>
                
                {selectedSuperlative && (
                  <button
                    onClick={handlePlaceBuilding}
                    className="w-full mt-3 bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded transition-colors"
                  >
                    Build Here!
                  </button>
                )}
              </div>
            )}
          </div>

          {/* Available Buildings */}
          <div className="bg-white bg-opacity-10 rounded-xl p-4">
            <h3 className="text-white font-bold text-lg mb-4">Available Buildings</h3>
            <div className="space-y-3 max-h-96 overflow-y-auto">
              {gameState.availableBuildings.slice(0, 6).map(building => (
                <ManhattanBuildingCard
                  key={building.id}
                  building={building}
                  onClick={() => handleBuildingSelect(building.id)}
                  isSelected={selectedBuilding === building.id}
                  canAfford={canAffordBuilding(player, building, difficulty)}
                  language={language}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManhattanGame; 