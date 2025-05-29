import React, { useState, useEffect, useCallback } from 'react';
import type { DutchBlitzGameState } from '../types/dutchBlitzGame';
import { initializeDutchBlitzGame, playCard, drawFromDutch, startTimer, updateTimer, getRandomCommand } from '../utils/dutchBlitzUtils';
import { DUTCH_BLITZ_GRAMMAR_EXERCISES } from '../data/dutchBlitzData';
import DutchBlitzCardComponent from './DutchBlitzCard';
import DutchBlitzGrammarExerciseComponent from './DutchBlitzGrammarExercise';

interface DutchBlitzGameProps {
  difficulty: 'easy' | 'medium' | 'hard';
  language: 'en' | 'ko';
  onGameEnd: (score: number) => void;
}

const DutchBlitzGame: React.FC<DutchBlitzGameProps> = ({ difficulty, language, onGameEnd }) => {
  const [gameState, setGameState] = useState<DutchBlitzGameState>(() => 
    initializeDutchBlitzGame(difficulty)
  );
  const [selectedCard, setSelectedCard] = useState<string | null>(null);
  const [currentCommand, setCurrentCommand] = useState<string>('');
  const [message, setMessage] = useState<string>('');
  const [currentExercise, setCurrentExercise] = useState<number>(0);

  // Timer effect
  useEffect(() => {
    if (gameState.isGameActive && gameState.remainingTime > 0) {
      const timer = setInterval(() => {
        setGameState(prevState => updateTimer(prevState));
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [gameState.isGameActive, gameState.remainingTime]);

  const handleStartGame = () => {
    setGameState(startTimer(gameState));
    setMessage('Game started! Play cards as fast as you can!');
  };

  const handleCardClick = (cardId: string) => {
    if (!gameState.isGameActive) return;
    setSelectedCard(cardId);
  };

  const handlePlayCard = useCallback((targetPile: 'center' | 'post', targetIndex: number) => {
    if (!selectedCard || !gameState.isGameActive) return;

    const command = currentCommand || getRandomCommand();
    const result = playCard(gameState, selectedCard, targetPile, targetIndex, command);
    
    setGameState(result.newState);
    setMessage(result.message);
    setSelectedCard(null);
    setCurrentCommand('');

    if (result.success) {
      // Random chance for grammar exercise
      if (Math.random() < 0.3) {
        setGameState(prev => ({ ...prev, phase: 'grammar' }));
      }
    }
  }, [selectedCard, gameState, currentCommand]);

  const handleDrawCards = () => {
    if (!gameState.isGameActive) return;
    setGameState(drawFromDutch(gameState));
  };

  const handleGrammarAnswer = (_correct: boolean, points: number) => {
    setGameState(prev => ({
      ...prev,
      phase: 'playing',
      score: {
        ...prev.score,
        grammarBonus: prev.score.grammarBonus + points,
        total: prev.score.total + points
      }
    }));

    if (currentExercise < DUTCH_BLITZ_GRAMMAR_EXERCISES.length - 1) {
      setCurrentExercise(prev => prev + 1);
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const player = gameState.players[0];
  if (!player) return <div>Loading...</div>;

  if (gameState.phase === 'grammar') {
    const exercise = DUTCH_BLITZ_GRAMMAR_EXERCISES[currentExercise];
    if (!exercise) {
      setGameState(prev => ({ ...prev, phase: 'playing' }));
      return null;
    }

    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-400 via-red-500 to-pink-500 p-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-6">
            <h1 className="text-3xl font-bold text-white mb-2">
              🃏 Dutch Blitz - Grammar Challenge
            </h1>
            <div className="text-white text-lg">
              Time: {formatTime(gameState.remainingTime)} | Score: {gameState.score.total}
            </div>
          </div>
          <DutchBlitzGrammarExerciseComponent
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
      <div className="min-h-screen bg-gradient-to-br from-orange-400 via-red-500 to-pink-500 p-4 flex items-center justify-center">
        <div className="bg-white rounded-xl shadow-2xl p-8 max-w-md w-full text-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-6">🃏 Game Complete!</h2>
          
          <div className="space-y-4 mb-6">
            <div className="flex justify-between">
              <span>Cards Played:</span>
              <span className="font-bold">{gameState.score.cardsPlayed}</span>
            </div>
            <div className="flex justify-between">
              <span>Speed Bonus:</span>
              <span className="font-bold text-blue-600">+{gameState.score.speedBonus}</span>
            </div>
            <div className="flex justify-between">
              <span>Fluency Bonus:</span>
              <span className="font-bold text-green-600">+{gameState.score.fluencyBonus}</span>
            </div>
            <div className="flex justify-between">
              <span>Grammar Bonus:</span>
              <span className="font-bold text-purple-600">+{gameState.score.grammarBonus}</span>
            </div>
            <div className="border-t pt-4">
              <div className="flex justify-between text-xl font-bold">
                <span>Total Score:</span>
                <span className="text-orange-600">{gameState.score.total}</span>
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <div className="text-sm text-gray-600">
              Average Reaction Time: {player.reactionTime.length > 0 
                ? Math.round(player.reactionTime.reduce((a, b) => a + b, 0) / player.reactionTime.length)
                : 0}ms
            </div>
            <div className="text-sm text-gray-600">
              Commands Used: {player.commandsUsed.length}
            </div>
          </div>

          <button
            onClick={() => onGameEnd(gameState.score.total)}
            className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 px-6 rounded-lg transition-colors mt-6"
          >
            Continue
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-400 via-red-500 to-pink-500 p-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-6">
          <h1 className="text-4xl font-bold text-white mb-2">🃏 Dutch Blitz</h1>
          <div className="flex justify-center items-center space-x-6 text-white text-lg">
            <div>Time: {formatTime(gameState.remainingTime)}</div>
            <div>Score: {gameState.score.total}</div>
            <div>Cards: {player.cardsPlayed}</div>
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

        {/* Command Input */}
        <div className="mb-6 text-center">
          <input
            type="text"
            value={currentCommand}
            onChange={(e) => setCurrentCommand(e.target.value)}
            placeholder="Type your command (e.g., 'I'm playing the red five!')"
            className="w-full max-w-md px-4 py-2 rounded-lg border-2 border-white bg-white bg-opacity-90 text-gray-800 placeholder-gray-500"
            disabled={!gameState.isGameActive}
          />
        </div>

        {/* Game Setup */}
        {gameState.phase === 'setup' && (
          <div className="text-center mb-8">
            <button
              onClick={handleStartGame}
              className="bg-white text-orange-600 font-bold py-4 px-8 rounded-xl text-xl hover:bg-gray-100 transition-colors shadow-lg"
            >
              Start Game!
            </button>
          </div>
        )}

        {/* Game Board */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Player Area */}
          <div className="lg:col-span-2 space-y-6">
            {/* Blitz Pile */}
            <div className="bg-white bg-opacity-20 rounded-xl p-4">
              <h3 className="text-white font-bold mb-3">Blitz Pile ({player.blitzPile.length})</h3>
              <div className="flex space-x-2">
                {player.blitzPile.slice(-3).map((card, index) => (
                  <DutchBlitzCardComponent
                    key={card.id}
                    card={card}
                    onClick={() => handleCardClick(card.id)}
                    isSelected={selectedCard === card.id}
                    showBack={index < player.blitzPile.length - 1}
                  />
                ))}
              </div>
            </div>

            {/* Post Piles */}
            <div className="bg-white bg-opacity-20 rounded-xl p-4">
              <h3 className="text-white font-bold mb-3">Post Piles</h3>
              <div className="grid grid-cols-3 gap-4">
                {player.postPiles.map((pile, index) => (
                  <div key={index} className="text-center">
                    <div className="text-white text-sm mb-2">Pile {index + 1}</div>
                    <div 
                      className="min-h-24 border-2 border-dashed border-white border-opacity-50 rounded-lg flex items-center justify-center cursor-pointer hover:bg-white hover:bg-opacity-10"
                      onClick={() => selectedCard && handlePlayCard('post', index)}
                    >
                      {pile.length > 0 ? (
                        <DutchBlitzCardComponent
                          card={pile[pile.length - 1]}
                          onClick={() => handleCardClick(pile[pile.length - 1].id)}
                          isSelected={selectedCard === pile[pile.length - 1].id}
                        />
                      ) : (
                        <div className="text-white text-opacity-50">Empty</div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Dutch Pile & Hand */}
            <div className="bg-white bg-opacity-20 rounded-xl p-4">
              <div className="flex justify-between items-center mb-3">
                <h3 className="text-white font-bold">Dutch Pile ({player.dutchPile.length})</h3>
                <button
                  onClick={handleDrawCards}
                  disabled={!gameState.isGameActive}
                  className="bg-white text-orange-600 px-4 py-2 rounded-lg font-medium hover:bg-gray-100 transition-colors disabled:opacity-50"
                >
                  Draw Cards
                </button>
              </div>
              <div className="flex space-x-2">
                {player.handCards.map(card => (
                  <DutchBlitzCardComponent
                    key={card.id}
                    card={card}
                    onClick={() => handleCardClick(card.id)}
                    isSelected={selectedCard === card.id}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Center Piles */}
          <div className="bg-white bg-opacity-20 rounded-xl p-4">
            <h3 className="text-white font-bold mb-3">Center Piles</h3>
            <div className="grid grid-cols-2 gap-4">
              {gameState.centerPiles.map((pile, index) => (
                <div key={index} className="text-center">
                  <div className="text-white text-sm mb-2">
                    {['Red', 'Yellow', 'Blue', 'Green'][index]}
                  </div>
                  <div 
                    className="min-h-24 border-2 border-dashed border-white border-opacity-50 rounded-lg flex items-center justify-center cursor-pointer hover:bg-white hover:bg-opacity-10"
                    onClick={() => selectedCard && handlePlayCard('center', index)}
                  >
                    {pile.length > 0 && pile[pile.length - 1] && (
                      <DutchBlitzCardComponent card={pile[pile.length - 1]!} />
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DutchBlitzGame; 