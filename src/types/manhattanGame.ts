export interface ManhattanBuilding {
  id: string;
  name: string;
  nameKorean: string;
  height: number;
  floors: number;
  cost: number;
  points: number;
  type: 'residential' | 'commercial' | 'office' | 'mixed';
  emoji: string;
  description: string;
  descriptionKorean: string;
  requirements: {
    steel: number;
    glass: number;
    concrete: number;
  };
}

export interface ManhattanBlock {
  id: string;
  x: number;
  y: number;
  buildings: ManhattanBuilding[];
  totalHeight: number;
  owner: string | null;
  isAvailable: boolean;
  baseValue: number;
  bonuses: string[];
}

export interface ManhattanPlayer {
  id: string;
  name: string;
  score: number;
  resources: {
    steel: number;
    glass: number;
    concrete: number;
    money: number;
  };
  buildings: ManhattanBuilding[];
  blocksOwned: string[];
  achievements: string[];
  superlativeScore: number;
  resourceManagementScore: number;
}

export interface ManhattanGameState {
  phase: 'setup' | 'planning' | 'building' | 'scoring' | 'grammar' | 'results';
  round: number;
  maxRounds: number;
  players: ManhattanPlayer[];
  currentPlayer: number;
  manhattanGrid: ManhattanBlock[][];
  availableBuildings: ManhattanBuilding[];
  marketPrices: {
    steel: number;
    glass: number;
    concrete: number;
  };
  gameLog: string[];
  score: {
    buildingPoints: number;
    heightBonus: number;
    majorityBonus: number;
    resourceBonus: number;
    grammarBonus: number;
    total: number;
  };
  difficulty: 'easy' | 'medium' | 'hard';
  tallestBuilding: {
    height: number;
    owner: string;
    building: ManhattanBuilding | null;
  };
  majorityControl: {
    [blockId: string]: string; // blockId -> playerId
  };
  currentSuperlative: string | null;
}

export interface ManhattanGrammarExercise {
  id: string;
  type: 'superlatives' | 'comparatives' | 'spatial' | 'resources';
  question: string;
  questionKorean: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  explanationKorean: string;
  points: number;
  context: 'building' | 'height' | 'majority' | 'resources';
  buildings?: ManhattanBuilding[];
}

export interface BuildingAction {
  id: string;
  playerId: string;
  buildingId: string;
  blockId: string;
  cost: {
    steel: number;
    glass: number;
    concrete: number;
    money: number;
  };
  timestamp: number;
  superlativeUsed: string;
  isValid: boolean;
} 