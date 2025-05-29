import React, { useState } from 'react';
import type { NoMercyGameState, NoMercyGrammarExercise } from '../types/noMercyGame';
import { initializeNoMercyGame, revealCard, bankCards, stopGame, stealCards, calculateFinalScore } from '../utils/noMercyUtils';
import { NO_MERCY_GRAMMAR_EXERCISES } from '../data/noMercyData';
import { NoMercyCardComponent } from './NoMercyCard';
import { NoMercyGrammarExerciseComponent } from './NoMercyGrammarExercise';

interface NoMercyGameProps {
  onBack: () => void;
}

export const NoMercyGame: React.FC<NoMercyGameProps> = ({ onBack }) => {
  const [gameState, setGameState] = useState<NoMercyGameState>(() => 
    initializeNoMercyGame('medium')
  );
  const [currentExercise, setCurrentExercise] = useState<NoMercyGrammarExercise | null>(null);
  const [showInstructions, setShowInstructions] = useState(true);
  const [gamePhase, setGamePhase] = useState<'setup' | 'playing' | 'grammar' | 'finished'>('setup');
  const [message, setMessage] = useState<string>('');
  const [messageKorean, setMessageKorean] = useState<string>('');

  // Initialize game
  const handleStartGame = () => {
    setGamePhase('playing');
    setShowInstructions(false);
    setMessage('Game started! Reveal cards to build your team, but watch out for duplicates!');
    setMessageKorean('게임 시작! 카드를 공개해서 팀을 구성하세요. 하지만 중복을 조심하세요!');
  };

  // Handle card reveal
  const handleRevealCard = () => {
    if (!gameState || gamePhase !== 'playing') return;

    const result = revealCard(gameState);
    setGameState(result.newState);
    setMessage(result.message);

    // Check for bust or grammar exercise trigger
    if (result.busted) {
      setMessage(`Bust! You revealed duplicate cards!`);
      setMessageKorean(`버스트! 중복 카드를 공개했습니다!`);
      
      // Trigger grammar exercise after bust
      setTimeout(() => {
        setGamePhase('grammar');
        const randomIndex = Math.floor(Math.random() * NO_MERCY_GRAMMAR_EXERCISES.length);
        const randomExercise = NO_MERCY_GRAMMAR_EXERCISES[randomIndex];
        if (randomExercise) {
          setCurrentExercise(randomExercise);
        }
      }, 2000);
    } else if (Math.random() < 0.2) {
      // Random chance for grammar exercise
      setGamePhase('grammar');
      const randomIndex = Math.floor(Math.random() * NO_MERCY_GRAMMAR_EXERCISES.length);
      const randomExercise = NO_MERCY_GRAMMAR_EXERCISES[randomIndex];
      if (randomExercise) {
        setCurrentExercise(randomExercise);
      }
    }
  };

  // Handle banking cards
  const handleBank = () => {
    if (!gameState || gamePhase !== 'playing') return;

    const result = bankCards(gameState);
    setGameState(result.newState);
    setMessage("I'm banking! Cards saved to your collection.");
    setMessageKorean("뱅킹합니다! 카드가 컬렉션에 저장되었습니다.");
  };

  // Handle stopping
  const handleStop = () => {
    if (!gameState || gamePhase !== 'playing') return;

    const result = stopGame(gameState);
    setGameState(result.newState);
    setMessage("I'm stopping! Turn ended safely.");
    setMessageKorean("멈춥니다! 턴이 안전하게 끝났습니다.");
  };

  // Handle stealing
  const handleSteal = () => {
    if (!gameState || gamePhase !== 'playing') return;

    const result = stealCards(gameState);
    setGameState(result.newState);
    setMessage("I'm stealing! Took cards from another player.");
    setMessageKorean("훔칩니다! 다른 플레이어에게서 카드를 가져왔습니다.");
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
      score: newScore
    });

    if (correct) {
      setMessage(`Correct! +${points} bonus points!`);
      setMessageKorean(`정답! +${points} 보너스 점수!`);
    } else {
      setMessage('Try again next time!');
      setMessageKorean('다음에 다시 시도해보세요!');
    }

    // Check if game should end
    if (gameState.round >= gameState.maxRounds) {
      setGamePhase('finished');
    } else {
      setGamePhase('playing');
    }
    setCurrentExercise(null);
  };

  // Reset game
  const resetGame = () => {
    const newGame = initializeNoMercyGame('medium');
    setGameState(newGame);
    setCurrentExercise(null);
    setGamePhase('setup');
    setShowInstructions(true);
    setMessage('');
    setMessageKorean('');
  };

  if (showInstructions) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-red-50 p-4">
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
                <h1 className="text-3xl font-bold text-gray-800">🤠 No Mercy</h1>
                <p className="text-lg text-gray-600">노 머시</p>
              </div>
              <div></div>
            </div>
          </div>

          {/* Instructions */}
          <div className="bg-white rounded-xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">How to Play / 게임 방법</h2>
            
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-semibold text-amber-600 mb-4">🎯 Objective</h3>
                <p className="text-gray-700 mb-4">
                  Recruit the best Western team by revealing cards, but avoid getting two cards 
                  of the same number or color - that's a bust!
                </p>
                <p className="text-gray-600 text-sm">
                  카드를 공개해서 최고의 서부 팀을 모으세요. 하지만 같은 숫자나 색깔의 카드 두 개는 피하세요!
                </p>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-amber-600 mb-4">🃏 Gameplay</h3>
                <ul className="text-gray-700 space-y-2">
                  <li>• Reveal cards one by one</li>
                  <li>• Bank cards to save them safely</li>
                  <li>• Stop when you want to end your turn</li>
                  <li>• Steal from other players if you dare!</li>
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-amber-600 mb-4">🤠 Characters</h3>
                <div className="space-y-2 text-gray-700">
                  <div>🤠 <strong>Sheriff:</strong> Protects the town</div>
                  <div>👮 <strong>Deputy:</strong> Helps the sheriff</div>
                  <div>🦹 <strong>Outlaw:</strong> Causes trouble</div>
                  <div>🏴‍☠️ <strong>Bandit:</strong> Steals from others</div>
                  <div>🎭 <strong>Renegade:</strong> Works alone</div>
                </div>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-amber-600 mb-4">📚 Learning Goals</h3>
                <ul className="text-gray-700 space-y-1">
                  <li>• Present continuous tense</li>
                  <li>• Risk management vocabulary</li>
                  <li>• Math and probability</li>
                  <li>• Decision making expressions</li>
                </ul>
              </div>
            </div>

            <div className="text-center mt-8">
              <button
                onClick={handleStartGame}
                className="bg-gradient-to-r from-amber-500 to-orange-500 text-white font-bold py-4 px-8 rounded-xl hover:from-amber-600 hover:to-orange-600 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105"
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
      <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-red-50 p-4">
        <div className="max-w-4xl mx-auto">
          <NoMercyGrammarExerciseComponent
            exercise={currentExercise}
            onAnswer={handleGrammarComplete}
            language="en"
          />
        </div>
      </div>
    );
  }

  if (gamePhase === 'finished') {
    const finalScore = calculateFinalScore(gameState);
    
    return (
      <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-red-50 p-4">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-xl shadow-lg p-8 text-center">
            <h2 className="text-3xl font-bold text-gray-800 mb-6">🎉 Game Complete!</h2>
            <p className="text-xl text-gray-600 mb-8">게임 완료!</p>
            
            <div className="mb-8">
              <h3 className="text-xl font-semibold mb-4">Final Score / 최종 점수</h3>
              <div className="space-y-2 max-w-md mx-auto">
                <div className="flex justify-between items-center bg-gray-50 p-3 rounded-lg">
                  <span>Cards Revealed:</span>
                  <span className="font-bold">{gameState.score.cardsRevealed}</span>
                </div>
                <div className="flex justify-between items-center bg-gray-50 p-3 rounded-lg">
                  <span>Risk Bonus:</span>
                  <span className="font-bold text-blue-600">+{gameState.score.riskBonus}</span>
                </div>
                <div className="flex justify-between items-center bg-gray-50 p-3 rounded-lg">
                  <span>Grammar Bonus:</span>
                  <span className="font-bold text-green-600">+{gameState.score.grammarBonus}</span>
                </div>
                <div className="flex justify-between items-center bg-amber-100 p-3 rounded-lg border-2 border-amber-300">
                  <span className="font-bold text-lg">Total Score:</span>
                  <span className="font-bold text-xl text-amber-600">{finalScore}</span>
                </div>
              </div>
            </div>

            <div className="space-x-4">
              <button
                onClick={resetGame}
                className="bg-gradient-to-r from-amber-500 to-orange-500 text-white font-bold py-3 px-6 rounded-lg hover:from-amber-600 hover:to-orange-600 transition-all duration-200"
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
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-red-50 p-4">
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
              <h1 className="text-2xl font-bold text-gray-800">🤠 No Mercy</h1>
              <div className="text-sm text-gray-600">
                Character: {player.character?.name || 'None'} {player.character?.emoji || ''}
              </div>
            </div>

            <div className="text-right">
              <div className="text-sm text-gray-600">Score: {gameState.score.total}</div>
              <div className="text-xs text-gray-500">Round: {gameState.round}/{gameState.maxRounds}</div>
              <div className="text-xs text-gray-500">Deck: {gameState.deck.length}</div>
            </div>
          </div>
        </div>

        {/* Message */}
        {message && (
          <div className="bg-amber-100 border border-amber-300 rounded-lg p-4 mb-6">
            <p className="text-amber-800 font-medium">{message}</p>
            {messageKorean && <p className="text-amber-700 text-sm">{messageKorean}</p>}
          </div>
        )}

        {/* Game Actions */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
          <h3 className="text-xl font-bold text-gray-800 mb-4">Actions</h3>
          <div className="flex flex-wrap gap-4 justify-center">
            <button
              onClick={handleRevealCard}
              className="bg-gradient-to-r from-blue-500 to-blue-600 text-white font-bold py-3 px-6 rounded-lg hover:from-blue-600 hover:to-blue-700 transition-all duration-200"
              disabled={gameState.deck.length === 0}
            >
              Reveal Card
            </button>
            <button
              onClick={handleBank}
              className="bg-gradient-to-r from-green-500 to-green-600 text-white font-bold py-3 px-6 rounded-lg hover:from-green-600 hover:to-green-700 transition-all duration-200"
              disabled={player.revealedCards.length === 0}
            >
              I'm Banking
            </button>
            <button
              onClick={handleStop}
              className="bg-gradient-to-r from-yellow-500 to-yellow-600 text-white font-bold py-3 px-6 rounded-lg hover:from-yellow-600 hover:to-yellow-700 transition-all duration-200"
            >
              I'm Stopping
            </button>
            <button
              onClick={handleSteal}
              className="bg-gradient-to-r from-red-500 to-red-600 text-white font-bold py-3 px-6 rounded-lg hover:from-red-600 hover:to-red-700 transition-all duration-200"
              disabled={player.hand.length === 0}
            >
              I'm Stealing
            </button>
          </div>
        </div>

        {/* Current Revealed Cards */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
          <h3 className="text-xl font-bold text-gray-800 mb-4">Current Revealed ({player.revealedCards.length})</h3>
          <div className="flex flex-wrap gap-2 min-h-[100px] items-center justify-center">
            {player.revealedCards.length > 0 ? (
              player.revealedCards.map((card, index) => (
                <NoMercyCardComponent key={`${card.id}-${index}`} card={card} isRevealed={true} />
              ))
            ) : (
              <div className="text-gray-500">No cards revealed yet</div>
            )}
          </div>
        </div>

        {/* Player Collection */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h3 className="text-xl font-bold text-gray-800 mb-4">Your Hand ({player.hand.length} cards)</h3>
          <div className="flex flex-wrap gap-2 justify-center min-h-[100px] items-center">
            {player.hand.length > 0 ? (
              player.hand.map((card, index) => (
                <NoMercyCardComponent key={`${card.id}-${index}`} card={card} isRevealed={true} />
              ))
            ) : (
              <div className="text-gray-500">No cards in hand yet</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}; 