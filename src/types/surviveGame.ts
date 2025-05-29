export interface IslandTile {
  id: string;
  type: 'beach' | 'mountain' | 'forest' | 'volcano';
  emoji: string;
  name: string;
  nameKorean: string;
  isSinking: boolean;
  sinkOrder: number;
  hasPlayer: boolean;
  playerId?: string;
}

export interface Boat {
  id: string;
  name: string;
  nameKorean: string;
  emoji: string;
  capacity: number;
  currentPassengers: string[];
  position: { x: number; y: number };
  isMoving: boolean;
  destination?: { x: number; y: number };
}

export interface SeaCreature {
  id: string;
  type: 'shark' | 'whale' | 'sea-monster' | 'dolphin';
  name: string;
  nameKorean: string;
  emoji: string;
  position: { x: number; y: number };
  isActive: boolean;
  effect: 'harmful' | 'helpful';
  description: string;
  descriptionKorean: string;
}

export interface SurvivePlayer {
  id: string;
  name: string;
  position: { x: number; y: number };
  isInBoat: boolean;
  boatId?: string;
  isSwimming: boolean;
  isOnDolphin: boolean;
  hasEscaped: boolean;
  survivalPoints: number;
  seaCreatureCards: SeaCreature[];
}

export interface SurviveGameState {
  phase: 'setup' | 'movement' | 'sinking' | 'sea-creatures' | 'grammar' | 'results';
  turn: number;
  maxTurns: number;
  players: SurvivePlayer[];
  currentPlayer: number;
  island: IslandTile[][];
  boats: Boat[];
  activeSeaCreatures: SeaCreature[];
  sinkingQueue: IslandTile[];
  gameLog: string[];
  islandSize: number;
}

export interface SurviveGrammarExercise {
  id: string;
  type: 'present-continuous' | 'possessive-pronouns' | 'immediate-plans' | 'expressing-desires';
  question: string;
  questionKorean: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  explanationKorean: string;
  points: number;
  context: 'swimming' | 'boat' | 'dolphin' | 'escape' | 'danger';
}

export interface MovementAction {
  type: 'move' | 'board-boat' | 'swim' | 'ride-dolphin' | 'use-creature';
  playerId: string;
  from: { x: number; y: number };
  to: { x: number; y: number };
  boatId?: string;
  creatureId?: string;
} 