import type { ScotlandYardGameState, ScotlandYardPlayer, ScotlandYardLocation } from '../types/scotlandYardGame';
import { londonLocations, transportRoutes, difficultySettings } from '../data/scotlandYardGameData';

export const initializeScotlandYardGame = (difficulty: 'easy' | 'medium' | 'hard' = 'medium'): ScotlandYardGameState => {
  const settings = difficultySettings[difficulty];
  
  const detective: ScotlandYardPlayer = {
    id: 'detective-1',
    name: 'Detective',
    role: 'detective',
    currentLocation: 'trafalgar-square',
    tickets: { ...settings.startingTickets },
    deductionPoints: 0,
    communicationScore: 0,
    movesHistory: []
  };

  // Randomly place criminal
  const criminalLocation = getRandomLocation();

  return {
    phase: 'setup',
    turn: 1,
    maxTurns: settings.maxTurns,
    players: [detective],
    currentPlayer: 0,
    locations: londonLocations.map(loc => ({ ...loc })),
    criminalLocation,
    criminalRevealed: false,
    lastRevealedTurn: 0,
    gameLog: [
      'Welcome to Scotland Yard! Work together to catch the criminal!',
      '스코틀랜드 야드에 오신 것을 환영합니다! 함께 범인을 잡으세요!'
    ],
    score: {
      deductionPoints: 0,
      cooperationBonus: 0,
      grammarBonus: 0,
      timeBonus: 0,
      total: 0
    },
    difficulty,
    isGameActive: false,
    criminalCaught: false,
    criminalEscaped: false
  };
};

export const getRandomLocation = (): string => {
  const randomIndex = Math.floor(Math.random() * londonLocations.length);
  return londonLocations[randomIndex]?.id || 'trafalgar-square';
};

export const movePlayer = (
  gameState: ScotlandYardGameState, 
  playerId: string, 
  destinationId: string, 
  transportType: 'taxi' | 'bus' | 'subway' | 'boat'
): ScotlandYardGameState => {
  const player = gameState.players.find(p => p.id === playerId);
  if (!player) return gameState;

  const currentLocation = gameState.locations.find(loc => loc.id === player.currentLocation);
  const destination = gameState.locations.find(loc => loc.id === destinationId);
  
  if (!currentLocation || !destination) return gameState;

  // Check if destination is connected
  if (!currentLocation.connections.includes(destinationId)) {
    return {
      ...gameState,
      gameLog: [
        ...gameState.gameLog,
        `Cannot move to ${destination.name} - not connected!`,
        `${destination.nameKorean}으로 이동할 수 없습니다 - 연결되지 않았습니다!`
      ]
    };
  }

  // Check if player has required tickets
  if (player.tickets[transportType] <= 0) {
    return {
      ...gameState,
      gameLog: [
        ...gameState.gameLog,
        `No ${transportType} tickets remaining!`,
        `${transportType} 티켓이 남아있지 않습니다!`
      ]
    };
  }

  // Update player position and tickets
  const updatedPlayers = gameState.players.map(p => {
    if (p.id === playerId) {
      return {
        ...p,
        currentLocation: destinationId,
        tickets: {
          ...p.tickets,
          [transportType]: p.tickets[transportType] - 1
        },
        movesHistory: [...p.movesHistory, destinationId]
      };
    }
    return p;
  });

  return {
    ...gameState,
    players: updatedPlayers,
    gameLog: [
      ...gameState.gameLog,
      `${player.name} took ${transportType} to ${destination.name}`,
      `${player.name}이/가 ${transportType}로 ${destination.nameKorean}에 갔습니다`
    ]
  };
};

export const moveCriminal = (gameState: ScotlandYardGameState): ScotlandYardGameState => {
  const currentLocation = gameState.locations.find(loc => loc.id === gameState.criminalLocation);
  if (!currentLocation) return gameState;

  // Get possible moves for criminal
  const possibleMoves = currentLocation.connections.filter(locationId => 
    gameState.locations.find(loc => loc.id === locationId)
  );

  if (possibleMoves.length === 0) return gameState;

  // Randomly select new location
  const randomIndex = Math.floor(Math.random() * possibleMoves.length);
  const newLocation = possibleMoves[randomIndex];
  
  if (!newLocation) return gameState;

  const shouldReveal = gameState.turn % difficultySettings[gameState.difficulty].revealFrequency === 0;

  return {
    ...gameState,
    criminalLocation: newLocation,
    criminalRevealed: shouldReveal,
    lastRevealedTurn: shouldReveal ? gameState.turn : gameState.lastRevealedTurn,
    gameLog: [
      ...gameState.gameLog,
      shouldReveal ? `Criminal spotted at ${gameState.locations.find(loc => loc.id === newLocation)?.name}!` : 'Criminal moved to unknown location',
      shouldReveal ? `범인이 ${gameState.locations.find(loc => loc.id === newLocation)?.nameKorean}에서 목격되었습니다!` : '범인이 알 수 없는 장소로 이동했습니다'
    ]
  };
};

export const makeDeduction = (
  gameState: ScotlandYardGameState, 
  playerId: string, 
  suspectedLocation: string
): ScotlandYardGameState => {
  const player = gameState.players.find(p => p.id === playerId);
  if (!player) return gameState;

  const isCorrect = suspectedLocation === gameState.criminalLocation;
  const points = isCorrect ? 20 : -5;

  const updatedPlayers = gameState.players.map(p => {
    if (p.id === playerId) {
      return {
        ...p,
        deductionPoints: p.deductionPoints + points
      };
    }
    return p;
  });

  const location = gameState.locations.find(loc => loc.id === suspectedLocation);

  return {
    ...gameState,
    players: updatedPlayers,
    score: {
      ...gameState.score,
      deductionPoints: gameState.score.deductionPoints + points
    },
    gameLog: [
      ...gameState.gameLog,
      isCorrect ? 
        `Correct deduction! Criminal found at ${location?.name}!` : 
        `Wrong deduction. Criminal not at ${location?.name}.`,
      isCorrect ? 
        `정확한 추론! 범인이 ${location?.nameKorean}에서 발견되었습니다!` : 
        `잘못된 추론. 범인이 ${location?.nameKorean}에 있지 않습니다.`
    ]
  };
};

export const checkCriminalCaught = (gameState: ScotlandYardGameState): ScotlandYardGameState => {
  const detective = gameState.players.find(p => p.role === 'detective');
  if (!detective) return gameState;

  const isCaught = detective.currentLocation === gameState.criminalLocation;

  if (isCaught) {
    return {
      ...gameState,
      criminalCaught: true,
      phase: 'results',
      isGameActive: false,
      gameLog: [
        ...gameState.gameLog,
        'Criminal caught! Excellent detective work!',
        '범인을 잡았습니다! 훌륭한 수사 작업입니다!'
      ]
    };
  }

  return gameState;
};

export const checkGameEnd = (gameState: ScotlandYardGameState): ScotlandYardGameState => {
  // Check if criminal escaped (max turns reached)
  if (gameState.turn >= gameState.maxTurns && !gameState.criminalCaught) {
    return {
      ...gameState,
      criminalEscaped: true,
      phase: 'results',
      isGameActive: false,
      gameLog: [
        ...gameState.gameLog,
        'Criminal escaped! Better luck next time.',
        '범인이 도망쳤습니다! 다음에 더 잘하세요.'
      ]
    };
  }

  return gameState;
};

export const getConnectedLocations = (gameState: ScotlandYardGameState, locationId: string): ScotlandYardLocation[] => {
  const location = gameState.locations.find(loc => loc.id === locationId);
  if (!location) return [];

  return location.connections
    .map(connId => gameState.locations.find(loc => loc.id === connId))
    .filter((loc): loc is ScotlandYardLocation => loc !== undefined);
};

export const getAvailableTransport = (
  gameState: ScotlandYardGameState, 
  playerId: string, 
  destinationId: string
): ('taxi' | 'bus' | 'subway' | 'boat')[] => {
  const player = gameState.players.find(p => p.id === playerId);
  if (!player) return [];

  const routes = transportRoutes.filter(route => 
    route.from === player.currentLocation && route.to === destinationId
  );

  return routes
    .filter(route => player.tickets[route.type] > 0)
    .map(route => route.type);
};

export const calculateCooperationScore = (gameState: ScotlandYardGameState): number => {
  const detective = gameState.players.find(p => p.role === 'detective');
  if (!detective) return 0;

  let score = 0;
  
  // Bonus for efficient movement
  const movesUsed = detective.movesHistory.length;
  const efficiency = Math.max(0, gameState.maxTurns - movesUsed);
  score += efficiency * 5;
  
  // Bonus for deduction accuracy
  score += Math.max(0, detective.deductionPoints);
  
  // Bonus for catching criminal quickly
  if (gameState.criminalCaught) {
    const turnsUsed = gameState.turn;
    const speedBonus = Math.max(0, (gameState.maxTurns - turnsUsed) * 10);
    score += speedBonus;
  }
  
  return score;
};

export const calculateFinalScore = (gameState: ScotlandYardGameState): ScotlandYardGameState => {
  const deductionPoints = gameState.score.deductionPoints;
  const cooperationBonus = calculateCooperationScore(gameState);
  const grammarBonus = gameState.score.grammarBonus;
  const timeBonus = gameState.criminalCaught ? (gameState.maxTurns - gameState.turn) * 5 : 0;
  
  const total = deductionPoints + cooperationBonus + grammarBonus + timeBonus;

  return {
    ...gameState,
    score: {
      deductionPoints,
      cooperationBonus,
      grammarBonus,
      timeBonus,
      total
    }
  };
};

export const getLocationsByType = (gameState: ScotlandYardGameState, type: 'taxi' | 'bus' | 'subway' | 'boat'): ScotlandYardLocation[] => {
  return gameState.locations.filter(location => location.type === type);
};

export const formatTickets = (tickets: { taxi: number; bus: number; subway: number; boat: number }): string => {
  return `🚕${tickets.taxi} 🚌${tickets.bus} 🚇${tickets.subway} 🚤${tickets.boat}`;
}; 