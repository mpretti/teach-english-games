import React, { useState, useCallback } from 'react';
import { LocationCard } from './LocationCard';
import { ScotlandYardGrammarExercise } from './ScotlandYardGrammarExercise';
import type { ScotlandYardGameState } from '../types/scotlandYardGame';
import { 
  initializeScotlandYardGame, 
  movePlayer,
  moveCriminal,
  makeDeduction,
  checkCriminalCaught,
  checkGameEnd,
  getAvailableTransport,
  formatTickets
} from '../utils/scotlandYardGameUtils';
import { grammarExercises } from '../data/scotlandYardGameData';

interface ScotlandYardGameProps {
  onBack: () => void;
}

export const ScotlandYardGame: React.FC<ScotlandYardGameProps> = ({ onBack }) => {
  const [gameState, setGameState] = useState<ScotlandYardGameState>(() => initializeScotlandYardGame('medium'));
  const [selectedLocation, setSelectedLocation] = useState<string | null>(null);
  const [currentExercise, setCurrentExercise] = useState<number>(0);

  const handleLocationClick = useCallback((locationId: string) => {
    if (gameState.phase !== 'moving') return;
    
    const detective = gameState.players.find(p => p.role === 'detective');
    if (!detective) return;

    if (locationId === detective.currentLocation) {
      // Clicking current location - make deduction
      setGameState(prevState => {
        let newState = makeDeduction(prevState, detective.id, locationId);
        newState = checkCriminalCaught(newState);
        return newState;
      });
    } else {
      // Select destination
      setSelectedLocation(locationId);
    }
  }, [gameState.phase]);

  const handleTransportSelect = useCallback((transport: 'taxi' | 'bus' | 'subway' | 'boat') => {
    if (!selectedLocation) return;
    
    const detective = gameState.players.find(p => p.role === 'detective');
    if (!detective) return;

    setGameState(prevState => {
      let newState = movePlayer(prevState, detective.id, selectedLocation, transport);
      
      // Move criminal after detective moves
      newState = moveCriminal(newState);
      
      // Advance turn
      newState = {
        ...newState,
        turn: newState.turn + 1
      };
      
      // Check if criminal is caught
      newState = checkCriminalCaught(newState);
      
      // Check if game should end
      newState = checkGameEnd(newState);
      
      return newState;
    });

    setSelectedLocation(null);
  }, [selectedLocation, gameState]);

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
          'Correct! +5 detective bonus points!',
          '정답! +5 수사관 보너스 점수!'
        ]
      }));
    }

    // Move to next exercise or back to game
    if (currentExercise < grammarExercises.length - 1) {
      setCurrentExercise(prev => prev + 1);
    } else {
      setGameState(prevState => ({
        ...prevState,
        phase: 'moving'
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

  const handleStartGame = useCallback(() => {
    setGameState(prevState => ({
      ...prevState,
      phase: 'moving',
      isGameActive: true
    }));
  }, []);

  const detective = gameState.players.find(p => p.role === 'detective');
  const availableTransport = selectedLocation && detective ? 
    getAvailableTransport(gameState, detective.id, selectedLocation) : [];

  if (gameState.phase === 'grammar') {
    const exercise = grammarExercises[currentExercise];
    if (!exercise) {
      setGameState(prevState => ({ ...prevState, phase: 'moving' }));
      return null;
    }

    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 p-4">
        <div className="container mx-auto">
          <div className="mb-6 text-center">
            <h1 className="text-3xl font-bold text-gray-800 mb-2">Detective Training</h1>
            <p className="text-gray-600">Sharpen your communication skills!</p>
          </div>
          
          <ScotlandYardGrammarExercise
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
              {gameState.criminalCaught ? '🎉 Criminal Caught!' : '💔 Criminal Escaped!'}
            </h1>
            <p className="text-xl text-gray-600">
              {gameState.criminalCaught 
                ? 'Excellent detective work!' 
                : 'Better luck next time, detective!'}
            </p>
            <p className="text-gray-500">
              {gameState.criminalCaught 
                ? '훌륭한 수사 작업입니다!' 
                : '다음에 더 잘하세요, 수사관님!'}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            {/* Final Score */}
            <div className="card">
              <h3 className="text-xl font-bold text-gray-800 mb-4">Final Score</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span>Deduction Points:</span>
                  <span className="font-bold">{gameState.score.deductionPoints}</span>
                </div>
                <div className="flex justify-between">
                  <span>Cooperation Bonus:</span>
                  <span className="font-bold">{gameState.score.cooperationBonus}</span>
                </div>
                <div className="flex justify-between">
                  <span>Grammar Bonus:</span>
                  <span className="font-bold">{gameState.score.grammarBonus}</span>
                </div>
                <div className="flex justify-between">
                  <span>Time Bonus:</span>
                  <span className="font-bold">{gameState.score.timeBonus}</span>
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
              <h3 className="text-xl font-bold text-gray-800 mb-4">Investigation Report</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span>Turns Used:</span>
                  <span>{gameState.turn}</span>
                </div>
                <div className="flex justify-between">
                  <span>Locations Visited:</span>
                  <span>{detective?.movesHistory.length || 0}</span>
                </div>
                <div className="flex justify-between">
                  <span>Criminal Status:</span>
                  <span className={gameState.criminalCaught ? 'text-green-600' : 'text-red-600'}>
                    {gameState.criminalCaught ? 'Caught' : 'Escaped'}
                  </span>
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
              onClick={() => setGameState(initializeScotlandYardGame(gameState.difficulty))}
              className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-6 rounded-lg transition-colors duration-200"
            >
              New Investigation
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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 p-4">
      <div className="container mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-800 flex items-center space-x-2">
              <span>🕵️</span>
              <span>Scotland Yard</span>
              <span>🏴󠁧󠁢󠁥󠁮󠁧󠁿</span>
            </h1>
            <p className="text-gray-600">Work together to catch the criminal in London!</p>
            <p className="text-gray-500 text-sm">함께 런던에서 범인을 잡으세요!</p>
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
            <div className="text-2xl font-bold text-blue-600">{gameState.turn}</div>
            <div className="text-sm text-gray-600">Turn</div>
          </div>
          <div className="card text-center">
            <div className="text-2xl font-bold text-purple-600">{detective?.deductionPoints || 0}</div>
            <div className="text-sm text-gray-600">Deduction Points</div>
          </div>
          <div className="card text-center">
            <div className="text-2xl font-bold text-green-600">
              {gameState.criminalRevealed ? 'Spotted!' : 'Hidden'}
            </div>
            <div className="text-sm text-gray-600">Criminal Status</div>
          </div>
          <div className="card text-center">
            <div className="text-2xl font-bold text-orange-600">{gameState.score.total}</div>
            <div className="text-sm text-gray-600">Score</div>
          </div>
        </div>

        {/* Detective Info */}
        {detective && (
          <div className="card mb-6">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Detective Status</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h3 className="font-semibold text-gray-700 mb-2">Current Location:</h3>
                <div className="bg-blue-100 border border-blue-300 rounded-lg p-3">
                  <span className="font-bold">
                    {gameState.locations.find(loc => loc.id === detective.currentLocation)?.name}
                  </span>
                  <span className="text-sm text-gray-600 ml-2">
                    ({gameState.locations.find(loc => loc.id === detective.currentLocation)?.nameKorean})
                  </span>
                </div>
              </div>
              <div>
                <h3 className="font-semibold text-gray-700 mb-2">Transport Tickets:</h3>
                <div className="bg-gray-100 border border-gray-300 rounded-lg p-3">
                  <span className="font-mono text-sm">{formatTickets(detective.tickets)}</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Game Controls */}
        {gameState.phase === 'setup' && (
          <div className="card mb-6 text-center">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Ready to Start Investigation?</h2>
            <p className="text-gray-600 mb-4">
              Track down the criminal using London's transport system!
            </p>
            <div className="space-x-4">
              <button
                onClick={handleStartGame}
                className="bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-6 rounded-lg transition-colors duration-200"
              >
                🚀 Start Investigation!
              </button>
              <button
                onClick={handleShowGrammar}
                className="bg-purple-500 hover:bg-purple-600 text-white font-bold py-3 px-6 rounded-lg transition-colors duration-200"
              >
                📚 Detective Training
              </button>
            </div>
          </div>
        )}

        {gameState.phase === 'moving' && (
          <div className="card mb-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold text-gray-800">Investigation Controls</h2>
              <button
                onClick={handleShowGrammar}
                className="bg-purple-500 hover:bg-purple-600 text-white font-bold py-2 px-4 rounded-lg transition-colors duration-200"
              >
                📚 Detective Training
              </button>
            </div>
            
            {selectedLocation && (
              <div className="mt-4 p-4 bg-yellow-50 border border-yellow-300 rounded-lg">
                <h3 className="font-bold text-yellow-800 mb-2">
                  Moving to: {gameState.locations.find(loc => loc.id === selectedLocation)?.name}
                </h3>
                <p className="text-yellow-700 text-sm mb-3">Select transport method:</p>
                <div className="flex space-x-2">
                  {availableTransport.map(transport => (
                    <button
                      key={transport}
                      onClick={() => handleTransportSelect(transport)}
                      className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg transition-colors duration-200"
                    >
                      {transport === 'taxi' && '🚕 Taxi'}
                      {transport === 'bus' && '🚌 Bus'}
                      {transport === 'subway' && '🚇 Subway'}
                      {transport === 'boat' && '🚤 Boat'}
                    </button>
                  ))}
                  <button
                    onClick={() => setSelectedLocation(null)}
                    className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded-lg transition-colors duration-200"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        {/* London Map */}
        <div className="card mb-6">
          <h2 className="text-xl font-bold text-gray-800 mb-4">London Map</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {gameState.locations.map(location => (
              <LocationCard
                key={location.id}
                location={location}
                onClick={() => handleLocationClick(location.id)}
                isPlayerHere={detective?.currentLocation === location.id}
                isCriminalHere={gameState.criminalRevealed && gameState.criminalLocation === location.id}
                isClickable={gameState.isGameActive}
                showConnections={true}
                isSelected={selectedLocation === location.id}
              />
            ))}
          </div>
        </div>

        {/* Game Log */}
        <div className="card">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Investigation Log</h2>
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