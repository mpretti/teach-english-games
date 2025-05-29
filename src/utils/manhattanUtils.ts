import type { ManhattanGameState, ManhattanPlayer, ManhattanBuilding, ManhattanBlock } from '../types/manhattanGame';
import { MANHATTAN_BUILDINGS, MANHATTAN_GRID, RESOURCE_MARKET, DIFFICULTY_SETTINGS } from '../data/manhattanData';

export const initializeManhattanGame = (difficulty: 'easy' | 'medium' | 'hard'): ManhattanGameState => {
  const settings = DIFFICULTY_SETTINGS[difficulty];
  
  const player: ManhattanPlayer = {
    id: 'player-1',
    name: 'Player',
    score: 0,
    resources: { ...settings.startingResources },
    buildings: [],
    blocksOwned: [],
    achievements: [],
    superlativeScore: 0,
    resourceManagementScore: 0
  };

  // Create a deep copy of the grid
  const grid = MANHATTAN_GRID.map(row => 
    row.map(block => ({
      ...block,
      buildings: [],
      totalHeight: 0,
      owner: null,
      isAvailable: true
    }))
  );

  return {
    phase: 'setup',
    round: 1,
    maxRounds: settings.maxRounds,
    players: [player],
    currentPlayer: 0,
    manhattanGrid: grid,
    availableBuildings: [...MANHATTAN_BUILDINGS],
    marketPrices: {
      steel: RESOURCE_MARKET.steel.basePrice,
      glass: RESOURCE_MARKET.glass.basePrice,
      concrete: RESOURCE_MARKET.concrete.basePrice
    },
    gameLog: [],
    score: {
      buildingPoints: 0,
      heightBonus: 0,
      majorityBonus: 0,
      resourceBonus: 0,
      grammarBonus: 0,
      total: 0
    },
    difficulty,
    tallestBuilding: {
      height: 0,
      owner: '',
      building: null
    },
    majorityControl: {},
    currentSuperlative: null
  };
};

export const canAffordBuilding = (player: ManhattanPlayer, building: ManhattanBuilding, difficulty: 'easy' | 'medium' | 'hard'): boolean => {
  const settings = DIFFICULTY_SETTINGS[difficulty];
  const multiplier = settings.buildingCostMultiplier;
  
  return (
    player.resources.steel >= building.requirements.steel &&
    player.resources.glass >= building.requirements.glass &&
    player.resources.concrete >= building.requirements.concrete &&
    player.resources.money >= building.cost * multiplier
  );
};

export const canPlaceBuilding = (building: ManhattanBuilding, block: ManhattanBlock): boolean => {
  // Check if block is available
  if (!block.isAvailable) return false;
  
  // Check height restrictions (can't exceed certain limits)
  const newHeight = block.totalHeight + building.height;
  if (newHeight > 600) return false; // Manhattan height limit
  
  return true;
};

export const placeBuilding = (
  gameState: ManhattanGameState,
  buildingId: string,
  blockId: string,
  superlative: string
): { success: boolean; newState: ManhattanGameState; message: string } => {
  const newState = { ...gameState };
  const player = newState.players[newState.currentPlayer];
  if (!player) {
    return { success: false, newState: gameState, message: "Player not found!" };
  }

  // Find building
  const buildingIndex = newState.availableBuildings.findIndex(b => b.id === buildingId);
  if (buildingIndex === -1) {
    return { success: false, newState: gameState, message: "Building not available!" };
  }
  
  const building = newState.availableBuildings[buildingIndex];
  if (!building) {
    return { success: false, newState: gameState, message: "Building not found!" };
  }
  
  // Find block
  let targetBlock: ManhattanBlock | null = null;
  for (const row of newState.manhattanGrid) {
    const block = row.find(b => b.id === blockId);
    if (block) {
      targetBlock = block;
      break;
    }
  }
  
  if (!targetBlock) {
    return { success: false, newState: gameState, message: "Block not found!" };
  }

  // Check if player can afford and place the building
  if (!canAffordBuilding(player, building, newState.difficulty)) {
    return { success: false, newState: gameState, message: "Cannot afford this building!" };
  }
  
  if (!canPlaceBuilding(building, targetBlock)) {
    return { success: false, newState: gameState, message: "Cannot place building here!" };
  }

  // Execute the placement
  const settings = DIFFICULTY_SETTINGS[newState.difficulty];
  const cost = building.cost * settings.buildingCostMultiplier;
  
  // Deduct resources
  player.resources.steel -= building.requirements.steel;
  player.resources.glass -= building.requirements.glass;
  player.resources.concrete -= building.requirements.concrete;
  player.resources.money -= cost;
  
  // Add building to block and player
  targetBlock.buildings.push(building);
  targetBlock.totalHeight += building.height;
  targetBlock.owner = player.id;
  player.buildings.push(building);
  
  if (!player.blocksOwned.includes(blockId)) {
    player.blocksOwned.push(blockId);
  }
  
  // Remove building from available buildings
  newState.availableBuildings.splice(buildingIndex, 1);
  
  // Update tallest building
  if (building.height > newState.tallestBuilding.height) {
    newState.tallestBuilding = {
      height: building.height,
      owner: player.id,
      building: building
    };
  }
  
  // Record superlative usage
  newState.currentSuperlative = superlative;
  player.superlativeScore += getSuperlativePoints(superlative);
  
  // Update game log
  newState.gameLog.push(`${player.name} built ${building.name} using: "${superlative}"`);
  
  // Update majority control
  updateMajorityControl(newState);
  
  // Check for round end
  if (newState.availableBuildings.length === 0 || newState.round >= newState.maxRounds) {
    newState.phase = 'results';
    calculateFinalScore(newState);
  }

  return { success: true, newState, message: `Built ${building.name}!` };
};

export const updateMajorityControl = (gameState: ManhattanGameState): void => {
  const playerBuildingCounts: { [playerId: string]: number } = {};
  
  // Count buildings per player
  gameState.players.forEach(player => {
    playerBuildingCounts[player.id] = player.buildings.length;
  });
  
  // Determine majority control for each block
  gameState.manhattanGrid.flat().forEach(block => {
    if (block.buildings.length > 0) {
      const ownerCounts: { [playerId: string]: number } = {};
      
      block.buildings.forEach(building => {
        const owner = gameState.players.find(p => p.buildings.includes(building))?.id;
        if (owner) {
          ownerCounts[owner] = (ownerCounts[owner] || 0) + 1;
        }
      });
      
      // Find player with most buildings on this block
      let majorityOwner = '';
      let maxCount = 0;
      
      Object.entries(ownerCounts).forEach(([playerId, count]) => {
        if (count > maxCount) {
          maxCount = count;
          majorityOwner = playerId;
        }
      });
      
      if (majorityOwner) {
        gameState.majorityControl[block.id] = majorityOwner;
      }
    }
  });
};

export const getSuperlativePoints = (superlative: string): number => {
  const superlativePoints: { [key: string]: number } = {
    'tallest': 15,
    'highest': 15,
    'biggest': 12,
    'largest': 12,
    'most expensive': 10,
    'most valuable': 10,
    'best': 8,
    'greatest': 8,
    'finest': 5,
    'newest': 5
  };
  
  return superlativePoints[superlative.toLowerCase()] || 3;
};

export const calculateBuildingPoints = (player: ManhattanPlayer): number => {
  return player.buildings.reduce((total, building) => total + building.points, 0);
};

export const calculateHeightBonus = (player: ManhattanPlayer, gameState: ManhattanGameState): number => {
  let bonus = 0;
  
  // Bonus for owning the tallest building
  if (gameState.tallestBuilding.owner === player.id) {
    bonus += 25;
  }
  
  // Bonus for buildings over certain heights
  player.buildings.forEach(building => {
    if (building.height >= 400) bonus += 15;
    else if (building.height >= 300) bonus += 10;
    else if (building.height >= 200) bonus += 5;
  });
  
  return bonus;
};

export const calculateMajorityBonus = (player: ManhattanPlayer, gameState: ManhattanGameState): number => {
  let bonus = 0;
  
  // Count blocks where player has majority control
  const controlledBlocks = Object.values(gameState.majorityControl).filter(owner => owner === player.id).length;
  
  // Bonus based on number of controlled blocks
  bonus += controlledBlocks * 10;
  
  // Extra bonus for controlling central blocks
  const centralBlocks = ['b2', 'b3', 'c2', 'c3'];
  centralBlocks.forEach(blockId => {
    if (gameState.majorityControl[blockId] === player.id) {
      bonus += 5; // Extra bonus for central control
    }
  });
  
  return bonus;
};

export const calculateResourceBonus = (player: ManhattanPlayer): number => {
  // Bonus for efficient resource management
  const totalResources = player.resources.steel + player.resources.glass + player.resources.concrete;
  const moneyBonus = Math.floor(player.resources.money / 10);
  
  return Math.floor(totalResources / 2) + moneyBonus;
};

export const calculateFinalScore = (gameState: ManhattanGameState): void => {
  const player = gameState.players[gameState.currentPlayer];
  if (!player) return;
  
  const buildingPoints = calculateBuildingPoints(player);
  const heightBonus = calculateHeightBonus(player, gameState);
  const majorityBonus = calculateMajorityBonus(player, gameState);
  const resourceBonus = calculateResourceBonus(player);
  
  gameState.score = {
    buildingPoints,
    heightBonus,
    majorityBonus,
    resourceBonus,
    grammarBonus: 0, // Will be added from grammar exercises
    total: buildingPoints + heightBonus + majorityBonus + resourceBonus + player.superlativeScore
  };
  
  player.score = gameState.score.total;
  player.resourceManagementScore = resourceBonus;
};

export const updateMarketPrices = (gameState: ManhattanGameState): ManhattanGameState => {
  const newState = { ...gameState };
  
  // Simulate market volatility
  Object.keys(RESOURCE_MARKET).forEach(resource => {
    const market = RESOURCE_MARKET[resource as keyof typeof RESOURCE_MARKET];
    const volatility = market.volatility;
    const change = (Math.random() - 0.5) * 2 * volatility;
    const currentPrice = newState.marketPrices[resource as keyof typeof newState.marketPrices];
    const newPrice = Math.max(1, Math.round(currentPrice * (1 + change)));
    
    newState.marketPrices[resource as keyof typeof newState.marketPrices] = newPrice;
  });
  
  return newState;
};

export const buyResources = (
  gameState: ManhattanGameState,
  resourceType: 'steel' | 'glass' | 'concrete',
  quantity: number
): { success: boolean; newState: ManhattanGameState; message: string } => {
  const newState = { ...gameState };
  const player = newState.players[newState.currentPlayer];
  if (!player) {
    return { success: false, newState: gameState, message: "Player not found!" };
  }
  
  const cost = newState.marketPrices[resourceType] * quantity;
  
  if (player.resources.money < cost) {
    return { success: false, newState: gameState, message: "Not enough money!" };
  }
  
  player.resources.money -= cost;
  player.resources[resourceType] += quantity;
  
  newState.gameLog.push(`${player.name} bought ${quantity} ${resourceType} for $${cost}`);
  
  return { success: true, newState, message: `Bought ${quantity} ${resourceType}!` };
};

export const getAvailableSuperlatives = (building: ManhattanBuilding): string[] => {
  const superlatives = [];
  
  // Height-based superlatives
  if (building.height >= 400) {
    superlatives.push('tallest', 'highest');
  }
  
  // Cost-based superlatives
  if (building.cost >= 400) {
    superlatives.push('most expensive', 'most valuable');
  }
  
  // Size-based superlatives
  if (building.floors >= 80) {
    superlatives.push('biggest', 'largest');
  }
  
  // General superlatives
  superlatives.push('best', 'greatest', 'finest', 'newest');
  
  return superlatives;
};

export const nextRound = (gameState: ManhattanGameState): ManhattanGameState => {
  const newState = { ...gameState };
  newState.round++;
  newState.phase = 'planning';
  
  // Update market prices
  return updateMarketPrices(newState);
}; 