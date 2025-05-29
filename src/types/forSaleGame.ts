export interface Property {
  id: string;
  name: string;
  nameKorean: string;
  type: 'house' | 'apartment' | 'office' | 'condominium' | 'estate';
  emoji: string;
  minBid: number;
  quality: number; // 1-10 scale (bad to good)
  description: string;
  descriptionKorean: string;
}

export interface Player {
  id: string;
  name: string;
  money: number;
  properties: Property[];
  bids: number[];
}

export interface Auction {
  property: Property;
  currentBid: number;
  highestBidder: string | null;
  bids: { playerId: string; amount: number }[];
  isActive: boolean;
}

export interface SaleCard {
  id: string;
  minValue: number;
  maxValue: number;
  emoji: string;
}

export interface ForSaleGameState {
  phase: 'auction' | 'selling' | 'results';
  round: number;
  maxRounds: number;
  players: Player[];
  currentPlayer: number;
  availableProperties: Property[];
  currentAuction: Auction | null;
  saleCards: SaleCard[];
  gameLog: string[];
}

export interface ForSaleGrammarExercise {
  id: string;
  type: 'future-past' | 'expressing-results' | 'possessive-pronouns' | 'immediate-plans' | 'expressing-desires';
  question: string;
  questionKorean: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  explanationKorean: string;
  points: number;
} 