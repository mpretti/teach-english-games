import type { SurviveGameState, SurvivePlayer, IslandTile } from '../types/surviveGame';
import { createIslandGrid, boats, seaCreatures } from '../data/surviveGameData';

export const initializeSurviveGame = (): SurviveGameState => {
  const islandSize = 5;
  const island = createIslandGrid(islandSize);
  
  // Place player at center of island
  const centerX = Math.floor(islandSize / 2);
  const centerY = Math.floor(islandSize / 2);
  
  const player: SurvivePlayer = {
    id: 'player-1',
    name: 'Survivor',
    position: { x: centerX, y: centerY },
    isInBoat: false,
    isSwimming: false,
    isOnDolphin: false,
    hasEscaped: false,
    survivalPoints: 0,
    seaCreatureCards: [...seaCreatures]
  };

  // Mark player position on island
  const centerTile = island[centerY]?.[centerX];
  if (centerTile) {
    centerTile.hasPlayer = true;
    centerTile.playerId = player.id;
  }

  return {
    phase: 'movement',
    turn: 1,
    maxTurns: 10,
    players: [player],
    currentPlayer: 0,
    island,
    boats: [...boats],
    activeSeaCreatures: [],
    sinkingQueue: [],
    gameLog: [
      'Welcome to Survive! Escape the sinking island of Atlantis!',
      '서바이브에 오신 것을 환영합니다! 가라앉는 아틀란티스 섬에서 탈출하세요!'
    ],
    islandSize
  };
};

export const isValidMove = (
  gameState: SurviveGameState, 
  _playerId: string, 
  from: { x: number; y: number }, 
  to: { x: number; y: number }
): boolean => {
  const { island, islandSize } = gameState;
  
  // Check bounds
  if (to.x < 0 || to.x >= islandSize || to.y < 0 || to.y >= islandSize) {
    return false;
  }
  
  // Check if destination tile exists and isn't sunk
  const destinationTile = island[to.y]?.[to.x];
  if (!destinationTile || destinationTile.isSinking) {
    return false;
  }
  
  // Check if move is adjacent (1 tile distance)
  const distance = Math.abs(to.x - from.x) + Math.abs(to.y - from.y);
  return distance === 1;
};

export const movePlayer = (
  gameState: SurviveGameState, 
  playerId: string, 
  to: { x: number; y: number }
): SurviveGameState => {
  const player = gameState.players.find(p => p.id === playerId);
  if (!player) return gameState;

  if (!isValidMove(gameState, playerId, player.position, to)) {
    return gameState;
  }

  const newIsland = gameState.island.map(row => [...row]);
  
  // Clear old position
  const oldTile = newIsland[player.position.y]?.[player.position.x];
  if (oldTile) {
    oldTile.hasPlayer = false;
    oldTile.playerId = undefined;
  }
  
  // Set new position
  const newTile = newIsland[to.y]?.[to.x];
  if (newTile) {
    newTile.hasPlayer = true;
    newTile.playerId = playerId;
  }

  const updatedPlayers = gameState.players.map(p => {
    if (p.id === playerId) {
      return { ...p, position: to };
    }
    return p;
  });

  const tileName = newTile?.name || 'Unknown';
  const tileNameKorean = newTile?.nameKorean || '알 수 없음';

  return {
    ...gameState,
    players: updatedPlayers,
    island: newIsland,
    gameLog: [
      ...gameState.gameLog,
      `${player.name} moved to ${tileName}`,
      `${player.name}이/가 ${tileNameKorean}으로 이동했습니다`
    ]
  };
};

export const boardBoat = (
  gameState: SurviveGameState, 
  playerId: string, 
  boatId: string
): SurviveGameState => {
  const player = gameState.players.find(p => p.id === playerId);
  const boat = gameState.boats.find(b => b.id === boatId);
  
  if (!player || !boat) return gameState;
  
  // Check if player is adjacent to boat
  const distance = Math.abs(player.position.x - boat.position.x) + Math.abs(player.position.y - boat.position.y);
  if (distance > 1) return gameState;
  
  // Check if boat has capacity
  if (boat.currentPassengers.length >= boat.capacity) return gameState;

  const updatedBoats = gameState.boats.map(b => {
    if (b.id === boatId) {
      return {
        ...b,
        currentPassengers: [...b.currentPassengers, playerId]
      };
    }
    return b;
  });

  const updatedPlayers = gameState.players.map(p => {
    if (p.id === playerId) {
      return {
        ...p,
        isInBoat: true,
        boatId,
        position: boat.position
      };
    }
    return p;
  });

  return {
    ...gameState,
    players: updatedPlayers,
    boats: updatedBoats,
    gameLog: [
      ...gameState.gameLog,
      `${player.name} boarded the ${boat.name}`,
      `${player.name}이/가 ${boat.nameKorean}에 탔습니다`
    ]
  };
};

export const startSwimming = (
  gameState: SurviveGameState, 
  playerId: string, 
  to: { x: number; y: number }
): SurviveGameState => {
  const player = gameState.players.find(p => p.id === playerId);
  if (!player) return gameState;

  // Swimming allows moving to water (outside island bounds)
  const updatedPlayers = gameState.players.map(p => {
    if (p.id === playerId) {
      return {
        ...p,
        position: to,
        isSwimming: true,
        isInBoat: false,
        boatId: undefined
      };
    }
    return p;
  });

  return {
    ...gameState,
    players: updatedPlayers,
    gameLog: [
      ...gameState.gameLog,
      `${player.name} started swimming!`,
      `${player.name}이/가 수영을 시작했습니다!`
    ]
  };
};

export const rideDolphin = (
  gameState: SurviveGameState, 
  playerId: string, 
  dolphinId: string
): SurviveGameState => {
  const player = gameState.players.find(p => p.id === playerId);
  const dolphin = gameState.activeSeaCreatures.find(c => c.id === dolphinId && c.type === 'dolphin');
  
  if (!player || !dolphin) return gameState;

  const updatedPlayers = gameState.players.map(p => {
    if (p.id === playerId) {
      return {
        ...p,
        isOnDolphin: true,
        position: dolphin.position,
        survivalPoints: p.survivalPoints + 10
      };
    }
    return p;
  });

  return {
    ...gameState,
    players: updatedPlayers,
    gameLog: [
      ...gameState.gameLog,
      `${player.name} is riding the ${dolphin.name}!`,
      `${player.name}이/가 ${dolphin.nameKorean}을/를 타고 있습니다!`
    ]
  };
};

export const sinkIslandTiles = (gameState: SurviveGameState, count: number = 1): SurviveGameState => {
  const newIsland = gameState.island.map(row => [...row]);
  
  // Find tiles to sink (lowest sinkOrder first)
  const tilesToSink: { x: number; y: number; tile: IslandTile }[] = [];
  
  for (let y = 0; y < gameState.islandSize; y++) {
    for (let x = 0; x < gameState.islandSize; x++) {
      const tile = newIsland[y]?.[x];
      if (tile && !tile.isSinking) {
        tilesToSink.push({ x, y, tile });
      }
    }
  }
  
  // Sort by sink order and take the first 'count' tiles
  tilesToSink.sort((a, b) => a.tile.sinkOrder - b.tile.sinkOrder);
  
  const gameLog = [...gameState.gameLog];
  
  for (let i = 0; i < Math.min(count, tilesToSink.length); i++) {
    const tileToSink = tilesToSink[i];
    if (!tileToSink) continue;
    
    const { x, y, tile } = tileToSink;
    const targetTile = newIsland[y]?.[x];
    if (targetTile) {
      targetTile.isSinking = true;
      
      // If player is on sinking tile, they must swim
      if (tile.hasPlayer && tile.playerId) {
        gameLog.push(
          `${tile.name} is sinking! Player must swim!`,
          `${tile.nameKorean}이/가 가라앉고 있습니다! 플레이어가 수영해야 합니다!`
        );
      }
      
      gameLog.push(
        `${tile.name} has sunk into the ocean!`,
        `${tile.nameKorean}이/가 바다로 가라앉았습니다!`
      );
    }
  }

  return {
    ...gameState,
    island: newIsland,
    gameLog
  };
};

export const activateSeaCreature = (
  gameState: SurviveGameState, 
  creatureId: string, 
  targetPosition: { x: number; y: number }
): SurviveGameState => {
  const creature = gameState.players[0]?.seaCreatureCards.find(c => c.id === creatureId);
  if (!creature) return gameState;

  const activatedCreature = {
    ...creature,
    position: targetPosition,
    isActive: true
  };

  const updatedActiveCreatures = [...gameState.activeSeaCreatures, activatedCreature];
  
  // Remove creature from player's hand
  const updatedPlayers = gameState.players.map(player => ({
    ...player,
    seaCreatureCards: player.seaCreatureCards.filter(c => c.id !== creatureId)
  }));

  return {
    ...gameState,
    players: updatedPlayers,
    activeSeaCreatures: updatedActiveCreatures,
    gameLog: [
      ...gameState.gameLog,
      `${creature.name} has been activated!`,
      `${creature.nameKorean}이/가 활성화되었습니다!`,
      creature.description,
      creature.descriptionKorean
    ]
  };
};

export const checkEscapeCondition = (gameState: SurviveGameState): SurviveGameState => {
  const updatedPlayers = gameState.players.map(player => {
    // Player escapes if they're far enough from the island or on a boat at the edge
    const { x, y } = player.position;
    const islandSize = gameState.islandSize;
    
    const distanceFromIsland = Math.max(
      Math.max(0, -x, x - (islandSize - 1)),
      Math.max(0, -y, y - (islandSize - 1))
    );
    
    if (distanceFromIsland >= 2 || (player.isInBoat && distanceFromIsland >= 1)) {
      return {
        ...player,
        hasEscaped: true,
        survivalPoints: player.survivalPoints + 50
      };
    }
    
    return player;
  });

  const escapedPlayers = updatedPlayers.filter(p => p.hasEscaped);
  const newGameLog = [...gameState.gameLog];
  
  escapedPlayers.forEach(player => {
    if (!gameState.players.find(p => p.id === player.id)?.hasEscaped) {
      newGameLog.push(
        `${player.name} has escaped to safety!`,
        `${player.name}이/가 안전하게 탈출했습니다!`
      );
    }
  });

  return {
    ...gameState,
    players: updatedPlayers,
    gameLog: newGameLog
  };
};

export const calculateSurvivalScore = (player: SurvivePlayer): number => {
  let score = player.survivalPoints;
  
  if (player.hasEscaped) {
    score += 100; // Bonus for escaping
  }
  
  if (player.isInBoat) {
    score += 20; // Bonus for being in a boat
  }
  
  if (player.isOnDolphin) {
    score += 30; // Bonus for riding a dolphin
  }
  
  return score;
};

export const getAdjacentPositions = (position: { x: number; y: number }): { x: number; y: number }[] => {
  return [
    { x: position.x - 1, y: position.y },
    { x: position.x + 1, y: position.y },
    { x: position.x, y: position.y - 1 },
    { x: position.x, y: position.y + 1 }
  ];
}; 