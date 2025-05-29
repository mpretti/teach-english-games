import React, { useState, useCallback } from 'react';
import { IslandTile } from './IslandTile';
import { SurviveGrammarExercise } from './SurviveGrammarExercise';
import type { SurviveGameState } from '../types/surviveGame';
import { 
  initializeSurviveGame, 
  movePlayer, 
  sinkIslandTiles,
  calculateSurvivalScore
} from '../utils/surviveGameUtils';
import { grammarExercises } from '../data/surviveGameData';

interface SurviveGameProps {
  onBack: () => void;
}

export const SurviveGame: React.FC<SurviveGameProps> = ({ onBack }) => {
  const [gameState, setGameState] = useState<SurviveGameState>(() => initializeSurviveGame());
  const [currentExercise, setCurrentExercise] = useState<number>(0);

  const handleTileClick = useCallback((position: { x: number; y: number }) => {
    if (gameState.phase !== 'movement') return;
    
    const player = gameState.players[0];
    if (!player) return;

    setGameState(prevState => movePlayer(prevState, player.id, position));
  }, [gameState.phase]);

  const handleGrammarAnswer = useCallback((correct: boolean) => {
    if (correct) {
      setGameState(prevState => ({
        ...prevState,
        players: prevState.players.map(player => ({
          ...player,
          survivalPoints: player.survivalPoints + 5
        })),
        gameLog: [
          ...prevState.gameLog,
          'Correct! +5 survival points!',
          '정답! +5 생존 점수!'
        ]
      }));
    }

    // Move to next exercise or back to game
    if (currentExercise < grammarExercises.length - 1) {
      setCurrentExercise(prev => prev + 1);
    } else {
      setGameState(prevState => ({
        ...prevState,
        phase: 'movement'
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

  const handleSinkTiles = useCallback(() => {
    setGameState(prevState => sinkIslandTiles(prevState, 1));
  }, []);

  const player = gameState.players[0];
  const finalScore = player ? calculateSurvivalScore(player) : 0;

  if (gameState.phase === 'grammar') {
    const exercise = grammarExercises[currentExercise];
    if (!exercise) {
      setGameState(prevState => ({ ...prevState, phase: 'movement' }));
      return null;
    }

    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-cyan-50 to-teal-50 p-4">
        <div className="container mx-auto">
          <div className="mb-6 text-center">
            <h1 className="text-3xl font-bold text-gray-800 mb-2">Grammar Challenge</h1>
            <p className="text-gray-600">Answer correctly to earn survival points!</p>
          </div>
          
          <SurviveGrammarExercise
            exercise={exercise}
            onAnswer={handleGrammarAnswer}
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
              {player?.hasEscaped ? '🎉 Escaped!' : '💔 Game Over'}
            </h1>
            <p className="text-xl text-gray-600">
              {player?.hasEscaped 
                ? 'You successfully escaped from Atlantis!' 
                : 'Better luck next time!'}
            </p>
            <p className="text-gray-500">
              {player?.hasEscaped 
                ? '아틀란티스에서 성공적으로 탈출했습니다!' 
                : '다음에 더 잘하세요!'}
            </p>
          </div>

          <div className="card mb-8">
            <h3 className="text-xl font-bold text-gray-800 mb-4">Final Score</h3>
            <div className="text-center">
              <div className="text-4xl font-bold text-blue-600 mb-2">{finalScore}</div>
              <div className="text-gray-600">Survival Points</div>
            </div>
          </div>

          <div className="text-center space-x-4">
            <button
              onClick={() => setGameState(initializeSurviveGame())}
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
    <div className="min-h-screen bg-gradient-to-br from-cyan-50 via-blue-50 to-indigo-50 p-4">
      <div className="container mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-800 flex items-center space-x-2">
              <span>🌊</span>
              <span>Survive</span>
              <span>🏝️</span>
            </h1>
            <p className="text-gray-600">Escape from the sinking island of Atlantis!</p>
            <p className="text-gray-500 text-sm">가라앉는 아틀란티스 섬에서 탈출하세요!</p>
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
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="card text-center">
            <div className="text-2xl font-bold text-blue-600">{gameState.turn}</div>
            <div className="text-sm text-gray-600">Turn</div>
          </div>
          <div className="card text-center">
            <div className="text-2xl font-bold text-green-600">
              {player?.hasEscaped ? 'Escaped!' : 'Surviving'}
            </div>
            <div className="text-sm text-gray-600">Status</div>
          </div>
          <div className="card text-center">
            <div className="text-2xl font-bold text-purple-600">{player?.survivalPoints || 0}</div>
            <div className="text-sm text-gray-600">Points</div>
          </div>
        </div>

        {/* Game Controls */}
        <div className="card mb-6 text-center">
          <div className="flex items-center justify-center space-x-4">
            <button
              onClick={handleShowGrammar}
              className="bg-purple-500 hover:bg-purple-600 text-white font-bold py-2 px-4 rounded-lg transition-colors duration-200"
            >
              📚 Grammar Challenge
            </button>
            <button
              onClick={handleSinkTiles}
              className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-lg transition-colors duration-200"
            >
              🌊 Sink Tiles
            </button>
          </div>
        </div>

        {/* Island Grid */}
        <div className="card mb-6">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Island of Atlantis</h2>
          <div className="grid grid-cols-5 gap-2 max-w-md mx-auto">
            {gameState.island.map((row, y) =>
              row.map((tile, x) => (
                <IslandTile
                  key={tile.id}
                  tile={tile}
                  position={{ x, y }}
                  isClickable={gameState.phase === 'movement'}
                  onClick={handleTileClick}
                  showPlayer={true}
                />
              ))
            )}
          </div>
        </div>

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