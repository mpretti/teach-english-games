import type { NoMercyGameState, NoMercyPlayer, NoMercyCard, NoMercyCharacter } from '../types/noMercyGame';
import { NO_MERCY_CARDS, NO_MERCY_CHARACTERS, DIFFICULTY_SETTINGS } from '../data/noMercyData';

export function initializeNoMercyGame(difficulty: 'easy' | 'medium' | 'hard'): NoMercyGameState {
  const shuffledCards = shuffleArray([...NO_MERCY_CARDS]);
  const settings = DIFFICULTY_SETTINGS[difficulty];
  
  const player: NoMercyPlayer = {
    id: 'player-1',
    name: 'Player',
    character: null,
    hand: [],
    revealedCards: [],
    isBanking: false,
    isStopping: false,
    isStealing: false,
    hasChickenedOut: false,
    hasBusted: false,
    score: 0,
    reactionTime: []
  };

  return {
    phase: 'setup',
    players: [player],
    currentPlayer: 0,
    deck: shuffledCards,
    discardPile: [],
    availableCharacters: [...NO_MERCY_CHARACTERS],
    isGameActive: false,
    round: 1,
    maxRounds: 3,
    score: {
      cardsRevealed: 0,
      riskBonus: 0,
      grammarBonus: 0,
      characterBonus: 0,
      total: 0
    },
    difficulty,
    lastAction: '',
    gameStartTime: Date.now(),
    bustThreshold: settings.bustThreshold
  };
}

export function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const temp = shuffled[i];
    const swapItem = shuffled[j];
    if (temp !== undefined && swapItem !== undefined) {
      shuffled[i] = swapItem;
      shuffled[j] = temp;
    }
  }
  return shuffled;
}

export function selectCharacter(
  gameState: NoMercyGameState,
  characterId: string
): { newState: NoMercyGameState; success: boolean; message: string } {
  const player = gameState.players[0];
  if (!player) {
    return {
      newState: gameState,
      success: false,
      message: 'No player found!'
    };
  }

  const character = gameState.availableCharacters.find(c => c.id === characterId);
  if (!character) {
    return {
      newState: gameState,
      success: false,
      message: 'Character not found!'
    };
  }

  const newPlayer: NoMercyPlayer = {
    ...player,
    character
  };

  const newState: NoMercyGameState = {
    ...gameState,
    players: [newPlayer],
    phase: 'playing',
    isGameActive: true,
    lastAction: `Selected character: ${character.name}`
  };

  return {
    newState,
    success: true,
    message: `You are now playing as ${character.name}!`
  };
}

export function revealCard(
  gameState: NoMercyGameState
): { newState: NoMercyGameState; success: boolean; message: string; busted: boolean } {
  const player = gameState.players[0];
  if (!player) {
    return {
      newState: gameState,
      success: false,
      message: 'No player found!',
      busted: false
    };
  }

  if (gameState.deck.length === 0) {
    return {
      newState: gameState,
      success: false,
      message: 'No more cards in deck!',
      busted: false
    };
  }

  const newCard = gameState.deck[0];
  if (!newCard) {
    return {
      newState: gameState,
      success: false,
      message: 'No card available!',
      busted: false
    };
  }

  const revealedCard: NoMercyCard = {
    ...newCard,
    isRevealed: true
  };

  const newDeck = gameState.deck.slice(1);
  const newRevealedCards = [...player.revealedCards, revealedCard];

  // Check for bust (two cards of same number and color)
  const busted = checkForBust(newRevealedCards);

  const newPlayer: NoMercyPlayer = {
    ...player,
    revealedCards: newRevealedCards,
    hasBusted: busted
  };

  const newScore = {
    ...gameState.score,
    cardsRevealed: gameState.score.cardsRevealed + 1,
    total: gameState.score.total + (busted ? 0 : 1)
  };

  const message = busted 
    ? `BUST! You revealed two ${revealedCard.color} ${revealedCard.number}s!`
    : `Revealed ${revealedCard.color} ${revealedCard.number}`;

  const newState: NoMercyGameState = {
    ...gameState,
    players: [newPlayer],
    deck: newDeck,
    score: newScore,
    lastAction: message,
    phase: busted ? 'results' : gameState.phase
  };

  return {
    newState,
    success: !busted,
    message,
    busted
  };
}

export function bankCards(
  gameState: NoMercyGameState
): { newState: NoMercyGameState; success: boolean; message: string } {
  const player = gameState.players[0];
  if (!player) {
    return {
      newState: gameState,
      success: false,
      message: 'No player found!'
    };
  }

  if (player.revealedCards.length === 0) {
    return {
      newState: gameState,
      success: false,
      message: 'No cards to bank!'
    };
  }

  const bankingBonus = calculateBankingBonus(player.revealedCards);
  const newPlayer: NoMercyPlayer = {
    ...player,
    revealedCards: [],
    isBanking: true,
    score: player.score + player.revealedCards.length + bankingBonus
  };

  const newScore = {
    ...gameState.score,
    riskBonus: gameState.score.riskBonus + bankingBonus,
    total: gameState.score.total + bankingBonus
  };

  const newState: NoMercyGameState = {
    ...gameState,
    players: [newPlayer],
    score: newScore,
    lastAction: `Banked ${player.revealedCards.length} cards with ${bankingBonus} bonus points!`,
    round: gameState.round + 1,
    phase: gameState.round >= gameState.maxRounds ? 'results' : 'playing'
  };

  return {
    newState,
    success: true,
    message: `Successfully banked ${player.revealedCards.length} cards!`
  };
}

export function stopGame(
  gameState: NoMercyGameState
): { newState: NoMercyGameState; success: boolean; message: string } {
  const player = gameState.players[0];
  if (!player) {
    return {
      newState: gameState,
      success: false,
      message: 'No player found!'
    };
  }

  const newPlayer: NoMercyPlayer = {
    ...player,
    isStopping: true
  };

  const conservationBonus = Math.floor(player.revealedCards.length * 0.5);
  const newScore = {
    ...gameState.score,
    riskBonus: gameState.score.riskBonus + conservationBonus,
    total: gameState.score.total + conservationBonus
  };

  const newState: NoMercyGameState = {
    ...gameState,
    players: [newPlayer],
    score: newScore,
    phase: 'results',
    lastAction: `Stopped with ${player.revealedCards.length} cards and ${conservationBonus} conservation bonus!`
  };

  return {
    newState,
    success: true,
    message: 'You chose to stop and conserve your progress!'
  };
}

export function stealCards(
  gameState: NoMercyGameState
): { newState: NoMercyGameState; success: boolean; message: string } {
  const player = gameState.players[0];
  if (!player) {
    return {
      newState: gameState,
      success: false,
      message: 'No player found!'
    };
  }

  // Simulate stealing from other players (in single player, this is a risk/reward mechanism)
  const stealSuccess = Math.random() > 0.5; // 50% chance of success
  
  if (stealSuccess) {
    const stolenCards = Math.floor(Math.random() * 3) + 1; // 1-3 cards
    const stealBonus = stolenCards * 2;
    
    const newPlayer: NoMercyPlayer = {
      ...player,
      isStealing: true,
      score: player.score + stealBonus
    };

    const newScore = {
      ...gameState.score,
      riskBonus: gameState.score.riskBonus + stealBonus,
      total: gameState.score.total + stealBonus
    };

    const newState: NoMercyGameState = {
      ...gameState,
      players: [newPlayer],
      score: newScore,
      lastAction: `Successfully stole ${stolenCards} cards for ${stealBonus} points!`
    };

    return {
      newState,
      success: true,
      message: `Stealing successful! Gained ${stealBonus} points!`
    };
  } else {
    const newPlayer: NoMercyPlayer = {
      ...player,
      isStealing: true,
      hasBusted: true
    };

    const newState: NoMercyGameState = {
      ...gameState,
      players: [newPlayer],
      phase: 'results',
      lastAction: 'Stealing failed! You got caught!'
    };

    return {
      newState,
      success: false,
      message: 'Stealing failed! You got caught and lost!'
    };
  }
}

function checkForBust(revealedCards: NoMercyCard[]): boolean {
  const cardCounts = new Map<string, number>();
  
  for (const card of revealedCards) {
    const key = `${card.number}-${card.color}`;
    const count = cardCounts.get(key) || 0;
    cardCounts.set(key, count + 1);
    
    if (count + 1 >= 2) { // Found duplicate
      return true;
    }
  }
  
  return false;
}

function calculateBankingBonus(revealedCards: NoMercyCard[]): number {
  // Bonus based on variety of colors and numbers
  const uniqueColors = new Set(revealedCards.map(c => c.color)).size;
  const uniqueNumbers = new Set(revealedCards.map(c => c.number)).size;
  
  return uniqueColors + uniqueNumbers;
}

export function chickenOut(
  gameState: NoMercyGameState
): { newState: NoMercyGameState; success: boolean; message: string } {
  const player = gameState.players[0];
  if (!player) {
    return {
      newState: gameState,
      success: false,
      message: 'No player found!'
    };
  }

  const newPlayer: NoMercyPlayer = {
    ...player,
    hasChickenedOut: true,
    revealedCards: [] // Lose all revealed cards
  };

  const newState: NoMercyGameState = {
    ...gameState,
    players: [newPlayer],
    phase: 'results',
    lastAction: 'Chickened out and lost all revealed cards!'
  };

  return {
    newState,
    success: false,
    message: 'You chickened out! Better safe than sorry!'
  };
}

export function calculateFinalScore(gameState: NoMercyGameState): number {
  const player = gameState.players[0];
  if (!player) {
    return 0;
  }

  let finalScore = gameState.score.total;
  
  // Character bonus
  if (player.character) {
    const characterBonus = getCharacterBonus(player.character, player);
    finalScore += characterBonus;
  }
  
  // Risk management bonus
  if (!player.hasBusted && !player.hasChickenedOut) {
    finalScore += 20; // Completion bonus
  }
  
  return Math.max(0, finalScore);
}

function getCharacterBonus(character: NoMercyCharacter, player: NoMercyPlayer): number {
  switch (character.type) {
    case 'sheriff':
      return player.isBanking ? 15 : 5; // Bonus for conservative play
    case 'deputy':
      return player.isStopping ? 10 : 5; // Bonus for strategic stopping
    case 'outlaw':
      return player.isStealing ? 20 : 0; // High risk, high reward
    case 'renegade':
      return Math.floor(player.score * 0.1); // Percentage bonus
    default:
      return 0;
  }
} 