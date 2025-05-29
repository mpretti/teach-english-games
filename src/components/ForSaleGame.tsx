import React, { useState, useEffect } from 'react';
import type { ForSaleGameState, Property } from '../types/forSaleGame';
import { PropertyCard } from './PropertyCard';
import { ForSaleGrammarExercise } from './ForSaleGrammarExercise';
import { 
  initializeGame, 
  startAuction, 
  placeBid, 
  winAuction, 
  passAuction,
  calculateFinalScore,
  formatCurrency,
  shuffleArray
} from '../utils/forSaleGameUtils';
import { properties, grammarExercises } from '../data/forSaleGameData';

export const ForSaleGame: React.FC = () => {
  const [gameState, setGameState] = useState<ForSaleGameState>(initializeGame());
  const [availableProperties, setAvailableProperties] = useState<Property[]>([]);
  const [currentGrammarExercise, setCurrentGrammarExercise] = useState<number>(0);
  const [showGrammarChallenge, setShowGrammarChallenge] = useState(false);
  const [grammarScore, setGrammarScore] = useState(0);

  useEffect(() => {
    // Initialize with shuffled properties for the auction phase
    const shuffledProperties = shuffleArray(properties).slice(0, 5);
    setAvailableProperties(shuffledProperties);
    
    // Start first auction
    if (shuffledProperties.length > 0) {
      const firstProperty = shuffledProperties[0];
      if (firstProperty) {
        setGameState(prev => startAuction(prev, firstProperty));
      }
    }
  }, []);

  const handleBid = (amount: number) => {
    const player = gameState.players[0];
    if (!player) return;
    
    const newGameState = placeBid(gameState, player.id, amount);
    setGameState(newGameState);
    
    // Auto-win auction for single player game
    setTimeout(() => {
      const wonGameState = winAuction(newGameState);
      setGameState(wonGameState);
      
      // Move to next property or grammar challenge
      setTimeout(() => {
        const remainingProperties = availableProperties.slice(1);
        if (remainingProperties.length > 0) {
          setAvailableProperties(remainingProperties);
          const nextProperty = remainingProperties[0];
          if (nextProperty) {
            setGameState(prev => startAuction(prev, nextProperty));
          }
        } else {
          // Start grammar challenge
          setShowGrammarChallenge(true);
        }
      }, 2000);
    }, 1000);
  };

  const handlePass = () => {
    const player = gameState.players[0];
    if (!player) return;
    
    const newGameState = passAuction(gameState, player.id);
    setGameState(newGameState);
    
    // Move to next property
    setTimeout(() => {
      const remainingProperties = availableProperties.slice(1);
      if (remainingProperties.length > 0) {
        setAvailableProperties(remainingProperties);
        const nextProperty = remainingProperties[0];
        if (nextProperty) {
          setGameState(prev => startAuction(prev, nextProperty));
        }
      } else {
        setShowGrammarChallenge(true);
      }
    }, 1000);
  };

  const handleGrammarAnswer = (correct: boolean) => {
    const currentExercise = grammarExercises[currentGrammarExercise];
    if (!currentExercise) return;
    
    if (correct) {
      setGrammarScore(prev => prev + currentExercise.points);
      setGameState(prev => ({
        ...prev,
        players: prev.players.map(player => ({
          ...player,
          money: player.money + 2 // Bonus money for correct answers
        }))
      }));
    }

    const nextExercise = currentGrammarExercise + 1;
    if (nextExercise < grammarExercises.length) {
      setTimeout(() => {
        setCurrentGrammarExercise(nextExercise);
      }, 2000);
    } else {
      // End game
      setTimeout(() => {
        setShowGrammarChallenge(false);
        setGameState(prev => ({ ...prev, phase: 'results' }));
      }, 2000);
    }
  };

  const resetGame = () => {
    setGameState(initializeGame());
    setAvailableProperties([]);
    setCurrentGrammarExercise(0);
    setShowGrammarChallenge(false);
    setGrammarScore(0);
    
    // Restart with new shuffled properties
    const shuffledProperties = shuffleArray(properties).slice(0, 5);
    setAvailableProperties(shuffledProperties);
    
    if (shuffledProperties.length > 0) {
      const firstProperty = shuffledProperties[0];
      if (firstProperty) {
        setGameState(prev => startAuction(prev, firstProperty));
      }
    }
  };

  const player = gameState.players[0];
  if (!player) return null;
  
  const currentProperty = gameState.currentAuction?.property;

  if (gameState.phase === 'results') {
    const finalScore = calculateFinalScore(player) + grammarScore;
    
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-800 mb-2">For Sale - Game Complete!</h1>
            <p className="text-xl text-gray-600">부동산 포세일 - 게임 완료!</p>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-8 text-center">
            <div className="text-6xl mb-6">🏆</div>
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Final Results</h2>
            <p className="text-xl text-gray-600 mb-6">최종 결과</p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="bg-blue-50 rounded-lg p-4">
                <h3 className="font-semibold text-blue-800 mb-2">Money Left</h3>
                <p className="text-2xl font-bold text-blue-600">{formatCurrency(player.money)}</p>
                <p className="text-sm text-blue-600">남은 돈</p>
              </div>
              <div className="bg-green-50 rounded-lg p-4">
                <h3 className="font-semibold text-green-800 mb-2">Properties Owned</h3>
                <p className="text-2xl font-bold text-green-600">{player.properties.length}</p>
                <p className="text-sm text-green-600">소유 부동산</p>
              </div>
              <div className="bg-purple-50 rounded-lg p-4">
                <h3 className="font-semibold text-purple-800 mb-2">Grammar Score</h3>
                <p className="text-2xl font-bold text-purple-600">{grammarScore}</p>
                <p className="text-sm text-purple-600">문법 점수</p>
              </div>
            </div>

            <div className="bg-yellow-50 rounded-lg p-6 mb-6">
              <h3 className="text-2xl font-bold text-yellow-800 mb-2">Total Score</h3>
              <p className="text-4xl font-bold text-yellow-600">{finalScore}</p>
              <p className="text-gray-600 mt-2">총점</p>
            </div>

            {player.properties.length > 0 && (
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Your Properties:</h3>
                <div className="flex justify-center space-x-2">
                  {player.properties.map((property, propertyIndex) => (
                    <div key={propertyIndex} className="text-center">
                      <div className="text-2xl">{property.emoji}</div>
                      <p className="text-xs text-gray-600">{property.name}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <button
              onClick={resetGame}
              className="btn-primary text-lg px-8 py-3"
            >
              Play Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (showGrammarChallenge) {
    const currentExercise = grammarExercises[currentGrammarExercise];
    if (!currentExercise) return null;
    
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-800 mb-2">Grammar Challenge</h1>
            <p className="text-xl text-gray-600">문법 도전</p>
            <p className="text-gray-500 mt-2">
              Exercise {currentGrammarExercise + 1} of {grammarExercises.length}
            </p>
          </div>

          <ForSaleGrammarExercise
            exercise={currentExercise}
            onAnswer={handleGrammarAnswer}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="container mx-auto max-w-6xl">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">For Sale</h1>
          <p className="text-xl text-gray-600">부동산 포세일</p>
          <p className="text-gray-500 mt-2">Buy properties at auction and learn English!</p>
        </div>

        {/* Player Status */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-xl font-bold text-gray-800">Your Status</h2>
              <p className="text-gray-600">당신의 상태</p>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-green-600">{formatCurrency(player.money)}</div>
              <p className="text-sm text-gray-600">Available Money</p>
            </div>
          </div>
          
          {player.properties.length > 0 && (
            <div className="mt-4">
              <h3 className="font-semibold text-gray-700 mb-2">Your Properties:</h3>
              <div className="flex space-x-2">
                {player.properties.map((property, propertyIndex) => (
                  <div key={propertyIndex} className="text-center bg-gray-50 rounded-lg p-2">
                    <div className="text-xl">{property.emoji}</div>
                    <p className="text-xs text-gray-600">{property.name}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Current Auction */}
        {currentProperty && (
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
              🔨 Current Auction
            </h2>
            <div className="flex justify-center">
              <div className="w-full max-w-md">
                <PropertyCard
                  property={currentProperty}
                  isAuctionActive={true}
                  currentBid={gameState.currentAuction?.currentBid || 0}
                  onBid={handleBid}
                  onPass={handlePass}
                  playerMoney={player.money}
                  showBidControls={true}
                />
              </div>
            </div>
          </div>
        )}

        {/* Upcoming Properties */}
        {availableProperties.length > 1 && (
          <div className="mb-8">
            <h3 className="text-xl font-bold text-center text-gray-800 mb-4">
              Upcoming Properties
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {availableProperties.slice(1).map((property) => (
                <PropertyCard
                  key={property.id}
                  property={property}
                  isAuctionActive={false}
                />
              ))}
            </div>
          </div>
        )}

        {/* Game Log */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h3 className="text-lg font-bold text-gray-800 mb-4">Game Log</h3>
          <div className="max-h-40 overflow-y-auto space-y-1">
            {gameState.gameLog.slice(-10).map((log, logIndex) => (
              <p key={logIndex} className="text-sm text-gray-600">
                {log}
              </p>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}; 