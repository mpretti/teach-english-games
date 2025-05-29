import React, { useState, useEffect, useCallback } from 'react';
import { SandTimer } from './SandTimer';
import { KiteCard } from './KiteCard';
import { KitesGrammarExercise } from './KitesGrammarExercise';
import type { KitesGameState } from '../types/kitesGame';
import { 
  initializeKitesGame, 
  flipTimer, 
  updateTimers, 
  launchKite, 
  updateKiteAltitudes,
  activateWindCondition,
  updateWindConditions,
  calculateFinalScore,
  getAvailableKites,
  getRandomWindEvent,
  isGameWon,
  isGameLost
} from '../utils/kitesGameUtils';
import { grammarExercises, difficultySettings } from '../data/kitesGameData';

interface KitesGameProps {
  onBack: () => void;
}

export const KitesGame: React.FC<KitesGameProps> = ({ onBack }) => {
  const [gameState, setGameState] = useState<KitesGameState>(() => initializeKitesGame('medium'));
  const [currentExercise, setCurrentExercise] = useState<number>(0);
  const [lastUpdateTime, setLastUpdateTime] = useState(Date.now());
  const [nextWindEvent, setNextWindEvent] = useState(Date.now() + 45000); // 45 seconds

  // Game loop for real-time updates
  useEffect(() => {
    if (!gameState.isGameActive || gameState.phase === 'results') return;

    const gameLoop = setInterval(() => {
      const now = Date.now();
      const deltaTime = (now - lastUpdateTime) / 1000; // Convert to seconds
      setLastUpdateTime(now);

      setGameState(prevState => {
        let newState = { ...prevState };
        
        // Update game timer
        newState.remainingTime = Math.max(0, newState.remainingTime - deltaTime);
        
        // Update sand timers
        newState = updateTimers(newState, deltaTime);
        
        // Update kite altitudes
        newState = updateKiteAltitudes(newState);
        
        // Update wind conditions
        newState = updateWindConditions(newState, deltaTime);
        
        // Check for wind events
        if (now >= nextWindEvent && newState.activeWindConditions.length === 0) {
          const windEvent = getRandomWindEvent();
          newState = activateWindCondition(newState, windEvent);
          setNextWindEvent(now + difficultySettings[newState.difficulty].windEventFrequency * 1000);
        }
        
        // Check win/lose conditions
        if (isGameWon(newState)) {
          newState.phase = 'results';
          newState.isGameActive = false;
          newState = calculateFinalScore(newState);
          newState.gameLog.push(
            'Congratulations! You kept the kites flying!',
            '축하합니다! 연을 계속 날리셨습니다!'
          );
        } else if (isGameLost(newState)) {
          newState.phase = 'results';
          newState.isGameActive = false;
          newState = calculateFinalScore(newState);
          newState.gameLog.push(
            'Game Over! All kites have fallen.',
            '게임 오버! 모든 연이 떨어졌습니다.'
          );
        }
        
        return newState;
      });
    }, 100); // Update every 100ms for smooth animations

    return () => clearInterval(gameLoop);
  }, [gameState.isGameActive, gameState.phase, lastUpdateTime, nextWindEvent]);

  const handleFlipTimer = useCallback((timerId: string) => {
    setGameState(prevState => flipTimer(prevState, timerId));
  }, []);

  const handleLaunchKite = useCallback((kiteId: string) => {
    setGameState(prevState => launchKite(prevState, kiteId));
  }, []);

  const handleStartGame = useCallback(() => {
    setGameState(prevState => ({
      ...prevState,
      phase: 'flying',
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
        phase: 'flying'
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

  const getTimerStatus = () => {
    const status: { [color: string]: boolean } = {};
    gameState.sandTimers.forEach(timer => {
      status[timer.color] = timer.isActive && timer.remainingTime > 0;
    });
    return status;
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const flyingKites = gameState.kites.filter(k => k.isFlying);
  const availableKites = getAvailableKites(gameState);
  const timerStatus = getTimerStatus();

  if (gameState.phase === 'grammar') {
    const exercise = grammarExercises[currentExercise];
    if (!exercise) {
      // If no exercise found, go back to flying phase
      setGameState(prevState => ({ ...prevState, phase: 'flying' }));
      return null;
    }

    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 p-4">
        <div className="container mx-auto">
          <div className="mb-6 text-center">
            <h1 className="text-3xl font-bold text-gray-800 mb-2">Grammar Challenge</h1>
            <p className="text-gray-600">Answer correctly to earn bonus points!</p>
          </div>
          
          <KitesGrammarExercise
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
              {isGameWon(gameState) ? '🎉 Victory!' : '💔 Game Over'}
            </h1>
            <p className="text-xl text-gray-600">
              {isGameWon(gameState) 
                ? 'You successfully kept the kites flying!' 
                : 'Better luck next time!'}
            </p>
            <p className="text-gray-500">
              {isGameWon(gameState) 
                ? '연을 성공적으로 계속 날리셨습니다!' 
                : '다음에 더 잘하세요!'}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            {/* Final Score */}
            <div className="card">
              <h3 className="text-xl font-bold text-gray-800 mb-4">Final Score</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span>Kites Flying:</span>
                  <span className="font-bold">{gameState.score.kitesFlying}</span>
                </div>
                <div className="flex justify-between">
                  <span>Time Bonus:</span>
                  <span className="font-bold">{gameState.score.timeBonus}</span>
                </div>
                <div className="flex justify-between">
                  <span>Cooperation Bonus:</span>
                  <span className="font-bold">{gameState.score.cooperationBonus}</span>
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
                  <span>Kites Launched:</span>
                  <span>{gameState.kites.filter(k => k.isFlying || k.altitude > 0).length}</span>
                </div>
                <div className="flex justify-between">
                  <span>Timers Flipped:</span>
                  <span>{gameState.sandTimers.filter(t => t.isFlipped).length}</span>
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
              onClick={() => setGameState(initializeKitesGame(gameState.difficulty))}
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
    <div className="min-h-screen bg-gradient-to-br from-sky-50 via-blue-50 to-indigo-50 p-4">
      <div className="container mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-800 flex items-center space-x-2">
              <span>🪁</span>
              <span>Kites</span>
              <span>🪁</span>
            </h1>
            <p className="text-gray-600">Keep the kites flying together!</p>
            <p className="text-gray-500 text-sm">함께 연을 하늘에 띄워 보세요!</p>
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
            <div className="text-2xl font-bold text-blue-600">{formatTime(gameState.remainingTime)}</div>
            <div className="text-sm text-gray-600">Time Left</div>
          </div>
          <div className="card text-center">
            <div className="text-2xl font-bold text-green-600">{flyingKites.length}</div>
            <div className="text-sm text-gray-600">Kites Flying</div>
          </div>
          <div className="card text-center">
            <div className="text-2xl font-bold text-purple-600">
              {gameState.sandTimers.filter(t => t.isActive).length}
            </div>
            <div className="text-sm text-gray-600">Active Timers</div>
          </div>
          <div className="card text-center">
            <div className="text-2xl font-bold text-orange-600">{gameState.score.total}</div>
            <div className="text-sm text-gray-600">Score</div>
          </div>
        </div>

        {/* Wind Conditions */}
        {gameState.activeWindConditions.length > 0 && (
          <div className="mb-6">
            {gameState.activeWindConditions.map(wind => (
              <div key={wind.id} className="card bg-cyan-50 border-cyan-200">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <span className="text-3xl">{wind.emoji}</span>
                    <div>
                      <h3 className="font-bold text-cyan-800">{wind.name}</h3>
                      <p className="text-cyan-600 text-sm">{wind.effect}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-lg font-bold text-cyan-700">
                      {Math.ceil(wind.remainingTime)}s
                    </div>
                    <div className="text-xs text-cyan-600">remaining</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Game Controls */}
        {gameState.phase === 'planning' && (
          <div className="card mb-6 text-center">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Ready to Start?</h2>
            <p className="text-gray-600 mb-4">
              Flip timers and launch kites to keep them flying as long as possible!
            </p>
            <div className="space-x-4">
              <button
                onClick={handleStartGame}
                className="bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-6 rounded-lg transition-colors duration-200"
              >
                🚀 Start Flying!
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

        {gameState.phase === 'flying' && (
          <div className="card mb-6 text-center">
            <div className="flex items-center justify-center space-x-4">
              <button
                onClick={handleShowGrammar}
                className="bg-purple-500 hover:bg-purple-600 text-white font-bold py-2 px-4 rounded-lg transition-colors duration-200"
              >
                📚 Grammar Challenge
              </button>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Sand Timers */}
          <div>
            <h2 className="text-xl font-bold text-gray-800 mb-4">Sand Timers</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {gameState.sandTimers.map(timer => (
                <SandTimer
                  key={timer.id}
                  timer={timer}
                  onFlip={() => handleFlipTimer(timer.id)}
                  isClickable={!timer.isActive}
                />
              ))}
            </div>
          </div>

          {/* Kites */}
          <div>
            <h2 className="text-xl font-bold text-gray-800 mb-4">Kites</h2>
            <div className="space-y-4">
              {gameState.kites.map(kite => (
                <KiteCard
                  key={kite.id}
                  kite={kite}
                  onLaunch={() => handleLaunchKite(kite.id)}
                  canLaunch={availableKites.some(k => k.id === kite.id)}
                  requiredTimersStatus={timerStatus}
                  showLaunchButton={!kite.isFlying}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Game Log */}
        <div className="mt-6">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Game Log</h2>
          <div className="card max-h-40 overflow-y-auto">
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