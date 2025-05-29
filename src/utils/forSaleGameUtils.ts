import type { ForSaleGameState, Player, Property, Auction, SaleCard } from '../types/forSaleGame';

export const formatCurrency = (amount: number): string => {
  return `$${amount}k`;
};

export const initializeGame = (): ForSaleGameState => {
  const player: Player = {
    id: 'player-1',
    name: 'Student',
    money: 18, // Starting money in thousands
    properties: [],
    bids: []
  };

  return {
    phase: 'auction',
    round: 1,
    maxRounds: 5,
    players: [player],
    currentPlayer: 0,
    availableProperties: [],
    currentAuction: null,
    saleCards: [],
    gameLog: ['Welcome to For Sale! You are a real estate broker.', '부동산 포세일에 오신 것을 환영합니다! 당신은 부동산 중개인입니다.']
  };
};

export const startAuction = (gameState: ForSaleGameState, property: Property): ForSaleGameState => {
  const auction: Auction = {
    property,
    currentBid: property.minBid,
    highestBidder: null,
    bids: [],
    isActive: true
  };

  return {
    ...gameState,
    currentAuction: auction,
    gameLog: [
      ...gameState.gameLog,
      `Auction started for ${property.name}! Minimum bid: ${formatCurrency(property.minBid)}`,
      `${property.nameKorean} 경매가 시작되었습니다! 최소 입찰가: ${formatCurrency(property.minBid)}`
    ]
  };
};

export const placeBid = (gameState: ForSaleGameState, playerId: string, bidAmount: number): ForSaleGameState => {
  if (!gameState.currentAuction || !gameState.currentAuction.isActive) {
    return gameState;
  }

  const player = gameState.players.find(p => p.id === playerId);
  if (!player || player.money < bidAmount) {
    return gameState;
  }

  const updatedAuction: Auction = {
    ...gameState.currentAuction,
    currentBid: bidAmount,
    highestBidder: playerId,
    bids: [...gameState.currentAuction.bids, { playerId, amount: bidAmount }]
  };

  return {
    ...gameState,
    currentAuction: updatedAuction,
    gameLog: [
      ...gameState.gameLog,
      `${player.name} bid ${formatCurrency(bidAmount)} on ${updatedAuction.property.name}`,
      `${player.name}이/가 ${updatedAuction.property.nameKorean}에 ${formatCurrency(bidAmount)}를 입찰했습니다`
    ]
  };
};

export const winAuction = (gameState: ForSaleGameState): ForSaleGameState => {
  if (!gameState.currentAuction || !gameState.currentAuction.highestBidder) {
    return gameState;
  }

  const winnerId = gameState.currentAuction.highestBidder;
  const winningBid = gameState.currentAuction.currentBid;
  const property = gameState.currentAuction.property;

  const updatedPlayers = gameState.players.map(player => {
    if (player.id === winnerId) {
      return {
        ...player,
        money: player.money - winningBid,
        properties: [...player.properties, property]
      };
    }
    return player;
  });

  return {
    ...gameState,
    players: updatedPlayers,
    currentAuction: null,
    gameLog: [
      ...gameState.gameLog,
      `Auction won! ${property.name} sold for ${formatCurrency(winningBid)}`,
      `경매 낙찰! ${property.nameKorean}이/가 ${formatCurrency(winningBid)}에 팔렸습니다`
    ]
  };
};

export const passAuction = (gameState: ForSaleGameState, playerId: string): ForSaleGameState => {
  const player = gameState.players.find(p => p.id === playerId);
  if (!player) return gameState;

  return {
    ...gameState,
    gameLog: [
      ...gameState.gameLog,
      `${player.name} passed on this auction`,
      `${player.name}이/가 이 경매를 포기했습니다`
    ]
  };
};

export const sellProperty = (gameState: ForSaleGameState, playerId: string, propertyId: string, saleCard: SaleCard): ForSaleGameState => {
  const player = gameState.players.find(p => p.id === playerId);
  const property = player?.properties.find(p => p.id === propertyId);
  
  if (!player || !property) return gameState;

  // Calculate sale value based on property quality and sale card
  const saleValue = Math.floor(saleCard.minValue + (property.quality / 10) * (saleCard.maxValue - saleCard.minValue));
  
  const updatedPlayers = gameState.players.map(p => {
    if (p.id === playerId) {
      return {
        ...p,
        money: p.money + saleValue,
        properties: p.properties.filter(prop => prop.id !== propertyId)
      };
    }
    return p;
  });

  return {
    ...gameState,
    players: updatedPlayers,
    gameLog: [
      ...gameState.gameLog,
      `Sold ${property.name} for ${formatCurrency(saleValue)}!`,
      `${property.nameKorean}을/를 ${formatCurrency(saleValue)}에 팔았습니다!`
    ]
  };
};

export const calculateFinalScore = (player: Player): number => {
  return player.money + player.properties.reduce((total, property) => total + property.quality, 0);
};

export const getRandomSaleCard = (saleCards: SaleCard[]): SaleCard => {
  return saleCards[Math.floor(Math.random() * saleCards.length)];
};

export const shuffleArray = <T>(array: T[]): T[] => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}; 