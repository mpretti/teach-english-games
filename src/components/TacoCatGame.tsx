import React, { useState } from 'react';
import type { TacoCatGameState, TacoCatGrammarExercise } from '../types/tacoCatGame';
import { initializeTacoCatGame, playCard, startGame, calculateFinalScore } from '../utils/tacoCatUtils';
import { WORD_SEQUENCE, TACO_CAT_GRAMMAR_EXERCISES } from '../data/tacoCatData';
import { TacoCatCardComponent } from './TacoCatCard';
import { TacoCatGrammarExerciseComponent } from './TacoCatGrammarExercise';

interface TacoCatGameProps {
  onBack: () => void;
}

export const TacoCatGame: React.FC<TacoCatGameProps> = ({ onBack }) => {
  const [gameState, setGameState] = useState<TacoCatGameState>(() => 
    initializeTacoCatGame('medium')
  );
  const [currentExercise, setCurrentExercise] = useState<TacoCatGrammarExercise | null>(null);
  const [showInstructions, setShowInstructions] = useState(true);
  const [gamePhase, setGamePhase] = useState<'setup' | 'playing' | 'grammar' | 'finished'>('setup');
  const [message, setMessage] = useState<string>('');
  const [messageKorean, setMessageKorean] = useState<string>('');
  const [selectedCard, setSelectedCard] = useState<string | null>(null);

  // Initialize game
  const handleStartGame = () => {
    const newGame = startGame(gameState);
    setGameState(newGame);
    setGamePhase('playing');
    setShowInstructions(false);
    setMessage('Game started! Listen for the sequence: Taco → Cat → Goat → Cheese → Pizza');
    setMessageKorean('게임 시작! 순서를 들어보세요: 타코 → 고양이 → 염소 → 치즈 → 피자');
  };

  // Handle card play
  const handleCardPlay = (cardId: string) => {
    if (!gameState || gamePhase !== 'playing' || !gameState.isGameActive) return;

    const reactionTime = Date.now() - gameState.gameStartTime;
    const result = playCard(gameState, cardId, reactionTime);
    
    setGameState(result.newState);
    setMessage(result.message);
    setSelectedCard(null);

    // Check for win condition or grammar exercise
    if (result.newState.phase === 'results') {
      setGamePhase('grammar');
      // Start grammar exercise
      const randomIndex = Math.floor(Math.random() * TACO_CAT_GRAMMAR_EXERCISES.length);
      const randomExercise = TACO_CAT_GRAMMAR_EXERCISES[randomIndex];
      if (randomExercise) {
        setCurrentExercise(randomExercise);
      }
    } else if (result.success && Math.random() < 0.3) {
      setGamePhase('grammar');
      const randomIndex = Math.floor(Math.random() * TACO_CAT_GRAMMAR_EXERCISES.length);
      const randomExercise = TACO_CAT_GRAMMAR_EXERCISES[randomIndex];
      if (randomExercise) {
        setCurrentExercise(randomExercise);
      }
    }
  };

  // Handle grammar exercise completion
  const handleGrammarComplete = (correct: boolean, points: number) => {
    if (!gameState) return;

    const newScore = {
      ...gameState.score,
      grammarBonus: gameState.score.grammarBonus + points,
      total: gameState.score.total + points
    };

    setGameState({
      ...gameState,
      score: newScore,
      phase: gameState.phase === 'results' ? 'results' : 'playing'
    });

    if (correct) {
      setMessage(`Correct! +${points} bonus points!`);
      setMessageKorean(`정답! +${points} 보너스 점수!`);
    } else {
      setMessage('Try again next time!');
      setMessageKorean('다음에 다시 시도해보세요!');
    }

    if (gameState.phase === 'results') {
      setGamePhase('finished');
    } else {
      setGamePhase('playing');
    }
    setCurrentExercise(null);
  };

  // Reset game
  const resetGame = () => {
    const newGame = initializeTacoCatGame('medium');
    setGameState(newGame);
    setCurrentExercise(null);
    setGamePhase('setup');
    setShowInstructions(true);
    setMessage('');
    setMessageKorean('');
    setSelectedCard(null);
  };

  if (showInstructions) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 via-red-50 to-yellow-50 p-4">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
            <div className="flex items-center justify-between mb-4">
              <button
                onClick={onBack}
                className="flex items-center space-x-2 text-gray-600 hover:text-gray-800 transition-colors"
              >
                <span>←</span>
                <span>Back to Games</span>
              </button>
              <div className="text-center">
                <h1 className="text-3xl font-bold text-gray-800">🌮 Taco Cat Goat Cheese Pizza</h1>
                <p className="text-lg text-gray-600">타코 캣 고트 치즈 피자</p>
              </div>
              <div></div>
            </div>
          </div>

          {/* Instructions */}
          <div className="bg-white rounded-xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">How to Play / 게임 방법</h2>
            
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-semibold text-orange-600 mb-4">🎯 Objective</h3>
                <p className="text-gray-700 mb-4">
                  Be the first to get rid of all your cards by matching words to the sequence: 
                  Taco → Cat → Goat → Cheese → Pizza
                </p>
                <p className="text-gray-600 text-sm">
                  타코 → 고양이 → 염소 → 치즈 → 피자 순서에 맞춰 카드를 내어 모든 카드를 먼저 없애세요
                </p>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-orange-600 mb-4">🃏 Gameplay</h3>
                <ul className="text-gray-700 space-y-2">
                  <li>• Click cards to play them</li>
                  <li>• Say the word as you play the card</li>
                  <li>• Match the sequence or play special cards</li>
                  <li>• First to empty their hand wins!</li>
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-orange-600 mb-4">⚡ Special Cards</h3>
                <div className="space-y-2 text-gray-700">
                  <div>🦍 <strong>Gorilla:</strong> Beat your chest</div>
                  <div>🐹 <strong>Groundhog:</strong> Knock on table</div>
                  <div>🐋 <strong>Narwhal:</strong> Point up with finger</div>
                </div>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-orange-600 mb-4">📚 Learning Goals</h3>
                <ul className="text-gray-700 space-y-1">
                  <li>• English vocabulary</li>
                  <li>• Quick thinking</li>
                  <li>• Pattern recognition</li>
                  <li>• Grammar practice</li>
                </ul>
              </div>
            </div>

            <div className="text-center mt-8">
              <button
                onClick={handleStartGame}
                className="bg-gradient-to-r from-orange-500 to-red-500 text-white font-bold py-4 px-8 rounded-xl hover:from-orange-600 hover:to-red-600 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105"
              >
                Start Game / 게임 시작
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (gamePhase === 'grammar' && currentExercise) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 via-red-50 to-yellow-50 p-4">
        <div className="max-w-4xl mx-auto">
          <TacoCatGrammarExerciseComponent
            exercise={currentExercise}
            onAnswer={handleGrammarComplete}
            language="en"
          />
        </div>
      </div>
    );
  }

  if (gamePhase === 'finished' || gameState.phase === 'results') {
    const finalScore = calculateFinalScore(gameState);
    const player = gameState.players[0];
    
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 via-red-50 to-yellow-50 p-4">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-xl shadow-lg p-8 text-center">
            <h2 className="text-3xl font-bold text-gray-800 mb-6">🎉 Game Complete!</h2>
            <p className="text-xl text-gray-600 mb-8">게임 완료!</p>
            
            <div className="mb-8">
              <h3 className="text-xl font-semibold mb-4">Final Score / 최종 점수</h3>
              <div className="space-y-2 max-w-md mx-auto">
                <div className="flex justify-between items-center bg-gray-50 p-3 rounded-lg">
                  <span>Cards Won:</span>
                  <span className="font-bold">{gameState.score.cardsWon}</span>
                </div>
                <div className="flex justify-between items-center bg-gray-50 p-3 rounded-lg">
                  <span>Reaction Bonus:</span>
                  <span className="font-bold text-blue-600">+{gameState.score.reactionBonus}</span>
                </div>
                <div className="flex justify-between items-center bg-gray-50 p-3 rounded-lg">
                  <span>Grammar Bonus:</span>
                  <span className="font-bold text-green-600">+{gameState.score.grammarBonus}</span>
                </div>
                <div className="flex justify-between items-center bg-orange-100 p-3 rounded-lg border-2 border-orange-300">
                  <span className="font-bold text-lg">Total Score:</span>
                  <span className="font-bold text-xl text-orange-600">{finalScore}</span>
                </div>
              </div>
              
              {player && (
                <div className="mt-4 text-sm text-gray-600 space-y-1">
                  <div>Accuracy: {player.correctMatches + player.incorrectMatches > 0 
                    ? Math.round((player.correctMatches / (player.correctMatches + player.incorrectMatches)) * 100)
                    : 0}%</div>
                  <div>Average Reaction Time: {player.reactionTime.length > 0 
                    ? Math.round(player.reactionTime.reduce((a, b) => a + b, 0) / player.reactionTime.length)
                    : 0}ms</div>
                </div>
              )}
            </div>

            <div className="space-x-4">
              <button
                onClick={resetGame}
                className="bg-gradient-to-r from-orange-500 to-red-500 text-white font-bold py-3 px-6 rounded-lg hover:from-orange-600 hover:to-red-600 transition-all duration-200"
              >
                Play Again / 다시 하기
              </button>
              <button
                onClick={onBack}
                className="bg-gray-500 text-white font-bold py-3 px-6 rounded-lg hover:bg-gray-600 transition-all duration-200"
              >
                Back to Games / 게임 목록으로
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const player = gameState.players[0];
  if (!player) return <div>Loading...</div>;

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-red-50 to-yellow-50 p-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-xl shadow-lg p-4 mb-6">
          <div className="flex items-center justify-between">
            <button
              onClick={onBack}
              className="flex items-center space-x-2 text-gray-600 hover:text-gray-800 transition-colors"
            >
              <span>←</span>
              <span>Back</span>
            </button>
            
            <div className="text-center">
              <h1 className="text-2xl font-bold text-gray-800">🌮 Taco Cat Goat Cheese Pizza</h1>
              <div className="text-sm text-gray-600">
                Sequence: {WORD_SEQUENCE.join(' → ')}
              </div>
              <div className="text-xs text-gray-500">
                Next expected: <span className="font-bold">{gameState.currentWord}</span>
              </div>
            </div>

            <div className="text-right">
              <div className="text-sm text-gray-600">Score: {gameState.score.total}</div>
              <div className="text-xs text-gray-500">Round: {gameState.round}</div>
              <div className="text-xs text-gray-500">Cards: {player.hand.length}</div>
            </div>
          </div>
        </div>

        {/* Message */}
        {message && (
          <div className="bg-orange-100 border border-orange-300 rounded-lg p-4 mb-6">
            <p className="text-orange-800 font-medium">{message}</p>
            {messageKorean && <p className="text-orange-700 text-sm">{messageKorean}</p>}
          </div>
        )}

        {/* Game Status */}
        {!gameState.isGameActive && (
          <div className="bg-blue-100 border border-blue-300 rounded-lg p-4 mb-6 text-center">
            <p className="text-blue-800 font-medium">Click "Start Game" to begin!</p>
            <p className="text-blue-700 text-sm">게임을 시작하려면 "Start Game"을 클릭하세요!</p>
          </div>
        )}

        {/* Center Pile */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
          <h3 className="text-xl font-bold text-gray-800 mb-4">Center Pile ({gameState.centerPile.length})</h3>
          <div className="flex flex-wrap gap-2 min-h-[100px] items-center justify-center">
            {gameState.centerPile.length > 0 ? (
              gameState.centerPile.slice(-5).map((card, index) => (
                <TacoCatCardComponent key={`${card.id}-${index}`} card={card} size="medium" />
              ))
            ) : (
              <div className="text-gray-500">No cards played yet</div>
            )}
          </div>
        </div>

        {/* Player Hand */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h3 className="text-xl font-bold text-gray-800 mb-4">Your Hand ({player.hand.length} cards)</h3>
          <div className="flex flex-wrap gap-3 justify-center">
            {player.hand.map((card) => (
              <TacoCatCardComponent
                key={card.id}
                card={card}
                isSelected={selectedCard === card.id}
                onClick={() => {
                  setSelectedCard(card.id);
                  handleCardPlay(card.id);
                }}
                disabled={!gameState.isGameActive}
                size="medium"
              />
            ))}
          </div>
          
          {player.hand.length === 0 && (
            <div className="text-center text-gray-500 py-8">
              🎉 Congratulations! You've played all your cards!
            </div>
          )}
        </div>
      </div>
    </div>
  );
}; 