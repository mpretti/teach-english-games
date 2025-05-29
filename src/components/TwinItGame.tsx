import React, { useState, useEffect, useCallback } from 'react';
import { TwinItCard } from './TwinItCard';
import { TwinItGrammarExercise } from './TwinItGrammarExercise';
import type { TwinItGameState } from '../types/twinItGame';
import { 
  initializeTwinItGame, 
  findMatch, 
  updateGameTimer,
  addNewCards,
  calculateFinalScore,
  hasAvailableMatches,
  isGameComplete,
  formatTime,
  getAverageReactionTime
} from '../utils/twinItGameUtils';
import { grammarExercises } from '../data/twinItGameData';

interface TwinItGameProps {
  onBack: () => void;
}

export const TwinItGame: React.FC<TwinItGameProps> = ({ onBack }) => {
  const [gameState, setGameState] = useState<TwinItGameState>(() => initializeTwinItGame('medium'));
  const [selectedCards, setSelectedCards] = useState<string[]>([]);
  const [currentExercise, setCurrentExercise] = useState<number>(0);
  const [lastUpdateTime, setLastUpdateTime] = useState(Date.now());

  // Game loop for real-time timer updates
  useEffect(() => {
    if (!gameState.isGameActive || gameState.phase === 'results') return;

    const gameLoop = setInterval(() => {
      const now = Date.now();
      const deltaTime = (now - lastUpdateTime) / 1000; // Convert to seconds
      setLastUpdateTime(now);

      setGameState(prevState => {
        let newState = updateGameTimer(prevState, deltaTime);
        
        // Check if game is complete
        if (isGameComplete(newState)) {
          newState.phase = 'results';
          newState.isGameActive = false;
          newState = calculateFinalScore(newState);
          
          if (newState.remainingTime <= 0) {
            newState.gameLog.push(
              'Time\'s up! Game finished.',
              '시간 종료! 게임이 끝났습니다.'
            );
          } else {
            newState.gameLog.push(
              'No more matches available! Game finished.',
              '더 이상 일치하는 패턴이 없습니다! 게임이 끝났습니다.'
            );
          }
        }
        
        return newState;
      });
    }, 100); // Update every 100ms for smooth timer

    return () => clearInterval(gameLoop);
  }, [gameState.isGameActive, gameState.phase, lastUpdateTime]);

  const handleCardClick = useCallback((cardId: string) => {
    if (gameState.phase !== 'playing' || !gameState.isGameActive) return;

    setSelectedCards(prev => {
      const newSelected = [...prev];
      
      if (newSelected.includes(cardId)) {
        // Deselect card
        return newSelected.filter(id => id !== cardId);
      } else if (newSelected.length < 2) {
        // Select card
        newSelected.push(cardId);
        
        // If two cards selected, check for match
        if (newSelected.length === 2) {
          const [card1Id, card2Id] = newSelected;
          if (card1Id && card2Id) {
            setGameState(prevState => {
              const updatedState = findMatch(prevState, card1Id, card2Id);
              
              // Add new cards if match was found
              if (updatedState.currentMatch) {
                return addNewCards(updatedState);
              }
              
              return updatedState;
            });
          }
          
          // Clear selection after a short delay
          setTimeout(() => {
            setSelectedCards([]);
          }, 1000);
        }
        
        return newSelected;
      }
      
      return prev;
    });
  }, [gameState.phase, gameState.isGameActive]);

  const handleStartGame = useCallback(() => {
    setGameState(prevState => ({
      ...prevState,
      phase: 'playing',
      isGameActive: true
    }));
    setLastUpdateTime(Date.now());
  }, []);

  const handleGrammarAnswer = useCallback((correct: boolean) => {
    if (correct) {
      setGameState(prevState => ({
        ...prevState,
        score: {
          ...prevState.score,
          grammarBonus: prevState.score.grammarBonus + 5
        },
        gameLog: [
          ...prevState.gameLog,
          'Correct! +5 grammar bonus points!',
          '정답! +5 문법 보너스 점수!'
        ]
      }));
    }

    // Move to next exercise or back to game
    if (currentExercise < grammarExercises.length - 1) {
      setCurrentExercise(prev => prev + 1);
    } else {
      setGameState(prevState => ({
        ...prevState,
        phase: 'playing'
      }));
      setCurrentExercise(0);
    }
  }, [currentExercise]);

  const handleShowGrammar = useCallback(() => {
    setGameState(prevState => ({
      ...prevState,
      phase: 'grammar'
    }));
  }, []);

  const player = gameState.players[0];
  const availableMatches = hasAvailableMatches(gameState);

  if (gameState.phase === 'grammar') {
    const exercise = grammarExercises[currentExercise];
    if (!exercise) {
      // If no exercise found, go back to playing phase
      setGameState(prevState => ({ ...prevState, phase: 'playing' }));
      return null;
    }

    return (
      <div className="min-h-screen bg-gradient-to-br from-yellow-50 via-orange-50 to-red-50 p-4">
        <div className="container mx-auto">
          <div className="mb-6 text-center">
            <h1 className="text-3xl font-bold text-gray-800 mb-2">Grammar Challenge</h1>
            <p className="text-gray-600">Answer correctly to earn bonus points!</p>
          </div>
          
          <TwinItGrammarExercise
            exercise={exercise}
            onAnswer={handleGrammarAnswer}
            timeRemaining={gameState.remainingTime}
          />
        </div>
      </div>
    );
  }

  if (gameState.phase === 'results') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-purple-50 p-4">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-800 mb-4">
              🎉 Game Complete!
            </h1>
            <p className="text-xl text-gray-600">
              Great pattern matching skills!
            </p>
            <p className="text-gray-500">
              훌륭한 패턴 매칭 실력입니다!
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            {/* Final Score */}
            <div className="card">
              <h3 className="text-xl font-bold text-gray-800 mb-4">Final Score</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span>Matches Found:</span>
                  <span className="font-bold">{gameState.score.matchesFound}</span>
                </div>
                <div className="flex justify-between">
                  <span>Speed Bonus:</span>
                  <span className="font-bold">{gameState.score.speedBonus}</span>
                </div>
                <div className="flex justify-between">
                  <span>Grammar Bonus:</span>
                  <span className="font-bold">{gameState.score.grammarBonus}</span>
                </div>
                <hr />
                <div className="flex justify-between text-xl font-bold">
                  <span>Total:</span>
                  <span className="text-green-600">{gameState.score.total}</span>
                </div>
              </div>
            </div>

            {/* Game Statistics */}
            <div className="card">
              <h3 className="text-xl font-bold text-gray-800 mb-4">Game Statistics</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span>Matches Found:</span>
                  <span>{player?.matchesFound || 0}</span>
                </div>
                <div className="flex justify-between">
                  <span>Average Reaction Time:</span>
                  <span>{player ? getAverageReactionTime(player).toFixed(2) : 0}s</span>
                </div>
                <div className="flex justify-between">
                  <span>Time Remaining:</span>
                  <span>{formatTime(gameState.remainingTime)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Difficulty:</span>
                  <span className="capitalize">{gameState.difficulty}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="text-center space-x-4">
            <button
              onClick={() => setGameState(initializeTwinItGame(gameState.difficulty))}
              className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-6 rounded-lg transition-colors duration-200"
            >
              Play Again
            </button>
            <button
              onClick={onBack}
              className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-3 px-6 rounded-lg transition-colors duration-200"
            >
              Back to Games
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-yellow-50 to-pink-50 p-4">
      <div className="container mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-800 flex items-center space-x-2">
              <span>🎯</span>
              <span>Twin It</span>
              <span>🎯</span>
            </h1>
            <p className="text-gray-600">Find matching patterns as quickly as possible!</p>
            <p className="text-gray-500 text-sm">가능한 한 빨리 일치하는 패턴을 찾으세요!</p>
          </div>
          
          <div className="text-right">
            <button
              onClick={onBack}
              className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded-lg transition-colors duration-200"
            >
              ← Back
            </button>
          </div>
        </div>

        {/* Game Status */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="card text-center">
            <div className="text-2xl font-bold text-orange-600">{formatTime(gameState.remainingTime)}</div>
            <div className="text-sm text-gray-600">Time Left</div>
          </div>
          <div className="card text-center">
            <div className="text-2xl font-bold text-green-600">{player?.matchesFound || 0}</div>
            <div className="text-sm text-gray-600">Matches Found</div>
          </div>
          <div className="card text-center">
            <div className="text-2xl font-bold text-blue-600">
              {player ? getAverageReactionTime(player).toFixed(1) : 0}s
            </div>
            <div className="text-sm text-gray-600">Avg. Reaction</div>
          </div>
          <div className="card text-center">
            <div className="text-2xl font-bold text-purple-600">{gameState.score.total}</div>
            <div className="text-sm text-gray-600">Score</div>
          </div>
        </div>

        {/* Game Controls */}
        {gameState.phase === 'setup' && (
          <div className="card mb-6 text-center">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Ready to Start?</h2>
            <p className="text-gray-600 mb-4">
              Click on two cards with matching patterns to score points!
            </p>
            <div className="space-x-4">
              <button
                onClick={handleStartGame}
                className="bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-6 rounded-lg transition-colors duration-200"
              >
                🚀 Start Matching!
              </button>
              <button
                onClick={handleShowGrammar}
                className="bg-purple-500 hover:bg-purple-600 text-white font-bold py-3 px-6 rounded-lg transition-colors duration-200"
              >
                📚 Grammar Practice
              </button>
            </div>
          </div>
        )}

        {gameState.phase === 'playing' && (
          <div className="card mb-6 text-center">
            <div className="flex items-center justify-center space-x-4">
              <button
                onClick={handleShowGrammar}
                className="bg-purple-500 hover:bg-purple-600 text-white font-bold py-2 px-4 rounded-lg transition-colors duration-200"
              >
                📚 Grammar Challenge
              </button>
              {!availableMatches && (
                <div className="bg-yellow-100 border border-yellow-300 rounded-lg px-4 py-2">
                  <span className="text-yellow-800 font-medium">No matches available - game will end soon!</span>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Pattern Cards Grid */}
        <div className="card mb-6">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Pattern Cards</h2>
          <div className="grid grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-4 justify-items-center">
            {gameState.visibleCards.map(card => (
              <TwinItCard
                key={card.id}
                card={card}
                onClick={() => handleCardClick(card.id)}
                isSelected={selectedCards.includes(card.id)}
                isClickable={gameState.isGameActive && !card.isMatched}
              />
            ))}
          </div>
        </div>

        {/* Current Match Display */}
        {gameState.currentMatch && (
          <div className="card mb-6">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Latest Match</h2>
            <div className="flex items-center justify-center space-x-4">
              <TwinItCard
                card={gameState.currentMatch.card1!}
                isClickable={false}
              />
              <div className="text-3xl">✅</div>
              <TwinItCard
                card={gameState.currentMatch.card2!}
                isClickable={false}
              />
            </div>
            <p className="text-center text-gray-600 mt-2">
              Great match! Keep finding more patterns!
            </p>
          </div>
        )}

        {/* Game Log */}
        <div className="card">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Game Log</h2>
          <div className="max-h-40 overflow-y-auto">
            <div className="space-y-1">
              {gameState.gameLog.slice(-10).map((log, index) => (
                <p key={index} className="text-sm text-gray-600">
                  {log}
                </p>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}; 